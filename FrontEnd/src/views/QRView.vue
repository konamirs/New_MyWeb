<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-6 ma-12" :elevation="5">
        <v-sheet class="mb-3">Số tài khoản</v-sheet>
        <v-text-field
          hint="For example: X52X XXX12 45XXX X104"
          label="Số tài khoản"
          variant="outlined"
          density="compact"
        >
        </v-text-field>

        <v-sheet class="mb-3">Tên tài khoản</v-sheet>
        <v-text-field
          hint="For example: Stylist Thief Slayer"
          label="Tên tài khoản"
          variant="outlined"
          density="compact"
        >
        </v-text-field>

        <v-sheet class="mb-3">Số tiền</v-sheet>
        <v-text-field
          hint="For example: 100.000.000"
          label="Số tiền"
          density="compact"
          variant="outlined"
        >
        </v-text-field>

        <v-sheet class="mb-3">Nội dung chuyển tiền</v-sheet>
        <v-text-field
          hint="For example: blah v.v......."
          label="Nội dung chuyển tiền"
          variant="outlined"
          density="compact"
        >
        </v-text-field>

        <v-sheet class="mb-3">Tên ngân hàng</v-sheet>
        <v-autocomplete
          ref="country"
          :items="['TPB', 'MBB']"
          label="Tên ngân hàng"
          placeholder="Select..."
          required
          density="compact"
        ></v-autocomplete>

        <v-btn class="bg-blue">Tạo mã</v-btn>
      </v-card>
    </v-col>
    <v-col>
      <v-img
        max-height="300"
        aspect-ratio="16/9"
        cover
        :src="`https://picsum.photos/500/300?image=${15}`"
      ></v-img>
    </v-col>
  </v-row>
</template>
