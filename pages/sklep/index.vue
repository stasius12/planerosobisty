<template>
  <div class="xl:w-2/3 mt-10 mx-auto">
    <div class="grid md:grid-cols-2 gap-x-20">
      <div class="p-2">
        <img
          :src="frontProductImage.src"
          class="cursor-pointer"
          @click="index = frontProductImage.id"
        />
        <div class="grid grid-cols-4 gap-x-4 mt-4">
          <img
            v-for="image in productImages"
            :key="image.id"
            :src="image.src"
            class="cursor-pointer"
            @click="frontProductImage = { src: image.src, id: image.id }"
          />
        </div>
      </div>
      <div class="p-2">
        <h1>Planer Osobisty</h1>
        <h2 class="text-gray-600">123,99 zł</h2>
        <p class="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <button class="button w-full bg-gray-600" @click="addProductToCart()">
          Kup teraz
        </button>
        <button class="button w-full bg-gray-600" @click="addProductToCart2()">
          Kup teraz
        </button>
        <div class="grid sm:grid-cols-2 gap-x-2 font-primary text-md mt-2">
          <div
            class="flex items-center justify-center border-1 border-gray-300 my-2 px-3 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span class="pl-2 mt-1">14 dni na zwrot</span>
          </div>
          <div
            class="flex items-center justify-center border-1 border-gray-300 my-2 px-3 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
            <span class="pl-4 mt-1">Darmowa wysyłka od 200zł</span>
          </div>
        </div>
      </div>
      <v-gallery
        :images="galleryImages"
        :index="index"
        @close="index = null"
      ></v-gallery>
    </div>
    <div class="bg-gray-100 m-4 mt-20">
      <h2 class="text-center px-4 pt-8">Co znajdziesz w środku?</h2>
      <nav class="flex flex-col sm:flex-row justify-center p-4">
        <button
          v-for="section in swiperSections"
          :key="section.id"
          class="text-gray-600 py-4 px-6 block hover:text-gray-600 focus:outline-none"
          :class="{
            'text-gray-600 border-b-2 font-medium border-gray-600':
              swiperPage === section.id,
          }"
          @click="swiperInstance.slide(section.id)"
        >
          {{ section.name }}
        </button>
      </nav>
      <div id="slider" class="swipe">
        <div class="swipe-wrap">
          <div v-for="{ id, imgSrc, imgAlt } in swiperSections" :key="id">
            <img :src="imgSrc" :alt="imgAlt" class="max-w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from 'swipejs'
//
import { mapActions } from 'vuex'

const PRODUCT_IMAGES = [
  {
    id: 0,
    src: require('@/assets/images/planer/image-1.jpeg'),
    alt: '#TODO',
  },
  {
    id: 1,
    src: require('@/assets/images/planer/image-2.jpeg'),
    alt: '#TODO',
  },
  {
    id: 2,
    src: require('@/assets/images/planer/image-3.jpeg'),
    alt: '#TODO',
  },
  {
    id: 3,
    src: require('@/assets/images/planer/image-4.jpeg'),
    alt: '#TODO',
  },
]

const WHAT_IS_INSIDE_SECTIONS = [
  {
    id: 0,
    name: 'Widok tygodniowy',
    imgSrc: require('@/assets/images/planer/image-3.jpeg'),
    imgAlt: 'widok tygodniowy',
  },
  {
    id: 1,
    name: 'Widok miesięczny',
    imgSrc: require('@/assets/images/planer/image-4.jpeg'),
    imgAlt: 'widok tygodniowy',
  },
  {
    id: 2,
    name: 'Widok roczny',
    imgSrc: require('@/assets/images/planer/image-3.jpeg'),
    imgAlt: 'widok tygodniowy',
  },
  {
    id: 3,
    name: 'Widok twojego życia',
    imgSrc: require('@/assets/images/planer/image-4.jpeg'),
    imgAlt: 'widok tygodniowy',
  },
]

export default {
  name: 'Index',
  async asyncData({ $axios }) {
    let products = []

    products = await $axios.$get('products')

    return { products }
  },
  data() {
    return {
      index: null,
      frontProductImage: { ...PRODUCT_IMAGES[0] },
      swiperInstance: null,
      swiperPage: 0,
    }
  },
  computed: {
    productImages() {
      return PRODUCT_IMAGES
    },
    galleryImages() {
      return this.productImages.map(({ src }) => src)
    },
    swiperSections() {
      return WHAT_IS_INSIDE_SECTIONS
    },
  },
  mounted() {
    if (this.$nuxt.context.query.error) {
      this.$toast.error('Oops...Coś poszło nie tak', { duration: 3000 })
      this.$router.replace({ name: 'sklep' })
    }
    this.swiperInstance = new Swipe(document.getElementById('slider'), {
      callback: (index) => (this.swiperPage = index),
    })
  },
  methods: {
    ...mapActions('checkout', ['addCartItem', 'addCartItem2']),
    async addProductToCart(productID) {
      await this.addCartItem('prod_K3sGdqwOzlBcy')
      await this.$router.push({ name: 'sklep-koszyk' })
    },
    async addProductToCart2(productID) {
      await this.addCartItem2('prod_K3sGdqwOzlBcy')
      await this.$router.push({ name: 'sklep-koszyk' })
    },
  },
}
</script>

<style lang="scss">
.blueimp-gallery {
  background: #8d8d8daa;
}
.swipe {
  overflow: hidden;
  visibility: hidden;
  position: relative;
}
.swipe-wrap {
  overflow: hidden;
  position: relative;
}
.swipe-wrap > div {
  float: left;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
