<template>
  <div class="center padd10">
    <div class="ant-spin ant-spin-spinning">
      <span class="ant-spin-dot ant-spin-dot-spin">
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "circleLoading"
};
</script>
<style lang="scss" scoped>
@import "../../scss/plugin/circleLoading.scss";
</style>