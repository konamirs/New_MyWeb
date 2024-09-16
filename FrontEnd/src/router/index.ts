import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Quote',
      component: () => import(/* webpackPrefetch: true */ '../views/QuoteView.vue')
    },
    {
      path: '/cat',
      name: 'Cat',
      component: () => import(/* webpackPrefetch: true */ '../views/CatView.vue')
    },
    {
      path: '/emoji',
      name: 'Emoji',
      component: () => import(/* webpackPrefetch: true */ '../views/EmojiView.vue')
    },
    {
      path: '/holiday',
      name: 'Holiday',
      component: () => import(/* webpackPrefetch: true */ '../views/HolidayView.vue')
    },
    {
      path: '/vietqr',
      name: 'VietQR',
      component: () => import(/* webpackPrefetch: true */ '../views/QRView.vue')
    },
    {
      path: '/translate',
      name: 'Translate',
      component: () => import('../views/TranslateView.vue')
    }
  ]
})

export default router
