<script>
import { mapMutations } from "vuex";
import music from "../components/LeaveWord/music.vue";
import board from "../components/LeaveWord/board.vue";
import login from "../components/LeaveWord/login.vue";
import comment from "../components/LeaveWord/comment.vue";
export default {
  name: "leaveword",
  data() {
    return {
      music: "music",
      loginDialog: false,
      // pageNo: 1,
      pageSize: 10,
      desc: true,
      total: 0,
      more: false,
      showWriteBack: false,
      reuser: {},
      list: []
    };
  },
  components: {
    // essay: () => import("../components/Live/essay.vue"),
    music,
    board,
    login,
    comment
  },
  created() {
    this.getLeaveWord(1);
  },
  watch: {
    loginDialog(newval, oldval) {
      if (newval) {
        document.body.style.overflow = "hidden";
        // html.style.position = "fixed";
        // html.style.width = "100%";
      } else {
        document.body.style = {};
      }
    },
    showWriteBack(newval) {
      // let html = document.getElementsByTagName("html")[0];
      if (newval) {
        document.body.style.overflow = "hidden";
        // html.style.position = "fixed";
        // html.style.width = "100%";
      } else {
        document.body.style = {};
      }
    }
  },
  methods: {
    ...mapMutations(["changeMusicStatus"]),
    showDialog(bool) {
      this.loginDialog = bool;
    },

    getLeaveWord(pageNo) {
      let params = {
        pageNo: pageNo,
        pageSize: this.pageSize,
        desc: this.desc
      };
      this.$http({
        url: "/leaveword/getLeaveWord.ajax",
        data: params
      })
        .then(result => {
          if (result.data.returnCode === 0) {
            if (pageNo === 1) {
              this.list = result.data.data.map(item => {
                item.status = 0;
                return item;
              });
            } else {
              result.data.data.map(item => {
                item.status = 0;
                this.list.push(item);
                return item;
              });
            }

            this.total = result.data.total;
            result.data.total > this.list.length
              ? (this.more = true)
              : (this.more = false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    write(item) {
      this.showWriteBack = true;
      this.reuser = item;
    },
    hideWriteBack() {
      this.showWriteBack = false;
    },
    updatelWriteBack(o_id) {
      this.$http({
        url: "/leaveword/getWriteBack.ajax",
        data: {
          o_id
        }
      })
        .then(result => {
          if (result.data.returnCode === 0) {
            let data = result.data.data;
            this.list.some(element => {
              if (element.id === o_id) {
                this.$set(element, "writeBack", data);
                this.$set(element, "status", 3);
                this.$set(element, "writeBackTotal", data.length);
                return true;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.changeMusicStatus("");
    next();
  }
};
</script>
<template>
  <div class="about">
    <component :is="$store.state.musicStatus"></component>
    <!-- <music /> -->
    <h1>留言板</h1>
    <div>
      <keep-alive>
        <component :is="'board'" @dialog="showDialog" @getleaveword="getLeaveWord"></component>
      </keep-alive>
      <keep-alive>
        <component :is="'comment'" @write="write" :list="list" @getleaveword="getLeaveWord"></component>
      </keep-alive>
      <div style="text-align: center;margin:30px 0" v-if="more">
        <button
          type="button"
          class="ant-btn"
          @click="getLeaveWord(Math.floor(list.length/pageSize)+1)"
        >
          <span>加载更多</span>
        </button>
      </div>
      <div>
        <transition name="fade1">
          <div class="ant-modal-mask" v-show="showWriteBack" @click.self="showWriteBack=false"></div>
          <!-- 为了动画  从login组件中分离出来的黑色背景 -->
        </transition>
        <div class="writeBack">
          <transition
            enter-active-class="animated rotateInDownRight"
            leave-active-class="animated rotateOutDownRight"
            :duration="800"
          >
            <component
              v-show="showWriteBack"
              :is="'board'"
              @dialog="showDialog"
              @updatelwriteback="updatelWriteBack"
              @hidewriteback="hideWriteBack"
              @getleaveword="getLeaveWord"
              :showtitle="false"
              :reuser="reuser"
            ></component>
          </transition>
        </div>
      </div>
      <keep-alive>
        <div>
          <transition name="fade1">
            <div class="ant-modal-mask" v-show="loginDialog"></div>
            <!-- 为了动画  从login组件中分离出来的黑色背景 -->
          </transition>
          <transition
            enter-active-class="animated flipInY"
            leave-active-class="animated flipOutY"
            :duration="500"
          >
            <component
              :is="'login'"
              v-show="loginDialog"
              :parentclick="loginDialog"
              @dialog="showDialog"
            ></component>
          </transition>
        </div>
      </keep-alive>
    </div>
  </div>
</template>

<style lang="scss" >
h1 {
  color: #111;
  text-align: center;
  margin-bottom: 2em;
  font-size: 16px;
  font-weight: 400;
}

.ant-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
}

.fade1-leave-to,
.fade1-enter {
  opacity: 0;
}
.fade1-enter-active,
.fade1-leave-active {
  transition: all 0.3s linear;
}
.ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border: 1px solid #d9d9d9;
  outline: 0 none !important;
}
.ant-btn:focus,
.ant-btn:hover {
  color: #40a9ff;
  background-color: #fff;
  border-color: #40a9ff;
}
.ant-btn.active,
.ant-btn:active {
  text-decoration: none;
  color: #096dd9;
  background-color: #fff;
  border-color: #096dd9;
  box-shadow: none;
}
.writeBack {
  position: fixed;
  z-index: 1999;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
}

</style>