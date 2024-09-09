<template>
  <v-layout class="bg-background">
    <div v-if="useTheme().global.current.value.dark" class="darkbackground"></div>
    <v-navigation-drawer rail expand-on-hover color="secondary">
      <v-list density="default" nav>
        <v-list-item
          prepend-avatar="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-31.jpg"
          title="Just a cat"
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
</template>

<script setup lang="ts">
import { CalendarClock, Languages, Quote, Smile, Cat, QrCode } from 'lucide-vue-next'
import AppNav from './components/AppNav.vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify/lib/framework.mjs'

const router = useRouter()
const changeHome = () => router.push('/')
const changeCat = () => router.push('/cat')
const changeEmoji = () => router.push('/emoji')
const changeHoliday = () => router.push('/holiday')
const changeTranslate = () => router.push('/translate')
const changeQr = () => router.push('/vietqr')
</script>

<style scoped>
.darkbackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url('https://static.vecteezy.com/system/resources/previews/008/420/223/original/horizontal-space-background-with-abstract-shape-and-stars-web-design-space-exploring-illustration-of-galaxy-concept-of-web-banner-vector.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1;
}
</style>
