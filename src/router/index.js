import Vue from 'vue'
import VueRouter from 'vue-router'
import Me from '../views/Me.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/me',
    name: 'me',
    component: Me
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/live',
    name: 'live',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Live.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'routerExact',
  linkActiveClass: 'routerActive',
  // mode: 'history',
  routes
})

export default router
