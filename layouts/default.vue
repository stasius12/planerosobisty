<template>
  <div>
    <header-section
      :show-mobile-menu="showMobileMenu"
      @toggleMobileMenu="toggleMobileMenu"
    />
    <Nuxt v-if="!$slots.default" />
    <slot />
  </div>
</template>

<style></style>
<script>
import HeaderSection from '@/components/HeaderSection'
export default {
  components: { HeaderSection },
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
