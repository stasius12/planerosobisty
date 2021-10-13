<template>
  <div class="flex flex-col p-5 xl:w-2/3 2xl:w-1/2 mx-auto select-none">
    <div class="p-4">
      <div class="flex items-center">
        <div
          class="flex items-center relative"
          :class="{
            'text-white': currentStepNumber === 0,
            'text-gray-500': currentStepNumber !== 0,
          }"
        >
          <div
            class="rounded-full transition duration-500 ease-in-out h-20 w-20 py-3 border-2"
            :class="{
              'bg-gray-500': currentStepNumber === 0,
              'border-gray-500': currentStepNumber >= 0,
              'border-gray-300': currentStepNumber < 0,
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bookmark"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div
            class="absolute top-0 -ml-10 text-center mt-24 w-40 text-xl font-medium uppercase text-gray-500"
          >
            Koszyk
          </div>
        </div>
        <div
          class="flex-auto border-t-2 transition duration-500 ease-in-out"
          :class="{
            'border-gray-500': currentStepNumber > 0,
            'border-gray-300': currentStepNumber <= 0,
          }"
        ></div>
        <div
          class="flex items-center relative"
          :class="{
            'text-white': currentStepNumber === 1,
            'text-gray-500': currentStepNumber !== 1,
          }"
        >
          <div
            class="rounded-full transition duration-500 ease-in-out h-20 w-20 py-3 border-2"
            :class="{
              'bg-gray-500': currentStepNumber === 1,
              'border-gray-500': currentStepNumber >= 1,
              'border-gray-300': currentStepNumber < 1,
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bookmark"
            >
              <path
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          </div>
          <div
            class="absolute top-0 -ml-10 text-center mt-24 w-40 text-xl font-medium uppercase text-gray-500"
          >
            Dane
          </div>
        </div>
        <div
          class="flex-auto border-t-2 transition duration-500 ease-in-out"
          :class="{
            'border-gray-500': currentStepNumber > 1,
            'border-gray-300': currentStepNumber <= 1,
          }"
        ></div>
        <div
          class="flex items-center relative"
          :class="{
            'text-white': currentStepNumber === 2,
            'text-gray-500': currentStepNumber !== 2,
          }"
        >
          <div
            class="rounded-full transition duration-500 ease-in-out h-20 w-20 py-3 border-2"
            :class="{
              'bg-gray-500': currentStepNumber === 2,
              'border-gray-500': currentStepNumber >= 2,
              'border-gray-300': currentStepNumber < 2,
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bookmark"
            >
              <path
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>
          <div
            class="absolute top-0 -ml-10 text-center mt-24 w-40 text-xl font-medium uppercase text-gray-500"
          >
            Wysyłka
          </div>
        </div>
        <div
          class="flex-auto border-t-2 transition duration-500 ease-in-out"
          :class="{
            'border-gray-500': currentStepNumber > 2,
            'border-gray-300': currentStepNumber <= 2,
          }"
        ></div>
        <div
          class="flex items-center relative"
          :class="{
            'text-white': currentStepNumber === 3,
            'text-gray-500': currentStepNumber !== 3,
          }"
        >
          <div
            class="rounded-full transition duration-500 ease-in-out h-20 w-20 py-3 border-2"
            :class="{
              'bg-gray-500': currentStepNumber === 3,
              'border-gray-500': currentStepNumber >= 3,
              'border-gray-300': currentStepNumber < 3,
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bookmark"
            >
              <path
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div
            class="absolute top-0 -ml-10 text-center mt-24 w-40 text-xl font-medium uppercase text-gray-500"
          >
            Płatność
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col border-2 border-gray-300 my-20">
      <div class="p-4">
        <slot></slot>
      </div>
      <div class="p-4">
        <div v-if="previous || next" class="flex p-2 mt-4">
          <nuxt-link
            v-if="previous"
            :to="previous.link"
            class="button"
            type="button"
          >
            Wróć
          </nuxt-link>
          <div class="flex-auto flex flex-row-reverse">
            <nuxt-link v-if="next" :to="next.link" class="button" type="button">
              Dalej
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Stepper',
  data() {
    return {
      steps: [
        {
          link: { name: 'sklep-koszyk' },
        },
        {
          link: { name: 'sklep-dane-zamowienia' },
        },
        {
          link: { name: 'sklep-wysylka' },
        },
        {
          link: { name: 'sklep-platnosc' },
        },
      ],
    }
  },
  computed: {
    currentStepNumber() {
      return _.findIndex(
        this.steps,
        (step) => step.link.name === this.$route.name
      )
    },
    previous() {
      return this.steps[this.currentStepNumber - 1] || null
    },
    next() {
      if (this.currentStepNumber === 0 && this.cartItems.length === 0)
        return null
      return this.steps[this.currentStepNumber + 1] || null
    },
    ...mapGetters('checkout', ['cartItems']),
  },
}
</script>
