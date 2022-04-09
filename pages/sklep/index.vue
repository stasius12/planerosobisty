<template>
  <main class="container mt-10">
    <section class="relative shop-top-section grid lg:grid-cols-2 gap-x-20">
      <div class="p-2">
        <vue-picture-swipe
          ref="pictureSwipe"
          :items="
            productImages.slice(index).concat(productImages.slice(0, index))
          "
          :options="{
            mouseUsed: true,
          }"
          single-thumbnail
        ></vue-picture-swipe>
        <div class="hidden lg:flex items-center mt-4">
          <button
            :disabled="previewSliderStart <= 0"
            @click="
              previewSliderStop -= 1
              previewSliderStart -= 1
            "
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"
              />
            </svg>
          </button>
          <div class="grid grid-cols-4 gap-x-4">
            <img
              v-for="image in productImages.slice(
                previewSliderStart,
                previewSliderStop
              )"
              :key="image.id"
              :src="image.src"
              class="cursor-pointer"
              @click="index = image.id"
            />
          </div>
          <button
            :disabled="previewSliderStop > productImages.length - 1"
            @click="
              previewSliderStop += 1
              previewSliderStart += 1
            "
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="relative lg:hidden">
        <button
          class="absolute button-left z-10"
          @click="mobileSliderInstance.slide(mobileSliderPage - 1)"
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"
            />
          </svg>
        </button>
        <button
          class="absolute button-right z-10"
          @click="mobileSliderInstance.slide(mobileSliderPage + 1)"
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"
            />
          </svg>
        </button>
      </div>
      <div id="mobileSlider" class="swipe lg:hidden mb-10">
        <div class="swipe-wrap">
          <div v-for="id in 6" :key="id" class="flex pl-4 pr-8 gap-x-4">
            <img
              :src="productImages[2 * (id - 1)].src"
              :alt="productImages[2 * (id - 1)].alt"
              class="w-1/2 max-w-full"
              @click="index = 2 * (id - 1)"
            />
            <img
              v-if="id < 6"
              :src="productImages[2 * (id - 1) + 1].src"
              :alt="productImages[2 * (id - 1) + 1].alt"
              class="w-1/2 max-w-full"
              @click="index = 2 * (id - 1) + 1"
            />
          </div>
        </div>
      </div>
      <div class="p-2">
        <h1>{{ theProduct.name }}</h1>
        <h2 class="text-gray-600 text-3xl -ml-0.5">
          {{ theProduct.price.unit_amount / 100 }} zł
        </h2>
        <p class="text-justify mb-4" style="font-size: 0.95rem">
          Planer Osobisty to nie tylko przestrzeń do planowania swoich zadań,
          ale również przewodnik w drodze do poznania siebie i świadomego
          rozwoju własnego potencjału. Planer Osobisty zapewni Ci elastyczność
          bullet journala, a jednocześnie strukturę klasycznego kalendarza.
          Jeśli kiedykolwiek czułeś się winny z powodu pustych stron w swoim
          planerze niedatowany planer jest dla Ciebie idealny.
        </p>
        <span style="font-size: 0.95rem">Znajdziesz w nim miejsce na:</span>
        <ul class="list-disc" style="font-size: 0.95rem">
          <li>plan roku</li>
          <li>mapy marzeń</li>
          <li>koło życia</li>
          <li>rozpisanie celów (kwartalnych/rocznych)</li>
          <li>śledzenie nawyków</li>
          <li>zaplanowanie miesiąca</li>
          <li>tygodniowy widok na Twoje zadania</li>
        </ul>
        <button class="button w-full bg-gray-600" @click="addProductToCart(theProduct.id)">
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
    </section>
    <section class="bg-gray-100 m-2 mt-20">
      <section-title
        header="2"
        class="shop-what-inside bg-white pb-10"
        margin-bottom-class="mb-0"
      >
        Co znajdziesz w środku?
      </section-title>
      <h2 class="shop-what-inside-mobile text-gray-300 mb-0 pb-10 bg-white">
        Co znajdziesz w środku?
      </h2>
      <div
        class="md:hidden"
        style="
          left: 0px;
          width: 100%;
          height: 0px;
          position: relative;
          padding-bottom: 75%;
        "
      >
        <div
          data-url="https://issuu.com/planerosobisty/docs/planer_osobisty"
          style="
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            position: absolute;
          "
          class="issuuembed"
        ></div>
        <script
          type="text/javascript"
          src="//e.issuu.com/embed.js"
          async="true"
        ></script>
      </div>
      <nav
        class="hidden md:flex flex-col flex-wrap sm:flex-row justify-center p-4"
      >
        <button
          v-for="section in swiperSections"
          :key="section.id"
          class="text-gray-600 py-4 px-4 block hover:text-gray-600 focus:outline-none"
          :class="{
            'text-gray-600 border-b-2 font-medium border-gray-600':
              swiperPage === section.id,
          }"
          @click="swiperInstance.slide(section.id)"
        >
          {{ section.name }}
        </button>
      </nav>
      <div id="slider" class="swipe hidden md:block">
        <div class="swipe-wrap">
          <div v-for="{ id, imgSrc, imgAlt } in swiperSections" :key="id">
            <img :src="imgSrc" :alt="imgAlt" class="max-w-full" />
          </div>
        </div>
      </div>
    </section>
    <section class="sklep__faq m-2 mt-10">
      <section-title id="faq" header="2">FAQ</section-title>
      <ul class="p-0">
        <li>
          <faq-element>
            <template #summary>Jakie są dokładne wymiary planera?</template>
            <template #details>24.5 x 17.5 x 2.5 cm</template>
          </faq-element>
        </li>
        <li>
          <faq-element>
            <template #summary>Z jakiego materiału jest okładka?</template>
            <template #details>
              Jest to skóropodobny materiał Foresta, czyli elegancka,
              połyskująca okleina introligatorska z połamianiami/rysami które
              nadają jej skórzany charakter.
            </template>
          </faq-element>
        </li>
        <li>
          <faq-element>
            <template #summary>Gdzie produkowane są planery?</template>
            <template #details>
              Planery są projektowane i produkowane w Polsce.
            </template>
          </faq-element>
        </li>
        <li>
          <faq-element>
            <template #summary>Jakie są możliwości dostawy?</template>
            <template #details>
              Dostarczamy zamówienia za pośrednictwem kuriera lub paczkomatów
              InPost.
            </template>
          </faq-element>
        </li>
        <li>
          <faq-element>
            <template #summary>
              Jak szybko moje zamówienie zostanie zrealizowane?
            </template>
            <template #details>
              Staramy się, aby były realizowane w ciągu 24h od złożenia
              zamówienia. Dostawa przesyłki zajmuje od 1 do 3 dni roboczych.
            </template>
          </faq-element>
        </li>
        <li>
          <faq-element>
            <template #summary>Czy mogę zwrócić planer?</template>
            <template #details>
              Tak, możesz zwrócić w ciągu 14 dni bez podawania przyczyny. Więcej
              szczegółów na temat zwrotów znajdziesz
              <nuxt-link :to="{ name: 'zwroty' }">tutaj</nuxt-link>.
            </template>
          </faq-element>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import Swipe from 'swipejs'
