<template>
  <v-text-field
    v-model="searchText"
    @input="getCatData"
    density="compact"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    variant="solo-filled"
    flat
    hide-details
    single-line
    class="w-25 ml-8 my-16"
  ></v-text-field>

  <v-row class="mb-6 mx-5 justify-center" no-gutters>
    <v-col v-for="(cat, index) in catsData" :key="index" cols="3">
      <v-container class="mb-16">
        <v-card class="rounded-lg" :min-height="1097" :elevation="5">
          <v-img :max-height="189" cover aspect-ratio="16/9" :src="`${cat.image_link}`">
            <template v-slot:placeholder>
              <v-row align="center" class="fill-height ma-0" justify="center">
                <v-progress-circular color="grey-lighten-5" indeterminate> </v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-sheet class="pa-2 ma-2 mt-5 font-weight-bold text-h5"> {{ cat.name }} </v-sheet>

          <!-- phần chỉ text -->
          <v-row no-gutters v-for="(cat1, index) in catTitle1" :key="index">
            <v-col class="me-auto">
              <v-sheet class="pa-2 ma-2 font-weight-bold"> {{ cat1 }}: </v-sheet>
            </v-col>

            <v-col>
              <v-sheet v-if="index.valueOf() === 0" class="pa-2 ma-2 mt-2 text-end">
                {{ cat.origin }}
              </v-sheet>
              <v-sheet v-if="index.valueOf() === 1" class="pa-2 ma-2 mt-2 text-end">
                {{ cat.length }}
              </v-sheet>
              <v-sheet v-if="index.valueOf() === 2" class="pa-2 ma-2 mt-2 text-end">
                {{ cat.min_weight }} - {{ cat.max_weight }} kg
              </v-sheet>
              <v-sheet v-if="index.valueOf() === 3" class="pa-2 ma-2 mt-2 text-end">
                {{ cat.min_life_expectancy }} - {{ cat.max_life_expectancy }} years
              </v-sheet>
            </v-col>
          </v-row>

          <!-- phần xếp hạng sao -->
          <v-row no-gutters v-for="(cat2, index) in catTitle2" :key="index">
            <v-col class="me-auto">
              <v-sheet class="pa-2 ma-2 font-weight-bold"> {{ cat2 }}: </v-sheet>
            </v-col>
            <v-col cols="auto">
              <v-rating
                v-if="index.valueOf() === 0"
                v-model="cat.family_friendly"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 1"
                v-model="cat.shedding"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 2"
                v-model="cat.general_health"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 3"
                v-model="cat.playfulness"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 4"
                v-model="cat.meowing"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 5"
                v-model="cat.children_friendly"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 6"
                v-model="cat.stranger_friendly"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 7"
                v-model="cat.grooming"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 8"
                v-model="cat.intelligence"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>

              <v-rating
                v-if="index.valueOf() === 9"
                v-model="cat.other_pets_friendly"
                class="mt-3 mr-2 text-blue"
                density="compact"
              ></v-rating>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface CatData {
  name: string
  image_link: string
  origin: string
  length: string
  family_friendly: number
  shedding: number
  playfulness: number
  general_health: number
  children_friendly: number
  stranger_friendly: number
  grooming: number
  meowing: number
  intelligence: number
  other_pets_friendly: number
  min_weight: number
  max_weight: number
  min_life_expectancy: number
  max_life_expectancy: number
}

const searchText = ref('shorthair')

const catsData = ref<CatData[]>([]) // Reactive variable to store fetched data

const catTitle1 = computed(() => [t('Origin'), t('Length'), t('Weight'), t('Life Expectancy')])

const catTitle2 = computed(() => [
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

const ApiKey = 'zyCZHrqXSvEkXTorn4iCbw==qUnHnF2P6vJ7EDl5'

const getCatData = async () => {
  const NinjaUrl = `https://api.api-ninjas.com/v1/cats?name=${searchText.value}`
  const response = await fetch(NinjaUrl, { headers: { 'X-Api-Key': ApiKey } })
  const data = await response.json()

  catsData.value = data // Store fetched data
}

onMounted(async () => await getCatData())
</script>
