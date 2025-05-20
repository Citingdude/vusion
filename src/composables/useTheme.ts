import { ref } from 'vue'

export function useTheme() {
  const theme = ref<'dark' | 'light'>('light')

  function toggleTheme() {
    if (theme.value === 'dark') {
      theme.value = 'light'
    }
    else {
      theme.value = 'dark'
    }
  }

  return {
    theme,
    toggleTheme,
  }
}
