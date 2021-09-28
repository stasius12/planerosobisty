const express = require('express');
const serverless = require('serverless-http');

const mailchimp = require('./mailchimp');
const stripe = require('./stripe');

const app = express()
const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/.netlify/functions/api', router);


// Mailchimp
router.post('/subscribe', mailchimp.subscribe);

// Stripe products
router.get('/products', stripe.listAllProducts);
router.get('/products/:productID', stripe.retrieveProduct);

// Stripe checkout
router.post('/create-checkout-session', stripe.createCheckoutSession);
router.get('/checkout-sessions/:sessionID', stripe.checkoutSessionInfo);
router.post('/create-payment-intent', stripe.createPaymentIntent);


module.exports = app;
module.exports.handler = serverless(app);
