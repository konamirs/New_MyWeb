<template>
  <v-row class="px-10" align="center" justify="space-between">
    <v-col cols="5">
      <!-- Day of the week -->
      {{ new Date(day.date).toLocaleDateString('en-us', { weekday: 'long' }) }}
    </v-col>

    <v-col cols="3">
      <!-- Icon -->
      <v-img :src="day.day.condition.icon" alt="icon" max-width="40" />
    </v-col>

    <v-col cols="4" class="text-end">
      <!-- High/Low temp -->
      {{ Math.round(day.day.maxtemp_c) }}&deg; / {{ Math.round(day.day.mintemp_c) }}&deg;
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { WeatherDay } from '../stores/type'

// Define props with TypeScript type
const props = defineProps<{
  day: WeatherDay
}>()
</script>
