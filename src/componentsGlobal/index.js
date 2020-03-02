import MessageBox from "./MessageBox.vue";
import goTop from "./goTop.vue";
import circleLoading from "./circleLoading.vue";
import download from "./download.vue";
import loading from "./loading.vue";


const components = {
    install(Vue) {
        Vue.component('messagebox', MessageBox)
        Vue.component('gotop', goTop)
        Vue.component('download', download)
        Vue.component('circleloading', circleLoading)
        Vue.component('loading', loading)
    }
}
export default components;