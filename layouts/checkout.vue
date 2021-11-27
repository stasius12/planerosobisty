<template>
  <default-layout>
    <stepper>
      <Nuxt />
    </stepper>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/default'
import Stepper from '@/components/Stepper'

export default {
  components: { Stepper, DefaultLayout },
  created() {
    this.$store.dispatch('checkout/readStateFromCookies')
  },
}
</script>
