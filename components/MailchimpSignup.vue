<template>
  <validation-observer v-slot="{ handleSubmit }" ref="subscribe">
    <form
      :class="formClass"
      class="flex flex-wrap sm:flex-nowrap gap-x-10 gap-y-8"
      @submit.prevent="handleSubmit(subscribe)"
    >
      <validation-provider
        v-slot="{ errors }"
        rules="required|email"
        :bails="false"
        tag="div"
        name="Email"
        class="h-11 w-full"
        mode="passive"
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
          @keyup.enter.prevent="handleSubmit(subscribe)"
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
      <button
        class="button w-full bg-gray-600 hover:bg-gray-500"
        :class="{ 'button-icon-mailchimp': loading }"
        type="submit"
      >
        <img
          v-if="loading"
          src="~assets/images/spinner.svg"
          class="mx-auto"
          width="50"
        />
        <span v-else>Zapisz mnie</span>
      </button>
    </form>
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
    formClass: {
      type: String,
      default: '',
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
      loading: false,
      cachedForm: {},
    }
  },
  mounted() {
    this.cachedForm = { ...this.form }
  },
  methods: {
    async subscribe() {
      if (this.loading) return

      this.loading = true
      this.response = {
        status: null,
        message: '',
        errorMessage: '',
      }

      const formData = { email: this.form.email.toLowerCase() }
      try {
        const { status } = await axios.post(
          '/.netlify/functions/api/subscribe',
          formData
        )
        this.response.status = status
        this.response.message = 'Twój email został zarejestrowany!'
        this.form = { ...this.cachedForm }
        this.$refs.subscribe.reset()
      } catch (e) {
        const errorMapping = {
          'Member Exists': 'Twój email jest już zarejestrowany.',
          'Invalid Resource': 'Podany email nie jest poprawny.',
        }

        this.response.errorMessage =
          errorMapping[e.response.data.title] || e.response.data.detail
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button-icon-mailchimp {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
