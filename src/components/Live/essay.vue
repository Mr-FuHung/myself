<script>
export default {
  name: "essay",
  props: {
    essayData: {
      type: [Array, Object],
      default: {},
      required: true //必须传值
    }
  },
  data() {
    return {
      // base:this.essayData
    };
  },
  methods: {
    routerTo(id) {
      this.$router.push({
        name: `see`,
        query: {
          id
        }
      });
    }
  }
};
</script>
<template>
  <div class="artical">
    <div class="dotts"></div>
    <a @click="routerTo(essayData.id)" class="date" href="javascript:;">
      <span class="trig"></span>
      <span class="dates" v-text="essayData.create_time"></span>
    </a>
    <div class="art-container">
      <div class="line"></div>
      <div class="art-content">
        <p class="art-title">
          <a  href="javascript:;" @click="routerTo(essayData.id)"  v-text="essayData.title"></a>
        </p>
        <div class="art-img" v-for="(url,ind) in JSON.parse(essayData.picture)" :key="ind">
          <img :src="url" alt="文章配图" />
        </div>
        <div class="art-detail">
          <p v-text="essayData.description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
@import "../../scss/Live/essay.scss";
</style>
