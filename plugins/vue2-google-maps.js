import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD8LYr1eusK-NPGW_X6ooNFCh3zvvhPRZI',
        libraries: 'places',
    },
})
