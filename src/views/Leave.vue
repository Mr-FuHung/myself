<script>
import comment from "@/components/comment.vue";
import cmtTree from "@/components/cmtTree.vue";
import music from "@/components/music.vue";
export default {
  name: "Leave",
  data() {
    return {};
  },
  components: {
    comment,
    cmtTree,
    music,
  },
  methods: {
    cmtTreeUpDate() {
      this.$refs.cmtTree.pages.pageNo = 1;
      this.$refs.cmtTree.updateTreeList();
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // beforeRouteEnter不能通过this访问组件实例，但是可以通过 vm 访问组件实例
      vm.$refs.music.loading(); //vm即this
    });
  },
};
</script>
<template>
  <div class="leave">
    <comment :cmtTreeUpDate="cmtTreeUpDate" />
    <cmtTree ref="cmtTree" />
    <music ref="music" />
  </div>
</template>

<style lang="scss" >
</style>