<template>
  <div class="absolute h-24 bg-gray-700 mb-2 border-b-2 border-black">
    <div class="marquee">
      <div
        v-for="fact in currentFact"
        :key="fact"
        class="w-1/5 shrink-0 size-20 text-sm whitespace-nowrap"
      >
        Fact: {{ fact }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const facts = [
  "The Moon is Earth's only natural satellite.",
  'The Mona Lisa has no eyebrows.',
  'The unique smell of rain actually comes from plant oils, bacteria, and ozone.',
  'Every time you clean something, you need to make something else dirty.',
  'Information is useless if it is not applied to something important or you forgot it first'
]

const currentFactIndex = ref(0)
const currentFact = computed(() => [facts[currentFactIndex.value]])

const nextFact = () => {
  currentFactIndex.value = (currentFactIndex.value + 1) % facts.length
}

onMounted(() => {
  setInterval(nextFact, 20000)
})
</script>

<style>
.marquee {
  list-style: none;
  height: 100%;
  animation: scrolling 10s linear infinite;
}
@keyframes scrolling {
  0% {
    transform: translateX(110vw);
  }
  100% {
    transform: translateX(-60vw);
  }
}
</style>
