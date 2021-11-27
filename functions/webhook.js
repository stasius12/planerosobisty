const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

exports.handler = function (event) {
  const payload = event.body
  const sig = event.headers['stripe-signature']

  try {
    stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }

  return {
    statusCode: 200,
  }
}
