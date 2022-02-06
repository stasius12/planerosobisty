<template>
  <header :class="marginBottomClass">
    <div class="flex items-center w-full">
      <h1
        v-if="header === '1'"
        class="min-w-max mb-0 top-1 relative text-gray-300 text-center"
      >
        <slot></slot>
      </h1>
      <h2
        v-else
        class="min-w-max mb-0 top-1 relative text-gray-300 text-center"
      >
        <slot></slot>
      </h2>
      <div class="border-b-1 border-gray-300 w-full ml-4" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    marginBottomClass: {
      type: String,
      default: 'mb-10',
    },
    header: {
      type: String,
      default: '1',
    },
  },
}
</script>
