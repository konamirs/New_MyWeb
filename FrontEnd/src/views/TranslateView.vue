<template>
  <v-card class="mx-auto w-screen mt-5" width="900">
    <v-row class="mb-6 mx-2" no-gutters>
      <v-col class="mx-7">
        <v-sheet>Source Language</v-sheet>
        <v-select
          v-model="from"
          :items="LangList.map((lang) => lang.name)"
          variant="outlined"
          density="compact"
        />
        <v-sheet class="mb-1 mr-3">Text to Translate</v-sheet>
        <v-textarea
          v-model="text"
          :rules="[(v) => v.length <= 5000 || 'Max 5000 characters']"
          counter
          @input="debouncedTranslate"
        />
      </v-col>
      <v-col class="mx-7">
        <v-sheet>Target Language</v-sheet>
        <v-select
          v-model="to"
          :items="LangList.slice(1).map((lang) => lang.name)"
          variant="outlined"
          density="compact"
        />
        <v-sheet>Translated Text</v-sheet>
        <div style="background: blue; min-height: 155px; padding-top: 20px; padding-left: 20px">
          <p v-if="isLoading">. . .</p>
          <p v-if="!isLoading && result">{{ result }}</p>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import axios, { type CancelTokenSource } from 'axios'
import { ref, computed, watch } from 'vue'
import { debounce } from 'lodash'

const LangList = [
  { code: 'auto', name: 'Auto Detect' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: 'Japanese' }
]

const text = ref('')
const result = ref('')
const isLoading = ref(false)
const cancelSource = ref<CancelTokenSource | null>(null)
const from = ref('English')
const to = ref('Vietnamese')

const fromCode = computed(() => LangList.find((lang) => lang.name === from.value)?.code || 'en')
const toCode = computed(() => LangList.find((lang) => lang.name === to.value)?.code || 'vi')

const translate = async () => {
  try {
    cancelSource.value?.cancel()
    cancelSource.value = axios.CancelToken.source()

    const { data } = await axios.get('https://api.mymemory.translated.net/get', {
      params: { q: text.value, langpair: `${fromCode.value}|${toCode.value}` },
      cancelToken: cancelSource.value.token
    })

    result.value = data.responseData.translatedText
  } catch (error) {
    console.error('Translation error:', error)
  } finally {
    isLoading.value = false
  }
}

const debouncedTranslate = debounce(() => {
  if (text.value) {
    isLoading.value = true
    translate()
  } else {
    result.value = ''
  }
}, 300)

watch([text, from, to], debouncedTranslate)
</script>
