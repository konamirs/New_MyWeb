<template>
  <v-card class="mx-auto w-screen mt-5" color="#87918a" width="600">
    <v-card class="mx-3 my-3">
      <v-card-text>
        {{ t('quote') }}
        <p>{{ quote }}</p>
      </v-card-text>
      <v-card-text>
        {{ t('author') }}
        <p>{{ author }}</p>
      </v-card-text>
      <v-card-text>
        {{ t('category') }}
        <p>{{ category }}</p>
      </v-card-text>
    </v-card>
    <v-card class="mx-3 my-3">
      <v-card-text>
        {{ t('translation') }}
        <p>{{ translatedQuote }}</p>
      </v-card-text>
    </v-card>
    <v-row justify="center" class="mt-2 mb-4">
      <v-btn @click="GetQuote">{{ t('randomQuote') }}</v-btn>
    </v-row>
    <v-btn @click="toggleLanguage">{{
      locale === 'en' ? 'Switch to Vietnamese' : 'Switch to English'
    }}</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { locale, t } = useI18n()

const ApiKey = 'zyCZHrqXSvEkXTorn4iCbw==qUnHnF2P6vJ7EDl5'
const author = ref('')
const category = ref('')
const quote = ref('')
const translatedQuote = ref('')

const GetQuote = async () => {
  const randomCategory = [
    'age',
    'amazing',
    'attitude',
    'beauty',
    'best',
    'birthday',
    'business',
    'change',
    'communication',
    'computers',
    'courage',
    'dating',
    'design',
    'dreams',
    'education',
    'environmental',
    'equality',
    'experience',
    'failure',
    'faith',
    'family',
    'famous',
    'fear',
    'food',
    'forgiveness',
    'freedom',
    'friendship',
    'future',
    'happiness',
    'health',
    'history',
    'home',
    'hope',
    'humor',
    'imagination',
    'inspirational',
    'intelligence',
    'knowledge',
    'leadership',
    'learning',
    'life',
    'love',
    'medical',
    'money',
    'morning',
    'movies',
    'success'
  ][Math.floor(Math.random() * 45)]
  const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${randomCategory}`, {
    headers: { 'X-Api-Key': ApiKey }
  })
  const data = await response.json()

  author.value = data[0].author
  category.value = data[0].category
  quote.value = data[0].quote

  await translateQuote()
}

const translateQuote = async () => {
  const baseUrl = 'https://api.mymemory.translated.net/get'

  try {
    const response = await axios.get(baseUrl, {
      params: { q: quote.value, langpair: `en|vi` }
    })
    translatedQuote.value = response.data.responseData.translatedText
  } catch (error) {
    console.error('Translation error:', error)
  }
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'vi' : 'en'
  translateQuote()
}

onMounted(GetQuote)
</script>
