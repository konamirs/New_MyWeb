<template>
  <v-container>
    <!-- Date -->
    <v-row justify="center" class="text-h5">
      <v-col class="text-center">
        <span class="display-1">
          {{
            new Date().toLocaleDateString('vi-vn', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }}
        </span>
      </v-col>
    </v-row>

    <!-- Search -->
    <v-row class="my-4">
      <v-col cols="12">
        <search-input @place-data="addPlace" />
      </v-col>
    </v-row>

    <!-- Weather cards -->
    <v-row>
      <v-col v-for="(place, idx) in places" :key="idx" cols="12" md="6">
        <weather-card :place="place" @delete-place="deletePlace" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import WeatherCard from '@/components/WeatherCard.vue'

const places = ref<any[]>([])

const addPlace = (data: any) => {
  places.value.push(data)
}

const deletePlace = (name: string) => {
  if (confirm('Bạn đã chắc chưa?')) {
    places.value = places.value.filter((p) => p.location.name !== name)
  }
}
</script>
