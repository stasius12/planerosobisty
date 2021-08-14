<template>
  <validation-observer
    v-slot="{ invalid, valid }"
    ref="subscribe"
    tag="form"
    @submit.prevent="subscribe()"
  >
    <validation-provider
      rules="required|email"
      :bails="false"
      tag="div"
      name="Email"
      v-slot="{ errors }"
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
  methods: {
    async subscribe(event) {
      this.response.errorMessage = ''

      // try {
      //   const response = await axios.post(
      //     'https://us1.api.mailchimp.com/3.0/lists/01d3f8d745/members/',
      //     {
      //       email_address: this.form.email.toLowerCase(),
      //       status: 'subscribed',
      //     },
      //     {
      //       auth: {
      //         username: 'anystring',

      //       },
      //     }
      //   )
      // } catch (error) {
      //   console.log(error)
      // }

      const formData = { email: this.form.email.toLowerCase() }
      try {
        const { data, status } = await axios.post('/.netlify/functions/api/subscribe', formData)
        console.log(data)
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
  mounted() {
    this.cachedForm = { ...this.form }
  },
}
</script>

<style lang="scss"></style>
