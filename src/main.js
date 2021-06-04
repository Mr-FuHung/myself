import Vue from 'vue';
import ElementUI from 'element-ui';
import '@/assets/scss/element-variables.scss';
import locale from 'element-ui/lib/locale/lang/en';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import http from '@/utils/http';
import componentsGlobal from '@/componentsGlobal/index.js';//全局组件



Vue.prototype.$http = http;//在Vue原型链挂载axios
Vue.config.productionTip = false;


Vue.use(ElementUI, { locale,size: 'small', zIndex: 3000 })
Vue.use(componentsGlobal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
