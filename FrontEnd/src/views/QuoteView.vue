<template>
  <div justify="center" class="text-h5 mt-6 text-center">
    {{
      new Date().toLocaleDateString('vi-vn', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }}
  </div>

  <v-card class="mx-auto w-screen mt-14" width="600">
    <v-card class="mx-3 my-3" color="secondary">
      <v-card-text>
        <p class="text-h6">{{ t('quote') }}:</p>
        <p>{{ quoteData.quote }}</p>
      </v-card-text>

      <v-card-text>
        <span class="text-h6">{{ t('author') }}:</span>
        <span class="font-weight-light text-h6 ml-4">{{ quoteData.author }}</span>
      </v-card-text>

      <v-card-text>
        <p class="text-h6">
          {{ t('category') }}:
          <v-btn border="success double lg" class="rounded-xl" color="surface" disabled>
            {{ quoteData.category }}
          </v-btn>
        </p>
      </v-card-text>
    </v-card>

    <v-card class="mx-3 my-3" color="secondary">
      <v-card-text>
        <p class="text-h6">{{ t('translation') }}:</p>
        <p>{{ quoteData.translatedQuote }}</p>
      </v-card-text>
    </v-card>

    <v-row justify="center" class="mt-2 mb-4">
      <v-btn @click="fetchNewQuote" :loading="loading" color="secondary" rounded="lg">
        <p class="text-h5 font-weight-bold">{{ t('randomQuote') }}</p>
      </v-btn>
    </v-row>

    <!-- Loading Indicator -->
    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

// Setup i18n
const { t } = useI18n()

// Configuration
const API_KEY = 'zyCZHrqXSvEkXTorn4iCbw==qUnHnF2P6vJ7EDl5'
const QUOTE_API_URL = 'https://api.api-ninjas.com/v1/quotes'
const TRANSLATE_API_URL = 'https://api.mymemory.translated.net/get'

// Reactive state
const quoteData = ref({
  author: '',
  category: '',
  quote: '',
  translatedQuote: ''
})

const loading = ref(false) // Loading state

// List of categories
const randomCategories = [
  'age',
  'amazing',
  'attitude',
  'beauty',
  'best',
  'business',
  'change',
  'communication',
  'computers',
  'courage',
  'dreams',
  'education',
  'environmental',
  'equality',
  'experience',
  'failure',
  'family',
  'famous',
  'fear',
  'food',
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
]

// Get a random category
const getRandomCategory = () =>
  randomCategories[Math.floor(Math.random() * randomCategories.length)]

// Fetch a quote from API
const fetchQuote = async (category: string) => {
  try {
    const response = await fetch(`${QUOTE_API_URL}?category=${category}`, {
      headers: { 'X-Api-Key': API_KEY }
    })
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}

// Translate a quote
const translateQuote = async (text: string) => {
  try {
    const response = await axios.get(TRANSLATE_API_URL, {
      params: { q: text, langpair: 'en|vi' }
    })
    return response.data.responseData.translatedText
  } catch (error) {
    console.error('Translation error:', error)
    return ''
  }
}

// Fetch and update quote data
const fetchNewQuote = async () => {
  loading.value = true // Set loading to true
  try {
    const category = getRandomCategory()
    const data = await fetchQuote(category)
    if (data.length > 0) {
      const { author, category, quote } = data[0]
      quoteData.value = {
        author,
        category,
        quote,
        translatedQuote: await translateQuote(quote)
      }
    }
  } finally {
    loading.value = false // Ensure loading is set to false after completion
  }
}

// Fetch a quote on component mount
onMounted(fetchNewQuote)
</script>

<style scoped>
/* Scoped styles if needed */
</style>
