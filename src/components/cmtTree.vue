<template>
  <div class="cmtTree">
    <el-skeleton :loading="loading" animated>
      <template slot="template">
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" style="margin-left: 10%; width: 90%" />
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" style="margin-left: 10%; width: 90%" />
        <el-skeleton-item variant="text" style="margin-left: 10%; width: 90%" />
      </template>
      <template>
        <div v-for="(cmt, index) in list" :key="cmt._id">
          <p>{{ pages.total - index }}楼</p>
          <div class="cmtBox">
            <div class="headPic">
              <span v-text="cmt.userInfo.userName.slice(0, 1)"></span>
            </div>
            <div class="commentParent">
              <div class="header">
                <span class="name" v-text="cmt.userInfo.userName"></span>
                <el-tooltip
                  :content="formateDate(new Date(cmt.createTime))"
                  placement="top"
                >
                  <span
                    class="date"
                    v-text="dateDiff(new Date(cmt.createTime))"
                  ></span>
                </el-tooltip>
              </div>
              <div class="content" v-text="cmt.content"></div>
              <div class="replyBtn" v-if="$store.state.userInfo.userName">
                <el-popover
                  placement="bottom-start"
                  :width="330"
                  trigger="click"
                  ref="popover"
                >
                  <comment
                    :title="`回复 @${cmt.userInfo.userName}：`"
                    :showHeader="false"
                    :reply="{
                      replyName: cmt.userInfo.userName,
                      replyId: cmt.userInfo.userId,
                      parentId: cmt._id,
                    }"
                    :cmtTreeUpDate="updateTreeList"
                  />
                  <span slot="reference">回复</span>
                </el-popover>
                <el-popconfirm
                  confirm-button-text="确定"
                  v-if="userInfoVueX.userId == cmt.userInfo.userId"
                  cancel-button-text="取消"
                  title="确定删除吗？"
                  @confirm="del(cmt, list, index)"
                >
                  <span slot="reference" class="del">删除</span>
                </el-popconfirm>
              </div>
            </div>
          </div>
          <div
            class="nested"
            v-for="(child, ind) in cmt.children"
            :key="child._id"
          >
            <div class="cmtBox">
              <div class="headPic">
                <span v-text="child.userInfo.userName.slice(0, 1)"></span>
              </div>
              <div class="commentParent">
                <div class="header">
                  <span class="name" v-text="child.userInfo.userName"></span>
                  <el-tooltip
                    :content="formateDate(new Date(child.createTime))"
                    placement="top"
                  >
                    <span
                      class="date"
                      v-text="dateDiff(new Date(child.createTime))"
                    ></span>
                  </el-tooltip>
                </div>
                <div
                  class="content"
                  v-text="`@${child.replyName}：${child.content}`"
                ></div>
                <div class="replyBtn" v-if="userInfoVueX.userName">
                  <el-popover
                    placement="bottom-start"
                    :width="330"
                    trigger="click"
                    ref="popover"
                  >
                    <comment
                      :title="`回复 @${cmt.userInfo.userName}：`"
                      :showHeader="false"
                      :reply="{
                        replyName: child.userInfo.userName,
                        replyId: child.userInfo.userId,
                        parentId: cmt._id,
                      }"
                      :ref="`reply${child._id}`"
                      :cmtTreeUpDate="updateTreeList"
                    />
                    <span slot="reference">回复</span>
                  </el-popover>
                  <el-popconfirm
                    confirm-button-text="确定"
                    v-if="userInfoVueX.userId == child.userInfo.userId"
                    cancel-button-text="取消"
                    title="确定删除吗？"
                    @confirm="del(child, cmt.children, ind)"
                  >
                    <span slot="reference" class="del">删除</span>
                  </el-popconfirm>
                </div>
              </div>
            </div>
          </div>
          <div class="line"></div>
        </div>
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

<script>
import comment from "@/components/comment.vue";
import utils from "@/utils/utils.js";
export default {
  name: "cmtTree",
  computed: {
    userInfoVueX() {
      return this.$store.state.userInfo;
    },
  },
  components: {
    comment,
  },
  props: {
    articleId: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {
      moreLoading: false,
      loading: true,
      list: [],
      pages: {
        pageSize: 5,
        pageNo: 1,
        total: 0,
      },
    };
  },
  mounted() {
    this.getTreeList();
  },
  methods: {
    dateDiff: utils.dateDiff,
    formateDate: utils.formateDate,
    async del({ parentId, _id }, list, index) {
      let { data, msg } = await this.$api.delComment({ parentId, _id });
      if (data) {
        list.splice(index, 1);
        this.pages.total--;
      }
      this.$message.success(msg);
    },
    updateTreeList() {
      this.list = [];
      this.pages.pageNo = 1;
      this.getTreeList();
    },
    getMoreList() {
      this.moreLoading = true;
      this.pages.pageNo++;
      this.getTreeList();
    },
    async getTreeList() {
      let {
        data: { list, page },
      } = await this.$api.getCmtTree({
        ...this.pages,
        articleId: this.articleId,
      });
      this.pages.total = page.total;
      list.forEach((item) => {
        this.list.push(item);
      });
      this.loading = false;
      this.moreLoading = false;
    },
  },
};
</script>

<style lang='scss'>
.cmtTree {
  color: #787978;
  margin-top: 0.2rem;
  .more {
    text-align: center;
    height: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .nested {
    margin-left: 0.44rem;
  }
  .line {
    display: block;
    clear: both;
    width: 100%;
    background: #e8e8e8;
    min-width: 100%;
    height: 1px;
    margin: 0.25rem 0;
  }
  .cmtBox {
    display: flex;
    padding: 0.16rem 0;
  }
  .replyBtn,
  .del {
    padding-right: 0.1rem;
    color: rgba(0, 0, 0, 0.45);
    font-size: 0.12rem;
    cursor: pointer;
    transition: color 0.3s;
    user-select: none;
    margin-top: 0.12rem;
  }
  .del {
    color: #e38fa9;
    margin-left: 0.2rem;
  }
  .content {
    overflow: hidden;
    text-align: justify;
    word-wrap: break-word;
  }
  .commentParent {
    word-wrap: break-word;
    .header span {
      height: 0.18rem;
      padding-right: 0.08rem;
      font-size: 0.12rem;
      line-height: 0.18rem;
    }
  }
  .name {
    color: rgba(0, 0, 0, 0.45);
  }
  .date {
    color: #ccc;
    white-space: nowrap;
    cursor: auto;
  }
  .headPic {
    margin-right: 0.12rem;
    cursor: pointer;
    span {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: #fff;
      font-size: 0.14rem;
      list-style: none;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      vertical-align: middle;
      background: #9bdbdb;
      width: 0.32rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius: 50%;
    }
  }
}
</style>