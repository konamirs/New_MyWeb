<template>
  <v-card class="pa-4">
    <!-- Close button -->
    <v-row justify="end" class="mb-4">
      <v-btn icon @click="$emit('close-info')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>

    <v-row justify="space-between" class="mb-4">
      <!-- Wind speed -->
      <v-col class="text-center" cols="4">
        <v-icon large>mdi-weather-windy</v-icon>
        <p class="headline">{{ place.current.wind_kph }} km/h</p>
        <p>Tốc độ gió</p>
      </v-col>
      <!-- Humidity level -->
      <v-col class="text-center" cols="4">
        <v-icon large>mdi-water</v-icon>
        <p class="headline">{{ place.current.humidity }}%</p>
        <p>Độ ẩm</p>
      </v-col>
      <!-- Precipitation -->
      <v-col class="text-center" cols="4">
        <v-icon large>mdi-weather-pouring</v-icon>
        <p class="headline">{{ place.current.precip_mm }} mm</p>
        <p>Lượng mưa</p>
      </v-col>
    </v-row>

    <v-row justify="space-between" class="mb-4">
      <!-- Wind direction -->
      <v-col class="text-center" cols="4">
        <v-icon large>mdi-compass</v-icon>
        <p class="headline">{{ place.current.wind_dir }}</p>
        <p>Hướng gió</p>
      </v-col>
      <!-- Feels like -->
      <v-col class="text-center" cols="4">
        <v-icon large>mdi-thermometer</v-icon>
        <p class="headline">{{ Math.round(place.current.feelslike_c) }}&deg;</p>
        <p>Cảm giác</p>
      </v-col>
      <!-- UV -->
      <v-col class="text-center" cols="4">
        <v-icon large>mdi-weather-sunny</v-icon>
        <p class="headline">{{ place.current.uv }}</p>
        <p>Chỉ số UV</p>
      </v-col>
    </v-row>

    <!-- Last update and delete -->
    <v-row justify="space-between" align="center">
      <v-col>
        <span class="caption">Cập nhật cuối: {{ place.current.last_updated }}</span>
      </v-col>
      <v-col class="text-right">
        <v-btn icon @click="$emit('remove-place')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Place } from '../stores/type'

const props = defineProps<{
  place: Place
}>()
</script>
<!-- 
//d60cd2a41f5e4a86a3363414241709
//`http://api.weatherapi.com/v1/forecast.json?key=d60cd2a41f5e4a86a3363414241709&q=id:${id}&days=3&aqi=no&alerts=no` -->
