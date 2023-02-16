import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'How Does It Work',
    script: [
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': 'ca-pub-1006221991146598',
        async: true,
        crossorigin: 'anonymous'
      }
    ],
    meta: [,
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
      { hid: 'description', name: 'description', content: 'You always wanted to understand how the world around you and the technology you use works? You found the right place!' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-site-verification', content: 'x0HrtEs5YOt35p2HZorevdUW_6E7xEjnfhWkr1O5Sr4' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/styles/main.scss"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '~/modules/directus',
  ],

  directus: {
    url: process.env.DIRECTUS_URL,
    auth: {
      email: process.env.DIRECTUS_EMAIL,
      password: process.env.DIRECTUS_PASSWORD,
      // token: process.env.DIRECTUS_STATIC_TOKEN,
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'How Does It Work',
      lang: 'en',
      background_color: '#121212',
      theme_color: '#2a343c',
      icons:[{
        src:'~/static/icon.png',
        size:"144x144",
        type:"image/png"
      },{
        src:'~/static/icon.png',
        size:"128x128",
        type:"image/png"
      },{
        src:'~/static/icon.png',
        size:"152x152",
        type:"image/png"
      },{
        src:'~/static/icon.png',
        size:"180x180",
        type:"image/png"
      },{
        src:'~/static/icon.png',
        size:"192x192",
        type:"image/png"
      }, {
        src:'~/static/icon.png',
        size:"256x256",
        type:"image/png"
      }
      ]
    },
    icon: {
      source: '~/static/icon.png',
      fileName: 'icon.png'
    },
    meta: {
      appleStatusBarStyle: '#2a343c',
      mobileApp: true,
      mobileAppIOS: true,
      theme_color: '#2a343c',
      ogImage: '~/static/icon.png'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
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
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    fallback: true,
    routes: [
      '/*',
      '/categories/category/*',
      '/categories',
      '/etc',
    ]
  }
}
