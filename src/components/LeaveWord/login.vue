<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "login",
  props: {
    parentclick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      signStatus: true, //true登录,false注册
      //1通过,999错误,0可未填
      signUp: [
        //注册
        {
          name: `昵称(必填)`,
          required: true,
          placeholder: `xxx`,
          type: "text",
          key: "user",
          value: "",
          status: 0,
          reg: /^.{1,20}$/,
          //event: "keyup",
          tips: "长度1-20"
        },
        {
          name: `密码(必填)`,
          required: true,
          placeholder: `xxxxxx`,
          type: "password",
          key: "pwd",
          value: "",
          status: 0,
          reg: /^[\S]{4,20}$/,
          //event: "keyup",
          tips: "长度4-20"
        },
        {
          name: `邮箱(必填)`,
          required: true,
          placeholder: `xxx@xx.xxx`,
          type: "text",
          key: "email",
          value: "",
          status: 0,
          reg: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          //event: "keyup",
          tips: "请填写正确格式"
        },
        // {
        //   name: `验证码`,
        //   required: true,
        //   placeholder: `xxxxxx`,
        //   type: "text",
        //   key: "checkCode",
        //   value: "",
        //   status: 0,
        //   reg: /^[\d]{6}$/,
        //   //event: "keyup",
        //   tips: ""
        // },
        {
          name: `手机(选填)`,
          required: false,
          placeholder: `xxxxxx`,
          type: "text",
          key: "phone",
          value: "",
          status: 0,
          reg: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
          //event: "keyup",
          tips: ""
        },
        {
          name: `QQ(选填)`,
          required: false,
          placeholder: `xxxxxx`,
          type: "text",
          key: "qq",
          value: "",
          status: 0,
          reg: /^[\d]{5,10}$/,
          //event: "keyup",
          tips: "长度5-10，且必须为数字"
        },
        {
          name: `微信(选填)`,
          required: false,
          placeholder: `xxxxxx`,
          type: "text",
          key: "wechat",
          value: "",
          status: 0,
          reg: /^[\S]{5,20}$/,
          //event: "keyup",
          tips: "长度5-10"
        },
        {
          name: `网站(选填)`,
          required: false,
          placeholder: `http://xxx`,
          type: "text",
          key: "weburl",
          value: "",
          status: 0,
          reg: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
          //event: "keyup",
          tips: "请填写正确格式"
        }
      ],
      signIn: [
        {
          name: `昵称`,
          required: true,
          placeholder: `昵称 / 邮箱`,
          type: "text",
          key: "userOrEmail",
          value: "",
          status: 0,
          reg: /./,
          //event: "keyup",
          tips: ""
        },
        {
          name: `密码`,
          required: true,
          placeholder: `xxxxxx`,
          type: "password",
          key: "pwd",
          value: "",
          status: 0,
          reg: /^[\S]{4,20}$/,
          //event: "keyup",
          tips: "长度4-20"
        }
      ],
      click: true
    };
  },
  watch: {
    parentclick(newval) {
      if (newval) {
        this.click = newval;
      }
    }
  },
  computed: {
    checkSignUp() {
      return this.signUp.every(item => {
        if (item.key === "user" || item.key === "pwd" || item.key === "email") {
          return item.status === 1;
        } else {
          return item.status!=999;
        }
      });
    },
    checkSignIn() {
      return this.signIn.every(item => {
        return item.status === 1;
      });
    },
    pointer() {
      if (this.click) {
        return "";
      } else {
        return "pointer-events: none;padding-left: 35px;background-color:#65b3fc;";
      }
    }
  },
  methods: {
    ...mapMutations(["userStatus"]),
    // ...mapActions(["messagePush"]),
    verifyReg(item, ele) {
      // if (item.event === "keyup") {
      //   this.$set(item, "event", "keyup");
      // }
      if (item.value === "" && item.required === false) {
        this.$set(item, "status", "");
        return;
      }
      if (item.reg.test(item.value)) {
        this.$set(item, "status", 1);
      } else {
        this.$set(item, "status", 999);
      }
    },
    showDialog() {
      this.$emit("dialog", false);
    },
    setHeight(bool) {
      this.signStatus = bool;
    },
    getRequestParams(obj) {
      let params = {};
      obj.forEach(element => {
        if (element.status === 1) {
          params[element.key] = element.value;
        } else if (element.status === 999) {
        }
      });
      return params;
    },
    setData(params) {
      // this.messagePush({ flag: "pass", text: params.returnMsg });
      this.userStatus(params.data.user);
      this.$emit("dialog", false);
      localStorage.setItem("token", params.data.token);
      this.signUp.forEach(item => {
        item.value = "";
        item.status = 0;
      });
      this.signIn.forEach(item => {
        item.value = "";
        item.status = 0;
      });
    },
    userSignIn() {
      if (this.click) {
        let params = this.getRequestParams(this.signIn);
        this.click = false;
        this.$http({
          url: "/signIn.ajax",
          data: params
        })
          .then(result => {
            if (result.data.returnCode === 0) {
              this.setData(result.data);
            } else {
              this.click = true;
              // this.messagePush({ flag: "err", text: result.data.returnMsg });
            }
          })
          .catch(err => {
            this.click = true;
            console.log(err);
          });
      }
    },
    userSignUp() {
      if (this.click) {
        let params = this.getRequestParams(this.signUp);
        this.click = false;
        this.$http({
          url: "/signUp.ajax",
          data: params
        })
          .then(result => {
            if (result.data.returnCode === 0) {
              this.setData(result.data);
            } else {
              this.click = true;
              // this.messagePush({ flag: "err", text: result.data.returnMsg });
            }
          })
          .catch(err => {
            this.click = true;
            console.log(err);
          });
      }
    }
  }
};
</script>
<template>
  <div class="ant-modal-wrap" @click.self="showDialog">
    <div class="ant-modal" style="width: 520px;">
      <div class="ant-modal-content">
        <div class="table-header">
          <div :class="signStatus?'active':''" @click="setHeight(true)">登 录</div>
          <div :class="signStatus?'':'active'" @click="setHeight(false)">注 册</div>
        </div>

        <ul class="table-body" ref="ul">
          <template v-if="signStatus">
            <li v-for="(item,index) in signIn" :key="index">
              <div>
                <span v-text="item.name" :class="item.status===999?'error':''"></span>
                <input
                  :class="item.status===999?'error':''"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  v-model.trim="item.value"
                  @input="verifyReg(item)"
                />
              </div>
              <svg
                v-show="item.status===1"
                viewBox="64 64 896 896"
                class="pass"
                fill="currentColor"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                />
              </svg>
              <svg
                v-show="item.status===999"
                viewBox="64 64 896 896"
                class="err"
                fill="currentColor"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
                />
              </svg>
            </li>
          </template>
          <template v-else>
            <li v-for="(item,index) in signUp" :key="index">
              <div>
                <span v-text="item.name" :class="item.status===999?'error':''"></span>
                <input
                  autocomplete="new-password"
                  :class="item.status===999?'error':''"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  v-model.trim="item.value"
                  @input="verifyReg(item)"
                />
              </div>
              <svg
                v-show="item.status===1"
                viewBox="64 64 896 896"
                class="pass"
                fill="currentColor"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                />
              </svg>
              <svg
                v-show="item.status===999"
                viewBox="64 64 896 896"
                class="err"
                fill="currentColor"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
                />
              </svg>
            </li>
          </template>
        </ul>
        <div class="table-footer">
          <button type="button" @click.self="showDialog">取 消</button>
          <button
            :style="pointer"
            :class="checkSignIn?'':'disabled'"
            type="button"
            @click="userSignIn"
            v-if="signStatus"
          >
            <i class="anticon" v-show="!click">
              <svg
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
                fill="currentColor"
                class="waiting"
              >
                <path
                  d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
                />
              </svg>
            </i>
            <span>登 录</span>
          </button>
          <button
            :style="pointer"
            :class="checkSignUp?'':'disabled'"
            type="button"
            @click="userSignUp"
            v-else
          >
            <i class="anticon" v-show="!click">
              <svg
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
                fill="currentColor"
                class="waiting"
              >
                <path
                  d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
                />
              </svg>
            </i>
            <span>注 册</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
