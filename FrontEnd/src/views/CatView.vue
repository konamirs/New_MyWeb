<template>
  <v-text-field
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
    <v-col v-for="n in 7" :key="n" cols="3">
      <v-container>
        <v-card class="rounded-lg" :elevation="5">
          <v-img
            aspect-ratio="16/9"
            cover
            :lazy-src="`https://picsum.photos/10/6?image=${15}`"
            :src="`https://picsum.photos/500/300?image=${15}`"
          >
            <template v-slot:placeholder>
              <v-row align="center" class="fill-height ma-0" justify="center">
                <v-progress-circular color="grey-lighten-5" indeterminate> </v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-sheet class="pa-2 ma-2 mt-5 font-weight-bold text-h5"> Tên mồn lèo </v-sheet>

          <!-- phần chỉ text -->
          <v-row no-gutters v-for="n in 4" :key="n">
            <v-col class="me-auto" cols="7">
              <v-sheet class="pa-2 ma-2 font-weight-bold"> Origin: </v-sheet>
            </v-col>
            <v-col cols="auto">
              <v-sheet class="pa-2 ma-2"> Mĩ nội địa </v-sheet>
            </v-col>
          </v-row>

          <!-- phần xếp hạng sao -->
          <v-row no-gutters v-for="n in 10" :key="n">
            <v-col class="me-auto" cols="auto">
              <v-sheet class="pa-2 ma-2 font-weight-bold"> tier list: </v-sheet>
            </v-col>
            <v-col cols="auto">
              <v-rating v-model="rating" class="ma-2" density="compact"></v-rating>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const rating = 3
</script>
