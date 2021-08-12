<script>
import utils from "@/utils/utils.js";
import comment from "@/components/comment.vue";
import cmtTree from "@/components/cmtTree.vue";
export default {
  name: "detail",
  components: {
    comment,
    cmtTree,
  },
  mounted() {
    this.getDetail(this.$route.query.id);
  },
  data() {
    return {
      loading: true,
      article: {
        title: "",
        content: "",
        desc: "",
        createTime: "",
      },
    };
  },
  methods: {
    async getDetail(id) {
      let { data } = await this.$api.getArticleDetail({ id });
      data.createTime = utils.formateDate(
        new Date(data.createTime),
        "YYYY-MM-DD"
      );
      Object.assign(this.article, data);
      this.loading = false;
    },
    cmtTreeUpDate() {
      this.$refs.cmtTree.pages.pageNo = 1;
      this.$refs.cmtTree.updateTreeList();
    },
  },
};
</script>
<template>
  <div class="article-detail">
    <el-skeleton :loading="loading" animated>
      <template slot="template">
        <el-skeleton :rows="6" animated />
      </template>
      <template>
        <h1 class="title" v-text="article.title"></h1>
        <div class="desc" v-text="article.desc"></div>
        <div class="content" v-html="article.content"></div>
        <div class="artical-detail-date" v-text="article.createTime"></div>
      </template>
    </el-skeleton>

    <comment
      title="评论"
      :articleId="$route.query.id"
      :cmtTreeUpDate="cmtTreeUpDate"
    />
    <cmtTree :articleId="$route.query.id" ref="cmtTree" />
  </div>
</template>
<style lang="scss" >
.article-detail > * {
  margin-bottom: 0.2rem;
}
.article-detail .content > * {
  margin-bottom: 0.2rem;
}
.article-detail {
  xmp,
  code,
  pre {
    white-space: pre-wrap;
  }
  color: #787978;
  .title {
    color: #111;
    text-align: center;
    font-size: 0.18rem;
    font-weight: 400;
  }
  .desc {
    font-size: 0.16rem;
    text-align: justify;
    margin: 0.3rem 0 0.2rem;
  }
  .artical-detail-date {
    color: #948c76;
    margin: 0.7rem 0 0.5rem;
    font-size: 0.08rem;
  }
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
    color: #333;
  }
  pre {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  /* ul ol 样式 */
  ul,
  ol {
    margin: 10px 0 10px 20px;
  }
  a:hover {
    text-decoration: underline;
  }
}
</style>