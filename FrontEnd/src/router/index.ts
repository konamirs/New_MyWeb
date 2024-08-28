import { createRouter, createWebHistory } from 'vue-router'
import QuoteView from '@/views/QuoteView.vue'
import CatView from '@/views/CatView.vue'
import EmojiView from '@/views/EmojiView.vue'
import HolidayView from '@/views/HolidayView.vue'
import QRView from '@/views/QRView.vue'
import TranslateView from '@/views/TranslateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Quote',
      component: QuoteView
    },
    {
      path: '/cat',
      name: 'Cat',
      component: CatView
    },
    {
      path: '/emoji',
      name: 'Emoji',
      component: EmojiView
    },
    {
      path: '/holiday',
      name: 'Holiday',
      component: HolidayView
    },
    {
      path: '/vietqr',
      name: 'VietQR',
      component: QRView
    },
    {
      path: '/translate',
      name: 'Translate',
      component: TranslateView
    }
  ]
})

export default router
