<script>
import essay from "../components/Live/essay.vue";
export default {
  data() {
    return {
      essayList: [],
      pageSize: 5,
      pageNo: 1
    };
  },
  created() {
    this.$http({
      url: "/live/list.ajax",
      data: {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }
    })
      .then(result => {
        if (result.data.returnCode === 0) {
          this.essayList = result.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    essay
  }
};
</script>
<template>
  <div class="Artical-box">
    <div>
      <essay :essay-data="item" v-for="(item,index) in essayList" :key="index" />

      <div style="text-align: center;">
        <button type="button" class="ant-btn">
          <span>加载更多</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
@import "../scss/Live/index.scss";
</style>
