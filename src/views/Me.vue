<script>
import arrange from "../components/Me/arrange.vue";
// @ is an alias to /src
export default {
  name: "me",
  components: {
    arrange
  }
};
</script>
<template>
  <div class="me">
    <arrange></arrange>
  </div>
</template>

<style lang="scss" scoped>
  @import "../scss/Me/index";
</style>
