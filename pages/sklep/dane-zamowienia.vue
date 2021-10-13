<template>
  <div>
    <h1 class="text-center mt-10">Dane zamówienia</h1>
    <validation-observer ref="personalForm" tag="form" class="px-4 pt-12 pb-6">
      <div class="grid sm:grid-cols-2 gap-12 mb-20">
        <base-input
          name="given-name"
          type="text"
          label="Imię"
          rules="required|min:2"
          v-model="personalForm.first_name"
        />
        <base-input
          name="family-name"
          type="text"
          label="Nazwisko"
          rules="required|min:2"
          v-model="personalForm.surname"
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
        <base-input
          name="street-address"
          type="text"
          label="Ulica"
          outerClass="col-span-2 md:col-span-4"
          rules="required|min:2"
          v-model="personalForm.street"
        />
        <base-input
          name="#TODO:"
          type="text"
          label="Nr domu"
          rules="required"
          v-model="personalForm.street_house_number"
        />
        <base-input
          name="#TODO:2"
          type="text"
          label="Nr lokalu"
          v-model="personalForm.street_house_apartment"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-12 mb-20">
        <base-input
          name="postal-code"
          type="text"
          label="Kod pocztowy"
          aria-autocomplete="postal-code"
          rules="required|postcode"
          v-model="personalForm.postal_code"
        />
        <base-input
          name="#TODO:3"
          type="text"
          label="Miasto"
          rules="required"
          v-model="personalForm.city"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-12 mb-20">
        <base-input
          name="tel"
          type="text"
          label="Telefon"
          rules="required|digits:9"
          v-model="personalForm.phone"
        />
        <base-input
          name="email"
          type="email"
          label="Email"
          rules="required|email"
          v-model="personalForm.email"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-12">
        <base-input
          name="organization"
          type="text"
          label="Nazwa firmy"
          v-model="personalForm.company_name"
        />
        <base-input
          name="nip"
          type="text"
          label="NIP"
          v-model="personalForm.company_id"
        />
      </div>
    </validation-observer>
    <label class="cursor-pointer">
      <input type="checkbox" v-model="shipmentInfoDiffers" :value="true" />
      <span class="ml-2">Wysłać na inny adres?</span>
    </label>
    <validation-observer
      v-if="shipmentInfoDiffers"
      ref="shipmentForm"
      tag="form"
      class="px-4 pt-12 pb-4 mt-4 bg-gray-50"
    >
      <div class="grid sm:grid-cols-2 gap-12 mb-20">
        <base-input
          name="given-name"
          type="text"
          label="Imię"
          rules="required|min:2"
          v-model="shipmentForm.first_name"
        />
        <base-input
          name="family-name"
          type="text"
          label="Nazwisko"
          rules="required|min:2"
          v-model="shipmentForm.surname"
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
        <base-input
          name="street-address"
          type="text"
          label="Ulica"
          outerClass="col-span-2 md:col-span-4"
          rules="required|min:2"
          v-model="shipmentForm.street"
        />
        <base-input
          name="#TODO:"
          type="text"
          label="Nr domu"
          rules="required"
          v-model="shipmentForm.street_house_number"
        />
        <base-input
          name="#TODO:2"
          type="text"
          label="Nr lokalu"
          v-model="shipmentForm.street_house_apartment"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-12 mb-20">
        <base-input
          name="postal-code"
          type="text"
          label="Kod pocztowy"
          aria-autocomplete="postal-code"
          rules="required|postcode"
          v-model="shipmentForm.postal_code"
        />
        <base-input
          name="#TODO:3"
          type="text"
          label="Miasto"
          rules="required"
          v-model="shipmentForm.city"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-12 mb-20">
        <base-input
          name="tel"
          type="text"
          label="Telefon"
          rules="required|digits:9"
          v-model="shipmentForm.phone"
        />
        <base-input
          name="email"
          type="email"
          label="Email"
          rules="required|email"
          v-model="shipmentForm.email"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-12">
        <base-input
          name="organization"
          type="text"
          label="Nazwa firmy"
          v-model="shipmentForm.company_name"
        />
      </div>
    </validation-observer>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
//
import BaseInput from '@/components/BaseInput'
import { EMPTY_PERSONAL } from '@/store/checkout'
//
export default {
  name: 'dane-zamowienia',
  layout: 'checkout',
  components: { BaseInput },
  async beforeRouteLeave(to, from, next) {
    let isValid = await this.$refs.personalForm.validate()
    if (this.$refs.shipmentForm) {
      isValid = isValid && (await this.$refs.shipmentForm.validate())
    }

    if (to.name !== 'sklep-wysylka' || isValid) next()
  },
  data() {
    return {
      personalForm: { ...this.$store.getters['checkout/personalInfo'] },
      shipmentForm: { ...this.$store.getters['checkout/shipmentInfo'] },
      shipmentInfoDiffers: this.$store.getters['checkout/shipmentInfoDiffers'],
    }
  },
  watch: {
    personalForm: {
      deep: true,
      handler() {
        this.$store.dispatch('checkout/updatePersonalInfo', {
          ...this.personalForm,
        })
        this.validateAndUpdateShipmentInfo()
      },
    },
    shipmentForm: {
      deep: true,
      handler() {
        this.$store.dispatch('checkout/updateShipmentInfo', {
          ...this.shipmentForm,
        })
      },
    },
    shipmentInfoDiffers(value) {
      this.validateAndUpdateShipmentInfo()
      this.$store.dispatch('checkout/updateShipmentInfoDiffers', value)
    },
  },
  methods: {
    validateAndUpdateShipmentInfo() {
      if (this.shipmentInfoDiffers) {
        this.shipmentForm = { ...EMPTY_PERSONAL }
      } else {
        this.shipmentForm = _.pickBy(this.personalForm, (value, key) => {
          return _.has(EMPTY_PERSONAL, key)
        })
      }
    },
    async postalCodeEntered(value) {
      if (value.length === 6) {
        try {
          const response = await axios.get(
            `http://kodpocztowy.intami.pl/api/${value}`
          )
          const city = _.get(response, 'data.0.miejscowosc')
          if (city) this.city = city
        } catch (e) {}
      }
    },
  },
}
</script>

<style scoped></style>
