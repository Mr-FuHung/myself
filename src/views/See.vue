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
.artical-detail {
  max-width: 1024px;
  width: 100%;
  padding: 0 1.5em;
  margin: 4em auto;
  line-height: 1.5em;
  & > * {
    margin-bottom: 2em;
  }
  h1 {
    color: #111;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
  }
  .artical-detail-date {
    color: #948c76;
    margin: 2em 0 5em;
    font-size: 0.8em;
  }
  div,
  p {
    font-size: 1em;
    text-align: justify;
  }
  pre {
    display: block;
    padding: 10px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 1.5em;
    overflow: auto;
  }
}
code, kbd, pre, samp {
    font-size: 1em;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
}
</style>
