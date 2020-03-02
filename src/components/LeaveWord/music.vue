<script>
export default {
  name: "music",
  data() {
    return {
      status: true
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
    }
  },
  methods: {
    loading() {
      this.$refs.audio.play();
    }
  },
  
};
</script>
<template>
  <div :class="['musicPic',status? 'rotate' :'']" @click="status=!status">
    <img src="./../../assets/music.png" alt="music" />
    <audio src="./../../assets/世界这么大还是遇见你.mp3" @canplay="loading" ref="audio" loop hidden autoplay></audio>
  </div>
</template>

<style lang="scss" scoped>
@import "../../scss/LeaveWord/music.scss";
</style>