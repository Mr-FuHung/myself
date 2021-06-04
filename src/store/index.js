import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, //严格模式不允许在vuex外修改state中的值
  state: {
    user: undefined,
    musicStatus: 'music'
  },
  getters: {},
  mutations: {
    changeMusicStatus(state, params) {
      state.musicStatus = params;
    },
    userStatus(state, value) {
      state.user = value;
    }
  },
  actions: {},
  modules: {}
})