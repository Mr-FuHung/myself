import Vue from 'vue';
import instance from './axiosConfig/axiosPublic';

import App from './App.vue';
import router from './router';
import store from './store';
Vue.prototype.$http = instance;//在Vue原型链挂载axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
