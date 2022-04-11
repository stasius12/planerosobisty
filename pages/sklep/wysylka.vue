<template>
  <div>
    <div class="lg:mx-auto">
      <h1 class="text-center mt-5">Paczkomat czy kurier?</h1>
      <div class="shipment-select w-full self-center grid md:flex">
        <label
          v-for="method in shippingMethods"
          :key="method.id"
          class="m-2 md:w-1/2"
        >
          <input
            :id="method.price.id"
            v-model="shipmentDetails.method"
            type="radio"
            :name="method.metadata.type"
            :value="method.metadata.type"
            class="absolute hidden"
            @change="shippingMethodChanged"
          />
          <div
            class="p-4 border-2 border-gray-100 bg-gray-100 flex flex-col items-center cursor-pointer"
          >
            <img
              src="~/assets/images/inpost/logo_dark.png"
              alt="InPost logo"
              width="100"
            />
            <span class="text-lg">{{ method.metadata.name }}</span>
            <span class="font-sm">{{ method.price.unit_amount / 100 }} zł</span>
          </div>
        </label>
      </div>
      <div
        v-if="isCourierMethodChosen"
        class="grid grid-cols-2 gap-y-2 m-2 p-2 border-gray-100 border-2"
      >
        <div class="font-weight-bold">Dane do wysyłki</div>
        <div class="pl-2">
          <div v-if="shipmentInfo.company_name">
            {{ shipmentInfo.company_name }}
          </div>
          <div>{{ shipmentInfo.first_name }} {{ shipmentInfo.surname }}</div>
          <div>
            {{ shipmentInfo.street }} {{ shipmentInfo.street_house_number
            }}{{
              shipmentInfo.street_house_apartment
                ? `/${shipmentInfo.street_house_apartment}`
                : ''
            }}
          </div>
          <div>{{ shipmentInfo.postal_code }} {{ shipmentInfo.city }}</div>
        </div>
        <div class="font-weight-bold border-t-1 pt-2">Czas dostawy</div>
        <div class="border-t-1 pt-2 pl-2">1-3 dni robocze</div>
      </div>
      <div
        v-else-if="isLockerMethodChosen && locker"
        class="grid grid-cols-2 gap-y-4 m-2 p-2 border-gray-100 border-2"
      >
        <div class="font-weight-bold">Wybrany paczkomat</div>
        <div class="pl-2">
          <div>{{ locker.name }}</div>
          <div v-if="locker.address && locker.address.line1">
            {{ locker.address.line1 }}
          </div>
          <div v-if="locker.address && locker.address.line2">
            {{ locker.address.line2 }}
          </div>
        </div>
        <div class="font-weight-bold border-t-1 pt-2">Czas dostawy</div>
        <div class="border-t-1 pt-2 pl-2">1-3 dni robocze</div>
      </div>
    </div>
    <button
      v-if="isLockerMethodChosen && locker"
      class="button button-outline m-2"
      @click="showLockerMap"
    >
      Zmień paczkomat
    </button>
    <div class="p-2">
      <div id="easypack-map" class="p-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wysylka',
  async beforeRouteLeave(to, from, next) {
    if (to.name !== 'sklep-platnosc' || this.areShipmentDetailsValid())
      await next()
  },
  layout: 'checkout',
  async asyncData({ $axios }) {
    let shippingMethods = []

    shippingMethods = await $axios.$get(`shipping`)

    return { shippingMethods }
  },
  data() {
    return {
      shipmentInfo: { ...this.$store.getters['checkout/shipmentInfo'] },
      shipmentDetails: { ...this.$store.getters['checkout/shipmentDetails'] },
      map: null,
    }
  },
  computed: {
    isLockerMethodChosen() {
      return this.shipmentDetails.method === 'locker'
    },
    isCourierMethodChosen() {
      return this.shipmentDetails.method === 'courier'
    },
    locker: {
      get() {
        return this.shipmentDetails.locker
      },
      set(value) {
        this.shipmentDetails.locker = value
      },
    },
  },
  watch: {
    shipmentDetails: {
      deep: true,
      handler(event) {
        if (this.areShipmentDetailsValid()) {
          if (this.isCourierMethodChosen) this.locker = null
          this.$store.dispatch('checkout/updateShipmentDetails', {
            ...this.shipmentDetails,
          })
        }
      },
    },
  },
  mounted() {
    window.easyPackAsyncInit = function () {
      easyPack.init({
        defaultLocale: 'pl',
        points: {
          types: ['parcel_locker'],
        },
        mapType: 'osm',
        searchType: 'osm',
      })
    }
    window.setPoint = (point) => {
      this.locker = point
      this.hideLockerMap()
    }
    this.map = document.getElementById('easypack-map')
  },
  methods: {
    showLockerMap() {
      this.map.hidden = false

      if (!this.map.hasChildNodes()) {
        easyPack.mapWidget('easypack-map', function (point) {
          window.setPoint(point)
        })
      }
    },
    hideLockerMap() {
      this.map.hidden = true
    },
    shippingMethodChanged(event) {
      const method = this.shippingMethods.find(
        (method) => method.price.id === event.target.id
      )
      if (method) {
        this.shipmentDetails.priceID = method.price.id
        this.shipmentDetails.priceAmount = method.price.unit_amount
      }

      if (this.isCourierMethodChosen) this.hideLockerMap()
      else this.showLockerMap()
    },
    areShipmentDetailsValid() {
      if (this.isLockerMethodChosen) return !!this.locker
      return this.isCourierMethodChosen
    },
  },
}
</script>

<style lang="scss" scoped>
.shipment-select {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  label {
    input:checked + div {
      border-color: #6b7280;
    }
    input:hover:not(:checked) + div {
      background-color: #f9fafb;
    }
  }
}
</style>
