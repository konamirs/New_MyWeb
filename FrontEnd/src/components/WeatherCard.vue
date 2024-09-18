<template>
  <v-container
    :class="place.current.is_day === 1 ? 'bg-day' : 'bg-night'"
    class="text-white p-10 rounded-lg shadow-lg gap-6 mb-6 relative overflow-hidden"
  >
    <!-- Location & time -->
    <v-row class="mb-2" align="center" justify="space-between">
      <v-col cols="6" class="d-flex align-center">
        <v-icon>mdi-map-marker</v-icon>
        <h1 class="text-3xl ml-2">{{ place.location.name }}</h1>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <v-icon>mdi-clock-outline</v-icon>
        <h1 class="text-3xl ml-2">
          {{ new Date(place.location.localtime).getHours() }}:{{
            new Date(place.location.localtime).getMinutes()
          }}
        </h1>
      </v-col>
    </v-row>

    <!-- Current weather -->
    <v-row class="text-center">
      <v-col>
        <v-img
          :src="place.current.condition.icon"
          alt="icon"
          max-width="200"
          class="mx-auto -mb-10"
        />
        <h1 class="text-h1 font-weight-bold mb-2 ml-10">
          {{ Math.round(place.current.temp_c) }}&deg;
        </h1>
        <p class="text-h4 ml-3">{{ place.current.condition.text }}</p>
      </v-col>
    </v-row>

    <BorderLine />

    <!-- Forecast -->
    <div v-for="(day, idx) in place.forecast.forecastday" :key="idx" no-gutters>
      <WeatherForecastDay :day="day" />
    </div>

    <!-- Info -->
    <Transition name="fade">
      <v-dialog v-model="showDetail" max-width="600">
        <WeatherInfo
          :place="place"
          @close-info="showDetail = false"
          @remove-place="removePlace(place.location.name)"
        />
      </v-dialog>
    </Transition>

    <!-- Forecast btn -->
    <v-row class="mt-10">
      <v-col class="d-flex justify-end">
        <v-btn @click="showDetail = true" color="primary">
          More <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import BorderLine from './BorderLine.vue'
import WeatherForecastDay from './WeatherForecastDay.vue'
import WeatherInfo from './WeatherInfo.vue'
import type { Place } from '../stores/type'

const props = defineProps<{
  place: Place
}>()

const emit = defineEmits<{
  (event: 'delete-place', placeName: string): void
}>()

const showDetail = ref(false)

const removePlace = (placeName: string) => {
  emit('delete-place', placeName)
  showDetail.value = false
}
</script>

<style scoped>
.bg-day {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
}
.bg-night {
  background-color: #07223d;
  background-image: linear-gradient(62deg, #0a2a4a 0%, #270845 100%);
}
</style>
