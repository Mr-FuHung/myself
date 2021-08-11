<script>
export default {
  name: "music",
  data() {
    return {
      status: true,
    };
  },
  created() {},
  watch: {
    status(newval) {
      if (newval) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
  },
  mounted() {},
  methods: {
    loading() {
      if (this.$refs.audio.readyState === 4 && this.status) {
        this.$refs.audio.play();
      }
    },
  },
};
</script>
<template>
  <div>
    <el-tooltip class="item" effect="dark" placement="top">
      <template #content> 单击：暂停/播放 </template>
      <div
        :class="['musicPic', status ? 'rotate' : '']"
        @click="status = !status"
      >
        <img src="@/assets/images/music.png" alt="music" />
        <audio
          src="@/assets/freeLoop.mp3"
          @canplay="loading"
          ref="audio"
          loop
          hidden
        ></audio>
      </div>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
[hidden] {
  display: none !important;
}
.musicPic {
  z-index: 100;
  cursor: pointer;
  position: fixed;
  width: 3em;
  height: 3em;
  bottom: 10%;
  animation: rotate 3s linear infinite;
  animation-play-state: paused;
  transition: all 0.3s;
  img {
    width: 100%;
    height: 100%;
  }
  &.rotate {
    animation-play-state: running;
  }
}
@media screen and (min-width: 1024px) {
  .musicPic {
    left: 10%;
  }
}
@media screen and (max-width: 1024px) {
  .musicPic {
    right: 10%;
    bottom: 10%;
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>