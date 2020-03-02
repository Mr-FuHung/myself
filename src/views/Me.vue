<template>
  <div class="me">
    <arrange :base-data="item" v-for="(item,key,index) in meData" :key="index" />......
  </div>
</template>
<script>
import arrange from "../components/Me/arrange.vue";
import { mapMutations } from "vuex";

// @ is an alias to /src
export default {
  name: "me",
  data() {
    return {
      meData: {
        contact: {
          title: "联系方式",
          list: [
            [
              "手机：17513131341",
              "Email：1002150110@qq.com",
              "网站：http://47.240.73.78"
            ]
          ]
        },
        personal: {
          title: "个人信息",
          list: [
            [
              "符洪 | 男 | 1996",
              // "本科 | 郑州 | 计算机科学",
              "前端开发 | 3 年工作经验"
            ],
            ["期望职位：Web高级前端", "期望城市：上海"],
            [
              {
                subTitle: "Github：",
                url: "https://github.com/Mr-FuHung",
                text: "https://github.com/Mr-FuHung"
              }
            ],
            [
              {
                subTitle: "Gitee：",
                url: "https://gitee.com/Mr-FuHung",
                text: "https://gitee.com/Mr-FuHung"
              }
            ],
            [
              {
                subTitle: "技术博客：",
                url: "http://47.240.73.78:8888",
                text: "http://47.240.73.78"
              }
            ]
          ]
        },
        project: {
          title: "开源项目",
          list: [
            [
              {
                subTitle: false,
                url: "https://www.redspite.com",
                text:
                  "个人博客 - 使用 Vue + Vue-Router + VueX + Vue-cli 构建的个人网站，个人简历、文章及留言版展示"
              }
            ],
            [
              {
                subTitle: false,
                text:
                  "nodeMiniServer - 使用原生node搭建的迷你服务",
                url: "https://github.com/Mr-FuHung/nodeMiniServer"
              }
            ],
            [
              {
                subTitle: false,
                text: " 早期博客 - 纯静态页面（半成品），挂载在github访问速度很慢",
                url: "https://mr-fuhung.github.io/vitae/dist/index.html"
              }
            ]
          ]
        },
        skill: {
          title: "技能掌握",
          list: [
            ["前端框架：Vue/Jquery/微信小程序"],
            ["前端工具：Webpack/Sass"],
            ["后端框架：NodeJS/Express"],
            ["数据库相关：Mysq;"],
            ["版本管理工具：Git/Svn"]
          ]
        },
        worked: {
          title: "工作经历",
          list: [
            [`● 成都清风竞技公司 （ 2016 年 3 月 ~ 2016 年 10 月 ）`],
            [`<b>官网页面更新与维护</b>`],
            [`- JQ + CSS3 + Bootstrap + Html5`],
            [`- 负责官网静态页开发及简单交互`],
            [`- 负责网站移动端、各浏览器适配网页适配`]
          ]
        }
      }
    };
  },
  components: {
    arrange
  },
  methods: {
    ...mapMutations(["downloadStatus"])
  },
  mounted() {
    this.downloadStatus(true); //显示download
  },
  // beforeRouteEnter(to, from, next) {
  //   next();
  // },
  beforeRouteLeave(to, from, next) {
    this.downloadStatus(false); //隐藏download
    next();
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/Me/index";
</style>
