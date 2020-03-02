<template>
  <div class="ant-skeleton ant-skeleton-active">
    <div class="ant-skeleton-content">
      <h3 class="ant-skeleton-title" style="width: 38%;"></h3>
      <ul class="ant-skeleton-paragraph">
        <li></li>
        <li></li>
        <li style="width: 61%;"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "loading"
};
</script>
<style lang="scss" scoped>
@import "../scss/componentsGlobal/loading.scss";
</style>