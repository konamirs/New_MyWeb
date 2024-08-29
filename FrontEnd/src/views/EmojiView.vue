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
        <v-card class="rounded-lg bg-grey">
          <v-sheet class="pa-2 ma-2 my-6 text-center bg-blue">
            <v-icon>mdi-magnify</v-icon>
          </v-sheet>
          <v-sheet class="pa-2 ma-2 text-center bg-blue"> .v-col-4 </v-sheet>
          <v-sheet class="pa-2 ma-2 mb-10 mt-3 text-center bg-blue"> .v-col-4 </v-sheet>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>
