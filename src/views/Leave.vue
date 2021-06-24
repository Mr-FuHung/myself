<script>
import { mapMutations } from "vuex";
export default {
  name: "Leave",
  data() {
    return {
      music: "music",
    };
  },
  components: {
    // essay: () => import("../components/Live/essay.vue"),
  },
  created() {},
  watch: {},
  methods: {},
};
</script>
<template>
  <div class="about">
    <h1>留言板</h1>
  </div>
</template>

<style lang="scss" >
h1 {
  color: #111;
  text-align: center;
  margin-bottom: 2em;
  font-size: 16px;
  font-weight: 400;
}
</style>