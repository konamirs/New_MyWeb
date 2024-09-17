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
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHolidayStore } from '@/stores/holiday'

const { t } = useI18n()
const holidayStore = useHolidayStore()

const holidays = computed(() => {
  const uniqueHolidays = [...new Set(holidayStore.holidays)]
  return uniqueHolidays
})
const selectedHoliday = ref<string>(holidayStore.selectedHoliday)
const timeUnits = ref(holidayStore.timeUnits)
const selectedHolidayDate = ref<string>(holidayStore.selectedHolidayDate)

// Function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString().split('T')[0]
}

// Computed property to format the selected holiday date
const formattedSelectedHolidayDate = computed(() => {
  return selectedHolidayDate.value ? formatDate(selectedHolidayDate.value) : ''
})

// Update Timer
function updateTimer() {
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
    clearInterval(timer.value)
  }
}

// Update Holiday
function updateHoliday() {
  let holiday = holidayStore.allHolidays.find((holiday) => holiday.name === selectedHoliday.value)
  if (holiday) {
    if (new Date(holiday.date) < new Date()) {
      // If the selected holiday's date has passed, find the same holiday in the next year
      holiday = holidayStore.allHolidays.find(
        (holiday) =>
          holiday.name === selectedHoliday.value &&
          new Date(holiday.date).getFullYear() > new Date().getFullYear()
      )
    }
    if (holiday) {
      selectedHolidayDate.value = holiday.date
      clearInterval(timer.value)
      timer.value = setInterval(updateTimer, 1000)
      updateTimer()
    } else {
      selectedHolidayDate.value = ''
    }
  }
}

// Timer ref
const timer = ref<number | undefined>()

// Watch for changes in selectedHoliday
watch(
  selectedHoliday,
  () => {
    if (selectedHoliday.value) {
      updateHoliday()
    }
  },
  { immediate: true } // Ensure the watcher runs immediately on mount
)

onMounted(async () => {
  if (!holidayStore.hasFetchedHolidays) {
    await holidayStore.fetchHolidays()
    holidayStore.hasFetchedHolidays = true

    // If there are holidays available, set the default selectedHoliday
    if (holidayStore.holidays.length > 0) {
      selectedHoliday.value = holidayStore.holidays[0]
      updateHoliday()
    }
  }
})
</script>
