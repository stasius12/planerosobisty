const express = require('express')
const serverless = require('serverless-http')

const mailchimp = require('./mailchimp')
const stripe = require('./stripe')

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/.netlify/functions/api', router)

// Mailchimp
router.post('/subscribe', mailchimp.subscribe)

// Stripe products
router.get('/products', stripe.listAllProducts)
router.get('/products/:productID', stripe.retrieveProduct)
router.get('/products/2/:productID', stripe.retrieveProduct2)
router.post(
  '/products/promo-codes/:code',
  stripe.retrieveAndValidatePromotionCode
)

// Shipping methods
router.get('/shipping', stripe.listAllShippingMethods)

// Stripe checkout
router.post('/payment-intent', stripe.createPaymentIntent)
router.post('/customer', stripe.createCustomer)

module.exports = app
module.exports.handler = serverless(app)
