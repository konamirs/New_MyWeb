<template>
  <v-card class="mx-auto w-screen mt-16 self-center items-center" width="900">
    <v-row class="mb-6 mx-2 pt-6" no-gutters>
      <v-col class="mx-7">
        <v-sheet>{{ t('Source Language') }}</v-sheet>
        <v-select v-model="from" :items="langNames" variant="outlined" density="compact" />
        <v-sheet class="mb-1 mr-3">{{ t('Text to Translate') }}</v-sheet>

        <div style="position: relative">
          <v-textarea v-model="text" :rules="[limitRule]" counter @input="debouncedTranslate" />
          <v-btn icon @click="copyText(text)" style="position: absolute; bottom: 32px; right: 10px">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col class="mx-7">
        <v-sheet>{{ t('Target Language') }}</v-sheet>
        <v-select v-model="to" :items="targetLangNames" variant="outlined" density="compact" />
        <v-sheet>{{ t('Translated Text') }}</v-sheet>

        <div :style="themeStyle">
          <p v-if="isLoading">. . .</p>
          <p v-else>{{ result }}</p>
          <v-btn
            icon
            @click="copyText(result)"
            style="position: absolute; bottom: 10px; right: 10px"
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="3000" color="success">
      {{ t('Text copied to clipboard!') }}
    </v-snackbar>
  </v-card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, computed, watch } from 'vue'
import { debounce } from 'lodash'
import { useTheme } from 'vuetify/lib/framework.mjs'
import { useI18n } from 'vue-i18n'
import type { CSSProperties } from 'vue'

const { t } = useI18n()
const langList = [
  { code: 'auto', name: 'Auto Detect' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: 'Japanese' }
]

const langNames = langList.map((lang) => lang.name)
const targetLangNames = langList.slice(1).map((lang) => lang.name)
const text = ref(''),
  result = ref(''),
  isLoading = ref(false),
  snackbar = ref(false),
  from = ref('English'),
  to = ref('Vietnamese')
const fromCode = computed(() => langList.find((lang) => lang.name === from.value)?.code || 'en')
const toCode = computed(() => langList.find((lang) => lang.name === to.value)?.code || 'vi')

const themeStyle = computed<CSSProperties>(() => ({
  backgroundColor: useTheme().global.current.value.dark ? '#50577a' : '#dedede',
  minHeight: '150px',
  paddingTop: '20px',
  paddingLeft: '20px',
  marginTop: '5px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  position: 'relative'
}))

const limitRule = (v: string) => v.length <= 5000 || 'Max 5000 characters'

const translate = async () => {
  try {
    isLoading.value = true
    const { data } = await axios.get('https://api.mymemory.translated.net/get', {
      params: { q: text.value, langpair: `${fromCode.value}|${toCode.value}` }
    })
    result.value = data.responseData.translatedText
  } catch (error) {
    console.error('Translation error:', error)
  } finally {
    isLoading.value = false
  }
}

const copyText = (content: string) => {
  navigator.clipboard.writeText(content)
  snackbar.value = true
}

const debouncedTranslate = debounce(() => {
  text.value ? translate() : (result.value = '')
}, 300)

watch([text, from, to], debouncedTranslate)
</script>
