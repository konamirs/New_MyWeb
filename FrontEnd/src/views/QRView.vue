<template>
  <v-row no-gutters>
    <v-col>
      <v-card class="pa-6 mt-7 mx-12" :elevation="5">
        <v-form ref="form" @submit.prevent="getQr">
          <v-sheet class="mb-3">{{ t('Account Number') }}</v-sheet>
          <v-text-field
            :rules="soTkRule"
            hint="For example: X52X XXX12 45XXX X104"
            label="Số tài khoản"
            variant="outlined"
            density="compact"
            v-model="soTK"
          >
          </v-text-field>

          <v-sheet class="mb-3">{{ t('Account Name') }}</v-sheet>
          <v-text-field
            :rules="tenTkRule"
            hint="For example: Stylist Thief Slayer"
            label="Tên tài khoản"
            variant="outlined"
            density="compact"
            v-model="tenTK"
          >
          </v-text-field>

          <v-sheet class="mb-3">{{ t('Amount') }}</v-sheet>
          <v-text-field
            :rules="[(v) => !!v || 'Vui lòng nhập số tiền']"
            hint="For example: 100.000.000"
            label="Số tiền"
            density="compact"
            variant="outlined"
            v-model="soTien"
          >
          </v-text-field>

          <v-sheet class="mb-3">{{ t('Description') }}</v-sheet>
          <v-text-field
            hint="For example: blah v.v......."
            label="Nội dung chuyển tiền"
            variant="outlined"
            density="compact"
            v-model="noiDung"
          >
          </v-text-field>

          <v-sheet class="mb-3">{{ t('Bank Name') }}</v-sheet>
          <v-autocomplete
            ref="country"
            :rules="[(v) => !!v || 'Vui lòng chọn tên ngân hàng']"
            :items="banks"
            item-title="name"
            item-value="code"
            label="Tên ngân hàng"
            placeholder="Select..."
            required
            v-model="selectedBank"
            chips
          >
            <template v-slot:chip="{ props, item }">
              <v-chip v-bind="props" :prepend-avatar="item.raw.logo" :text="item.raw.name"></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="item.raw.logo"
                :subtitle="item.raw.shortName"
                :title="item.raw.name"
              ></v-list-item>
            </template>
          </v-autocomplete>

          <v-btn class="bg-blue" type="submit" block>{{ t('Generate QR') }}</v-btn>
        </v-form>
      </v-card>
    </v-col>
    <v-col>
      <v-img class="mt-8" :max-height="575" :src="image"></v-img>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Bank {
  name: string
  code: string
  shortName: string
  logo: string
}

const banks = ref<Bank[]>([])
const image = ref('')
const selectedBank = ref()
const tenTK = ref('')
const soTien = ref('')
const noiDung = ref('')
const form = ref<any>(null)
const soTK = ref('')

//validate text
const soTkRule = [
  (v: any) => !!v || 'Vui lòng nhập số tài khoản',
  (v: any) => (v.length >= 9 && v.length <= 18) || 'Số tài khoản phải trong khoảng 9-18 kí tự'
]

const tenTkRule = [
  (v: any) => !!v || 'Vui lòng nhập tên tài khoản',
  (v: any) => (/^[\p{L}\s]+$/gmu.test(v) && !!v) || 'Tên tài khoản chỉ được chứa chữ cái.'
]

const getBank = async () => {
  const response = await fetch('https://api.vietqr.io/v2/banks')
  const data = await response.json()
  banks.value = data.data.map((item: any) => ({
    name: item.name,
    code: item.code,
    shortName: item.shortName,
    logo: item.logo
  }))
  console.log(banks.value, 'bank')
}

getBank()

const getQr = async () => {
  if (form.value) {
    const isValid = await form.value.validate()
    if (isValid) {
      const response =
        await `https://img.vietqr.io/image/${selectedBank.value}-${soTK.value}-print.png?amount=${soTien.value}&addInfo=${noiDung.value}&accountName=${tenTK.value}`

      image.value = response
    }
  }
}
</script>
