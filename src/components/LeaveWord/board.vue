<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "board",
  props: {
    showtitle: {
      type: Boolean,
      default: true
    },
    reuser: {
      type: [Object, Array],
      default: () => {
        {
        }
      }
    }
  },
  data() {
    return {
      content: ""
    };
  },
  methods: {
    ...mapMutations(["userStatus"]),
    // ...mapActions(["messagePush"]),
    showDialog() {
      this.$emit("dialog", true);
    },

    quit() {
      localStorage.removeItem("token");
      this.userStatus(undefined);
      // this.messagePush({ flag: "pass", text: "已退出" });
    },
    leave() {
      if (this.content != "") {
        this.$http({
          url: "/leaveword/Leave.ajax",
          data: {
            content: this.content,
            user: this.$store.state.user
          }
        })
          .then(result => {
            if (result.data.returnCode === 0) {
              // this.messagePush({ flag: "pass", text: result.data.returnMsg });
              this.$emit("getleaveword", 1);
              this.content = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // this.messagePush({ flag: "err", text: "多说一些" });
      }
    },
    writeBack() {
      if (this.content != "") {
        let params = {
          content: this.content,
          user: this.$store.state.user,
          o_id: this.reuser.o_id
        };
        this.reuser.i_id ? (params.i_id = this.reuser.i_id) : "";
        this.reuser.i_user ? (params.i_user = this.reuser.i_user) : "";

        this.$http({
          url: "/leaveword/setWriteBack.ajax",
          data: params
        })
          .then(result => {
            if (result.data.returnCode === 0) {
              this.$emit("hidewriteback");
              // this.messagePush({ flag: "pass", text: result.data.returnMsg });
              this.$emit("updatelwriteback", this.reuser.o_id);
              this.content = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // this.messagePush({ flag: "err", text: "多说一些" });
      }
    }
    // hideWriteBack(){

    // }
  }
};
</script>
<template>
  <div class="Bjq">
    <div class="editor_div">
      <div class="editor_toolbar">
        <div>
          <i class="iconfont icon-moon">
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 36 36"
              style="enable-background:new 0 0 36 36;vertical-align: middle;margin-bottom: 2px"
            >
              <path
                style="fill:#010101;"
                d="M21.535,28.115c-0.184,0.161-0.523-0.158-1.25,0.021c0.854-1.885,1.383-3.546,1.639-5.095
	c1.771-2.114,7.654-9.445,7.752-13.658c0.045-1.905-0.414-3.365-1.365-4.338c-0.918-0.94-2.293-1.417-4.086-1.417
	c-0.123,0-0.244,0.002-0.363,0.006c-1.809,0.061-4.246,1.337-5.08,3.632c-1.158-1.629-3.115-2.241-4.662-2.241
	c-0.438,0-0.85,0.047-1.225,0.141c-1.916,0.479-3.18,1.303-3.863,2.518c-0.678,1.204-0.73,2.753-0.158,4.604
	c1.225,3.938,8.629,9.214,11.104,10.89c-0.217,1.07-0.404,2.149-0.727,3.186c-0.467,1.502-1.385,2.373-3.178,2.403
	c-1.615,0.025-3.455-0.105-4.922,1.979c1.758,0.431,3.268,0.972,4.818,1.143c1.865,0.205,3.773,0.238,5.645,0.084
	c1.789-0.147,3.557-0.613,5.314-1.022c0.08-0.02,0.152-1.094-0.074-1.253C25.064,28.423,23.277,26.576,21.535,28.115z M9.828,11.991
	C9.34,10.413,9.365,9.129,9.902,8.174c0.543-0.962,1.6-1.628,3.234-2.037c0.293-0.073,0.633-0.111,0.982-0.111
	c1.586,0,3.689,0.764,4.395,2.918l0.867,2.648l0.107-2.784c0.109-2.849,2.924-4.124,4.406-4.173c0.107-0.004,0.219-0.006,0.33-0.006
	c1.535,0,2.637,0.365,3.371,1.115c0.754,0.773,1.117,1.99,1.08,3.616c-0.076,3.299-4.301,9.027-6.578,11.882
	c0.031-1.457-0.197-2.839-0.699-4.229h0.006l0.799-3.302c0,0-0.801,0.713-1.318,2.064c-0.693-1.494-1.66-3.035-2.904-4.738
	c0.834,2.662,2.377,5.853,2.377,8.585l-0.201,2.463C17.453,20.219,10.891,15.405,9.828,11.991z"
              />
            </svg>
          </i>
          <span v-if="showtitle">{{$store.state.user?`谢谢亲的留言,${$store.state.user}~`:'先登录吧！'}}</span>
          <span v-else>@{{reuser.user}} :</span>
          <span class="fr" v-if="$store.state.user" @click="quit" v-show="showtitle">退出</span>
          <span class="fr" v-else @click="showDialog" v-show="showtitle">登录</span>
        </div>
      </div>
      <div class="editor_textarea">
        <textarea class="ant-input" v-model.trim="content"></textarea>
      </div>
    </div>
    <button v-show="$store.state.user" v-if="showtitle" @click="leave">确认</button>
    <button v-show="$store.state.user" v-else @click="writeBack">回复</button>
  </div>
</template>

<style lang="scss" scoped>
.Bjq {
  margin: 2em 0 1em;
  padding: 0 1em;
  overflow: hidden;
  button {
    padding: 10px 0;
    min-width: 150px;
    margin: 10px 0;
    display: block;
    float: right;
    background: #f7f3ee;
    color: #9e886c;
    border-radius: 5px;
    border: 1px solid #e7ded2;
  }
  .icon-moon {
    color: #e38fa9;
    font-size: 18px;
    margin-right: 5px;
  }
  .iconfont {
    color: #e38fa9;
    font-size: 18px;
    margin-right: 5px;
    font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
  }
  .editor_div {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    word-wrap: break-word;
    border-radius: 5px;
    .editor_toolbar {
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      background: #f7f3ee;
      border-radius: 5px 5px 0 0;
      text-align: left;
      margin-bottom: 0;
      overflow: hidden;
      position: absolute;
      z-index: 3;
      left: 1px;
      top: 1px;
      right: 1px;
      .fr {
        float: right;
        cursor: pointer;
        padding: 0 15px;
      }
    }
    .editor_textarea {
      width: 100%;
      height: 150px;
      overflow: auto;
      box-sizing: border-box;
      background: #fff;
      text-align: left;
      padding: 0;
      textarea {
        width: 100%;
        height: 100%;
        display: block;
        padding-top: 50px;
        border-radius: 5px;
        &:hover,
        &:focus {
          border-color: #faad14;
        }
      }
    }
  }
}
textarea {
  overflow: auto;
  resize: vertical;
  touch-action: manipulation;
  appearance: none;
  outline: none;
}
textarea.ant-input {
  max-width: 100%;
  height: auto;
  min-height: 32px;
  vertical-align: bottom;
  transition: all 0.3s, height 0s;
}
.ant-input {
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}
@media screen and (max-width: 450px) {
  .Bjq button {
    width: 100%;
  }
}

</style>