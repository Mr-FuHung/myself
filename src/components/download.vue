<template>
  <div class="download" @click="pdf" title="下载PDF简历">
    <i class="el-icon-download"></i>
  </div>
</template>
<script>
export default {
  name: "download",
  data() {
    return {};
  },
  methods: {
    pdf() {},
  },
};
</script>
<style lang="scss" scoped>
.download {
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  transition: all 0.3s;
  background: #fff;
  border-radius: 40px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  position: fixed;
  right: 40px;
  bottom:350px;
  cursor: pointer;
  &:active {
    background-color: #333;
  }
}
</style>