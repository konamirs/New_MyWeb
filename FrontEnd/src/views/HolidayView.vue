<template>
  <v-card class="mx-auto w-screen mt-5" width="600">
    <v-container>
      <v-select
        clearable
        label="Select"
        :items="[
          'Tết nguyên đán (1/1 âm lịch)',
          'Giáng sinh (25/12)',
          'Quốc khánh (2/9)',
          'Ngày thống nhất (30/4)',
          'Valentine (14/2)',
          'Valentine trắng (14/3)',
          'Ngày nhà giáo Việt Nam (20/11)',
          'Ngày quốc tế phụ nữ (8/3)',
          'Ngày phụ nữ Việt Nam (20/11)',
          'Tết dương lịch (1/1)',
          'Giỗ tổ Hùng vương (10/3 âm lịch)',
          'Trung thu (15/8 âm lịch)',
          'Ngày quốc tế thiếu nhi (1/6)'
        ]"
        variant="outlined"
      ></v-select>
    </v-container>

    <v-row class="mb-6 mx-10" no-gutters>
      <v-hover v-slot="{ isHovering, props }">
        <v-col>
          <v-card :class="['mx-2', isHovering ? 'onHover' : '']" v-bind="props" :elevation="5">
            <div class="text-center font-weight-bold text-h2 mt-3">18</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">Days</div>
          </v-card>
        </v-col> </v-hover
      ><v-hover v-slot="{ isHovering, props }">
        <v-col>
          <v-card :class="['mx-2', isHovering ? 'onHover' : '']" v-bind="props" :elevation="5">
            <div class="text-center font-weight-bold text-h2 mt-3">18</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">Hours</div>
          </v-card>
        </v-col> </v-hover
      ><v-hover v-slot="{ isHovering, props }">
        <v-col>
          <v-card :class="['mx-2', isHovering ? 'onHover' : '']" v-bind="props" :elevation="5">
            <div class="text-center font-weight-bold text-h2 mt-3">18</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">Minutes</div>
          </v-card>
        </v-col>
      </v-hover>
      <v-hover v-slot="{ isHovering, props }">
        <v-col>
          <v-card :class="['mx-2', isHovering ? 'onHover' : '']" v-bind="props" :elevation="5">
            <div class="text-center font-weight-bold text-h2 mt-3">18</div>
            <div class="text-center text-disabled text-h6 ml-2 mb-3">Seconds</div>
          </v-card>
        </v-col>
      </v-hover>
    </v-row>
    <v-sheet class="text-center font-weight-bold text-h5">Sự kiện đã chọn: {{ example }}</v-sheet>
    <v-sheet class="text-center text-disabled text-h6 mb-10">Ngày: {{ example }}</v-sheet>
  </v-card>
</template>

<script setup lang="ts">
const example = ['guess what']
</script>

<style>
.onHover {
  animation: goup 0.5s ease-in-out forwards;
}
@keyframes goup {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-15px);
  }
}
</style>
