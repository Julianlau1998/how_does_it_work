import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  ssr: true,

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
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-site-verification', content: 'x0HrtEs5YOt35p2HZorevdUW_6E7xEjnfhWkr1O5Sr4' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  css: [
    "~/assets/styles/main.scss"
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@/modules/sitemapRouteGenerator',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '~/modules/directus',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'https://how-works.com',
  },

  directus: {
    url: process.env.DIRECTUS_URL,
    auth: {
      email: process.env.DIRECTUS_EMAIL,
      password: process.env.DIRECTUS_PASSWORD,
    },
  },
  axios: {
    baseURL: '/',
  },

  pwa: {
    manifest: {
      name: 'How Does It Work',
      lang: 'en',
      background_color: '#121212',
      theme_color: '#2a343c',
      icons:[{
        src:'static/icon.png',
        size:"144x144",
        type:"image/png"
      },{
        src:'static/icon.png',
        size:"128x128",
        type:"image/png"
      },{
        src:'static/icon.png',
        size:"152x152",
        type:"image/png"
      },{
        src:'static/icon.png',
        size:"180x180",
        type:"image/png"
      },{
        src:'static/icon.png',
        size:"192x192",
        type:"image/png"
      }, {
        src:'static/icon.png',
        size:"256x256",
        type:"image/png"
      }
      ]
    },
    icon: {
      src:'static/icon.png',
      fileName: 'icon.png'
    },
    meta: {
      appleStatusBarStyle: '#2a343c',
      mobileApp: true,
      mobileAppIOS: true,
      theme_color: '#2a343c',
      src:'static/icon.png',
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Roboto'
      }
    },
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

  build: {
  },
  generate: {
    fallback: true,
  }
}
