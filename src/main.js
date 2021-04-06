import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const apiKey = 'f6eafc00-d2cc-485c-89e3-75fb9124f47a';
Vue.use({
    install (Vue) {
        Vue.prototype.$http = axios.create({
            baseURL:'https://api.pokemontcg.io/v2/',
            headers:{
                'X-Api-Key': apiKey
            }
        })
    }
});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
