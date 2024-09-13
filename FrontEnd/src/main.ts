import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createI18n } from 'vue-i18n'
import en from './locates/en.json'
import vi from './locates/vi.json'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const CustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#404258',
    surface: '#474E68',
    primary: '#50577A',
    secondary: '#6B728E'
  }
}

const CustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#b8e5eb',
    surface: '#f5f2ec',
    primary: '#3f85c6',
    secondary: '#63aff3'
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'CustomLightTheme',
    themes: {
      CustomDarkTheme,
      CustomLightTheme
    }
    // defaultTheme: 'dark'
  },

  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    vi
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
