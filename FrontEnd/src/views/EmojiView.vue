<template>
  <div>
    <v-text-field
      v-model="searchText"
      @input="getEmojiData"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      hide-details
      single-line
      class="w-25 ml-8 my-16 max-h-1"
    ></v-text-field>
  </div>

  <v-row v-if="EmojiData.length > 0" class="mb-6 mx-10 justify-center" no-gutters>
    <v-col v-for="(emoji, index) in EmojiData" :key="index" cols="3">
      <v-skeleton-loader
        color="transparent"
        :loading="loading"
        height="352"
        class="mx-2"
        type="card, text"
        ><v-container>
          <v-card class="rounded-lg" :min-height="352" :elevation="5">
            <v-img class="mt-12 mb-4" :max-height="100" aspect-ratio="1/1" :src="`${emoji.image}`">
              <template v-slot:placeholder>
                <v-row align="center" class="fill-height ma-0" justify="center">
                  <v-progress-circular color="grey-lighten-5" indeterminate> </v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-sheet class="pa-2 ma-2 text-center text-h4"> {{ emoji.character }} </v-sheet>
            <v-sheet class="pa-2 ma-2 mb-10 mt-3 text-center font-weight-bold text-h5">
              {{ emoji.name }}
            </v-sheet>
          </v-card>
        </v-container></v-skeleton-loader
      >
    </v-col>
  </v-row>
  <div v-else>
    <v-empty-state
      icon="mdi-magnify"
      text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
      title="We couldn't find a match."
    ></v-empty-state>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface EmojisData {
  name: string
  image: string
  character: string
}

const searchText = ref('face')
const EmojiData = ref<EmojisData[]>([])
const loading = ref(true)

const ApiKey = 'zyCZHrqXSvEkXTorn4iCbw==qUnHnF2P6vJ7EDl5'

const getEmojiData = async () => {
  loading.value = true
  const NinjaUrl = `https://api.api-ninjas.com/v1/emoji?name=${searchText.value}`
  const response = await fetch(NinjaUrl, { headers: { 'X-Api-Key': ApiKey } })
  const data = await response.json()

  EmojiData.value = data
  LoadData()
}

const LoadData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  loading.value = false
}

onMounted(async () => await getEmojiData())
</script>
