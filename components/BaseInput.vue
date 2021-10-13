<template>
  <validation-provider
    :name="verboseName"
    :rules="rules"
    :bails="false"
    tag="div"
    class="floating relative h-full"
    :class="outerClass"
    v-slot="{ errors, validated, invalid, touched }"
  >
    <div class="h-full">
      <input
        v-bind="$attrs"
        :id="name"
        :class="[{ 'border-red-600': (touched || validated) && invalid }, innerClass.split(' ')]"
        :name="name"
        :autocomplete="name"
        :value="value"
        :type="type"
        :placeholder="label"
        :required="required"
        @input="$emit('input', $event.target.value)"
        class="floating__input relative w-full outline-none bg-transparent py-2 z-10 border-gray-200 h-full"
      />
      <label :for="name" class="floating__label absolute left-0 z-0" :class="'top-' + labelTop">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </div>
    <div class="h-6 text-xl mt-1 text-red-600 absolute">{{ errors[0] }}</div>
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
      default: "",
    },
    outerClass: String,
    labelTop: {
      default: 0,
    }
  },
  computed: {
    required() {
      return typeof this.rules === "string" && this.rules.includes("required");
    },
    verboseName() {
      return this.verbose || this.label;
    }
  }
}
</script>

<style scoped lang="scss">
.floating {
  &__input {
    border-bottom-width: 1px;
    &__label {
      font-size: 1.8rem;
    }
    &:not(:placeholder-shown) + label,
    &:focus + label {
      font-size: 1.2rem;
      transform: translate3d(0, -2.5rem, 0) scale3d(1, 1, 1);
      transition: transform 0.2s ease;
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
