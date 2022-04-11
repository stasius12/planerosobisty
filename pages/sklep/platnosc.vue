<template>
  <div>
    <h1 class="text-center mt-5">Podsumowanie</h1>
    <div class="summary__general grid grid-cols-2 m-2 p-2">
      <div class="border-b-1">
        <div class="font-weight-bold">Wartość zamówienia</div>
        <div class="text-sm mt-1">w tym koszty dostawy</div>
      </div>
      <div class="border-b-1 text-right">
        <div class="font-weight-bold text-xl">{{ total / 100 }} zł</div>
        <div class="text-sm mt-1">
          {{ shipmentDetails.priceAmount / 100 }} zł
        </div>
      </div>
      <div class="border-b-1 font-weight-bold">Dane zamówienia</div>
      <div class="border-b-1 text-right">
        <div v-if="personalInfo.company_name">
          {{ personalInfo.company_name }}<br />
          NIP: {{ personalInfo.company_id }}
        </div>
        <div>{{ personalAddressLine1 }}</div>
        <div>{{ personalAddressLine2 }}</div>
      </div>
      <div class="border-b-s font-weight-bold">Dostawa</div>
      <div class="border-b-s text-right">
        <div v-if="shipment.company_name">
          {{ shipment.company_name }}
        </div>
        <div>{{ shipment.name }}</div>
        <div v-if="shipment.locker_name">
          Paczkomat - {{ shipment.locker_name }}
        </div>
        <div>{{ shipmentAddressLine1 }}</div>
        <div>{{ shipmentAddressLine2 }}</div>
      </div>
    </div>
    <div
      class="border-1 border-gray-300 m-2 p-2"
      :class="{ 'border-2 border-red-300': piTriggered && !p24Bank }"
    >
      <h3 class="text-center mb-4">Wybierz metodę płatności</h3>
      <div class="summary__payments grid gap-2 items-center">
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Blik.svg"
          img-alt="Blik"
          value="blik"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Alior.svg"
          img-alt="Alior"
          value="alior_bank"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Millenium.svg"
          img-alt="Bank Millenium"
          value="bank_millennium"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Bank Nowy BFG S.A..svg"
          img-alt="Bank Nowy BFG S.A."
          value="bank_nowy_bfg_sa"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Bank Pekao.svg"
          img-alt="Bank Pekao"
          value="bank_pekao_sa"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Banki Spoldzielcze.svg"
          img-alt="Banki Spoldzielcze"
          value="banki_spbdzielcze"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/BNP Paribas.svg"
          img-alt="BNP Paribas"
          value="bnp_paribas"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Bos Bank.svg"
          img-alt="Bos Bank"
          value="boz"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Place z CitiHandlowy.svg"
          img-alt="Płacę z CitiHandlowy"
          value="citi_handlowy"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Credit Agricole.svg"
          img-alt="Credit Agricole"
          value="credit_agricole"
        ></p24-bank>
        <!--      <p24-bank img-src="/p24/Bos Bank.svg" img-alt="Bos Bank" v-model="p24Bank" value="envelobank"></p24-bank>-->
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Bank Pocztowy.svg"
          img-alt="Bank Pocztowy"
          value="etransfer_pocztowy24"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/GetIn Bank.svg"
          img-alt="GetIn Bank"
          value="getin_bank"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Idea Bank.svg"
          img-alt="Idea Bank"
          value="ideabank"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/ING.svg"
          img-alt="ING"
          value="ing"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Inteligo.svg"
          img-alt="Inteligo"
          value="inteligo"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/mBank.svg"
          img-alt="mBank"
          value="mbank_mtransfer"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Nest Bank.svg"
          img-alt="Nest Bank"
          :img-width="50"
          value="nest_przelew"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Noble Bank.svg"
          img-alt="Noble Bank"
          :img-width="80"
          value="noble_pay"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Płace_z_iPko.svg"
          img-alt="Płacę z iPko"
          :img-width="70"
          value="pbac_z_ipko"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Plus Bank.svg"
          img-alt="Plus Bank"
          value="plus_bank"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/santander.svg"
          img-alt="Santander"
          value="santander_przelew24"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/TMobile.svg"
          img-alt="TMobile"
          value="tmobile_usbugi_bankowe"
        ></p24-bank>
        <p24-bank
          v-model="p24Bank"
          img-src="/p24/Toyota Bank.png"
          img-alt="Toyota Bank"
          value="toyota_bank"
        ></p24-bank>
        <!--      <p24-bank img-src="/p24/Bos Bank.svg" img-alt="Bos Bank" v-model="p24Bank" value="volkswagen_bank"></p24-bank>-->
      </div>
    </div>
    <div class="mx-2 mt-10">
      <input
        v-model="termsAccepted"
        type="checkbox"
        class="text-red-500"
        required
      />
      <span class="ml-2 text-underline">
        Oświadczam, że zapoznałem się z
        <a href="https://www.przelewy24.pl/regulamin" target="_blank">
          regulaminem
        </a>
        i
        <a
          href="https://www.przelewy24.pl/obowiazek-informacyjny-rodo-platnicy"
          target="_blank"
        >
          obowiązkiem informacyjnym
        </a>
        serwisu Przelewy24, a także z
        <nuxt-link :to="{ name: 'regulamin' }" target="_blank">regulaminem</nuxt-link>
        niniejszej strony.*
      </span>
      <div v-if="piTriggered && !termsAccepted" class="text-red-500 text-sm">
        *Pole obowiązkowe
      </div>
    </div>
    <div class="summary__pay-button text-center mt-5 mx-2 md:w-1/2 md:mx-auto">
      <button class="button button-outline w-full" @click="createPaymentIntent">
        Przejdź do płatności
      </button>
    </div>
    <portal v-if="loading" to="spinner-screen">
      <div
        class="fixed top-0 bottom-0 flex w-screen h-full bg-gray-600 opacity-20 z-10 overflow-y-hidden"
      >
        <img src="~assets/images/spinner.svg" class="mx-auto" width="200" />
      </div>
    </portal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import P24Bank from '../../components/P24Bank'
