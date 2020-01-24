<template>
  <div>
    <section class="arrange">
      <h1 class="title">{{baseData.title}}</h1>
      <div class="default">
        <div class="lightest p-t-0 p-b-0">
          <div class="row" v-for="(item,index) in baseData.list" :key="index">
            <template v-if="Object.prototype.toString.call(item[0])!=='[object Object]'"><!-- 判断是否为Object -->
              <template v-if="item.length>1">
                <div v-for="(value,inIndex) in item" :key="inIndex">● {{value}}</div><!-- 多列 -->
              </template>
              <template v-else>
                <p class="lightest" v-html="item[0]"></p><!-- 仅仅一列时 -->
              </template>
            </template>
            <template v-else v-for="(value,inIndex) in item"><!-- 为Object时渲染a链接 -->
              <span :key="inIndex">
                ● {{value.subTitle!==false? value.subTitle :''}}
                <a
                  :href="value.url"
                  target="_blank"
                >{{value.text}}</a>
              </span>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "arrange",
  props: {
    baseData: {
      type: [Array, Object],
      default: {},
      required: true //必须传值
    }
  },
  data() {
    return {
      // base:this.baseData
    };
  },
  methods: {},
  mounted() {
    console.log(this.baseData);
  }
};
</script>

<style lang='scss' scoped>
@import "../../scss/Me/arrange";
</style>
