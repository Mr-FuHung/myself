<template>
  <div id="app">
    <header>
      <div class="myPicture">
        <img alt="Vue logo" src="./assets/me.png" />
      </div>
      <div class="myName">Baron</div>
      <div class="routerApp">
        <router-link to="/me">简历</router-link>
        <router-link to="/live" :class="$store.state.active">点滴</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </header>
    <download v-if='$store.state.download'/>
    <gotop />
    <keep-alive exclude="see,me">
      <!-- 页面缓存 -->
      <router-view id="page" />
    </keep-alive>
  </div>
</template>
<script>
import gotop from "./components/plugin/goTop.vue";
import download from "./components/plugin/download.vue";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {},
  components: {
    gotop,
    download
  }
};
</script>
<style lang="scss" >
@import "./scss/App.scss";
</style>
