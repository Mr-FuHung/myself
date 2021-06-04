<template>
  <div class="me">
    <div v-for="row in userData" :key="row.title">
      <div class="title">{{ row.title }}</div>
      <div class="default">
        <el-row v-for="(col, index) in row.list" :key="index">
          <el-col
            v-for="el in col"
            :key="el.text"
            :class="el.class"
            v-bind="row.layout"
            :tag="el.url && 'a'"
            :href="el.url"
          >
            {{ el.text }}
          </el-col>
        </el-row>
      </div>
    </div>
    ......
  </div>
</template>
<script>
export default {
  name: "me",
  data() {
    this.userData = [
      {
        title: "联系方式",
        layout: {
          xs: 24,
          sm: 8,
        },
        list: [
          [
            {
              text: "手机：17513131341",
            },
            {
              text: "Email：1002150110@qq.com",
            },
            {
              text: location.origin,
            },
          ],
        ],
      },
      {
        title: "个人信息",
        layout: {
          xs: 24,
          sm: 12,
        },
        list: [
          [
            {
              text: "FH | 男 | 1996",
            },
            {
              text: "前端开发 | 3 年工作经验",
            },
          ],
          [
            {
              text: "期望职位：Web高级前端",
            },
            { text: "期望城市：上海" },
          ],
          [
            {
              url: "https://github.com/Mr-FuHung",
              text: "Github：https://github.com/Mr-FuHung",
            },
          ],
          [
            {
              url: "https://gitee.com/Mr-FuHung",
              text: "Gitee：https://gitee.com/Mr-FuHung",
            },
          ],
          [
            {
              url: "http://47.240.73.78:8888",
              text: "技术博客：http://47.240.73.78",
            },
          ],
        ],
      },
      {
        title: "开源项目",
        list: [
          [
            {
              url: "https://www.redspite.com",
              text:
                "个人博客 - 使用 Vue + Vue-Router + VueX + Vue-cli 构建的个人网站，个人简历、文章及留言版展示",
            },
          ],
          [
            {
              text: "nodeMiniServer - 使用原生node搭建的迷你服务",
              url: "https://github.com/Mr-FuHung/nodeMiniServer",
            },
          ],
          [
            {
              text:
                " 早期博客 - 纯静态页面（半成品），挂载在github访问速度很慢",
              url: "https://mr-fuhung.github.io/vitae/dist/index.html",
            },
          ],
        ],
      },
      {
        title: "技能掌握",
        list: [
          [{ text: "前端框架：Vue/Jquery/微信小程序" }],
          [{ text: "前端工具：Webpack/Sass" }],
          [{ text: "后端框架：NodeJS/Express" }],
          [{ text: "数据库相关：Mysq;" }],
          [{ text: "版本管理工具：Git/Svn" }],
        ],
      },
      {
        title: "工作经历",
        list: [
          [{ text: `● 成都清风竞技公司 （ 2016 年 3 月 ~ 2016 年 10 月 ）` }],
          [{ text: `官网页面更新与维护`, class: "bold" }],
          [{ text: `- JQ + CSS3 + Bootstrap + Html5` }],
          [{ text: `- 负责官网静态页开发及简单交互` }],
          [{ text: `- 负责网站移动端、各浏览器适配网页适配` }],
        ],
      },
    ];
    return {};
  },
};
</script>

<style lang="scss" scoped>
.me {
  .title {
    font-weight: 900;
    font-size: 0.18rem;
    margin-bottom: 0.2rem;
    margin-left: -0.2rem;
    padding-left: 0.15rem;
    border-left: 0.05rem solid #8fe3e3;
    text-align: left;
    color: #111;
  }
}

.default {
  font-size: 14px;
  border: 2px solid transparent;
  border-radius: 5px;
  margin-bottom: 20px;
  color: #3f1c1c;
  background-color: #f5f5f5;
  a {
    color: #3f1c1c;
    &:hover {
      text-decoration: underline;
    }
  }

  .el-col {
    padding: 0.1rem 0.15rem;
  }
  .bold {
    font-weight: 900;
  }
}
</style>
