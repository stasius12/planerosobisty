import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app: { router, context } }, inject) => {
  Vue.use(
    VueGtag,
    {
      config: { id: 'G-BQB2D0LXWV' },
      appName: 'Planer Osobisty',
      pageTrackerScreenviewEnabled: true,
    },
    router
  )

  context.$gtag = Vue.$gtag
  inject('gtag', Vue.$gtag)
}
