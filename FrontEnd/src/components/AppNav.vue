<template>
  <v-app-bar
    color="primary"
    :style="{ opacity: scrolled ? 0.5 : 1 }"
    class="mx-auto"
    max-width="448"
    :elevation="6"
  >
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-app-bar-nav-icon
          ><House :size="24" color="blue" @click="changeHome"
        /></v-app-bar-nav-icon>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-app-bar-title class="w-screen"><content-scrolling /></v-app-bar-title>

    <v-btn @click="toggleTheme" icon><v-icon>mdi-theme-light-dark</v-icon></v-btn>

    <v-btn icon>
      <div @click="toggleLanguage">{{ locale === 'en' ? 'EN' : 'VN' }}</div>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

import { House } from 'lucide-vue-next'
import ContentScrolling from './ContentScrolling.vue'
import { useRoute, useRouter } from 'vue-router'
import { useScroll } from './useScroll'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()
const changeHome = () => router.push('/')

function generateTitleFromPath(path: string): string {
  const parts = path.split('/').filter((part) => part)
  if (parts.length) {
    const title = parts[parts.length - 1].replace(/-/g, ' ')
    return title.charAt(0).toUpperCase() + title.slice(1)
  } else {
    return 'Quote'
  }
}

const items = ref([
  {
    title: '',
    disabled: false,
    href: '/'
  },
  {
    title: generateTitleFromPath(route.path),
    disabled: true,
    href: route.path
  }
])

// Watch for route changes and update the breadcrumbs accordingly
watch(
  () => route.path,
  (newPath) => {
    items.value[1].title = generateTitleFromPath(newPath)
    items.value[1].href = newPath
  }
)

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'CustomLightTheme' : 'CustomDarkTheme'
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'vi' : 'en'
}

const scrolled = useScroll()
</script>
