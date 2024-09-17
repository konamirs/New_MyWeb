import { defineStore } from 'pinia'
import axios from 'axios'

export const useHolidayStore = defineStore('holiday', {
  state: () => ({
    holidays: [] as string[],
    selectedHoliday: '' as string,
    selectedHolidayDate: '' as string,
    allHolidays: [] as any[],
    hasFetchedHolidays: false,
    timeUnits: [
      { value: 0, label: 'Days' },
      { value: 0, label: 'Hours' },
      { value: 0, label: 'Minutes' },
      { value: 0, label: 'Seconds' }
    ] as { value: number; label: string }[],
    timer: undefined as number | undefined
  }),
  actions: {
    async fetchHolidays() {
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
      this.allHolidays = [...data1.holidays, ...data2.holidays]
      this.holidays = this.allHolidays.map((holiday) => holiday.name)

      // Set default selected holiday
      if (this.holidays.length > 0) {
        this.selectedHoliday = this.holidays[0]
      }
    }
  },
  getters: {
    formattedSelectedHolidayDate: (state) => {
      const date = new Date(state.selectedHolidayDate)
      return state.selectedHolidayDate ? date.toLocaleDateString().split('T')[0] : ''
    }
  }
})
