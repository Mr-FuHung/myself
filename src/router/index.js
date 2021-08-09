import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '*',
    // redirect(to) {
    //   return { name: '404' }
    // },
    component: () => import('@/views/404.vue')
  },
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  // },
  {
    path: '/',
    redirect: '/me', //重定向到me
    component: Index,
    children: [{
        path: 'me',
        name: 'me',
        meta: {
          title: '简介'
        },
        component: () => import('@/views/Me.vue')
      },
      {
        path: 'leave',
        name: 'leave',
        meta: {
          title: '留言'
        },
        component: () => import('@/views/Leave.vue')
      },
      {
        path: 'article',
        name: 'article',
        meta: {
          title: '点滴'
        },
        component: () => import('@/views/Article.vue')
      },
      {
        path: '/article/detail',
        alias:'/detail',
        name: 'detail',
        meta: {
          title: '详情'
        },
        component: () => import('@/views/Detail.vue')
      },
      {
        path: 'see',
        name: 'see',
        component: () => import( /* webpackChunkName: "about" */ '@/views/See.vue'),
        // beforeEnter(to, from, next) {//包括子孙组件都会触发
        //   console.log(from)
        //   next()
        // }

      }
    ]
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