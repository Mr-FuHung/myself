<template>
  <div id="app">
    <messagebox :message="$store.state.message" />
    <header>
      <div class="myPicture">
        <img alt="Vue logo" src="./assets/me.png" />
      </div>
      <div class="myName">Baron</div>
      <div class="routerApp">
        <router-link to="/me">简历</router-link>
        <router-link to="/live" :class="$store.state.active">点滴</router-link>
        <router-link to="/leaveword">留言</router-link>
      </div>
    </header>
    <download v-if="$store.state.download" />
    <gotop />
    <keep-alive exclude="see,me">
      <!-- 页面缓存 -->
      <router-view id="page" />
    </keep-alive>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$http({ url: "/verify.ajax" })
        .then(result => {
          if (result.data.returnCode === 0) {
            this.userStatus(result.data.data.user);
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    ...mapMutations(["changeMusicStatus", "userStatus"])
  },
  watch: {
    $route(to, from) {
      if (to.path === "/leaveword") {
        this.changeMusicStatus("music"); //切换到留言页面时播放音乐组件
      }
    }
  }
};
</script>
<style lang="scss" >
@import "./scss/App.scss";
</style>
