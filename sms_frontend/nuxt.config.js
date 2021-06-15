const colors = require('vuetify/es5/util/colors').default
import axios from 'axios'

require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: colors.grey.darken1 },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  // plugins: ['~/plugins/plugin.js'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
 modules: [ '@nuxtjs/axios', '@nuxtjs/auth' ],
axios: { 
          baseURL : 'http://localhost:8000/api/' 
      //  baseURL : 'https://smsbackend.ordd.tk/api/'
      //  baseURL : 'https://orangeroomdigital.com/sscp/public/api/' 
},

auth: {

  strategies: {
    local: {
      endpoints: {
        login: { url: 'login', method: 'post', propertyName: 'token' },
        logout: false,
        // user:false,
        user: { url: 'me', method: 'get', propertyName: 'user' }
      }
     
    }
  },
  redirect: {
    login: '/login',
    logout: '/login',
    callback: '/login',
    home: '/'
  }
},
router: {
  middleware: ['auth']
},

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.grey.darken1,
          accent: '#F9F8F4',
          secondary: colors.indigo,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  
}
