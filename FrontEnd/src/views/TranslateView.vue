<template>
  <v-card class="mx-auto w-screen mt-5" width="900">
    <v-row class="mb-6 mx-2" no-gutters>
      <v-col class="mx-7">
        <v-sheet>Ngôn ngữ gốc</v-sheet>

        <v-select
          clearable
          label="Select"
          :items="['Auto Detect', 'Vietnamese', 'English', 'Chinese', 'Japan']"
          class="mt-3"
          variant="outlined"
          density="compact"
        >
        </v-select>

        <v-sheet class="mb-1 mr-3">Văn bản cần dịch</v-sheet>

        <v-textarea
          :rules="[(v) => v.length <= 5000 || 'Max 5000 characters']"
          counter
        ></v-textarea>
      </v-col>

      <v-col class="mx-7">
        <v-sheet>Ngôn ngữ dịch</v-sheet>

        <v-select
          clearable
          label="Select"
          :items="['Vietnamese', 'English', 'Chinese', 'Japan']"
          class="mt-3"
          ref="textToCopy"
          variant="outlined"
          density="compact"
        >
        </v-select>

        <v-sheet>Văn bản đã dịch</v-sheet>

        <v-textarea
          :rules="[(v) => v.length <= 5000 || 'Max 5000 characters']"
          counter
        ></v-textarea>
      </v-col>
    </v-row>
  </v-card>
</template>
