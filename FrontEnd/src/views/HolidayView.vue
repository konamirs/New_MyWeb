<template>
  <v-card class="mx-auto w-screen mt-16" width="600" :elevation="8">
    <v-container>
      <v-select
        label="Select"
        :items="holidays"
        v-model="selectedHoliday"
        variant="outlined"
        @change="updateHoliday"
      />
    </v-container>

    <v-row class="mb-6 mx-10" no-gutters>
      <v-col v-for="(unit, index) in timeUnits" :key="index">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            class="mx-2 rounded-xl"
            :class="{ onHover: isHovering }"
            v-bind="props"
            :elevation="5"
          >
            <div class="text-center font-weight-bold text-h2 mt-3">{{ unit.value }}</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">{{ t(unit.label) }}</div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-sheet class="text-center font-weight-bold text-h5">
      {{ t('SelectedDate') }}: {{ selectedHoliday }}
    </v-sheet>
    <v-sheet class="text-center text-disabled text-h6 mb-10">
      {{ t('Date') }}: {{ selectedHolidayDate }}
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

// Define type with index signature
interface HolidayDates {
  [key: string]: string
}

const { t } = useI18n()

// Map holidays to their corresponding dates
const holidayDates: HolidayDates = {
  'Tết nguyên đán (1/1 âm lịch)': '2025-01-29',
  'Giáng sinh (25/12)': '2024-12-25',
  'Quốc khánh (2/9)': '2025-09-02',
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
const selectedHolidayDate = ref(holidayDates[selectedHoliday.value])
const timeUnits = ref([
  { value: 0, label: 'Days' },
  { value: 0, label: 'Hours' },
  { value: 0, label: 'Minutes' },
  { value: 0, label: 'Seconds' }
])
let timer: number | undefined

const updateTimer = () => {
  if (!selectedHolidayDate.value) return
  const t =
    Date.parse(selectedHolidayDate.value) - Date.now() + new Date().getTimezoneOffset() * 60000
  if (t >= 0) {
    timeUnits.value = [
      { value: Math.floor(t / (1000 * 60 * 60 * 24)), label: 'Days' },
      { value: Math.floor((t / (1000 * 60 * 60)) % 24), label: 'Hours' },
      { value: Math.floor((t / (1000 * 60)) % 60), label: 'Minutes' },
      { value: Math.floor((t / 1000) % 60), label: 'Seconds' }
    ]
  } else {
    timeUnits.value = timeUnits.value.map((unit) => ({ ...unit, value: 0 }))
    clearInterval(timer)
  }
}

const updateHoliday = () => {
  selectedHolidayDate.value = holidayDates[selectedHoliday.value] || ''
  clearInterval(timer)
  if (selectedHolidayDate.value) {
    timer = setInterval(updateTimer, 1000)
    updateTimer()
  }
}

watch(selectedHoliday, updateHoliday)
onMounted(updateHoliday)
</script>

<style>
.onHover {
  animation: goup 0.5s ease-in-out forwards;
}
@keyframes goup {
  to {
    transform: translateY(-15px);
  }
}
</style>
