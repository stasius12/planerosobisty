import axios from 'axios'
import md5 from 'md5'
import { calculateCartAmount } from '../utils/cartCalculator'

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

const EMPTY_COUPON = {
  id: '',
  percent_off: '',
  code: '',
}

export const state = () => ({
  _cartItems: [], // { id, name, priceAmount, priceID, quantity, image }
  _coupon: {
    ...EMPTY_COUPON,
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
    priceAmount: 0,
  },
  _maxStepAllowed: 0,
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
  SET_MAX_STEP_ALLOWED(state, stepNumber) {
    state._maxStepAllowed = stepNumber
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
        priceAmount: data.price.unit_amount_decimal,
        priceID: data.price.id,
        quantity: 1,
        image: data.product.images[0],
      })
      dispatch('saveStateInCookies')
      await dispatch('validateCoupon')
    }
  },
  async removeCartItem({ commit, getters, dispatch }, productID) {
    commit('REMOVE_CART_ITEM', { productID })
    dispatch('saveStateInCookies')
    await dispatch('validateCoupon')
  },
  async changeQuantity({ commit, dispatch }, { productID, newQuantity }) {
    commit('CHANGE_QUANTITY', { productID, newQuantity })
    dispatch('saveStateInCookies')
    await dispatch('validateCoupon')
  },

  // COUPON
  addCoupon({ commit, dispatch }, data) {
    commit('UPDATE_COUPON', data)
    dispatch('saveStateInCookies')
  },
  async validateCoupon({ state, dispatch }) {
    if (!state._coupon.code) return

    try {
      await this.$axios.$post(`products/promo-codes/${state._coupon.code}`, {
        cartAmount: calculateCartAmount([...state._cartItems]),
      })
    } catch {
      dispatch('addCoupon', EMPTY_COUPON)
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
  updateMaxStepAllowed({ commit, dispatch }, data) {
    commit('SET_MAX_STEP_ALLOWED', data)
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
      commit('SET_MAX_STEP_ALLOWED', newState._maxStepAllowed)
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
  maxStepAllowed: (state) => state._maxStepAllowed,
}
