const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const listAllProducts = async (req, res) => {
  try {
    let rawProducts = await stripe.products.list({ active: true })

    rawProducts = await rawProducts.data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      })
      const price = prices.data && prices.data.length ? prices.data[0] : null

      return { ...product, price }
    })

    res.status(200).json(await Promise.all(rawProducts))
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

module.exports.retrieveProduct = retrieveProduct
module.exports.listAllProducts = listAllProducts
module.exports.createCheckoutSession = createCheckoutSession
module.exports.checkoutSessionInfo = checkoutSessionInfo
module.exports.createPaymentIntent = createPaymentIntent
