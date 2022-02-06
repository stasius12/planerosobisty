<template>
  <li>
    <nuxt-link :to="{ name }" class="text-white" v-bind="$attrs">
      <slot />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'FooterLink',
  inheritAttrs: false,
  props: {
    name: {
      default: '',
      type: String,
    },
  },
}
</script>
