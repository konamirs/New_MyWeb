<template>
  <v-card class="mx-auto w-screen mt-5" color="#ebe6e6" width="600">
    <v-app>
      <v-container>
        <v-select
          clearable
          label="Select"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          variant="outlined"
        ></v-select>
      </v-container>
    </v-app>
  </v-card>
</template>
