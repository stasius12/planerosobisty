const calculateCartAmount = (cartItems) => {
  return cartItems.reduce((sum, { priceAmount, quantity }) => {
    return sum + quantity * priceAmount
  }, 0)
}

const calculateCartAmountWithDiscount = (cartAmount, percentOff) => {
  return Math.round(cartAmount * ((100 - percentOff) / 100))
}

const calculateCartAmountWithShipping = (cartAmount, shippingAmount) => {
  return Math.round(cartAmount + shippingAmount)
}

const calculateCartAmountTotal = (cartItems, percentOff, shippingAmount) => {
  let cartAmount = calculateCartAmount(cartItems)
  if (percentOff)
    cartAmount = calculateCartAmountWithDiscount(cartAmount, percentOff)
  return calculateCartAmountWithShipping(cartAmount, shippingAmount)
}

module.exports.calculateCartAmountTotal = calculateCartAmountTotal
module.exports.calculateCartAmount = calculateCartAmount
module.exports.calculateCartAmountWithDiscount = calculateCartAmountWithDiscount
module.exports.calculateCartAmountWithShipping = calculateCartAmountWithShipping
