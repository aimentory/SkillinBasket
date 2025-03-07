import { createRouter, createWebHistory } from 'vue-router'
import AppDashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: AppDashboard,
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/Services.vue'),
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('../views/Messages.vue'),
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/Notifications.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    },
  ],
})

export default router
