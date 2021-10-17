const validatePromoCodeResponse = (promoCodeResponse) => {
  if (
    promoCodeResponse &&
    promoCodeResponse.data.length &&
    promoCodeResponse.data[0].coupon &&
    promoCodeResponse.data[0].coupon.percent_off
  )
    return promoCodeResponse.data[0]

  return false
}

const validatePromoCodeRestrictions = (promoCode, cartAmount) => {
  if (promoCode.restrictions && promoCode.restrictions.minimum_amount) {
    return promoCode.restrictions.minimum_amount <= cartAmount
  }
  return true
}

module.exports.validatePromoCodeResponse = validatePromoCodeResponse
module.exports.validatePromoCodeRestrictions = validatePromoCodeRestrictions
