import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import RegisterView from '../views/RegisterView.vue'
import userListView from '../views/userListView.vue'
import userLoginView from '../views/userLoginView.vue'
import userProfieView from '../views/userProfieView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/404/',
    name: '404',
    component: NotFoundView
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/userList/',
    name: 'userList',
    component: userListView
  },
  {
    path: '/userLogin/',
    name: 'userLogin',
    component: userLoginView
  },
  {
    // 给这个路径加一个参数
    path: '/userProfie/:userId/',
    name: 'userProfie',
    component: userProfieView
  },
  {
    // 正则匹配任意字符
    path: '/:catchAll(.*)',
    redirect: "/404"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
