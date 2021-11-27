import Vue from 'vue'
import {
  ValidationObserver,
  localize,
  setInteractionMode,
  extend,
} from 'vee-validate'

import { required, email, min, digits } from 'vee-validate/dist/rules'
import pl from 'vee-validate/dist/locale/pl.json'

localize('pl', pl)

extend('required', {
  ...required,
  message: 'To pole jest wymagane',
})
extend('email', email)
extend('min', min)
extend('digits', digits)
extend('postcode', {
  validate: (value) => /[0-9]{2}-[0-9]{3}/.test(value),
  message: `To nie jest poprawny kod pocztowy`,
})

Vue.component('ValidationObserver', ValidationObserver)

setInteractionMode('eager')
