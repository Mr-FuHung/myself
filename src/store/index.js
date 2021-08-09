import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, //严格模式不允许在vuex外修改state中的值
  state: {
    userInfo: storage.getItem('userInfo') || {},//获取用户信息
  },
  getters: {},
  mutations: {
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo;//存储用户信息
      storage.setItem('userInfo', userInfo)//存储在storage，防止页面被刷新
    },
  },
  actions: {},
  modules: {}
})