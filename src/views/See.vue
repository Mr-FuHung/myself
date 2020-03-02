<script>
import { mapMutations } from "vuex";
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
          if (result.data.script) {
            this.insetScript(JSON.parse(result.data.script));
          }
        }
      })
      .catch(err => {
        this.status = true;
        console.log(err);
      });
  },
  methods: {
    ...mapMutations(["changeActive"]),
    insetScript(scriptList) {
      scriptList.forEach(element => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = element;
        page.appendChild(script);
      });
    }
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
  <circleloading v-if="status" />
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
