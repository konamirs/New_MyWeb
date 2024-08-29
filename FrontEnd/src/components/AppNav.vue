<template>
  <v-app-bar color="grey" class="mx-auto" max-width="448">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-app-bar-nav-icon
          ><House :size="24" color="blue" @click="changeHome"
        /></v-app-bar-nav-icon>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-app-bar-title class="w-screen"><content-scrolling /></v-app-bar-title>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { House } from 'lucide-vue-next'
import ContentScrolling from './ContentScrolling.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const changeHome = () => router.push('/')
const items = [
  {
    title: '',
    disabled: true,
    href: 'breadcrumbs_dashboard'
  },
  {
    title: 'Link 1',
    disabled: true,
    href: 'breadcrumbs_link_1'
  }
]
</script>
