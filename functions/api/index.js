const express = require('express')
const serverless = require('serverless-http')

const { catchExpressEndpointErrors } = require('../../utils/sentry')
const mailchimp = require('./mailchimp')
const stripe = require('./stripe')
const admin = require('./admin')

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/.netlify/functions/api', router)

// Mailchimp
router.post('/subscribe', catchExpressEndpointErrors(mailchimp.subscribe))

// Stripe products
router.get('/products', catchExpressEndpointErrors(stripe.listAllProducts))
router.get(
  '/products/:productID',
  catchExpressEndpointErrors(stripe.retrieveProduct)
)
router.post(
  '/products/promo-codes/:code',
  catchExpressEndpointErrors(stripe.retrieveAndValidatePromotionCode)
)

// Shipping methods
router.get(
  '/shipping',
  catchExpressEndpointErrors(stripe.listAllShippingMethods)
)

// Stripe checkout
router.post(
  '/payment-intent',
  catchExpressEndpointErrors(stripe.createPaymentIntent)
)
router.post('/customer', catchExpressEndpointErrors(stripe.createCustomer))

// Admin
router.post(
  '/send-email-to-admins',
  catchExpressEndpointErrors(admin.sendEmailToAdmins)
)

module.exports = app
module.exports.handler = serverless(app)
