export function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=')
    if (key === name)
      return decodeURIComponent(value)
  }
  return null
}

export function setCookie(
  name: string,
  value: string,
  days = 365,
  path = '/',
): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`
}

export function deleteCookie(name: string, path = '/'): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`
}
