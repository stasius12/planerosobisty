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
          {{ personalInfo.company_name }}
        </div>
        <div>{{ personalInfo.first_name }} {{ personalInfo.surname }}</div>
        <div>ul. {{ personalAddressLine }}</div>
        <div>{{ personalInfo.postal_code }} {{ personalInfo.city }}</div>
      </div>
      <div class="border-b-s font-weight-bold">Dostawa</div>
      <div class="border-b-s text-right">
        <div v-if="shipmentInfo.company_name">
          {{ shipmentInfo.company_name }}
        </div>
        <div>{{ shipmentInfo.first_name }} {{ shipmentInfo.surname }}</div>
        <div>
          ul. {{ shipmentInfo.street }} {{ shipmentInfo.street_house_number
          }}{{
            shipmentInfo.street_house_apartment
              ? `/${shipmentInfo.street_house_apartment}`
              : ''
          }}
        </div>
        <div>{{ shipmentInfo.postal_code }} {{ shipmentInfo.city }}</div>
      </div>
    </div>
    <div class="border-1 border-gray-300 m-2 p-2">
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
          img-src="/p24/Płacę z iPko.svg"
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
    <div class="summary__pay-button text-center mt-5">
      <button class="button button-outline" @click="createPaymentIntent">
        Przejdź do płatności
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { calculateCartAmountTotal } from '@/utils/cartCalculator'
import P24Bank from '../../components/P24Bank'

export default {
  name: 'Platnosc',
  components: { P24Bank },
  layout: 'checkout',
  data() {
    return {
      p24Bank: null,
      stripeInstance: Stripe(process.env.stripePublishableKey),
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
    personalAddressLine() {
      let address = `${this.personalInfo.street} ${this.personalInfo.street_house_number}`
      if (this.personalInfo.street_house_apartment)
        address += `/${this.personalInfo.street_house_apartment}`
      return address
    },
    shipmentAddressLine() {
      let address = `${this.shipmentInfo.street} ${this.shipmentInfo.street_house_number}`
      if (this.shipmentInfo.street_house_apartment)
        address += `/${this.shipmentInfo.street_house_apartment}`
      return address
    },
  },
  methods: {
    async createPaymentIntent() {
      try {
        const customer = await this.$axios.$post('customer', {
          personal: {
            city: this.personalInfo.city,
            line1: this.personalAddressLine,
            postal_code: this.personalInfo.postal_code,
            email: this.personalInfo.email,
            phone: this.personalInfo.phone,
            name: `${this.personalInfo.first_name} ${this.personalInfo.surname}`,
          },
          shipping: {
            city: this.shipmentInfo.city,
            line1: this.shipmentAddressLine,
            postal_code: this.shipmentInfo.postal_code,
            email: this.shipmentInfo.email,
            phone: this.shipmentInfo.phone,
            name: `${this.shipmentInfo.first_name} ${this.shipmentInfo.surname}`,
          },
        })

        const piSecret = await this.$axios.$post('payment-intent', {
          customerID: customer.id,
          cartItemsPrices: this.cartItems.map(({ priceID, quantity }) => {
            return { priceID, quantity }
          }),
          shippingPrice: this.shipmentDetails.priceID,
          promoCode: this.coupon.code ? this.coupon.code : null,
        })

        await this.finalizePaymentIntent(piSecret)
      } catch (error) {
        console.error(error)
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
        return_url: process.env.domainName,
      })
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
