<template>
  <validation-provider
    v-slot="{ errors, validated, invalid, touched }"
    :vid="name"
    :name="verboseName"
    :rules="rules"
    :bails="false"
    tag="div"
    class="floating relative h-full"
    :class="outerClass"
  >
    <div class="h-full">
      <input
        v-bind="$attrs"
        :id="name"
        :class="[
          { 'border-red-600': (touched || validated) && invalid },
          innerClass.split(' '),
        ]"
        :name="name"
        :autocomplete="name"
        :value="value"
        :type="type"
        :placeholder="label"
        :required="required"
        class="floating__input relative w-full outline-none bg-transparent py-1 z-10 border-gray-200 h-full"
        @input="$emit('input', $event.target.value)"
      />
      <label
        :for="name"
        class="floating__label absolute left-0 z-0"
        :class="'top-' + labelTop"
      >
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </div>
    <div class="h-6 text-xs mt-0.5 text-red-600 absolute">{{ errors[0] }}</div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'BaseInput',
  components: { ValidationProvider },
  props: {
    value: {
      type: String || Object,
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
    type: String,
    rules: String || Object,
    innerClass: {
      type: String,
      default: '',
    },
    outerClass: String,
    labelTop: {
      default: 0,
    },
  },
  computed: {
    required() {
      return typeof this.rules === 'string' && this.rules.includes('required')
    },
    verboseName() {
      return this.verbose || this.label
    },
  },
}
</script>

<style scoped lang="scss">
.floating {
  &__input {
    border-bottom-width: 1px;
    &__label {
      font-size: 1rem;
    }
    &:not(:placeholder-shown) + label,
    &:focus + label {
      font-size: 0.7rem;
      transform: translate3d(0, -1.2rem, 0) scale3d(1, 1, 1);
      transition: transform 0.2s ease;

      &.top-2 {
        transform: translate3d(0, -1.4rem, 0) scale3d(1, 1, 1);
      }
      &.top-3 {
        transform: translate3d(0, -1.5rem, 0) scale3d(1, 1, 1);
      }
      &.top-4 {
        transform: translate3d(0, -1.6rem, 0) scale3d(1, 1, 1);
      }
    }
  }
}

.floating__input:placeholder-shown + .floating__label::before {
  transform: translate3d(0, -2.2rem, 0) scale3d(1, 1, 1);
}

input::-webkit-input-placeholder {
  transition: inherit;
  opacity: 0;
}
</style>
