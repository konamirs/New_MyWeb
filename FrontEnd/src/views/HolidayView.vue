<template>
  <v-card class="mx-auto w-screen mt-5" width="600" :elevation="8">
    <v-container>
      <v-select
        label="Select"
        :items="holidays"
        v-model="selectedHoliday"
        variant="outlined"
        @change="onHolidaySelect"
      ></v-select>
    </v-container>

    <v-row class="mb-6 mx-10" no-gutters>
      <v-hover v-slot="{ isHovering, props }">
        <v-col>
          <v-card
            :class="['mx-2', 'rounded-xl', isHovering ? 'onHover' : '']"
            v-bind="props"
            :elevation="5"
          >
            <div class="text-center font-weight-bold text-h2 mt-3">{{ days }}</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">Days</div>
          </v-card>
        </v-col> </v-hover
      ><v-hover v-slot="{ isHovering, props }">
        <v-col>
          <v-card
            :class="['mx-2', 'rounded-xl', isHovering ? 'onHover' : '']"
            v-bind="props"
            :elevation="5"
          >
            <div class="text-center font-weight-bold text-h2 mt-3">{{ hours }}</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">Hours</div>
          </v-card>
        </v-col> </v-hover
      ><v-hover v-slot="{ isHovering, props }">
        <v-col>
          <v-card
            :class="['mx-2', 'rounded-xl', isHovering ? 'onHover' : '']"
            v-bind="props"
            :elevation="5"
          >
            <div class="text-center font-weight-bold text-h2 mt-3">{{ minutes }}</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">Minutes</div>
          </v-card>
        </v-col>
      </v-hover>
      <v-hover v-slot="{ isHovering, props }">
        <v-col>
          <v-card
            :class="['mx-2', 'rounded-xl', isHovering ? 'onHover' : '']"
            v-bind="props"
            :elevation="5"
          >
            <div class="text-center font-weight-bold text-h2 mt-3">{{ seconds }}</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">Seconds</div>
          </v-card>
        </v-col>
      </v-hover>
    </v-row>
    <v-sheet class="text-center font-weight-bold text-h5"
      >Sự kiện đã chọn: {{ selectedHoliday }}</v-sheet
    >
    <v-sheet class="text-center text-disabled text-h6 mb-10"
      >Ngày: {{ selectedHolidayDate }}</v-sheet
    >
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

// Map holidays to their corresponding dates (ensure dates are in YYYY-MM-DD format)
const holidayDates: { [key: string]: string } = {
  'Tết nguyên đán (1/1 âm lịch)': '2025-01-29',
  'Giáng sinh (25/12)': '2024-12-25',
  'Quốc khánh (2/9)': '2024-09-02',
  'Ngày thống nhất (30/4)': '2025-04-30',
  'Valentine (14/2)': '2025-02-14',
  'Valentine trắng (14/3)': '2025-03-14',
  'Ngày nhà giáo Việt Nam (20/11)': '2024-11-20',
  'Ngày quốc tế phụ nữ (8/3)': '2025-03-08',
  'Ngày phụ nữ Việt Nam (20/11)': '2024-11-20',
  'Tết dương lịch (1/1)': '2025-01-01',
  'Giỗ tổ Hùng vương (10/3 âm lịch)': '2025-04-07',
  'Trung thu (15/8 âm lịch)': '2024-09-17',
  'Ngày quốc tế thiếu nhi (1/6)': '2025-06-01'
}

const holidays = ref(Object.keys(holidayDates))
const selectedHoliday = ref('Tết nguyên đán (1/1 âm lịch)')
const selectedHolidayDate = ref('2025-01-29')
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let timer: number | undefined = undefined

const updateTimer = () => {
  if (selectedHolidayDate.value) {
    const t =
      Date.parse(selectedHolidayDate.value) - Date.now() + new Date().getTimezoneOffset() * 60000
    if (t >= 0) {
      days.value = Math.floor(t / (1000 * 60 * 60 * 24))
      hours.value = Math.floor((t / (1000 * 60 * 60)) % 24)
      minutes.value = Math.floor((t / (1000 * 60)) % 60)
      seconds.value = Math.floor((t / 1000) % 60)
    } else {
      days.value = hours.value = minutes.value = seconds.value = 0
      clearInterval(timer) // Stop timer if the date has passed
    }
  }
}

const onHolidaySelect = () => {
  selectedHolidayDate.value = holidayDates[selectedHoliday.value] || ''
  if (selectedHolidayDate.value) {
    clearInterval(timer) // Clear any existing timer
    timer = setInterval(updateTimer, 1000) // Start a new timer
    updateTimer() // Update timer immediately
  }
}

watch(selectedHoliday, onHolidaySelect)
onMounted(() => {
  updateTimer()
  onHolidaySelect()
})
</script>

<style>
.onHover {
  animation: goup 0.5s ease-in-out forwards;
}
@keyframes goup {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-15px);
  }
}
</style>
