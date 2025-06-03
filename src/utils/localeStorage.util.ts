export function getLocalStorage(name: string): string | null {
  try {
    return localStorage.getItem(name)
  }
  catch (e) {
    console.error(`Error getting localStorage item "${name}":`, e)
    return null
  }
}

export function setLocalStorage(name: string, value: string): void {
  try {
    localStorage.setItem(name, value)
  }
  catch (e) {
    console.error(`Error setting localStorage item "${name}":`, e)
  }
}

export function deleteLocalStorage(name: string): void {
  try {
    localStorage.removeItem(name)
  }
  catch (e) {
    console.error(`Error removing localStorage item "${name}":`, e)
  }
}
