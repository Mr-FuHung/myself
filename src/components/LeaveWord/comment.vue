<script>
import { mapActions } from "vuex";
export default {
  name: "comment",
  props: {
    list: {
      type: [Object, Array],
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      leaveWordList: []
    };
  },
  watch: {
    list(newval) {
      this.leaveWordList = newval;
    }
  },
  computed: {
    bgcColor() {
      return time => {
        return `background-color:#${new Date(time)
          .getTime()
          .toString(16)
          .substr(5)}`;
      };
    }
  },
  methods: {
    // ...mapActions(["messagePush"]),
    getWriteBack(item) {
      if (!item.writeBack) {
        this.$set(item, "status", 2);
        this.$http({
          url: "/leaveword/getWriteBack.ajax",
          data: {
            o_id: item.id
          }
        })
          .then(result => {
            if (result.data.returnCode === 0) {
              this.$set(item, "status", 3);
              this.$set(item, "writeBack", result.data.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$set(item, "status", 3);
      }
    },
    getDateDiff(dateTimeStamp) {
      // 时间字符串转时间戳
      var timestamp = new Date(dateTimeStamp).getTime();

      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var year = day * 365;
      var now = new Date().getTime();
      var diffValue = now - timestamp;
      var result;
      if (diffValue < 0) {
        return;
      }
      var yearC = diffValue / year;
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if (yearC >= 1) {
        result = "" + parseInt(yearC) + "年前";
      } else if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
      } else result = "刚刚";
      return result;
    },
    write(item, ele) {
      if (!this.$store.state.user) {
        // this.messagePush({ flag: "err", text: "请先登录" });
        return;
      }
      let params;
      if (ele) {
        params = {
          o_id: item.id,
          i_id: ele.id,
          i_user: ele.user,
          user: ele.user
        };
      } else {
        params = {
          o_id: item.id,
          user: item.user
        };
      }
      this.$emit("write", params);
    },
    delLevaeWord(item) {
      let params = {
        id: item.id,
        user: this.$store.state.user
      };
      this.$http({
        url: "/leaveword/delLevaeWord.ajax",
        data: params
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
    },
    delWriteBack(ele, item) {
      let params = {
        id: ele.id,
        user: this.$store.state.user
      };
      this.$http({
        url: "/leaveword/delWriteBack.ajax",
        data: params
      })
        .then(result => {
          if (result.data.returnCode === 0) {
            // this.messagePush({ flag: "pass", text: result.data.returnMsg });
            // this.$emit("getleaveword", 1);
            this.updatelWriteBack(item);
            this.content = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatelWriteBack(item) {
      console.log(item);
      this.$http({
        url: "/leaveword/getWriteBack.ajax",
        data: {
          o_id: item.id
        }
      })
        .then(result => {
          if (result.data.returnCode === 0) {
            let data = result.data.data;
            this.$set(item, "writeBack", data);
            this.$set(item, "writeBackTotal", data.length);
            if (!data.length) {
              this.$set(item, "status", 0);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<template>
  <div class="CommentList">
    <ul>
      <li v-for="(item,index) in leaveWordList" :key="index">
        <div>
          <!-- <p class="floor">1楼</p> -->
          <div class="inner">
            <h2>
              <span
                class="circle"
                v-text="item.user.substr(0,1)"
                :style="bgcColor(item.create_time)"
              ></span>
            </h2>
            <div>
              <p class="selfInfo">
                <span v-text="item.user"></span>
                <span v-text="getDateDiff(item.create_time)" :title="item.create_time"></span>
              </p>
              <p class="content" v-text="item.content"></p>
              <span class="btn" @click="write(item)">回复</span>
              <span class="del" v-if="$store.state.user===item.user" @click="delLevaeWord(item)">删除</span>
            </div>
          </div>
        </div>
        <ul class="nested" v-if="item.writeBack" v-show="item.status">
          <li v-for="(ele,ind) in item.writeBack" :key="ind">
            <div>
              <div class="inner">
                <h2>
                  <span
                    class="circle"
                    v-text="ele.user.substr(0,1)"
                    :style="bgcColor(ele.create_time)"
                  ></span>
                </h2>
                <div>
                  <p class="selfInfo">
                    <span v-text="ele.user"></span>
                    <span v-text="getDateDiff(ele.create_time)" :title="ele.create_time"></span>
                  </p>
                  <p class="content" v-text="`@${ele.i_user?ele.i_user:item.user}：`+ele.content"></p>
                  <span class="btn" @click="write(item,ele)">回复</span>
                  <span
                    class="del"
                    @click="delWriteBack(ele,item)"
                    v-if="$store.state.user===ele.user"
                  >删除</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div
          class="tips"
          @click="getWriteBack(item)"
          v-if="item.writeBackTotal"
          v-show="item.status===0"
        >
          --- 查看 {{item.writeBackTotal}} 条评论
          <svg
            viewBox="0 0 1024 1024"
            width="1em"
            height="1em"
            fill="currentColor"
            style="vertical-align: -.125em;"
          >
            <path
              d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
            />
          </svg>
        </div>
        <div class="tips" @click="item.status=0" v-show="item.status===3">
          --- 收起
          <svg
            viewBox="0 0 1024 1024"
            width="1em"
            height="1em"
            fill="currentColor"
            style="vertical-align: -.125em;transform: rotateZ(180deg);"
          >
            <path
              d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
            />
          </svg>
        </div>
        <div class="tips" style="text-align:center" v-show="item.status===2">
          <svg
            viewBox="0 0 1024 1024"
            width="1em"
            height="1em"
            fill="currentColor"
            style="vertical-align: -.125em;"
            class="waiting"
          >
            <path
              d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
            />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "../../scss/LeaveWord/comment.scss";
</style>