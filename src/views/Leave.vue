<script>
import { mapMutations } from "vuex";
export default {
  name: "Leave",
  data() {
    return {
      content: "",
      list: [
        {
          parentId: null,
          _id: 11,
          newsId: "news11",
          userInfo: {
            city: "上海",
            ip: "10.50.115.153",
            userName: "AAA",
            createTime: "2020-01-01",
          },
          content: "我是一楼",
          createTime: "2020-01-01",
          status: 0,
          valid: 0,
          children: [
            {
              parentId: 11,
              writeBackId: 11,
              _id: 222,
              newsId: "news11",
              userInfo: {
                city: "上海",
                ip: "10.50.115.153",
                userName: "BBB",
                createTime: "2020-01-01",
              },
              content: "回复一楼",
              createTime: "2020-01-01",
              status: 0,
              valid: 0,
            },
            {
              parentId: 11,
              writeBackId: 222,
              _id: 333,
              newsId: "news11",
              userInfo: {
                city: "上海",
                ip: "10.50.115.153",
                userName: "AAA",
                createTime: "2020-01-01",
              },
              content: "回复一楼中楼",
              createTime: "2020-01-01",
              status: 0,
              valid: 0,
            },
          ],
        },
      ],
    };
  },
  components: {
    // essay: () => import("../components/Live/essay.vue"),
  },
  created() {},
  watch: {},
  methods: {},
};
</script>
<template>
  <div class="leave">
    <h1>留言板</h1>
    <div class="words">
      <div class="words_header">
        <span>请登录吧！</span>
        <span>登录</span>
      </div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10 }"
        maxlength="500"
        show-word-limit
        resize="vertical"
        v-model="content"
      ></el-input>
    </div>
  </div>
</template>

<style lang="scss" >
@import "@/assets/scss/base.scss";
.leave {
  h1 {
    color: #111;
    text-align: center;
    margin-bottom: 2em;
    font-size: 0.16rem;
    font-weight: 400;
  }
  .words {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    word-wrap: break-word;
    border-radius: 0.05rem;
    .words_header {
      position: absolute;
      background: #f7f3ee;
      display: flex;
      justify-content: space-between;
      line-height: 0.4rem;
      padding: 0 0.1rem;
      border-radius: 0.05rem 0.05rem 0 0;
      z-index: 3;
      left: 1px;
      top: 1px;
      right: 1px;
    }
    .el-textarea__inner {
      font-size: 0.14rem;
      background: transparent;
      width: 100%;
      display: block;
      padding-top: 0.5rem;
      border-radius: 0.05rem;
    }
  }
}
</style>