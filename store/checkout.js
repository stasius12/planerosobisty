import axios from 'axios'
import md5 from 'md5'

export const EMPTY_PERSONAL = {
  first_name: '',
  surname: '',
  street: '',
  street_house_number: '',
  street_house_apartment: '',
  postal_code: '',
  city: '',
  phone: '',
  email: '',
  company_name: '',
}

export const state = () => ({
  _cartItems: [], // { id, name, price, quantity, image }
  _coupon: {
    id: '',
    percent_off: '',
    code: '',
  },
  _personalInfo: {
    ...EMPTY_PERSONAL,
    company_id: '',
  },
  _shipmentInfo: {
    ...EMPTY_PERSONAL,
  },
  _shipmentInfoDiffers: false,
  _shipmentDetails: {
    method: '',
    locker: null,
    priceID: '',
  },
})

export const mutations = {
  UPDATE_CART_ITEMS(state, payload) {
    state._cartItems = payload
  },
  ADD_CART_ITEM(state, payload) {
    state._cartItems.push(payload)
  },
  REMOVE_CART_ITEM(state, { productID }) {
    const index = state._cartItems.map(({ id }) => id).indexOf(productID)
    if (index > -1) {
      state._cartItems.splice(index, 1)
    }
  },
  CHANGE_QUANTITY(state, { productID, newQuantity }) {
    const index = state._cartItems.map(({ id }) => id).indexOf(productID)
    if (index > -1) {
      const item = state._cartItems[index]
      item.quantity = newQuantity
      state._cartItems.splice(index, 1, item)
    }
  },
  UPDATE_COUPON(state, payload) {
    state._coupon = payload
  },
  UPDATE_PERSONAL_INFO(state, payload) {
    state._personalInfo = payload
  },
  UPDATE_SHIPMENT_INFO(state, payload) {
    state._shipmentInfo = payload
  },
  UPDATE_SHIPMENT_INFO_DIFFERS(state, payload) {
    state._shipmentInfoDiffers = payload
  },
  UPDATE_SHIPMENT_DETAILS(state, payload) {
    state._shipmentDetails = payload
  },
}

export const actions = {
  // CART ITEMS
  async addCartItem({ commit, getters, dispatch }, productID) {
    if (!getters.cartItems.filter(({ id }) => id === productID).length) {
      const response = await axios.get(
        `${process.env.domainName}/.netlify/functions/api/products/${productID}`
      )
      const data = response.data
      commit('ADD_CART_ITEM', {
        id: productID,
        name: data.product.name,
        price: data.price.unit_amount_decimal,
        quantity: 1,
        image: data.product.images[0],
      })
      dispatch('saveStateInCookies')
    }
  },
  removeCartItem({ commit, getters, dispatch }, productID) {
    commit('REMOVE_CART_ITEM', { productID })
    dispatch('saveStateInCookies')
  },
  changeQuantity({ commit, dispatch }, { productID, newQuantity }) {
    commit('CHANGE_QUANTITY', { productID, newQuantity })
    dispatch('saveStateInCookies')
  },

  // COUPON
  async addCoupon({ commit, dispatch }, promoCode) {
    const response = await axios.get(
      `${process.env.domainName}/.netlify/functions/api/products/promo-codes/${promoCode}`
    )
    const data = response.data
    if (data) {
      commit('UPDATE_COUPON', data)
      dispatch('saveStateInCookies')
    }
  },

  // PERSONAL INFO
  updatePersonalInfo({ commit, dispatch }, data) {
    commit('UPDATE_PERSONAL_INFO', data)
    dispatch('saveStateInCookies')
  },

  // SHIPMENT
  updateShipmentInfo({ commit, dispatch }, data) {
    commit('UPDATE_SHIPMENT_INFO', data)
    dispatch('saveStateInCookies')
  },
  updateShipmentInfoDiffers({ commit, dispatch }, data) {
    commit('UPDATE_SHIPMENT_INFO_DIFFERS', data)
    dispatch('saveStateInCookies')
  },
  updateShipmentDetails({ commit, dispatch }, data) {
    commit('UPDATE_SHIPMENT_DETAILS', data)
    dispatch('saveStateInCookies')
  },

  // GENERAL
  saveStateInCookies({ state }) {
    this.$cookies.set('checkout', state)
    this.$cookies.set('bananaTree', md5(state))
  },
  readStateFromCookies({ getters, commit }) {
    if (getters.cartItems.length) return

    const newState = this.$cookies.get('checkout')

    if (!newState) return

    if (md5(newState) === this.$cookies.get('bananaTree')) {
      commit('UPDATE_CART_ITEMS', newState._cartItems)
      commit('UPDATE_COUPON', newState._coupon)
      commit('UPDATE_PERSONAL_INFO', newState._personalInfo)
      commit('UPDATE_SHIPMENT_INFO', newState._shipmentInfo)
      commit('UPDATE_SHIPMENT_INFO_DIFFERS', newState._shipmentInfoDiffers)
      commit('UPDATE_SHIPMENT_DETAILS', newState._shipmentDetails)
    }
  },
}

export const getters = {
  cartItems: (state) => state._cartItems,
  cartItem: (state) => (itemID) => {
    return state._cartItems.filter((item) => item.id === itemID)[0]
  },
  coupon: (state) => state._coupon,
  personalInfo: (state) => state._personalInfo,
  shipmentInfo: (state) => state._shipmentInfo,
  shipmentInfoDiffers: (state) => state._shipmentInfoDiffers,
  shipmentDetails: (state) => state._shipmentDetails,
}
