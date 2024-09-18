<template>
  <div>
    <v-row justify="center" class="text-h5 mt-3">
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

    <v-text-field
      v-model="searchText"
      @input="fetchCatData"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      hide-details
      single-line
      class="w-25 ml-8 my-16"
    />

    <v-row v-if="catsData.length" class="mb-6 mx-5 justify-start" no-gutters>
      <v-col v-for="(cat, index) in catsData" :key="index" cols="3" class="mb-6">
        <v-skeleton-loader
          :loading="loading"
          color="transparent"
          height="1097"
          type="card, sentences,sentences,sentences,sentences,sentences,sentences, sentences"
          class="mx-2"
        >
          <v-card class="rounded-lg" :min-height="1097" :width="480" :elevation="5">
            <v-img height="189" cover aspect-ratio="16/9" :src="cat.image_link">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0">
                  <v-progress-circular color="grey-lighten-5" indeterminate />
                </v-row>
              </template>
            </v-img>

            <v-sheet class="pa-2 ma-2 mt-5 font-weight-bold text-h5">{{ cat.name }}</v-sheet>

            <v-row no-gutters v-for="(value, i) in catInfo(cat)" :key="i">
              <v-col class="me-auto">
                <v-sheet class="pa-2 ma-2 font-weight-bold">{{ catLabels[i] }}:</v-sheet>
              </v-col>

              <v-col>
                <v-sheet class="pa-2 ma-2 mt-2 text-end">{{ value }}</v-sheet>
              </v-col>
            </v-row>

            <v-row no-gutters v-for="(rating, i) in catRatings(cat)" :key="i">
              <v-col class="me-auto">
                <v-sheet class="pa-2 ma-2 font-weight-bold">{{ ratingLabels[i] }}:</v-sheet>
              </v-col>

              <v-col cols="auto">
                <v-rating v-model="rating.value" class="mt-3 mr-2 text-blue" density="compact" />
              </v-col>
            </v-row>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>

    <v-empty-state v-else icon="mdi-magnify" title="We couldn't find a match.">
      <template v-slot:text>
        Try adjusting your search terms or filters. Sometimes less specific terms or broader queries
        can help you find what you're looking for.
      </template>
    </v-empty-state>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CatData } from '../stores/type'

const { t } = useI18n()
const loading = ref(true)
const searchText = ref('shorthair')
const catsData = ref<CatData[]>([])

const catLabels = computed(() => [t('Origin'), t('Length'), t('Weight'), t('Life Expectancy')])

const ratingLabels = computed(() => [
  t('Family Friendly'),
  t('Shedding'),
  t('General Health'),
  t('Playfulness'),
  t('Meowing'),
  t('Children Friendly'),
  t('Stranger Friendly'),
  t('Grooming'),
  t('Intelligence'),
  t('Other Pets Friendly')
])

const fetchCatData = async () => {
  loading.value = true
  const response = await fetch(`https://api.api-ninjas.com/v1/cats?name=${searchText.value}`, {
    headers: { 'X-Api-Key': 'zyCZHrqXSvEkXTorn4iCbw==qUnHnF2P6vJ7EDl5' }
  })
  catsData.value = await response.json()
  setTimeout(() => (loading.value = false), 2000)
}

const catInfo = (cat: CatData) => [
  cat.origin,
  cat.length,
  `${cat.min_weight} - ${cat.max_weight} kg`,
  `${cat.min_life_expectancy} - ${cat.max_life_expectancy} years`
]

const catRatings = (cat: CatData) => [
  { value: cat.family_friendly },
  { value: cat.shedding },
  { value: cat.general_health },
  { value: cat.playfulness },
  { value: cat.meowing },
  { value: cat.children_friendly },
  { value: cat.stranger_friendly },
  { value: cat.grooming },
  { value: cat.intelligence },
  { value: cat.other_pets_friendly }
]

onMounted(fetchCatData)
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
