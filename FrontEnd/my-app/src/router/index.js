import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/Register.vue')
  },
  {
    path: '/todos',
    name: 'todos',
    component: () => import('@/components/todo.vue')
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: () => import('@/components/Forgot.vue')
  },
  {
    path: '/todos/Items',
    name: 'todoItems',
    component: () => import('@/components/todoItems.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/components/dashboard.vue')
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
