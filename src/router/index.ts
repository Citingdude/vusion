import { createRouter, createWebHistory } from 'vue-router'
import ButtonView from '@/views/components/ButtonView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/components/button',
      name: 'button',
      component: ButtonView,
    },
  ],
})

export default router
