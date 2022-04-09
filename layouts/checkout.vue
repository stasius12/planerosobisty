<template>
  <default-layout>
    <stepper ref="stepper" :max-step-allowed="maxStepAllowed">
      <Nuxt />
    </stepper>
  </default-layout>
</template>

<script>
import { mapGetters } from 'vuex'
//
import DefaultLayout from '@/layouts/default'
import Stepper from '@/components/Stepper'

export default {
  components: { Stepper, DefaultLayout },
  computed: {
    ...mapGetters('checkout', ['maxStepAllowed']),
  },
  created() {
    this.$store.dispatch('checkout/readStateFromCookies')
  },
  mounted() {
    if (this.$refs.stepper.currentStepNumber > this.maxStepAllowed) {
      this.$router.replace({ name: 'sklep-koszyk' })
    }
  },
}
</script>
