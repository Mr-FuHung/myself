<template>
  <div class="me">
    <arrange :base-data="item" v-for="(item,key,index) in meData" :key="index"/>
    ......
  </div>
</template>
<script>
import arrange from "../components/Me/arrange.vue";
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
              "网站：www.Baron.com"
            ]
          ]
        },
        personal: {
          title: "个人信息",
          list: [
            [
              "符洪 | 男 | 1996",
              "本科 | 西南科技大学 | 信息工程系",
              "前端开发 | 3 年工作经验"
            ],
            ["期望职位：Web高级前端", "期望城市：上海"],
            [
              {
                subTitle: "Github：",
                url: "https://github.com/Redspitee",
                text: "https://github.com/Redspitee"
              }
            ],
            [
              {
                subTitle: "Gitee：",
                url: "https://gitee.com/redspite",
                text: "https://gitee.com/redspite"
              }
            ],
            [
              {
                subTitle: "技术博客：",
                url: "https://www.redspite.com",
                text: "https://www.redspite.com"
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
                  "个人博客 - 使用 React + Redux + Ts + Antd + Koa 构建的个人网站，个人简历、文章及留言版展示"
              }
            ],
            [
              {
                subTitle: false,
                text:
                  "react-go-top - 基于react的回到顶部插件,发布在npm的插件包",
                url: "https://www.redspite.com"
              }
            ],
            [
              {
                subTitle: false,
                text: " 早期博客 - 纯静态页面,百度SEO排名较靠前",
                url: "https://www.redspite.com"
              }
            ]
          ]
        },
        skill: {
          title: "技能掌握",
          list: [
            ["前端框架：Vue/React/微信小程序"],
            ["前端工具：Webpack/Sass/Less/Cordova"],
            ["后端框架：NodeJS/Koa"],
            ["数据库相关：MongoDB"],
            ["版本管理工具：Git/GitLab"]
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
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/Me/index";
</style>
