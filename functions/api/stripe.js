const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {
  validatePromoCodeResponse,
  validatePromoCodeRestrictions,
} = require('../../utils/validatePromoCode')
const {
  calculateCartAmount,
  calculateCartAmountWithShipping,
  calculateCartAmountWithDiscount,
} = require('../../utils/cartCalculator')
const generateOrderNumber = require('../../utils/orderNumberGenerator')

const createCustomer = async (req, res) => {
  const { personal, shipping, metadata } = req.body

  const orderNumber = generateOrderNumber()

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
    metadata: { ...metadata, ORDER_NUMBER: orderNumber },
  })

  res.status(200).json({ customer, orderNumber })
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
  const mappedProducts = await _getProductsWithPrices()
  res.status(200).json(mappedProducts)
}

const listAllShippingMethods = async (req, res) => {
  const mappedProducts = await _getProductsWithPrices(true)
  res.status(200).json(mappedProducts)
}

const retrieveProduct = async (req, res) => {
  const { productID } = req.params

  const product = await stripe.products.retrieve(productID)
  const prices = await stripe.prices.list({
    product: productID,
    active: true,
  })

  res.status(200).json({ product, price: prices.data[0] })
}

const createPaymentIntent = async (req, res) => {
  const {
    customerID,
    cartItemsPrices,
    metadata,
    shippingPrice,
    promoCode,
    orderNumber,
  } = req.body

  const cartItemsWithAmounts = await Promise.all(
    cartItemsPrices.map(async ({ priceID, quantity }) => {
      const price = await stripe.prices.retrieve(priceID)
      return { priceAmount: price.unit_amount, quantity }
    })
  )

  const amountCartItems = calculateCartAmount(cartItemsWithAmounts)
  let amountTotal = amountCartItems

  if (promoCode) {
    const promotionCodeResponse = await stripe.promotionCodes.list({
      active: true,
      code: promoCode,
    })

    const promotionCode = validatePromoCodeResponse(promotionCodeResponse)
    if (!promotionCode) res.status(400).json('Invalid promotion code')

    if (!validatePromoCodeRestrictions(promotionCode, amountCartItems))
      res.status(400).json('Promotion code not applicable')

    amountTotal = calculateCartAmountWithDiscount(
      amountCartItems,
      promotionCode.coupon.percent_off
    )
  }

  const shipping = await stripe.prices.retrieve(shippingPrice)
  const amountShipping = shipping.unit_amount
  const amountTotalWithShipping = calculateCartAmountWithShipping(
    amountTotal,
    amountShipping
  )

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountTotalWithShipping,
    currency: 'pln',
    payment_method_types: ['p24s'],
    customer: customerID,
    receipt_email: 'receipts@planerosobisty.pl',
    statement_descriptor: 'Planer Osobisty',
    description: 'Planer Osobisty',
    metadata: {
      ...metadata,
      ORDER_NUMBER: orderNumber,
      ORDER_TOTAL: amountTotal / 100,
      ORDER_SHIPPING_PRICE: amountShipping / 100,
      ORDER_TOTAL_WITH_SHIPPING: amountTotalWithShipping / 100,
      promoCode,
    },
  })

  res.status(200).json(paymentIntent.client_secret)
}

const retrieveAndValidatePromotionCode = async (req, res) => {
  const { code } = req.params
  const { cartAmount } = req.body

  try {
    const promotionCodeResponse = await stripe.promotionCodes.list({
      active: true,
      code,
    })

    const promotionCode = validatePromoCodeResponse(promotionCodeResponse)

    if (!promotionCode)
      return res
        .status(400)
        .json({ validationMessage: 'Niepoprawny kod promocyjny' })

    if (!validatePromoCodeRestrictions(promotionCode, cartAmount))
      return res
        .status(400)
        .json({ validationMessage: 'Podany kod nie spełnia wymagań' })

    res.status(200).json({
      id: promotionCode.coupon.id,
      percent_off: promotionCode.coupon.percent_off,
      code: promotionCode.code,
    })
  } catch (e) {
    res.status(400).json({ validationMessage: 'Niepoprawny kod promocyjny' })
  }
}

// PRODUCTS
module.exports.listAllProducts = listAllProducts
module.exports.retrieveProduct = retrieveProduct

// SHIPPING
module.exports.listAllShippingMethods = listAllShippingMethods

// PROMO CODES
module.exports.retrieveAndValidatePromotionCode =
  retrieveAndValidatePromotionCode

// CHECKOUT
module.exports.createCustomer = createCustomer
module.exports.createPaymentIntent = createPaymentIntent
