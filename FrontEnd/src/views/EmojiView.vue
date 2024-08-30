<template>
  <v-text-field
    v-model="searchText"
    @input="getEmojiData"
    density="compact"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    variant="solo-filled"
    flat
    hide-details
    single-line
    class="w-25 ml-8 my-16"
  ></v-text-field>

  <v-row class="mb-6 mx-10 justify-center" no-gutters>
    <v-col v-for="(emoji, index) in EmojiData" :key="index" cols="3">
      <v-container>
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
      </v-container>
    </v-col>
  </v-row>
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

const ApiKey = 'zyCZHrqXSvEkXTorn4iCbw==qUnHnF2P6vJ7EDl5'

const getEmojiData = async () => {
  const NinjaUrl = `https://api.api-ninjas.com/v1/emoji?name=${searchText.value}`
  const response = await fetch(NinjaUrl, { headers: { 'X-Api-Key': ApiKey } })
  const data = await response.json()

  EmojiData.value = data // Store fetched data
  console.log(data)
}

onMounted(async () => await getEmojiData())
</script>
