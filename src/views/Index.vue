<template>
  <el-container>
    <!-- 头部 -->
    <el-header height="2.5rem">
      <div class="myPicture">
        <img alt="myPicture" src="@/assets/images/me.png" />
      </div>
      <div class="myName">Baron</div>
      <div class="routerApp">
        <router-link to="/me">简历</router-link>
        <router-link to="/article">点滴</router-link>
        <router-link to="/leave">留言</router-link>
      </div>
    </el-header>
    <!-- 内容 -->
    <el-main>
      <!-- 页面缓存 -->
      <keep-alive exclude="see,detail,me">
        <router-view />
      </keep-alive>
      <!-- 返回顶部 -->
      <el-backtop :visibility-height="100" :bottom="250" />
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Index",
  data() {
    return {};
  },
  created() {},
  methods: {},
  watch: {},
};
</script>
<style lang="scss" >
@import "@/assets/scss/base.scss";

.routerActive {
  text-decoration: underline;
}
.el-main {
  padding: 0.2rem;
  // box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.15);
  // background-color: #fff;
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
      color: $--color-primary;
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