//
import { mapActions } from 'vuex'
import SectionTitle from '../../components/SectionTitle'

const PRODUCT_IMAGES = [
  {
    id: 0,
    src: require('@/assets/images/planer/1-min.jpg'),
    thumbnail: require('@/assets/images/planer/1-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Planer Osobisty - okładka',
  },
  {
    id: 1,
    src: require('@/assets/images/planer/3-min.jpg'),
    thumbnail: require('@/assets/images/planer/3-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Mapa marzeń',
  },
  {
    id: 2,
    src: require('@/assets/images/planer/4-min.jpg'),
    thumbnail: require('@/assets/images/planer/4-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Plan miesiąca',
  },
  {
    id: 3,
    src: require('@/assets/images/planer/5-min.jpg'),
    thumbnail: require('@/assets/images/planer/5-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Plan miesiąca - widok z boku',
  },
  {
    id: 4,
    src: require('@/assets/images/planer/6-min.jpg'),
    thumbnail: require('@/assets/images/planer/6-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Cele kwartalne',
  },
  {
    id: 5,
    src: require('@/assets/images/planer/7-min.jpg'),
    thumbnail: require('@/assets/images/planer/7-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Rozkład tygodnia - widok z boku',
  },
  {
    id: 6,
    src: require('@/assets/images/planer/8-min.jpg'),
    thumbnail: require('@/assets/images/planer/8-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Rozkład tygodnia',
  },
  {
    id: 7,
    src: require('@/assets/images/planer/9-min.jpg'),
    thumbnail: require('@/assets/images/planer/9-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Koło życia',
  },
  {
    id: 8,
    src: require('@/assets/images/planer/10-min.jpg'),
    thumbnail: require('@/assets/images/planer/10-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Plan roku',
  },
  {
    id: 9,
    src: require('@/assets/images/planer/11-min.jpg'),
    thumbnail: require('@/assets/images/planer/11-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Strażnik nawyków',
  },
  {
    id: 10,
    src: require('@/assets/images/planer/2-min.jpg'),
    thumbnail: require('@/assets/images/planer/2-min.jpg'),
    w: 3000,
    h: 3000,
    alt: 'Planer Osobisty - okładka przybliżona',
  },
]

const WHAT_IS_INSIDE_SECTIONS = [
  {
    id: 0,
    name: 'Cele kwartalne',
    imgSrc: require('@/assets/images/planer-inside/1.png'),
    imgAlt: 'Cele kwartalne',
  },
  {
    id: 1,
    name: 'Koło życia',
    imgSrc: require('@/assets/images/planer-inside/2.png'),
    imgAlt: 'Koło życia',
  },
  {
    id: 2,
    name: 'Plan roku',
    imgSrc: require('@/assets/images/planer-inside/3.png'),
    imgAlt: 'Plan roku',
  },
  {
    id: 3,
    name: 'Plan miesiąca',
    imgSrc: require('@/assets/images/planer-inside/4.png'),
    imgAlt: 'Plan miesiąca',
  },
  {
    id: 4,
    name: 'Mapa marzeń',
    imgSrc: require('@/assets/images/planer-inside/5.png'),
    imgAlt: 'Mapa marzeń',
  },
  {
    id: 5,
    name: 'Plan tygodnia',
    imgSrc: require('@/assets/images/planer-inside/6.png'),
    imgAlt: 'Plan tygodnia',
  },
  {
    id: 6,
    name: 'Strażnik nawyków',
    imgSrc: require('@/assets/images/planer-inside/7.png'),
    imgAlt: 'Strażnik nawyków',
  },
]

export default {
  name: 'Index',
  components: { SectionTitle },
  async asyncData({ $axios }) {
    let products = []

    products = await $axios.$get('products')

    return { products }
  },
  data() {
    return {
      index: null,
      swiperInstance: null,
      swiperPage: 0,

      previewSliderStart: 0,
      previewSliderStop: 4,

      mobileSliderInstance: null,
      mobileSliderPage: 0,
    }
  },
  computed: {
    theProduct() {
      return this.products.filter((product) => product.metadata.visible)[0]
    },
    productImages() {
      return PRODUCT_IMAGES
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

    this.mobileSliderInstance = new Swipe(
      document.getElementById('mobileSlider'),
      {
        callback: (index) => (this.mobileSliderPage = index),
      }
    )
  },
  methods: {
    ...mapActions('checkout', ['addCartItem']),
    async addProductToCart(productID) {
      await this.addCartItem({ productID, url: this.$config.url })
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
.sklep__faq {
  li {
    margin-bottom: 1rem;
  }
}
.shop-top-section {
  .button-left {
    left: 0;
    margin-left: -15px;
  }
  .button-right {
    right: 0;
    margin-right: -15px;
  }

  .button-left,
  .button-right {
    top: calc(0.15 * 100vw);
    @screen sm {
      top: 120px;
    }
    @screen md {
      top: 150px;
    }
  }
}

.shop-what-inside {
  @media (max-width: 419px) {
    display: none;
  }
}
.shop-what-inside-mobile {
  @media (min-width: 420px) {
    display: none;
  }
}
</style>
