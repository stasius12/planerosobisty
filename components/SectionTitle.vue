<template>
  <header class="mb-10">
    <div class="flex items-center w-full">
      <h1 class="min-w-max mb-0 top-1 relative text-gray-300 text-center">
        <slot></slot>
      </h1>
      <div class="border-b-1 border-gray-300 w-full ml-4" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'SectionTitle',
}
</script>
