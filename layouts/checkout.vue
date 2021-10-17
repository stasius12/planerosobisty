<template>
  <default-layout>
    <stepper>
      <Nuxt />
    </stepper>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/default'
import HeaderSection from '@/components/HeaderSection'
import Stepper from '@/components/Stepper'

export default {
  components: { Stepper, HeaderSection, DefaultLayout },
  created() {
    this.$store.dispatch('checkout/readStateFromCookies');
  },
}
</script>
