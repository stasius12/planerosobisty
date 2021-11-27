<template>
  <div>
    <h1 class="text-center mt-5">Dane zamówienia</h1>
    <validation-observer ref="personalForm" tag="form" class="px-2 pt-6 pb-3">
      <div class="grid sm:grid-cols-2 gap-10 mb-10">
        <base-input
          v-model="personalForm.first_name"
          name="given-name"
          type="text"
          label="Imię"
          rules="required|min:2"
        />
        <base-input
          v-model="personalForm.surname"
          name="family-name"
          type="text"
          label="Nazwisko"
          rules="required|min:2"
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-10 mb-10">
        <base-input
          v-model="personalForm.street"
          name="street-address"
          type="text"
          label="Ulica"
          outer-class="col-span-2 md:col-span-4"
          rules="required|min:2"
        />
        <base-input
          v-model="personalForm.street_house_number"
          name="#TODO:"
          type="text"
          label="Nr domu"
          rules="required"
        />
        <base-input
          v-model="personalForm.street_house_apartment"
          name="#TODO:2"
          type="text"
          label="Nr lokalu"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-10 mb-10">
        <base-input
          v-model="personalForm.postal_code"
          name="postal-code"
          type="text"
          label="Kod pocztowy"
          aria-autocomplete="postal-code"
          rules="required|postcode"
        />
        <base-input
          v-model="personalForm.city"
          name="#TODO:3"
          type="text"
          label="Miasto"
          rules="required"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-10 mb-10">
        <base-input
          v-model="personalForm.phone"
          name="tel"
          type="text"
          label="Telefon"
          rules="required|digits:9"
        />
        <base-input
          v-model="personalForm.email"
          name="email"
          type="email"
          label="Email"
          rules="required|email"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-10">
        <base-input
          v-model="personalForm.company_name"
          name="organization"
          type="text"
          label="Nazwa firmy"
        />
        <base-input
          v-model="personalForm.company_id"
          name="nip"
          type="text"
          label="NIP"
        />
      </div>
    </validation-observer>
    <label class="cursor-pointer">
      <input v-model="shipmentInfoDiffers" type="checkbox" :value="true" />
      <span class="ml-2">Wysłać na inny adres?</span>
    </label>
    <validation-observer
      v-if="shipmentInfoDiffers"
      ref="shipmentForm"
      tag="form"
      class="px-2 pt-6 pb-4 mt-4 bg-gray-50"
    >
      <div class="grid sm:grid-cols-2 gap-10 mb-10">
        <base-input
          v-model="shipmentForm.first_name"
          name="given-name"
          type="text"
          label="Imię"
          rules="required|min:2"
        />
        <base-input
          v-model="shipmentForm.surname"
          name="family-name"
          type="text"
          label="Nazwisko"
          rules="required|min:2"
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-10 mb-10">
        <base-input
          v-model="shipmentForm.street"
          name="street-address"
          type="text"
          label="Ulica"
          outer-class="col-span-2 md:col-span-4"
          rules="required|min:2"
        />
        <base-input
          v-model="shipmentForm.street_house_number"
          name="#TODO:"
          type="text"
          label="Nr domu"
          rules="required"
        />
        <base-input
          v-model="shipmentForm.street_house_apartment"
          name="#TODO:2"
          type="text"
          label="Nr lokalu"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-10 mb-10">
        <base-input
          v-model="shipmentForm.postal_code"
          name="postal-code"
          type="text"
          label="Kod pocztowy"
          aria-autocomplete="postal-code"
          rules="required|postcode"
        />
        <base-input
          v-model="shipmentForm.city"
          name="#TODO:3"
          type="text"
          label="Miasto"
          rules="required"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-10 mb-10">
        <base-input
          v-model="shipmentForm.phone"
          name="tel"
          type="text"
          label="Telefon"
          rules="required|digits:9"
        />
        <base-input
          v-model="shipmentForm.email"
          name="email"
          type="email"
          label="Email"
          rules="required|email"
        />
      </div>
      <div class="grid sm:grid-cols-2 gap-10">
        <base-input
          v-model="shipmentForm.company_name"
          name="organization"
          type="text"
          label="Nazwa firmy"
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
  name: 'DaneZamowienia',
  components: { BaseInput },
  async beforeRouteLeave(to, from, next) {
    let isValid = await this.$refs.personalForm.validate()
    if (this.$refs.shipmentForm) {
      isValid = isValid && (await this.$refs.shipmentForm.validate())
    }

    if (to.name !== 'sklep-wysylka' || isValid) next()
  },
  layout: 'checkout',
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
