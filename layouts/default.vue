<template>
  <div class="flex flex-col">
    <portal-target name="spinner-screen"></portal-target>
    <header-section
      :show-mobile-menu="showMobileMenu"
      @toggleMobileMenu="toggleMobileMenu"
    />
    <Nuxt v-if="!$slots.default" class="mb-10" />
    <slot />
    <footer-section class="mt-auto" />
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
