const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const mailchimpClient = require('@mailchimp/mailchimp_transactional')(
  process.env.MANDRILL_API_KEY
)

const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.eu.mailgun.net',
  timeout: 10 * 1000,
})

const Sentry = require('@sentry/node')
const { ExtraErrorData } = require('@sentry/integrations')

let sentryInitialized = false
function initSentry() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      normalizeDepth: 11,
      integrations: [new ExtraErrorData({ depth: 10 })],
    })
    sentryInitialized = true
  }
}

initSentry()

async function reportError(error) {
  // eslint-disable-next-line no-console
  // console.warn(error)
  if (!sentryInitialized) return

  if (typeof error === 'string') {
    Sentry.captureMessage(error)
  } else {
    Sentry.captureException(error)
  }

  await Sentry.flush()
}

function catchErrors(handler) {
  return async function (event, context) {
    context.callbackWaitsForEmptyEventLoop = false
    try {
      return await handler.call(this, ...arguments)
    } catch (e) {
      await reportError(e)
      return {
        statusCode: 500,
        body: `Error: ${e}`,
      }
    }
  }
}

const getEmailTemplate = async (templateName, templateContent, mergeVars) => {
  const response = await mailchimpClient.templates.render({
    template_name: templateName,
    template_content: templateContent,
    merge_vars: mergeVars,
  })
  return response.html
}

const sendEmail = (to, subject, text, html) => {
  mg.messages
    .create('mg.planerosobisty.pl', {
      from: 'Planer Osobisty <sklep@planerosobisty.pl>',
      to,
      subject,
      text,
      html,
    })
    .then((msg) => Sentry.captureMessage(msg))
    .catch((err) => Sentry.captureException(err))
}

const handlePaymentIntentSucceeded = async (eventObject, send = true) => {
  const metadata = Object.entries(eventObject.metadata).map(
    ([name, content]) => ({
      name,
      content,
    })
  )

  const template = await getEmailTemplate(
    'twoje-zam-wienie-zosta-o-z-o-one',
    [],
    metadata.concat([
      {
        name: 'SUBJECT',
        content: 'Potwierdzenie złożenia zamówienia',
      },
      {
        name: 'MC_PREVIEW_TEXT',
        content: `Twoje zamówienie nr ${eventObject.metadata.ORDER_NUMBER} zostało złożone`,
      },
    ])
  )

  if (send)
    await sendEmail(
      [eventObject.receipt_email],
      'Potwierdzenie złożenia zamówienia',
      'Potwierdzenie złożenia zamówienia',
      template
    )

  return template
}

const handleCustomerUpdated = async (eventData, send = true) => {
  if (
    !eventData.previous_attributes ||
    !eventData.previous_attributes.metadata ||
    eventData.previous_attributes.metadata.invoice !== null ||
    !eventData.object.metadata ||
    !eventData.object.metadata.invoice
  )
    return

  const metadata = Object.entries(eventData.object.metadata).map(
    ([name, content]) => ({
      name,
      content,
    })
  )

  const template = await getEmailTemplate(
    'twoje-zam-wienie-zosta-o-wys-ane',
    [],
    metadata.concat([
      {
        name: `INVOICE_LINK`,
        content: `${eventData.object.metadata.invoice}.pdf`,
      },
      {
        name: 'SUBJECT',
        content: 'Potwierdzenie wysłania zamówienia',
      },
      {
        name: 'MC_PREVIEW_TEXT',
        content: `Twoje zamówienie nr ${eventData.object.metadata.ORDER_NUMBER} zostało wysłane`,
      },
    ])
  )

  if (send)
    sendEmail(
      [eventData.object.email],
      'Zamówienie zostało wysłane',
      'Zamówienie zostało wysłane',
      template
    )

  return template
}

exports.handler = catchErrors(async function (event) {
  if (event.httpMethod === 'GET') {
    // if (!process.env.DEV) return { statusCode: 403 } TODO

    const template = await handlePaymentIntentSucceeded(
      {
        id: 'pi_3KZsaaKh4S9ivNPr0cewxhFt',
        object: 'payment_intent',
        amount: 8847,
        amount_capturable: 0,
        amount_received: 8847,
        application: null,
        application_fee_amount: null,
        automatic_payment_methods: null,
        canceled_at: null,
        cancellation_reason: null,
        capture_method: 'automatic',
        charges: {
          object: 'list',
          data: [
            {
              billing_details: {
                address: {
                  city: null,
                  country: null,
                  line1: null,
                  line2: null,
                  postal_code: null,
                  state: null,
                },
                email: 'stanislawstepak@outlook.com',
                name: null,
                phone: null,
              },
            },
          ],
        },
        metadata: {
          CUSTOMER_NAME: 'Stanisław Stępak',
          CUSTOMER_COMPANY: 'My company',
          COMPANY_ID: '8943152472',
          CUSTOMER_ADDRESS_LINE_1: 'Nyska 79/13',
          CUSTOMER_ADDRESS_LINE_2: '50-505 Wrocław',
          SHIPPING_NAME: 'Stanisław Stępak',
          SHIPPING_COMPANY: 'Company',
          SHIPPING_ADDRESS_LINE_1: 'Nyska 79/13',
          SHIPPING_ADDRESS_LINE_2: '50-505 Wrocław',
          SHIPPING_METHOD: 'locker',
          // SHIPPING_LOCKER_NAME: 'POP-WRO',
          'cart-1':
            'Planer (prod_K3sGdqwOzlBcyW): 34.99 zł (price_1JW0iYKh4S9ivNPrPZ4eFhuR): QNT 3',
          CART_1_NAME: 'Planer',
          CART_1_PRICE: '34.99',
          CART_1_QUANTITY: '3',
          ORDER_NUMBER: 'PO-20220305090343854',
          ORDER_TOTAL: '73.48',
          ORDER_SHIPPING_PRICE: '14.99',
          ORDER_TOTAL_WITH_SHIPPING: '88.47',
          promoCode: 'planerek',
        },
        receipt_email: 'stanislawstepak@outlook.com',
      },
      true
    )
    return {
      statusCode: 200,
      body: template,
    }
  }

  let stripeEvent = null
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      event.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }

  if (stripeEvent.type === 'payment_intent.succeeded') {
    await handlePaymentIntentSucceeded(stripeEvent.data.object)
  } else if (stripeEvent.type === 'customer.updated') {
    await handleCustomerUpdated(stripeEvent.data)
  }

  return {
    statusCode: 200,
  }
})
