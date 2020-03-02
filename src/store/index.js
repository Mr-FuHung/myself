import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,//严格模式不允许在vuex外修改state中的值
  state: {
    user: undefined,
    active: false,
    download: false,
    message: [],
    musicStatus: 'music'
  },
  getters: {
  },
  mutations: {
    changeActive(state, params) {
      state.active = params;
    },
    downloadStatus(state, params) {
      state.download = params;
    },
    changeMusicStatus(state, params) {
      state.musicStatus = params;
    },
    userStatus(state, value) {
      state.user = value;
    },
    messagePush(state, params) {
      params(state)
    }
  },
  actions: {
    messagePush(ctx, params) {
      setTimeout(() => {
        ctx.commit('messagePush', (state) => {
          state.message.shift();
        })

      }, 3000)
      ctx.commit('messagePush', (state) => {
        state.message.push(params)
      })
    }
  },
  modules: {
  }
})
