<template>
  <div>
    <div class="lg:w-2/3 lg:mx-auto">
      <h1 class="text-center mt-10">Paczkomat czy kurier?</h1>
      <div class="shipment-select w-full self-center grid lg:flex">
        <label class="m-4 lg:w-1/2">
          <input
            type="radio"
            name="inpost_locker_standard"
            v-model="shipmentDetails.method"
            value="inpost_locker_standard"
            class="absolute hidden"
            @change="showLockerMap"
          >
          <div class="p-4 border-2 border-gray-100 bg-gray-100 flex flex-col items-center cursor-pointer">
            <img src="~/assets/images/inpost/logo_dark.png" alt="InPost logo" width="100" />
            <span class="text-3xl">InPost Paczkomaty 24/7</span>
            <span class="font-2xl">13,99 zł</span>
          </div>
        </label>
        <label class="m-4 lg:w-1/2">
          <input
            type="radio"
            name="inpost_locker_standard"
            v-model="shipmentDetails.method"
            value="inpost_courier"
            class="absolute hidden"
            @change="hideLockerMap"
          >
          <div class="p-4 border-2 border-gray-100 bg-gray-100 flex flex-col items-center cursor-pointer">
            <img src="~/assets/images/inpost/logo_dark.png" alt="InPost logo" width="100" />
            <span class="text-3xl">InPost Kurier</span>
            <span class="font-2xl">14,99 zł</span>
          </div>
        </label>
      </div>
      <div v-if="isCourierMethodChosen" class="grid grid-cols-2 gap-y-4 m-4 p-4 border-gray-100 border-2">
        <div class="font-weight-bold">Dane do wysyłki</div>
        <div class="pl-4">
          <div v-if="shipmentInfo.company_name">{{ shipmentInfo.company_name }}</div>
          <div>{{ shipmentInfo.first_name }} {{ shipmentInfo.surname }}</div>
          <div>
            ul. {{ shipmentInfo.street }}
            {{ shipmentInfo.street_house_number }}{{ shipmentInfo.street_house_apartment ? `/${shipmentInfo.street_house_apartment}` : '' }}
          </div>
          <div>{{ shipmentInfo.postal_code }} {{ shipmentInfo.city }}</div>
        </div>
        <div class="font-weight-bold border-t-1 pt-4">Czas dostawy</div>
        <div class="border-t-1 pt-4 pl-4">1-3 dni robocze</div>
      </div>
      <div v-else-if="isLockerMethodChosen && locker" class="grid grid-cols-2 gap-y-4 m-4 p-4 border-gray-100 border-2">
        <div class="font-weight-bold">Wybrany paczkomat</div>
        <div class="pl-4">
          <div>{{ locker.name }}</div>
          <div v-if="locker.address && locker.address.line1">ul. {{ locker.address.line1 }}</div>
          <div v-if="locker.address && locker.address.line2">{{ locker.address.line2 }}</div>
        </div>
        <div class="font-weight-bold border-t-1 pt-4">Czas dostawy</div>
        <div class="border-t-1 pt-4 pl-4">1-3 dni robocze</div>
      </div>
    </div>
    <button v-if="isLockerMethodChosen && locker" class="button button-outline m-4" @click="showLockerMap">Zmień paczkomat</button>
    <div class="px-4 py-4">
      <div class="p-4" id="easypack-map"></div>
    </div>
  </div>
</template>

<script>
import BaseRadio from '../../components/BaseRadio'

export default {
  name: 'wysylka',
  components: { BaseRadio },
  layout: 'checkout',
  mounted() {
    window.easyPackAsyncInit = function () {
      easyPack.init({
        defaultLocale: 'pl',
        points: {
          types: ['parcel_locker'],
        },
        mapType: 'osm',
        searchType: 'osm',
      });
    };
    window.setPoint = (point) => {
      this.locker = point;
      this.hideLockerMap();
    }
    this.map = document.getElementById('easypack-map');
  },
  async beforeRouteLeave(to, from, next) {
    if (to.name !== 'sklep-platnosc' || this.areShipmentDetailsValid()) next();
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
      return this.shipmentDetails.method === 'inpost_locker_standard';
    },
    isCourierMethodChosen() {
      return this.shipmentDetails.method === 'inpost_courier';
    },
    locker: {
      get() {
        return this.shipmentDetails.locker;
      },
      set(value) {
        this.shipmentDetails.locker = value;
      }
    }
  },
  watch: {
    shipmentDetails: {
      deep: true,
      handler() {
        if (this.areShipmentDetailsValid()) {
          if (this.isCourierMethodChosen) this.locker = null;
          this.$store.dispatch('checkout/updateShipmentDetails', {
            ...this.shipmentDetails,
          });
        }
      }
    }
  },
  methods: {
    showLockerMap() {
      this.map.hidden = false;

      if (!this.map.hasChildNodes()) {
        easyPack.mapWidget('easypack-map', function (point) {
          window.setPoint(point);
        });
      }
    },
    hideLockerMap() {
      this.map.hidden = true;
    },
    areShipmentDetailsValid() {
      if (this.isLockerMethodChosen) return !!this.locker;
      return this.isCourierMethodChosen;
    }
  },
}
</script>

<style lang="scss" scoped>
.shipment-select {
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  label {
    input:checked + div {
      border-color: #6B7280;
    }
    input:hover:not(:checked) + div {
      background-color: #F9FAFB;
    }
  }
}
</style>
