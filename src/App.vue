<template>
  <div id="app">
    <el-container>
      <el-header height="2.5rem">
        <div class="myPicture">
          <img alt="Vue logo" src="@/assets/images/me.png" />
        </div>
        <div class="myName">Baron</div>
        <div class="routerApp">
          <router-link to="/me">简历</router-link>
          <router-link to="/live">点滴</router-link>
          <router-link to="/leaveword">留言</router-link>
        </div>
      </el-header>
      <el-main>
        <keep-alive exclude="see,me">
          <!-- 页面缓存 -->
          <router-view />
        </keep-alive>
        <!-- 返回顶部 -->
        <el-backtop :visibility-height="200"></el-backtop>
        <download></download>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
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
        .then((result) => {
          if (result.data.returnCode === 0) {
            this.userStatus(result.data.data.user);
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    ...mapMutations(["changeMusicStatus", "userStatus"]),
  },
  watch: {
    $route(to, from) {
      if (to.path === "/leaveword") {
        this.changeMusicStatus("music"); //切换到留言页面时播放音乐组件
      }
    },
  },
};
</script>
<style lang="scss" >
@import "@/scss/reset.scss";
@import "@/scss/base.scss";

.routerActive {
  text-decoration: underline;
}
.el-main {
  padding: 0.2rem;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  color: #3f1c1c;
  font-size: 0.14rem;
}
.el-header {
  text-align: center;

  & > .routerApp a {
    color: #948c76;
    margin: 0 0.1rem;
    font-size: 0.12rem;
    &:hover {
      color: #9bdbdb;
    }
  }
  & > .myName {
    font-size: 0.2rem;
    padding: 0.02rem 0.1rem;
    letter-spacing: 0.1em;
    margin: 0.3rem 0;
    display: inline-block;
    color: #948c76;
    background: #fdf4e8;
  }
  & > .myPicture img {
    max-width: 120px;
    max-height: 120px;
    border-radius: 50%;
  }
}
</style>
