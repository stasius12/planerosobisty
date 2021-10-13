<template>
  <div>
    <h1 class="text-center mt-10">Koszyk</h1>
    <div v-if="cartItems.length">
      <table class="hidden sm:table mt-10">
        <thead class="text-2xl">
          <tr>
            <th class="w-2/5">Produkt</th>
            <th class="w-1/6">Cena</th>
            <th class="w-1/6">Ilość</th>
            <th class="w-1/6">Suma</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="text-3xl">
          <tr v-for="item in cartItems" :key="item.id">
            <td class="flex items-center">
              <img width="40" :src="item.image" :alt="item.name" />
              <span class="ml-6">{{ item.name }}</span>
            </td>
            <td>{{ item.price / 100 }} zł</td>
            <td class="select-none">
              <input
                type="number"
                class="border-1 border-gray-200 p-2"
                :id="item.id"
                :value="item.quantity"
                @input="changeQuantityForProduct"
                min="1"
                max="10"
              />
            </td>
            <td>{{ Math.round(item.price * item.quantity) / 100 }} zł</td>
            <td>
              <button
                @click="removeCartItem(item.id)"
                class="button button-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
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
          <tr class="border-t-2">
            <td colspan="3" class="pt-14">Kod promocyjny</td>
            <td colspan="2" class="pt-14">{{ couponAmountOff / 100 }} zł</td>
          </tr>
          <tr class="font-weight-bold">
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
            <span class="text-3xl mb-2">{{ item.name }}</span>
            <span class="text-2xl font-weight-bold"
              >{{ item.price / 100 }} zł</span
            >
          </div>
          <div class="select-none ml-auto">
            <input
              type="number"
              class="border-1 border-gray-200 p-2"
              :id="item.id"
              :value="item.quantity"
              @input="changeQuantityForProduct"
              min="1"
              max="10"
            />
          </div>
          <button
            @click="removeCartItem(item.id)"
            class="button button-icon ml-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
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
        <div class="border-t-2 mt-5 py-3 flex justify-between">
          <div>Kod promocyjny</div>
          <div>{{ couponAmountOff / 100 }} zł</div>
        </div>
        <div class="py-3 flex justify-between font-weight-bold">
          <div class="">Wartość zamówienia</div>
          <div class="">{{ total / 100 }} zł</div>
        </div>
      </div>
      <div class="mt-20 sm:p-4 relative">
        <form class="flex flex-col sm:flex-row" @submit.prevent="redeemCode">
          <div class="sm:w-1/2 m-4">
            <base-input
              name="kod-promocyjny"
              type="text"
              outerClass="uppercase"
              label="Wpisz kod promocyjny"
              labelTop="5"
              v-model="promoCode"
            />
          </div>
          <button class="button button-outline sm:w-1/2 m-4">Aplikuj</button>
        </form>
      </div>
    </div>
    <div v-else class="text-center mt-10">
      <div>Twój koszyk jest pusty 🙈</div>
      <nuxt-link :to="{ name: 'sklep' }" class="button button-outline mt-10"
        >Kliknij aby wrócić do sklepu</nuxt-link
      >
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'checkout',
  data() {
    return {
      promoCode: '',
    }
  },
  computed: {
    ...mapGetters('checkout', ['cartItems', 'cartItem', 'coupon']),
    couponApplied() {
      return this.coupon && this.coupon.id && this.coupon.percent_off
    },
    rawTotal() {
      return this.cartItems.reduce(
        (sum, { price, quantity }) => sum + quantity * price,
        0
      )
    },
    total() {
      return Math.round(this.rawTotal * ((100 - this.coupon.percent_off) / 100))
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
      next()
    }
  },
  methods: {
    ...mapActions('checkout', ['removeCartItem', 'changeQuantity']),
    async changeQuantityForProduct(event) {
      const productID = event.target.id
      const newQuantity = event.target.value

      this.$toasted.clear()

      if (!newQuantity || parseInt(newQuantity) === 0) {
        await this.$toasted.show('Chcesz usunąć ten produkt z koszyka?', {
          theme: 'toasted-primary',
          position: 'top-center',
          duration: 10000,
          keepOnHover: true,
          action: [
            {
              text: 'Tak',
              onClick: (e, toastObject) => {
                this.removeCartItem(event.target.id)
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
          const product = this.cartItem(productID);
          this.changeQuantity({ productID, newQuantity: product ? product.quantity : 1 })
        }
      } else {
        this.changeQuantity({
          productID,
          newQuantity,
        })
      }
    },
    async redeemCode() {
      try {
        await this.$store.dispatch('checkout/addCoupon', this.promoCode)
      } catch (error) {
        console.log(error)
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

form {
  input[type='text'] {
    height: 100%;
    background: transparent;
    border-bottom: 1px solid black;

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: black;
    }
  }
}
</style>
