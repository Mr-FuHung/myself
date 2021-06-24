import Vue from 'vue';
import ElementUI from 'element-ui';
import '@/assets/scss/element-variables.scss';
import locale from 'element-ui/lib/locale/lang/en';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import ajax from '@/utils/ajax';

Vue.prototype.$ajax = ajax;//在Vue原型链挂载axios
Vue.config.productionTip = false;


Vue.use(ElementUI, { locale,size: 'small', zIndex: 3000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
