import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const scrolled = ref(false)

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    scrolled.value = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
  }

  return scrolled
}
