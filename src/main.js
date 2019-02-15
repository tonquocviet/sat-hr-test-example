import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/axios";
import "./plugins/filter";
import App from "./App.vue";
import router from "./router/index";
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.config.productionTip = false;

new Vue({
  iconfont: 'fa',
  router,
  render: h => h(App)
}).$mount("#app");
