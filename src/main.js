import Vue from 'vue';
import instance from './axios/axiosPublic';
import animated from 'animate.css'
import App from './App.vue';
import router from './router';
import store from './store';
import componentsGlobal from './componentsGlobal/index.js';//全局组件
Vue.prototype.$http = instance;//在Vue原型链挂载axios
Vue.config.productionTip = false
Vue.use(animated)
Vue.use(componentsGlobal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
