import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import IndexPages from '@/pages/IndexPages.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: IndexPages
  },
  {
    //动态路由，改变url不改变页面
    path: '/:category',
    component: IndexPages
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