import { calculateCartAmountTotal } from '@/utils/cartCalculator'

export default {
  name: 'Platnosc',
  components: { P24Bank },
  layout: 'checkout',
  data() {
    return {
      p24Bank: null,
      termsAccepted: false,
      piTriggered: false,
      loading: false,
      stripeInstance: Stripe(this.$config.stripePublishableKey),
    }
  },
  computed: {
    ...mapGetters('checkout', [
      'cartItems',
      'personalInfo',
      'shipmentInfo',
      'shipmentDetails',
      'coupon',
    ]),
    total() {
      const percentOff =
        this.coupon && this.coupon.code && this.coupon.percent_off
          ? this.coupon.percent_off
          : null
      return calculateCartAmountTotal(
        this.cartItems,
        percentOff,
        this.shipmentDetails.priceAmount
      )
    },
    personalAddressLine1() {
      let address = `${this.personalInfo.street} ${this.personalInfo.street_house_number}`
      if (this.personalInfo.street_house_apartment)
        address += `/${this.personalInfo.street_house_apartment}`
      return address
    },
    personalAddressLine2() {
      return `${this.personalInfo.postal_code} ${this.personalInfo.city}`
    },
    shipmentAddressLine1() {
      let address = `${this.shipmentInfo.street} ${this.shipmentInfo.street_house_number}`
      if (this.shipmentInfo.street_house_apartment)
        address += `/${this.shipmentInfo.street_house_apartment}`
      return address
    },
    shipmentAddressLine2() {
      return `${this.shipmentInfo.postal_code} ${this.shipmentInfo.city}`
    },
    shipment() {
      const base = {
        company_name: this.shipmentInfo.company_name,
        name: `${this.shipmentInfo.first_name} ${this.shipmentInfo.surname}`,
        method: this.shipmentDetails.method,
      }

      if (this.shipmentDetails.method === 'locker') {
        return {
          ...base,
          locker_name: this.shipmentDetails.locker.name,
          address_line_1: this.shipmentDetails.locker.address.line1,
          address_line_2: this.shipmentDetails.locker.address.line2,
        }
      } else {
        return {
          ...base,
          address_line_1: this.shipmentAddressLine1,
          address_line_2: this.shipmentAddressLine2,
        }
      }
    },
  },
  methods: {
    showErrorMessage() {
      this.$toasted.show('Wygląda na to, że wystąpił błąd. Spróbuj ponownie.', {
        position: 'top-center',
        duration: 4000,
      })
    },
    async createPaymentIntent() {
      this.piTriggered = true
      if (!this.p24Bank || !this.termsAccepted || this.loading) return
      this.loading = true

      try {
        const { customer, orderNumber } = await this.$axios.$post('customer', {
          personal: {
            city: this.personalInfo.city,
            line1: this.personalAddressLine1,
            postal_code: this.personalInfo.postal_code,
            email: this.personalInfo.email,
            phone: this.personalInfo.phone,
            name: `${this.personalInfo.first_name} ${this.personalInfo.surname}`,
          },
          shipping: {
            city: this.shipmentInfo.city,
            line1: this.shipmentAddressLine1,
            postal_code: this.shipmentInfo.postal_code,
            email: this.shipmentInfo.email,
            phone: this.shipmentInfo.phone,
            name: `${this.shipmentInfo.first_name} ${this.shipmentInfo.surname}`,
          },
          metadata: this.getCustomerMetadata(),
        })

        const piSecret = await this.$axios.$post('payment-intent', {
          customerID: customer.id,
          cartItemsPrices: this.cartItems.map(({ priceID, quantity }) => {
            return { priceID, quantity }
          }),
          metadata: this.getOrderMetadata(),
          shippingPrice: this.shipmentDetails.priceID,
          promoCode: this.coupon.code ? this.coupon.code : null,
          orderNumber,
        })

        await this.finalizePaymentIntent(piSecret)
      } catch (error) {
        this.showErrorMessage()
      } finally {
        this.loading = false
      }
    },
    async finalizePaymentIntent(piSecret) {
      await this.stripeInstance.confirmP24Payment(piSecret, {
        payment_method: {
          p24: {
            bank: this.p24Bank,
          },
          billing_details: {
            email: this.personalInfo.email,
          },
        },
        payment_method_options: {
          p24: {
            // In order to be able to pass the `tos_shown_and_accepted` parameter, you must
            // ensure that the P24 regulations and information obligation consent
            // text is clearly visible to the customer. See
            // stripe.com/docs/payments/p24/accept-a-payment#requirements
            // for directions.
            tos_shown_and_accepted: true,
          },
        },
        return_url: this.$config.url,
      })
    },
    getCustomerMetadata() {
      return {
        COMPANY_NAME: this.personalInfo.company_name,
        COMPANY_ID: this.personalInfo.company_id,
        SHIPPING_LOCKER_NAME: this.shipment.locker_name,
        SHIPPING_METHOD: this.shipmentDetails.method,
        SHIPPING_ADDRESS_LINE_1: this.shipment.address_line_1,
        SHIPPING_ADDRESS_LINE_2: this.shipment.address_line_2,
      }
    },
    getOrderMetadata() {
      return {
        CUSTOMER_COMPANY: this.personalInfo.company_name,
        CUSTOMER_NAME: `${this.personalInfo.first_name} ${this.personalInfo.surname}`,
        CUSTOMER_ADDRESS_LINE_1: this.personalAddressLine1,
        CUSTOMER_ADDRESS_LINE_2: this.personalAddressLine2,
        SHIPPING_COMPANY: this.shipment.company_name,
        SHIPPING_NAME: this.shipment.name,
        ...this.getCustomerMetadata(),
        ...this.cartItems.reduce(
          (obj, { id, name, priceID, priceAmount, quantity }, index) => ({
            ...obj,
            [`cart-${index + 1}`]: `${name} (${id}): ${
              priceAmount / 100
            } zł (${priceID}): QNT ${quantity}`,
          }),
          {}
        ),
        ...this.cartItems.reduce(
          (obj, { name, priceAmount, quantity }, index) => ({
            ...obj,
            [`CART_${index + 1}_NAME`]: name,
            [`CART_${index + 1}_PRICE`]: priceAmount / 100,
            [`CART_${index + 1}_QUANTITY`]: quantity,
          }),
          {}
        ),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.summary__general {
  & > div {
    padding: 1rem 0;
    //&:not(:first-of-type) {
    //  border-top: 1px solid;
    //}
  }
}

//.summary__pay-button button {
//  background-color: #fff72e;
//  border: none;
//  color: black;
//
//  &:hover {
//  }
//}
.summary__payments {
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 60px;
}
</style>
