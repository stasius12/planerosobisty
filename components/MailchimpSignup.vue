<template>
  <validation-observer
    v-slot="{ invalid }"
    ref="subscribe"
    tag="form"
    @submit.prevent="subscribe()"
  >
    <validation-provider
      v-slot="{ errors }"
      rules="required|email"
      :bails="false"
      tag="div"
      name="Email"
    >
      <input
        v-model="form.email"
        class="font-primary"
        :class="{ invalid: errors.length || response.errorMessage }"
        type="email"
        placeholder="twój email"
      />
      <div class="first-error font-weight-bold">
        <small>{{ errors[0] || response.errorMessage }}</small>
      </div>
      <div
        v-if="response.message && !errors.length && !response.errorMessage"
        class="success-message font-weight-bold"
      >
        <small>{{ response.message }}</small>
      </div>
    </validation-provider>
    <button class="button" type="submit" :disabled="invalid">
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

<style lang="scss"></style>
