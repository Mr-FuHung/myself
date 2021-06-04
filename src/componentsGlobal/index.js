import circleLoading from "./circleLoading.vue";
import download from "./download.vue";
import loading from "./loading.vue";


const components = {
    install(Vue) {
        Vue.component('download', download)
        Vue.component('circleloading', circleLoading)
        Vue.component('loading', loading)
    }
}
export default components;