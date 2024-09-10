<template>
  <v-card class="mx-auto w-screen mt-16" width="600">
    <v-card class="mx-3 my-3" color="secondary">
      <v-card-text>
        <p class="text-h6">{{ t('quote') }}:</p>

        <p>{{ quote }}</p>
      </v-card-text>
      <v-card-text>
        <a class="text-h6">{{ t('author') }}:</a>
        <a class="font-weight-light text-h6 ml-4"> {{ author }}</a>
      </v-card-text>
      <v-card-text>
        <p class="text-h6">
          {{ t('category') }}:
          <v-btn border="success double lg" class="rounded-xl" color="#b2f78b" disabled>{{
            category
          }}</v-btn>
        </p>
      </v-card-text>
    </v-card>
    <v-card class="mx-3 my-3" color="secondary">
      <v-card-text>
        <p class="text-h6">{{ t('translation') }}:</p>
        <p>{{ translatedQuote }}</p>
      </v-card-text>
    </v-card>
    <v-row justify="center" class="mt-2 mb-4">
      <v-btn @click="GetQuote" color="secondary" rounded="lg"
        ><p class="text-h5 font-weight-bold">{{ t('randomQuote') }}</p></v-btn
      >
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

onMounted(GetQuote)
</script>
