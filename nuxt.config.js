export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    exclude: [
      /^\/order/
    ]
  },

  server: {
    host: '0'
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
    ],
    script: [
      { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vee-validate', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
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
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  toast: {
    position: 'bottom-center',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    domainName: process.env.DOMAIN_NAME,
  },

  hooks: {
    'content:file:beforeParse': (file) => {
      if (file.extension !== '.md') return
      file.data = file.data.replace(
        /!!(.*?)!!/g,
        (match, p1) => `<span class="bg-primary">${p1}</span>`
      )
      file.data = file.data.replace(
        /\[list-style: arrow\]/g, '<div class="list-style-arrow"></div>'
      )
    }
  },
}
