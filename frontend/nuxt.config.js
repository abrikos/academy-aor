import colors from 'vuetify/es5/util/colors'
const isDev = process.env.NODE_ENV !== 'production'
require('dotenv').config();

export default {
  //loading: '~/components/LoadingBar.vue',
  loading: {
    continuous: true,
    color: 'orange',
    height: '10px'
  },
  ssr: false,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
          {
            name: 'viewById',
            path: '/view-by-id/*',
            component: resolve(__dirname, 'pages/view-by-id.vue'),
          },
      )
    }
  },
  head: {
    title: 'Академия РС(Я) - ИБДДНС',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/common',
    '~/plugins/axios',
    //'~/plugins/websocket',
    //'~/plugins/redirection',
    //'~/plugins/vuex-persistedstate',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        name: 'English'
      },
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.js',
      }
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
    vueI18n:{
      silentTranslationWarn: true,
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "/api",
  },
  publicRuntimeConfig: {
    apiPort: process.env.API_PORT,
    googleId: process.env.GOOGLE_ID
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
