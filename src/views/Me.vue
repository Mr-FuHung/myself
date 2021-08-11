<template>
  <div class="me">
    <download />
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
    <br>
    等
  </div>
</template>
<script>
import download from "@/components/download.vue";
export default {
  name: "me",
  components: {
    download,
  },
  data() {
    this.userData = [
      {
        title: "个人信息",
        layout: {
          xs: 24,
          sm: 12,
        },
        list: [
          [
            {
              text: `符洪 | 男 | 1996`,
            },

            {
              text: "前端开发 | 4年工作经验",
            },
          ],
          [
            {
              text: `期望职位：Web高级前端`,
            },

            {
              text: "期望城市：武汉 | 上海",
            },
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
              url: "http://47.243.104.13/blog",
              text: "技术博客：http://47.243.104.13/blog",
            },
          ],
          [
            {
              url: "http://47.243.104.13",
              text: "后台管理：http://47.243.104.13",
            },
          ],
        ],
      },
      {
        title: "联系方式",
        layout: {
          xs: 24,
          sm: 8,
        },
        list: [
          [
            {
              text: `网站：${location.origin}`,
            },

            {
              text: "Email：1002150110@qq.com",
            },
          ],
          [
            {
              text: "手机：17513131341",
            },
            {
              text: "微信：1002150110",
            },
          ],
        ],
      },
      {
        title: "GitHub开源项目",
        list: [
          [
            {
              url: "https://github.com/Mr-FuHung/myself",
              text: "个人博客 - 使用 Vue2 + Vue-Router + VueX + Vue-cli 构建的个人网站，个人简历、文章及留言版展示",
            },
          ],
          [
            {
              url: "https://github.com/Mr-FuHung/manage",
              text: "后台管理 - 使用 Vue 3 全家桶 + ElementPlus 构建的统一后台管理网站",
            },
          ],
          [
            {
              url: "https://github.com/Mr-FuHung/manage-server",
              text: "后台服务 - 使用   Koa2 + MongoDB 构建的后台管理服务",
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
              text: " 早期博客 - 纯静态页面（半成品），挂载在github访问速度很慢",
              url: "https://mr-fuhung.github.io/vitae/dist/index.html",
            },
          ],
        ],
      },
      {
        title: "技能掌握",
        list: [
          [{ text: "前端框架：Vue/Jquery/微信小程序" }],
          [{ text: "前端工具：Webpack/Sass/..." }],
          [{ text: "后端框架：NodeJS/Express/Koa2" }],
          [{ text: "数据库相关：Mysq/MongoDB;" }],
          [{ text: "版本管理工具：Git/Svn" }],
        ],
      },
      {
        title: "工作经历",
        list: [
          [{ text: `● 长期至今  统一运营平台(UOP)项目  PC端` }],
          [{ text: `负责日常页面开发、更新与维护`, class: "bold" }],
          [
            {
              text: `- 技术栈：JQ + CSS3 + Bootstrap + Html5 + Vue + Mysql + express`,
            },
          ],
          [{ text: `- 消息中心、权限管理、公共配置、运维管理...` }],
        ],
      },
    ];
    return {};
  },
};
</script>

<style lang="scss" >
.desc_label {
  width: 0.4rem;
}
@import "@/assets/scss/base.scss";
.me {
  .title {
    font-weight: 900;
    font-size: 0.18rem;
    margin-bottom: 0.2rem;
    margin-left: -0.2rem;
    padding-left: 0.15rem;
    border-left: 0.05rem solid $--color-primary;
    text-align: left;
    color: #111;
  }
  .el-descriptions__body {
    background: transparent;
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
