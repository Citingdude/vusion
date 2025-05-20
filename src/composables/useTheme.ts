import { onBeforeMount, ref } from 'vue'
import { getCookie, setCookie } from '@/utils/cookie.util'

type Theme = 'dark' | 'light'

export function useTheme() {
  const theme = ref<'dark' | 'light'>('light')

  function toggleTheme() {
    theme.value === 'dark'
      ? setTheme('light')
      : setTheme('dark')
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    setCookie('theme', newTheme)
  }

  onBeforeMount(() => {
    const savedTheme = getCookie('theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      theme.value = savedTheme
    }
  })

  return {
    theme,
    toggleTheme,
  }
}
