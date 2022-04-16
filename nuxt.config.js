const getEnvironment = () => {
  // It can be production, deploy-preview, branch-deploy or dev
  if (process.env.CONTEXT === 'branch-deploy') {
    return process.env.BRANCH
  }

  return process.env.CONTEXT
}

const getUrl = () => {
  return getEnvironment() === 'production'
    ? process.env.URL
    : getEnvironment() === 'dev'
    ? process.env.LOCAL_URL || 'http://localhost:8888' // LOCAL_URL - to easily override from .env
    : process.env.DEPLOY_PRIME_URL
}

export default {
  target: 'static',
  ssr: false,

  server: {
    host: '0',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'planerosobisty',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      {
        rel: 'stylesheet',
        href: 'https://geowidget.easypack24.net/css/easypack.css',
      },
    ],
    script: [
      { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      { src: 'https://js.stripe.com/v3/' },
      {
        src: 'https://geowidget.easypack24.net/js/sdk-for-javascript.js',
        async: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vee-validate', ssr: false },
    '~/plugins/vue-swiper.js',
    '~/plugins/sentry.js',
    '~/plugins/google-analytics',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
  ],

  styleResources: {
    scss: [
      '~/assets/css/utilities/_variables.scss',
      '~/assets/css/base/_grid.scss',
    ],
  },

  moment: {
    defaultTimezone: 'Europe/Warsaw',
    locales: ['pl'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'portal-vue/nuxt',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    fullTextSearchFields: ['title', 'description'],
  },

  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()

      return files.map((file) => (file.path === '/blog' ? '/' : file.path))
    },
  },

  toast: {
    position: 'bottom-center',
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: `${getUrl()}/.netlify/functions/api/`,
    },
    sentryDsn: process.env.SENTRY_DSN,
    sentryUrl: process.env.SENTRY_CLIENT_URL,
    sentryRelease: process.env.SENTRY_RELEASE,
    stripeUrl: process.env.STRIPE_URL,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    environment: getEnvironment(),
    url: getUrl(),
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  hooks: {
    'content:file:beforeParse': (file) => {
      if (file.extension !== '.md') return
      file.data = file.data.replace(
        /!!(.*?)!!/g,
        (match, p1) => `<span class="bg-primary">${p1}</span>`
      )
      file.data = file.data.replace(
        /\[list-style: arrow\]/g,
        '<div class="list-style-arrow"></div>'
      )
    },
  },
}
