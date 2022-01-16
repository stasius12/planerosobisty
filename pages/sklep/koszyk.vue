<template>
  <div>
    <h1 class="text-center mt-5">Koszyk</h1>
    <div v-if="cartItems.length">
      <table class="hidden sm:table mt-10">
        <thead class="text-sm">
          <tr>
            <th class="w-2/5">Produkt</th>
            <th class="w-1/6">Cena</th>
            <th class="w-1/6">Ilość</th>
            <th class="w-1/6">Suma</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="text-md">
          <tr v-for="item in cartItems" :key="item.id">
            <td class="flex items-center">
              <img width="40" :src="item.image" :alt="item.name" />
              <span class="ml-6">{{ item.name }}</span>
            </td>
            <td>{{ item.priceAmount / 100 }} zł</td>
            <td class="select-none">
              <input
                :id="item.id"
                type="number"
                class="border-1 border-gray-200 p-2"
                :value="item.quantity"
                min="1"
                max="10"
                @input="changeQuantityForProduct"
              />
            </td>
            <td>{{ Math.round(item.priceAmount * item.quantity) / 100 }} zł</td>
            <td>
              <button
                class="button button-icon mt-2"
                @click="removeItemFromCart(item.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="black"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="coupon.code && couponAmountOff" class="border-t-2">
            <td colspan="3" class="pt-14">Kod promocyjny (-{{ coupon.percent_off }}%)</td>
            <td colspan="2" class="pt-14">
              <svg
                v-if="promoLoading"
                class="animate-spin h-8 w-8 ml-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <div v-else>{{ couponAmountOff / 100 }} zł</div>
            </td>
          </tr>
          <tr
            class="font-weight-bold"
            :class="{ 'border-t-2': !coupon.code || !couponAmountOff }"
          >
            <td colspan="3" class="">Wartość zamówienia</td>
            <td colspan="2" class="">{{ total / 100 }} zł</td>
          </tr>
        </tbody>
      </table>
      <div class="sm:hidden mt-10">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex items-center py-5"
        >
          <img width="60" :src="item.image" :alt="item.name" />
          <div class="flex flex-col ml-6">
            <span class="text-md mb-2">{{ item.name }}</span>
            <span class="text-sm font-weight-bold"
              >{{ item.priceAmount / 100 }} zł</span
            >
          </div>
          <div class="select-none ml-auto">
            <input
              :id="item.id"
              type="number"
              class="border-1 border-gray-200 p-2"
              :value="item.quantity"
              min="1"
              max="10"
              @input="changeQuantityForProduct"
            />
          </div>
          <button
            class="button button-icon ml-6"
            @click="removeItemFromCart(item.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="black"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          v-if="coupon.code && couponAmountOff"
          class="border-t-2 mt-5 pt-5 pb-3 flex justify-between"
        >
          <div>Kod promocyjny (-{{ coupon.percent_off }}%)</div>
          <svg
            v-if="promoLoading"
            class="animate-spin h-8 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="black"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <div v-else>{{ couponAmountOff / 100 }} zł</div>
        </div>
        <div
          class="py-5 flex justify-between font-weight-bold"
          :class="{ 'border-t-2 mt-5': !coupon.code || !couponAmountOff }"
        >
          <div class="">Wartość zamówienia</div>
          <div class="">{{ total / 100 }} zł</div>
        </div>
      </div>
      <div class="mt-10 relative">
        <validation-observer
          ref="form"
          tag="form"
          class="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2"
          @submit.prevent="redeemCode"
        >
          <div class="mt-3 m-2">
            <base-input
              v-model="promoCode"
              name="kod-promocyjny"
              type="text"
              label="Wpisz kod promocyjny"
              label-top="3"
            />
          </div>
          <button class="button button-outline mt-3 m-2">Aplikuj</button>
        </validation-observer>
      </div>
    </div>
    <div v-else class="text-center mt-10">
      <div>Twój koszyk jest pusty 🙈</div>
      <nuxt-link :to="{ name: 'sklep' }" class="button button-outline mt-10"
>
        Kliknij aby wrócić do sklepu
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import {
  calculateCartAmount,
  calculateCartAmountWithDiscount,
} from '@/utils/cartCalculator'
import BaseInput from '@/components/BaseInput'

export default {
  name: 'Koszyk',
  components: { BaseInput, ValidationObserver },
  layout: 'checkout',
  data() {
    return {
      promoCode: '',
      promoLoading: false,
    }
  },
  computed: {
    ...mapGetters('checkout', ['cartItems', 'cartItem', 'coupon']),
    couponApplied() {
      return this.coupon && this.coupon.id && this.coupon.percent_off
    },
    rawTotal() {
      return calculateCartAmount(this.cartItems)
    },
    total() {
      return calculateCartAmountWithDiscount(
        this.rawTotal,
        this.coupon.percent_off
      )
    },
    couponAmountOff() {
      if (this.couponApplied) {
        return -Math.round(this.rawTotal - this.total)
      }
      return 0
    },
  },
  mounted() {
    if (this.couponApplied) this.promoCode = this.coupon.code
  },
  async beforeRouteLeave(to, from, next) {
    if (
      to.name !== 'sklep-dane-zamowienia' ||
      (this.cartItems.length && this.total)
    ) {
      this.$toasted.clear()
      await next()
    }
  },
  methods: {
    ...mapActions('checkout', ['removeCartItem', 'changeQuantity']),
    async changeQuantityForProduct(event) {
      const productID = event.target.id
      const newQuantity = event.target.value

      this.$toasted.clear()

      try {
        this.promoLoading = true
        if (!newQuantity || parseInt(newQuantity) === 0) {
          await this.$toasted.show('Chcesz usunąć ten produkt z koszyka?', {
            theme: 'toasted-primary',
            position: 'top-center',
            duration: 10000,
            keepOnHover: true,
            action: [
              {
                text: 'Tak',
                onClick: async (e, toastObject) => {
                  await this.removeItemFromCart(event.target.id)
                  toastObject.goAway(0)
                },
              },
              {
                text: 'Nie',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                },
              },
            ],
          })
          if (newQuantity) {
            const product = this.cartItem(productID)
            await this.changeQuantity({
              productID,
              newQuantity: product ? product.quantity : 1,
            })
          }
        } else {
          await this.changeQuantity({
            productID,
            newQuantity,
          })
        }
      } finally {
        this.promoLoading = false
      }
    },
    async redeemCode() {
      this.$refs.form.reset()

      if (!this.promoCode)
        return this.$refs.form.setErrors({
          'kod-promocyjny': ['To pole jest wymagane'],
        })

      try {
        this.promoLoading = true
        const promoCode = await this.$axios.$post(
          `products/promo-codes/${this.promoCode}`,
          { cartAmount: this.rawTotal }
        )
        await this.$store.dispatch('checkout/addCoupon', promoCode)
      } catch (error) {
        const msg = _.get(
          error,
          'response.data.validationMessage',
          'Niepoprawny kod promocyjny'
        )
        this.$refs.form.setErrors({ 'kod-promocyjny': [msg] })
      } finally {
        this.promoLoading = false
      }
    },
    async removeItemFromCart(productID) {
      try {
        this.promoLoading = true
        await this.removeCartItem(productID)
      } finally {
        this.promoLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  th {
    text-transform: uppercase;
    border-bottom: 1px solid grey;
  }
  th,
  td {
    text-align: left;
    border-color: rgba(173, 176, 182, 0.3);
    padding: 15px;

    &:first-of-type {
      padding-left: 40px;
    }
  }
}
</style>
