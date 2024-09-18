<template>
  <v-container>
    <!-- Search field -->
    <v-form>
      <v-text-field
        v-model="searchTerm.query"
        label="Search for a place"
        prepend-inner-icon="mdi-magnify"
        class="mb-2"
        outlined
        @input="handleSearch"
      ></v-text-field>
    </v-form>

    <!-- Search suggestions -->
    <v-card v-if="searchTerm.results && searchTerm.results.length" class="mt-2">
      <v-list>
        <v-list-item-group
          v-for="place in searchTerm.results"
          :key="place.id"
          @click="() => getWeather(place.id)"
          class="cursor-pointer"
        >
          <v-list-item variant="plain" class="text-blue-darken-1">
            <v-list-item-content>
              <v-list-item-title>
                {{ place.name }}, {{ place.region }}, {{ place.country }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { SearchTerm } from '../stores/type'

const emit = defineEmits<(event: 'place-data', data: any) => void>()

const searchTerm = reactive<SearchTerm>({
  query: '',
  timeout: null,
  results: null
})

const handleSearch = () => {
  if (searchTerm.timeout !== null) {
    clearTimeout(searchTerm.timeout)
  }
  searchTerm.timeout = window.setTimeout(async () => {
    if (searchTerm.query !== '') {
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/search.json?key=d60cd2a41f5e4a86a3363414241709&q=${searchTerm.query}`
        )

        if (!res.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await res.json()
        searchTerm.results = data
      } catch (error) {
        console.error('Fetch error:', error)
        searchTerm.results = null
      }
    } else {
      searchTerm.results = null
    }
  }, 500)
}

const getWeather = async (id: string) => {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=d60cd2a41f5e4a86a3363414241709&q=id:${id}&days=3&aqi=no&alerts=no`
    )

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await res.json()
    emit('place-data', data)

    searchTerm.query = ''
    searchTerm.results = null
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
