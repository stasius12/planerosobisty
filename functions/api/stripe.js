const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const fullCheckout = async (req, res) => {
  try {
    const { personal, shipping, prices, couponID } = req.body

    // 1. Creating new customer
    const customer = await stripe.customers.create({
      address: {
        city: personal.city,
        country: 'PL',
        line1: personal.line1,
        postal_code: personal.postal_code,
      },
      email: personal.email,
      name: personal.name,
      phone: personal.phone,
      shipping: {
        address: {
          city: shipping.city,
          country: 'PL',
          line1: shipping.line1,
          postal_code: shipping.postal_code,
        },
        name: shipping.name,
        phone: shipping.phone,
      },
    })

    const discounts = couponID ? [{ coupon: couponID }] : ''

    const session = await stripe.checkout.sessions.create({
      line_items: prices,
      mode: 'payment',
      customer: customer.id,
      success_url: `${process.env.DOMAIN_NAME}/order/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN_NAME}?canceled=true`,
      payment_method_types: ['card', 'p24'],
      discounts,
      shipping_rates: [process.env.STRIPE_SHIPPING_RATE],
      // shipping_address_collection: {
      //   allowed_countries: ['PL'],
      // },
      billing_address_collection: 'auto',
      locale: 'pl',
    })
    res.redirect(303, session.url)


    // // 2. Creating invoice items
    // for (let price of prices) {
    //   const invoiceItem = await stripe.invoiceItems.create({
    //     customer: customer.id,
    //     price,
    //   })
    // }

    // res.status(200).json(customer)
  } catch {
    res.status(500)
  }
}

const createInvoice = async (req, res) => {
  const { customerID, couponID } = req.body

  const discounts = couponID ? [{ coupon: couponID }] : ''

  try {
    // 3. Creating an invoice
    const invoice = await stripe.invoices.create({
      customer: customerID,
      auto_advance: false,
      collection_method: 'send_invoice',
      days_until_due: 1,
      discounts,
    })

    const finalInvoice = await stripe.invoices.finalizeInvoice(invoice.id)

    const paymentIntent = await stripe.paymentIntents.retrieve(
      finalInvoice.payment_intent
    )

    res.status(200).json(paymentIntent.client_secret)
  } catch (e) {
    console.log(e)
  }
}

const _getProductsWithPrices = async (isShipping = false) => {
  const rawProducts = await stripe.products.list({ active: true })

  const mappedProducts = rawProducts.data
    .filter((product) => {
      return Boolean(product.metadata.shipping) === isShipping
    })
    .map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      })
      const price = prices.data && prices.data.length ? prices.data[0] : null

      return { ...product, price }
    })

  return await Promise.all(mappedProducts)
}

const listAllProducts = async (req, res) => {
  try {
    // let shippingRates = {}
    // if (product.metadata.shipping_rates) {
    //   const shippingRatesResponse = await stripe.products.list({
    //     ids: product.metadata.shipping_rates.replace(' ', '').split(','),
    //   })
    //   shippingRates = shippingRatesResponse.data && shippingRatesResponse.data.length ? shippingRatesResponse.data : {};
    // }
    const mappedProducts = await _getProductsWithPrices()
    res.status(200).json(mappedProducts)
  } catch (error) {
    res.status(500).send(error)
  }
}

const listAllShippingMethods = async (req, res) => {
  try {
    const mappedProducts = await _getProductsWithPrices(true)
    res.status(200).json(mappedProducts)
  } catch (error) {
    res.status(500).send(error)
  }
}

const retrieveProduct = async (req, res) => {
  const { productID } = req.params

  try {
    const product = await stripe.products.retrieve(productID)
    const prices = await stripe.prices.list({
      product: productID,
      active: true,
    })

    res.status(200).json({ product, price: prices.data[0] })
  } catch (error) {
    res.status(500).send(error)
  }
}

const checkoutSessionInfo = async (req, res) => {
  const { sessionID } = req.params

  if (sessionID) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionID)
      const retrievedCustomer = await stripe.customers.retrieve(
        session.customer
      )
      res.status(200).json({ session, retrievedCustomer })
    } catch (error) {
      res.status(500).send(error)
    }
  } else {
    res.status(400).send('Missing sessionID parameter')
  }
}

const createCheckoutSession = async (req, res) => {
  const { productID } = req.body

  if (!productID) return res.redirect(303, `/sklep/?error=true`)

  const rawPrices = await stripe.prices.list({
    product: productID,
    active: true,
  })

  if (!rawPrices) return res.redirect(303, `/sklep/?error=true`)

  const prices = rawPrices.data.map((price) => {
    return { price: price.id, quantity: 1 }
  })

  const session = await stripe.checkout.sessions.create({
    line_items: prices,
    mode: 'payment',
    customer: 'cus_KALI7bRYUSeiLJ',
    success_url: `${process.env.DOMAIN_NAME}/order/success/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN_NAME}?canceled=true`,
    payment_method_types: ['card', 'p24'],
    allow_promotion_codes: true,
    shipping_rates: [process.env.STRIPE_SHIPPING_RATE],
    shipping_address_collection: {
      allowed_countries: ['PL'],
    },
    billing_address_collection: 'required',
  })
  res.redirect(303, session.url)
}

const createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'pln',
    payment_method_types: ['p24'],
  })

  res.status(200).json(paymentIntent.client_secret)
}

const retrievePromotionCode = async (req, res) => {
  const { code } = req.params

  try {
    const promotionCode = await stripe.promotionCodes.list({
      active: true,
      code,
    })
    if (
      promotionCode &&
      promotionCode.data.length &&
      promotionCode.data[0].coupon
    ) {
      const coupon = promotionCode.data[0].coupon
      res.status(200).json({
        id: coupon.id,
        percent_off: coupon.percent_off,
        code: promotionCode.data[0].code,
      })
    } else {
      console.log(promotionCode)
      res.status(400).json('Promo code not found')
    }
  } catch (e) {
    console.log(e)
    res.status(400).json('Promo code not found')
  }
}

module.exports.retrieveProduct = retrieveProduct
module.exports.retrievePromotionCode = retrievePromotionCode
module.exports.listAllProducts = listAllProducts
module.exports.listAllShippingMethods = listAllShippingMethods
module.exports.createCheckoutSession = createCheckoutSession
module.exports.fullCheckout = fullCheckout
module.exports.createInvoice = createInvoice
module.exports.checkoutSessionInfo = checkoutSessionInfo
module.exports.createPaymentIntent = createPaymentIntent
