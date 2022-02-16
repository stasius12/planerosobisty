// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.eu.mailgun.net',
})

const sendEmail = function () {
  mg.messages
    .create('mg.planerosobisty.pl', {
      from: 'Natalia <natalia@planerosobisty.pl>',
      to: ['stanislawstepak@outlook.com'],
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
      html: '<h1>Testing some Mailgun awesomness!</h1>',
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)) // logs any error
}

exports.handler = function (event) {
  sendEmail()

  return {
    statusCode: 200,
  }
}

// exports.handler = function (event) {
//   const payload = event.body
//   const sig = event.headers['stripe-signature']
//
//   try {
//     stripe.webhooks.constructEvent(payload, sig, endpointSecret)
//   } catch (err) {
//     return {
//       statusCode: 400,
//       body: `Webhook Error: ${err.message}`,
//     }
//   }
//
//   return {
//     statusCode: 200,
//   }
// }
