<script>
import { mapMutations } from "vuex";
import circleLoading from "../components/plugin/circleLoading.vue";
export default {
  name: "see",
  data() {
    return {
      status: true,
      content: {}
    };
  },
  beforeUpdate() {
    this.changeActive("seeAcive"); //高亮点滴导航
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
          this.status = false;
          this.content = result.data.data;
          console.log(result);
        }
      })
      .catch(err => {
        this.status = true;
        console.log(err);
      });
  },
  methods: {
    ...mapMutations(["changeActive"])
  },
  components: {
    circleLoading
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.changeActive(false); //取消高亮
    next();
  }
};
</script>
<template>
  <circleLoading v-if="status" />
  <div class="artical-detail" v-else>
    <h1>{{content.title}}</h1>
    <div>{{content.description}}</div>
    <div v-html="content.content"></div>
    <div class="artical-detail-date">{{content.create_time}}</div>
  </div>
</template>

<style lang="scss" >
@import "../scss/See/index.scss";
</style>
