<script>
export default {
  name: "Article",
  data() {
    return {
      articleList: [
        {
          content: "React Hook 系列（二）：React hooks",
          timestamp: "2018-04-03 20:46",
          color: "#e0efea",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#e0efea",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#e0efea",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#e0efea",
        },
      ],
      pages: {
        pageSize: 5,
        pageNo: 1,
        tatol: 0,
      },
      loading: false,
    };
  },
  mounted() {},
  methods: {
    async getArticleList() {
      await this.$ajax({
        url: "/article/list.ajax",
        data: {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
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
        :timestamp="activity.timestamp"
        placement="top"
      >
        <el-card>
          <h4 class="title">{{ activity.content }}</h4>
          <el-image
            src="https://redspite.com/uploads/1587477767089.jpg"
            style="width: 30%"
            flt="contain"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <p class="desc">
            王小虎 提交于 2018/4/2 20:46王小虎 提交于 2018/4/2 20:46王小虎
            提交于 2018/4/2 20:46王小虎 提交于 2018/4/2 20:46王小虎 提交于
            2018/4/2 20:46王小虎 提交于 2018/4/2 20:46王小虎 提交于 2018/4/2
            20:46王小虎 提交于 2018/4/2 20:46王小虎 提交于 2018/4/2 20:46王小虎
            提交于 2018/4/2 20:46王小虎 提交于 2018/4/2 20:46王小虎 提交于
            2018/4/2 20:46王小虎 提交于 2018/4/2 20:46王小虎 提交于 2018/4/2
            20:46王小虎 提交于 2018/4/2 20:46王小虎 提交于 2018/4/2 20:46王小虎
            提交于 2018/4/2 20:46
          </p>
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
  }
  .el-card.is-always-shadow {
    box-shadow: none;
  }
  .el-card__body {
    padding: 0;
  }
}
</style>