.ant-modal-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
}
.ant-modal {
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  position: relative;
  top: 100px;
  width: auto;
  margin: 0 auto;
  padding: 0 0 24px;
}
.ant-modal-content {
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.table-header {
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4px 4px 0 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  & > div {
    transition: all 0.3s linear;
    flex-basis: 50%;
    padding: 16px 0;
    border-radius: 4px 4px 0 0;
    box-shadow: inset 0 -1px 5px rgba(7, 7, 7, 0.671);
    &:first-of-type {
      border-right: 1px solid #e8e8e8;
    }
    &.active {
      border-bottom: none;
      box-shadow: none;
    }
  }
}

.table-body {
  // height: 140px;
  max-height: 500px;
  overflow: hidden;
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  transition: all 0.3s linear;
  li {
    position: relative;
    line-height: 2.2;
    // height: 32px;
    zoom: 1;
    margin-bottom: 1em;
    box-sizing: border-box;
    border-collapse: initial;
    border-spacing: 0;
    height: auto;
    div {
      height: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      span {
        flex-basis: 20%;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        background-color: #fafafa;
        padding: 0 11px;
        // word-break: keep-all;
        // white-space: nowrap;
        min-width: 90px;
        &.error {
          color: #f5222d;
          background-color: #fff;
          border-color: #f5222d;
        }
      }
      > input {
        flex-basis: 80%;
        margin-left: -1px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.65);
        &::placeholder {
          color: #ccc;
        }
        &:focus {
          outline: 0;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
        &:focus,
        &:hover {
          border-color: #40a9ff;
          border-right-width: 1px !important;
        }
        &.error {
          border-color: #f5222d;
          &:focus {
            outline: 0;
            box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
          }
          &:focus,
          &:hover {
            border-color: #ff4d4f;
            border-right-width: 1px !important;
          }
        }
      }
    }
    .pass,
    .err {
      color: #52c41a;
      position: absolute;
      top: 50%;
      right: 0;
      z-index: 1;
      width: 32px;
      height: 15px;
      margin-top: -7.5px;
      text-align: center;
      animation: diffZoomIn1 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      pointer-events: none;
    }
    .err {
      color: #f5222d;
    }
    span,
    input {
      transition: all 0.3s;
      font-size: 14px;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
  }
}
.table-footer {
  padding: 10px 16px;
  text-align: center;
  border-top: 1px solid #e8e8e8;
  border-radius: 0 0 4px 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
  box-sizing: border-box;
  text-decoration: none;
    position: relative;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    &.disabled {
      border-color: #ececec !important;
      background-color: #fff !important;
      color: #ccc !important;
      pointer-events: none;
    }
    &:first-of-type {
      color: rgba(0, 0, 0, 0.65);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
      background-color: #fff;
      &:hover {
        color: #40a9ff;
        background-color: #fff;
        border-color: #40a9ff;
      }
      &:active {
        color: #096dd9;
        background-color: #fff;
        border-color: #096dd9;
      }
    }
    &:last-of-type {
      color: #fff;
      background-color: #1890ff;
      border-color: #1890ff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      &:hover {
        color: #fff;
        background-color: #40a9ff;
        border-color: #40a9ff;
      }
      &:active {
        color: #fff;
        background-color: #096dd9;
        border-color: #096dd9;
      }
    }
  }
}
.anticon{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10%;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  .waiting {
  
    display: inline-block;
    animation: waiting1 1s linear infinite;
  }
}

@media (max-width: 767px) {
  .ant-modal {
    max-width: calc(100vw - 16px);
    margin: 8px auto;
  }
}
@keyframes waiting1 {
  100% {
    transform: rotate(1turn);
  }
}

</style>