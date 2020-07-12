export default {
  server: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    timing: false
  },
  http: {
    port: process.env.PORT || 8080,
    browserBaseURL: '/'
  },
  debug: true,
  mode: 'universal',
  serverMiddleware: [
    {
      path: '/api/releases',
      handler: '~/api/releases.js'
    },
    {
      path: '/api/repository',
      handler: '~/api/repository.js'
    }
  ],
  /*
   ** Headers of the page
   */
  head: {
    title: 'NodePulse | A Live Node.js Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/nodepulse.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vue-placeholders.js',
    { src: '@/plugins/vue-hightcharts.js', ssr: true }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    'nuxt-fontawesome',
    '@nuxt/http',
    '@nuxtjs/google-gtag'
  ],
  'google-gtag': {
    id: 'UA-172487856-1'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: ['countup.js']
  }
}
