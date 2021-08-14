import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

import { required, email } from 'vee-validate/dist/rules';

// Add the required rule
extend('required', {
  ...required,
  message: (field) => `Pole ${field} jest wymagane.`
})
// Add the email rule
extend('email', {
  ...email,
  message: (field) => `Pole ${field} nie jest poprawne.`
})

Vue.component('ValidationObserver', ValidationObserver)
