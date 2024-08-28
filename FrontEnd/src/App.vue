<template>
  <v-card hover>
    <v-layout>
      <v-navigation-drawer rail expand-on-hover>
        <v-list density="default" nav>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
          >
          </v-list-item>

          <v-list-item title="Quote" value="quote" @click="changeHome">
            <template v-slot:prepend>
              <v-icon>
                <Quote :size="32" />
              </v-icon>
            </template>
          </v-list-item>
          <v-list-item title="Cat" value="cat" @click="changeCat">
            <template v-slot:prepend>
              <v-icon>
                <Cat :size="32" />
              </v-icon>
            </template>
          </v-list-item>
          <v-list-item title="Countdown to holiday" value="holiday" @click="changeHoliday">
            <template v-slot:prepend>
              <v-icon>
                <CalendarClock :size="32" />
              </v-icon>
            </template>
          </v-list-item>
          <v-list-item title="Emoji" value="emoji" @click="changeEmoji">
            <template v-slot:prepend>
              <v-icon>
                <Smile :size="32" />
              </v-icon>
            </template>
          </v-list-item>
          <v-list-item title="Translate" value="translate" @click="changeTranslate">
            <template v-slot:prepend>
              <v-icon>
                <Languages :size="32" />
              </v-icon>
            </template>
          </v-list-item>
          <v-list-item title="Generate QR" value="qr" @click="changeQr">
            <template v-slot:prepend>
              <v-icon>
                <QrCode :size="32" />
              </v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="h-screen">
        <app-nav />
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { CalendarClock, Languages, Quote, Smile, Cat, QrCode } from 'lucide-vue-next'
import AppNav from './components/AppNav.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const changeHome = () => router.push('/')
const changeCat = () => router.push('/cat')
const changeEmoji = () => router.push('/emoji')
const changeHoliday = () => router.push('/holiday')
const changeTranslate = () => router.push('/translate')
const changeQr = () => router.push('/vietqr')
</script>
