<script>
import { mapMutations } from "vuex";
export default {
  name: "see",
  data() {
    return {
      content: {}
    };
  },
  beforeUpdate(){
    this.changeActive('seeAcive');//高亮点滴导航
  },
  created() {
    this.$http({
      url: "/live/fileContent.ajax",
      data: {
        id: this.$route.query.id
      }
    })
      .then(result => {
        if (result.data.returnCode === 0) {
          this.content = result.data.data;
          console.log(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapMutations(["changeActive"])
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.changeActive(false);//取消高亮
    next();
  }
};
</script>
<template>
  <div class="artical-detail">
    <h1>{{content.title}}</h1>
    <div>{{content.description}}</div>
    <div v-html="content.content"></div>
    <div class="artical-detail-date">{{content.create_time}}</div>
  </div>
</template>

<style lang="scss" >
@import "../scss/See/index.scss";
</style>
