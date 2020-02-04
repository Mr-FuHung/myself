<script>
import essay from "../components/Live/essay.vue";
import loading from "../components/plugin/loading.vue";
export default {
  data() {
    return {
      status: true,
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
          this.status = false;
        }
      })
      .catch(err => {
        console.log(err);
        this.status = true;
      });
  },
  components: {
    // essay: () => import("../components/Live/essay.vue"),
    essay,
    loading
  }
};
</script>
<template>
  <div class="Artical-box">
    <loading v-if="status" />
    <div v-else>
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
