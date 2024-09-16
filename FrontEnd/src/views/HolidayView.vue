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
      {{ t('Date') }}: {{ formattedSelectedHolidayDate }}
    </v-sheet>
  </v-card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const holidays = ref<string[]>([])
const selectedHoliday = ref('')
const selectedHolidayDate = ref('')
const hasFetchedHolidays = ref(false)
const timeUnits = ref([
  { value: 0, label: 'Days' },
  { value: 0, label: 'Hours' },
  { value: 0, label: 'Minutes' },
  { value: 0, label: 'Seconds' }
])
let timer: number | undefined
const allHolidays = ref<any[]>([])

const fetchHolidays = async () => {
  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1

  // Fetch holidays for current year
  const response1 = await axios.get('/api/api/v1/holidays', {
    params: {
      country: 'VN',
      language: 'VI',
      year: currentYear,
      apiKey: 'rp8s5lc29e7neav2lav7o2q7fbqg7qboqh6bfvhtu1gnl4j9vom5to'
    }
  })
  const data1 = await response1.data

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Fetch holidays for next year
  const response2 = await axios.get('/api/api/v1/holidays', {
    params: {
      country: 'VN',
      language: 'VI',
      year: nextYear,
      apiKey: 'rp8s5lc29e7neav2lav7o2q7fbqg7qboqh6bfvhtu1gnl4j9vom5to'
    }
  })
  const data2 = await response2.data

  // Combine holidays data
  allHolidays.value = [...data1.holidays, ...data2.holidays]

  // Update holidays list
  holidays.value = allHolidays.value.map((holiday) => holiday.name)

  // Set default selected holiday
  if (holidays.value.length > 0) {
    selectedHoliday.value = holidays.value[0]
    updateHoliday()
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString().split('T')[0]
}

const updateTimer = () => {
  if (!selectedHolidayDate.value) return

  // Calculate the difference in milliseconds
  const t = Date.parse(selectedHolidayDate.value) - Date.now()
  if (t >= 0) {
    // Calculate the remaining time units
    timeUnits.value = [
      { value: Math.floor(t / (1000 * 60 * 60 * 24)), label: 'Days' },
      { value: Math.floor((t / (1000 * 60 * 60)) % 24), label: 'Hours' },
      { value: Math.floor((t / (1000 * 60)) % 60), label: 'Minutes' },
      { value: Math.floor((t / 1000) % 60), label: 'Seconds' }
    ]
  } else {
    // If the date has passed, set all time units to 0
    timeUnits.value = timeUnits.value.map((unit) => ({ ...unit, value: 0 }))
    clearInterval(timer)
  }
}

const updateHoliday = () => {
  let holiday = allHolidays.value.find((holiday) => holiday.name === selectedHoliday.value)
  if (holiday) {
    if (new Date(holiday.date) < new Date()) {
      // If the selected holiday's date has passed, find the same holiday in the next year
      holiday = allHolidays.value.find(
        (holiday) =>
          holiday.name === selectedHoliday.value &&
          new Date(holiday.date).getFullYear() > new Date().getFullYear()
      )
    }
    if (holiday) {
      selectedHolidayDate.value = holiday.date
      clearInterval(timer)
      timer = setInterval(updateTimer, 1000)
      updateTimer()
    } else {
      selectedHolidayDate.value = ''
    }
  }
}

const formattedSelectedHolidayDate = computed(() => {
  return selectedHolidayDate.value ? formatDate(selectedHolidayDate.value) : ''
})

watch(selectedHoliday, updateHoliday)
onMounted(async () => {
  if (!hasFetchedHolidays.value) {
    await fetchHolidays()
    hasFetchedHolidays.value = true
  }
})
</script>
