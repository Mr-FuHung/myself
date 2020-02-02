import Vue from 'vue'
import VueRouter from 'vue-router'
import Me from '../views/Me.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/me'//重定向到me
  },
  {
    path: '/me',
    name: 'me',
    component: Me
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/live',
    name: 'live',
    component: () => import(/* webpackChunkName: "about" */ '../views/Live.vue')
  },
  {
    path: '/see',
    name: 'see',
    component: () => import(/* webpackChunkName: "about" */ '../views/See.vue'),
    // beforeEnter(to, from, next) {//包括子孙组件都会触发
    //   console.log(from)
    //   next()
    // }
    
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'routerExact',
  linkActiveClass: 'routerActive',
  // mode: 'history',
  routes
})

export default router
