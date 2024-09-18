<template>
  <v-layout>
    <div v-if="useTheme().global.current.value.dark" class="darkbackground"></div>
    <v-navigation-drawer rail expand-on-hover color="secondary">
      <v-list density="default" nav>
        <v-list-item
          prepend-avatar="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-31.jpg"
          title="Just a cat"
          nav
        >
        </v-list-item>

        <v-list-item value="quote" @click="changeHome">
          <v-list-item-title>{{ t('Quote') }}</v-list-item-title>
          <template v-slot:prepend>
            <v-icon>
              <Quote :size="32" />
            </v-icon>
          </template>
        </v-list-item>
        <v-list-item value="cat" @click="changeCat">
          <v-list-item-title>{{ t('Cat') }}</v-list-item-title>
          <template v-slot:prepend>
            <v-icon>
              <Cat :size="32" />
            </v-icon>
          </template>
        </v-list-item>
        <v-list-item value="holiday" @click="changeHoliday">
          <v-list-item-title>{{ t('Countdown to holiday') }}</v-list-item-title>
                    <template v-slot:prepend>
            <v-icon>
              <CalendarClock :size="32" />
            </v-icon>
          </template>
        </v-list-item>
        <v-list-item value="emoji" @click="changeEmoji">
          <v-list-item-title>{{ t('Emoji') }}</v-list-item-title>
          <template v-slot:prepend>
            <v-icon>
              <Smile :size="32" />
            </v-icon>
          </template>
        </v-list-item>
        <v-list-item value="translate" @click="changeTranslate">
          <v-list-item-title>{{ t('Translate') }}</v-list-item-title>
          <template v-slot:prepend>
            <v-icon>
              <Languages :size="32" />
            </v-icon>
          </template>
        </v-list-item>
        <v-list-item value="qr" @click="changeQr">
          <v-list-item-title>{{ t('Generate QR') }}</v-list-item-title>
          <template v-slot:prepend>
            <v-icon>
              <QrCode :size="32" />
            </v-icon>
          </template>
        </v-list-item>
        <v-list-item value="weather" @click="changeWeather">
          <v-list-item-title>{{ t('Weather') }}</v-list-item-title>
          <template v-slot:prepend>
            <v-icon>
              <CloudSun :size="32" />
            </v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex flex-column h-full bg-background" min-height="100vh">
      <app-nav />
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { CalendarClock, Languages, Quote, Smile, Cat, QrCode, CloudSun } from 'lucide-vue-next'
import AppNav from './components/AppNav.vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify/lib/framework.mjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const changeHome = () => router.push('/')
const changeCat = () => router.push('/cat')
const changeEmoji = () => router.push('/emoji')
const changeHoliday = () => router.push('/holiday')
const changeTranslate = () => router.push('/translate')
const changeQr = () => router.push('/vietqr')
const changeWeather = () => router.push('/weather')
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
