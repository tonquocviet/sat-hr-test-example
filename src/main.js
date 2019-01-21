import Vue from 'vue'
import moment from "moment";

import './plugins/vuetify'
import './plugins/axios'
import App from './App.vue'
import router from "./router/index";

Vue.prototype.moment = moment;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')