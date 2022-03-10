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
        total: 0,
      },
      classTags: [
        {
          label: "全部",
          value: "",
        },
      ],
      active: "",
      loading: true,
      moreLoading: false,
    };
  },
  mounted() {
    this.getArticleClassify();
    this.getArticleList();
  },
  methods: {
    changeClass(value) {
      if(this.active===value){
        return;
      }
      this.active = value;
      this.articleList = [];
      this.pages.pageNo = 1;
      this.pages.total = 0;
      this.loading = true;
      this.moreLoading = true;
      this.getArticleList();
    },
    async getArticleClassify() {
      let { data } = await this.$api.getArticleClassify();
      data.forEach((item) => {
        this.classTags.push({
          label: item.articleClassName,
          value: item.articleClassId,
        });
      });
    },
    async getArticleList() {
      let {
        data: { page, list },
      } = await this.$api.getArticleList({
        ...this.pages,
        articleClass: this.active,
      });
      this.pages.total = page.total;
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
      this.loading = false;
      this.moreLoading = false;
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
    getMoreList() {
      this.moreLoading = true;
      this.pages.pageNo++;
      this.getArticleList();
    },
  },
};
</script>
<template>
  <div class="Artical-box">
    <ul class="articalClass">
      <li
        :class="{ active: active === item.value }"
        v-for="item in classTags"
        :key="item.value"
        @click="changeClass(item.value)"
      >
        <span>{{ item.label }}</span>
      </li>
    </ul>
    <el-skeleton :loading="loading" animated>
      <template slot="template">
        <div style="padding: 14px">
          <el-skeleton-item variant="h1" style="width: 30%" />
          <el-skeleton-item
            variant="image"
            style="width: 50%; height: 240px; margin-top: 20px"
          />
          <el-skeleton-item variant="p" style="width: 60%; margin-top: 20px" />
          <el-skeleton-item variant="p" style="width: 60%; margin-top: 20px" />
          <el-skeleton-item variant="p" style="width: 60%; margin-top: 20px" />
        </div>
      </template>
      <template>
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
        <div class="more" v-loading="moreLoading">
          <el-button
            v-show="!moreLoading"
            v-if="pages.pageSize * pages.pageNo < pages.total"
            @click="getMoreList"
            >加载更多</el-button
          >
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="scss" >
.Artical-box {
  min-height: 2rem;
  .articalClass {
    list-style: none;
    width: 100%;
    height: 1rem;
    overflow-x: scroll;
    overflow-y: hidden;
    align-items: center;
    text-align: center;
    display: flex;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    li {
      &.active {
        color: #9bdbdb;
      }
      display: inline-block;
      span {
        cursor: pointer;
        display: inline-block;
        user-select: none;
        width: 1rem;
      }
    }
  }
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
  .more {
    text-align: center;
    height: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
