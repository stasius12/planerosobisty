<template>
  <validation-observer
    v-slot="{ invalid }"
    ref="subscribe"
    class="flex flex-wrap sm:flex-nowrap gap-x-10 gap-y-8"
    tag="form"
    @submit.prevent="subscribe()"
  >
    <validation-provider
      v-slot="{ errors }"
      rules="required|email"
      :bails="false"
      tag="div"
      name="Email"
      class="h-11 w-full"
    >
      <input
        v-model="form.email"
        class="w-full h-full bg-transparent border-b-1 border-black font-primary outline-none placeholder-black uppercase"
        :class="{
          'border-red-700': errors.length || response.errorMessage,
          ...inputClass,
        }"
        type="email"
        placeholder="twój email"
      />
      <div class="first-error font-weight-bold absolute text-red-700">
        <small>{{ errors[0] || response.errorMessage }}</small>
      </div>
      <div
        v-if="response.message && !errors.length && !response.errorMessage"
        class="absolute success-message font-weight-bold"
      >
        <small>{{ response.message }}</small>
      </div>
    </validation-provider>
    <button class="button w-full bg-gray-600" type="submit" :disabled="invalid">
      Zapisz mnie
    </button>
  </validation-observer>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import axios from 'axios'

export default {
  name: 'MailchimpSignup',
  components: {
    ValidationProvider,
  },
  props: {
    inputClass: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        email: '',
      },
      response: {
        status: null,
        message: '',
        errorMessage: '',
      },
      cachedForm: {},
    }
  },
  mounted() {
    this.cachedForm = { ...this.form }
  },
  methods: {
    async subscribe() {
      this.response.errorMessage = ''

      const formData = { email: this.form.email.toLowerCase() }
      try {
        const { data, status } = await axios.post(
          '/.netlify/functions/api/subscribe',
          formData
        )
        this.response.status = status
        this.response.message = `${data.email_address} został zarejestrowany!`
        this.form = { ...this.cachedForm }
        this.$refs.subscribe.reset()
      } catch (e) {
        const errorMapping = {
          'Member Exists': `Member ${this.form.email} already exists.`,
        }

        this.response.errorMessage =
          errorMapping[e.response.data.title] || e.response.data.detail
      }
    },
  },
}
</script>
