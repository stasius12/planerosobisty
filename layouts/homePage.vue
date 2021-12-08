<template>
  <div class="lala bg-center bg-cover w-screen h-screen">
    <header-section
      :show-mobile-menu="showMobileMenu"
      @toggleMobileMenu="toggleMobileMenu"
    />
    <Nuxt v-if="!$slots.default" />
    <slot />
    <footer-section />
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection'
import FooterSection from '@/components/Footer'

export default {
  components: { FooterSection, HeaderSection },
  data() {
    return {
      showMobileMenu: false,
    }
  },
  watch: {
    $route() {
      this.showMobileMenu = false
      document.body.classList.remove('overflow-hidden')
    },
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
      if (this.showMobileMenu) document.body.classList.add('overflow-hidden')
      else document.body.classList.remove('overflow-hidden')
    },
  },
}
</script>

<style lang="scss">
.lala {
  background-image: url('~assets/images/home_page_intro.png');
}
</style>
