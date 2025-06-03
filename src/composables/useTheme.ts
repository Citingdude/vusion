import { onBeforeMount, ref } from 'vue'
import { getLocalStorage, setLocalStorage } from '@/utils/localeStorage.util'

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
    setLocalStorage('theme', newTheme)
  }

  onBeforeMount(() => {
    const savedTheme = getLocalStorage('theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      theme.value = savedTheme
    }
  })

  return {
    theme,
    toggleTheme,
  }
}
