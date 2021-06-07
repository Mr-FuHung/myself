<script>
export default {
  name: "live",
  data() {
    return {
      status: true,
      essayList: [],
      pageSize: 5,
      pageNo: 1,
    };
  },
  created() {
    this.$http({
      url: "/live/list.ajax",
      data: {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      },
    })
      .then((result) => {
        if (result.data.returnCode === 0) {
          this.essayList = result.data.data;
          this.status = false;
        }
      })
      .catch((err) => {
        console.log(err);
        this.status = true;
      });
  },
  methods: {},
};
</script>
<template>
  <div class="Artical-box" v-loading="true" element-loading-background="rgba(0, 0, 0, 0)">
    <!-- <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline> -->
  </div>
</template>

<style lang="scss" scoped>
.Artical-box {
  min-height: 2rem;
}
</style>
