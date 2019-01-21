import Vue from 'vue'
import moment from "moment";

import './plugins/vuetify'
import './plugins/axios'
import App from './App.vue'

Vue.prototype.moment = moment;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')