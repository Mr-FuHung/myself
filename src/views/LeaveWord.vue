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
@import "../scss/LeaveWord/index.scss";
</style>