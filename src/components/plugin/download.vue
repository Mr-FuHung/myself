<template>
  <div class="download" @click="pdf" title="下载PDF简历">
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="download"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: "download",
  data() {
    return {};
  },
  methods: {
    pdf() {
      //   window.print(); //调用浏览器的打印功能打印指定区域
      //判断iframe是否存在，不存在则创建iframe
      var iframe = document.getElementById("print-iframe");
      if (!iframe) {
        var el = document.getElementsByClassName("me")[0];
        iframe = document.createElement("IFRAME");
        var doc = null;
        iframe.setAttribute("id", "print-iframe");
        iframe.setAttribute(
          "style",
          "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
        );
        document.body.appendChild(iframe);
        var doc = iframe.contentWindow.document;
        //这里可以自定义样式
        var style = document.getElementsByTagName("style");
        style.forEach(element => {
          doc.write(`<style type="text/css">${element.innerText}</style>`);
        });
        doc.write("<div>" + el.innerHTML + "</div>");
        doc.close();
        iframe.contentWindow.focus();
      }
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/plugin/download.scss";
</style>