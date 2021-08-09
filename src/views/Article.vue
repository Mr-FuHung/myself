<script>
import utils from "@/utils/utils.js";
export default {
  name: "Article",
  data() {
    return {
      articleList: [],
      pages: {
        pageSize: 5,
        pageNo: 1,
        tatol: 0,
      },
      loading: true,
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
      this.loading = true;
      let {
        data: { page, list },
      } = await this.$api.getArticleList(this.pages);
      this.pages.tatol = page.tatol;
      this.loading = false;
      list.forEach((item) => {
        this.articleList.push({
          title: item.title,
          timestamp: utils.formateDate(
            new Date(item.createTime),
            "YYYY-MM-DD HH:mm"
          ),
          color: "#e0efea",
          coverPic: item.coverPic,
          desc: item.desc,
          articleId: item.articleId,
        });
      });
    },
    toDetail(id, el) {
      if (el) {
        if (el.target.className === "el-timeline-item__timestamp is-top") {
          return this.$router.push({
            path: "/article/detail",
            query: {
              id: id,
            },
          });
        }
        return;
      }
      return this.$router.push({
        path: "/article/detail",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
<template>
  <div
    class="Artical-box"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in articleList"
        :key="index"
        :color="activity.color"
        size="large"
        @click.native="toDetail(activity.articleId, $event)"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <el-card>
          <h4 class="title pointer">
            <el-link @click="toDetail(activity.articleId)">{{
              activity.title
            }}</el-link>
          </h4>
          <el-image
            v-for="imgUrl in activity.coverPic"
            :key="imgUrl"
            :src="imgUrl"
            style="width: 50%"
            flt="contain"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <p class="desc" v-text="activity.desc"></p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" >
.Artical-box {
  min-height: 2rem;
  .el-timeline-item__tail {
    border-color: #f7f3ee;
  }
  .el-timeline-item__wrapper {
    padding-left: 0.3rem;
    top: -0.07rem;
  }
  .el-timeline-item__timestamp {
    position: relative;
    display: inline-block;
    padding: 0 0.1rem;
    background: #f7f3ee;
    font-size: 0.12rem;
    line-height: 0.3rem;
    margin-left: 0.16rem;
    cursor: pointer;
    transition: margin 0.2s;
    margin-bottom: 0;
    &::before {
      content: "";
      position: absolute;
      left: -0.16rem;
      top: 0;
      border-right: 0.16rem solid #f7f3ee;
      border-top: 0.15rem dashed transparent;
      border-bottom: 0.15rem dashed transparent;
      width: 0;
      height: 0;
      line-height: 0;
    }
    &:hover {
      margin-left: 0.05rem;
      background-color: #e7d9ba;
      &::before {
        border-right-color: #e7d9ba;
      }
    }
  }
  .el-card {
    background-color: transparent;
    border: none;
    .title {
      margin: 0.2rem 0;
    }
    .desc {
      width: 85%;
      line-height: 0.15rem;
      margin: 0.2rem 0;
      font-size: 0.1rem;
      text-align: justify;
      color: #787978;
    }
    .pointer {
      cursor: pointer;
    }
  }
  .el-card.is-always-shadow {
    box-shadow: none;
  }
  .el-card__body {
    padding: 0;
  }
}
</style>
