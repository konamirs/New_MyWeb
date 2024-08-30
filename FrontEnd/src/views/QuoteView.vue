<template>
  <v-card class="mx-auto w-screen mt-5" color="#87918a" width="600">
    <v-card class="mx-3 my-3">
      <v-card-text
        >Trích dẫn:
        <p>{{ quote }}</p>
      </v-card-text>
      <v-card-text>
        Tác giả:
        <p>{{ author }}</p>
      </v-card-text>
      <v-card-text>
        Danh mục:
        <p>{{ category }}</p>
      </v-card-text>
    </v-card>
    <v-card class="mx-3 my-3">
      <v-card-text> Dịch: ////// </v-card-text>
    </v-card>
    <v-row justify="center" class="mt-2 mb-4">
      <v-btn @click="GetQuote"> Random Quote </v-btn></v-row
    >
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const Categories = [
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
]

const ApiKey = 'zyCZHrqXSvEkXTorn4iCbw==qUnHnF2P6vJ7EDl5'
const author = ref('')
const category = ref('')
const quote = ref('')

const getRandomCategory = () => {
  return Categories[Math.floor(Math.random() * Categories.length)]
}

const GetQuote = async () => {
  const randomCategory = getRandomCategory()
  const NinjaUrl = `https://api.api-ninjas.com/v1/quotes?category=${randomCategory}`
  const response = await fetch(NinjaUrl, { headers: { 'X-Api-Key': ApiKey } })
  const data = await response.json()

  author.value = data[0].author
  category.value = data[0].category
  quote.value = data[0].quote
}

onMounted(async () => await GetQuote())
</script>
