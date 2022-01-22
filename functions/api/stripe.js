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

const createCustomer = async (req, res) => {
  try {
    const { personal, shipping } = req.body

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

    res.status(200).json(customer)
  } catch {
    res.status(500)
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

const retrieveProduct2 = async (req, res) => {
  const { productID } = req.params

  const product = await stripe.products.retrieve(productID)
  const prices = await stripe.prices.list({
    product: productID,
    active: true,
  })

  res.status(200).json({ product, price: prices.data[0] })
}

const createPaymentIntent = async (req, res) => {
  try {
    const {
      customerID,
      cartItemsPrices,
      metadata,
      shippingPrice,
      promoCode,
    } = req.body

    const cartItemsWithAmounts = await Promise.all(
      cartItemsPrices.map(async ({ priceID, quantity }) => {
        const price = await stripe.prices.retrieve(priceID)
        return { priceAmount: price.unit_amount, quantity }
      })
    )

    let amountCartItems = calculateCartAmount(cartItemsWithAmounts)

    if (promoCode) {
      const promotionCodeResponse = await stripe.promotionCodes.list({
        active: true,
        code: promoCode,
      })

      const promotionCode = validatePromoCodeResponse(promotionCodeResponse)
      if (!promotionCode) res.status(400).json('Invalid promotion code')

      if (!validatePromoCodeRestrictions(promotionCode, amountCartItems))
        res.status(400).json('Promotion code not applicable')

      amountCartItems = calculateCartAmountWithDiscount(
        amountCartItems,
        promotionCode.coupon.percent_off
      )
    }

    const shipping = await stripe.prices.retrieve(shippingPrice)
    const amountShipping = shipping.unit_amount

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateCartAmountWithShipping(amountCartItems, amountShipping),
      currency: 'pln',
      payment_method_types: ['p24'],
      customer: customerID,
      metadata: {
        ...metadata,
        promoCode,
      },
    })

    res.status(200).json(paymentIntent.client_secret)

  } catch {
    res.status(500)
  }
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
module.exports.retrieveProduct2 = retrieveProduct2

// SHIPPING
module.exports.listAllShippingMethods = listAllShippingMethods

// PROMO CODES
module.exports.retrieveAndValidatePromotionCode = retrieveAndValidatePromotionCode

// CHECKOUT
module.exports.createCustomer = createCustomer
module.exports.createPaymentIntent = createPaymentIntent
