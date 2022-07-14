import Vue from 'vue'
import Bootstrap from 'bootstrap-vue/dist/bootstrap-vue.esm'
import App from 'App.vue'

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Bootstrap)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: (h) => h(App)
})
