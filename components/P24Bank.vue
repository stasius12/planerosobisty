<template>
  <label class="h-full">
    <input
      type="radio"
      class="absolute hidden"
      :checked="shouldBeChecked"
      :value="value"
      @change="$emit('change', value)"
    />
    <div
      class="items-center cursor-pointer h-full w-full flex items-center justify-center border border-gray-200"
    >
      <img :src="imgSrc" :alt="imgAlt" :width="imgWidth" />
    </div>
  </label>
</template>

<script>
export default {
  name: 'P24Bank',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    value: {
      type: String || Boolean,
      required: true,
    },
    verbose: String,
    rules: String || Object,
    modelValue: {
      default: '',
    },
    imgSrc: {
      required: true,
    },
    imgAlt: {
      required: true,
    },
    imgWidth: {
      type: Number || String,
      default: 80,
    },
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue === this.value
    },
  },
}
</script>

<style lang="scss" scoped>
input:checked + div {
  border: 1px solid #dddddd;
}
input:hover:not(:checked) + div {
  background-color: #f9fafb;
}
</style>
