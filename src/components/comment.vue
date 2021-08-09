<script>
export default {
  name: "comment",
  props: {
    title: {
      type: String,
      default: "留言板",
    },
    articleId: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {
      dialogLogin: false,
      content: "",
      //登录
      operateForm: {
        webUrl: "",
        email: "",
        userName: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请填写昵称",
            trigger: ["blur", "change"],
          },
          {
            max: 10,
            min: 2,
            message: "昵称长度在2-10个字符之间",
            trigger: ["blur", "change"],
          },
        ],
        webUrl: {
          pattern:
            /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
          message: "网址格式错误",
          trigger: "blur",
        },
        email: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "邮箱格式错误",
            trigger: ["blur"],
          },
        ],
      },
      userName: this.$store.state.userInfo.userName,
    };
  },
  mounted() {},
  methods: {
    //重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    handleLogin() {
      this.dialogLogin = true;
    },
    handleClose() {
      this.dialogLogin = false;
      this.handleReset("dialogForm");
    },
    //提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { msg, data } = await this.$api.login(this.operateForm);
          this.$store.commit("saveUserInfo", data);
          this.userName = data.userName;
          this.dialogLogin = false;
          this.$message.success(msg);
          this.handleReset("dialogForm");
        }
      });
    },
    logout() {
      this.$store.commit("saveUserInfo", null);
      this.userName = "";
    },
    //提交评论
    async commentSub() {
      if (this.content.length < 5) {
        return this.$message.error("多说一点吧~");
      }
      let user = this.$store.state.userInfo;
      let params = {
        content: this.content,
        articleId: this.articleId,
        parentId: "111",
        userInfo: {
          userId: user.userId,
          userName: user.userName,
          email: user.email,
        },
      };
      let { msg } = await this.$api.commentSubmit(params);
      this.$message.success(msg);
      this.content = "";
    },
  },
};
</script>
<template>
  <div class="comment">
    <el-dialog title="登录" :visible.sync="dialogLogin">
      <el-form
        ref="dialogForm"
        size="medium"
        :model="operateForm"
        label-width="1.2rem"
        :rules="rules"
      >
        <el-form-item label="昵称(必填)：" prop="userName">
          <el-input v-model="operateForm.userName" placeholder="xx"></el-input>
        </el-form-item>
        <el-form-item label="邮箱(必填)：" prop="email">
          <el-input
            v-model="operateForm.email"
            placeholder="xx@xx.xx"
          ></el-input>
        </el-form-item>
        <el-form-item label="网址(选填)：" prop="webUrl">
          <el-input
            v-model="operateForm.webUrl"
            placeholder="http://xxx.xx"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <h1>{{ title }}</h1>
    <div class="words">
      <div class="words_header">
        <span>{{ userName ? `谢谢你的留言,${userName}~` : "请登录吧！" }}</span>
        <span class="login_btn" @click="handleLogin" v-if="!userName"
          >登录</span
        >
        <span class="login_btn" @click="logout" v-else>退出</span>
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
    <el-popconfirm
      title="是否要发表此条评论?"
      v-if="userName"
      confirm-button-text="确定"
      cancel-button-text="取消"
      @confirm="commentSub"
    >
      <button class="comment_sub" slot="reference">确 认</button>
    </el-popconfirm>
  </div>
</template>

<style lang="scss" >
.comment {
  h1 {
    color: #111;
    text-align: center;
    margin-bottom: 2em;
    font-size: 0.16rem;
    font-weight: 400;
  }
  .comment_sub {
    padding: 0.1rem 0;
    min-width: 1.5rem;
    margin: 0.1rem 0;
    display: block;
    float: right;
    background: #f7f3ee;
    color: #9e886c;
    border-radius: 5px;
    border: 1px solid #e7ded2;
  }
  .words {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    word-wrap: break-word;
    border-radius: 0.05rem;
    .login_btn {
      &:hover {
        text-decoration: underline;
      }
    }
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