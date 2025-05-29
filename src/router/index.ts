import { createRouter, createWebHistory } from 'vue-router'
import ButtonView from '@/views/components/ButtonView.vue'
import CheckboxView from '@/views/components/CheckboxView.vue'
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
      name: 'components',
      path: '/components',
      children: [
        {
          path: 'button',
          name: 'button',
          component: ButtonView,
        },
        {
          path: 'checkbox',
          name: 'checkbox',
          component: CheckboxView,
        },
      ],
    },

  ],
})

export default router
