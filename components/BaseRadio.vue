<template>
  <label>
    <input type="radio" :checked="shouldBeChecked" :value="value" @change="$emit('change', value)">
    <slot />
  </label>
</template>

<script>
export default {
  name: 'BaseRadio',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    value: {
      type: String || Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    verbose: String,
    rules: String || Object,
    modelValue: {
      default: ""
    },
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue == this.value;
    }
  }
}
</script>

<style scoped>

</style>
