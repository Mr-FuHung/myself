<template>
  <div :class="['Gotop',status? 'active':''] " @click="goTop">
    <div class="go-top-inner">
      <svg
        t="1565238236954"
        fill="currentColor"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3644"
        width="200"
        height="200"
      >
        <path
          d="M483.875 230.75a28.125 28.125 0 0 1 56.25 0v590.625a28.125 28.125 0 0 1-56.25 0z"
          p-id="3645"
        />
        <path
          d="M512 242.28125l-205.03125 205.3125a28.125 28.125 0 1 1-39.9375-39.9375l225-225a28.125 28.125 0 0 1 39.9375 0l225 225a28.125 28.125 0 0 1-39.9375 39.9375z"
          p-id="3646"
        />
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: "totop",
  data() {
    return {
      status: false
    };
  },
  methods: {
    getScroll(element) {
      if (page.getBoundingClientRect().top <= 0) {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    goTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 30;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.getScroll);
  }
};
</script>
<style lang="scss" scoped>
@import "../scss/componentsGlobal/gotop.scss";
</style>