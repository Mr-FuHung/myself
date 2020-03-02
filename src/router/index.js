import Vue from 'vue'
import VueRouter from 'vue-router'
import Me from '../views/Me.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    // redirect(to) {
    //   return { name: '404' }
    // },
    component: () => import('../views/404.vue')
  },
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  // },
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
    path: '/leaveword',
    name: 'leaveword',
    component: () => import('../views/LeaveWord.vue')
  },
  {
    path: '/live',
    name: 'live',
    component: () => import('../views/Live.vue')
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
// router.beforeEach((to, from, next) => {

// });
export default router
