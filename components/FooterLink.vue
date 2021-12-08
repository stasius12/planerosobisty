<template>
  <li>
    <nuxt-link :to="{ name }" class="text-white">
      <slot />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'FooterLink',
  props: {
    name: {
      default: '',
      type: String,
    },
  },
}
</script>

<style scoped>

</style>
