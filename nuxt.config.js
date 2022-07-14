export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
        script: [
            {
                src:

                    'https://maps.googleapis.com/maps/api/js?key=AIzaSyD8LYr1eusK-NPGW_X6ooNFCh3zvvhPRZI&libraries=places',

            },
            {
                src: 'https://wchat.freshchat.com/js/widget.js',
            },
            {
                // src: '/plugins/vue-awesome-swiper.js',
                ssr: false,
            },
        ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['~/assets/scss/main.scss'],
    /*
     ** Plugins to load before mounting the App
     */
     // nuxt.config.js

    buildModules: [
      // Simple usage
      '@nuxtjs/vuetify',
  
    ],
  
    plugins: [
        {
            src: '~/plugins/vue-validate.js',
        },
        {
            src: '~/plugins/vue-datepicker.js',
            ssr: false,
        },
        {
            src: '~/plugins/vue-tinymce.js',
            ssr: false,
        },
        {
            src: '~/plugins/vue-moment.js',
        },
        {
            src: '~/plugins/vue-toaster.js',
        },
        {
            src: '~/plugins/vue-infinite-loading.js',
            ssr: false,
        },
        {
            src: '~/plugins/filter.js',
        },
        {
            src: '~/plugins/route.js',
            ssr: false,
        },
        {
            src: '~/plugins/vue2-google-maps.js',
            ssr: true,
        },
        {
            src: '~/plugins/vue-awesome-swiper.js',
            ssr: false,
        },
    ],
    /*
     ** Nuxt.js dev-modules
     */
    /*
     ** Nuxt.js modules
     */
    modules: ['bootstrap-vue/nuxt', 'nuxt-fontawesome'],
    fontawesome: {
        imports: [
            {
                set: '@fortawesome/free-solid-svg-icons',
                icons: ['fas'],
            },
            {
                set: '@fortawesome/free-regular-svg-icons',
                icons: ['far'],
            },
        ],
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        transpile: [/^vue2-google-maps($|\/)/],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            //  if (!ctx.isClient) {
            //     // This instructs Webpack to include `vue2-google-maps`'s Vue files
            //     // for server-side rendering
            //     config.externals.splice(0, 0, function(
            //         context,
            //         request,
            //         callback,
            //     ) {
            //         if (/^vue2-google-maps($|\/)/.test(request)) {
            //             callback(null, false)
            //         } else {
            //             callback()
            //         }
            //     })
            // }
        },
    },
    vendor: ['vue2-google-maps'],
}
