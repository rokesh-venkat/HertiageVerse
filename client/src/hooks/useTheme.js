import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'heritageverse-theme'

/**
 * Theme hook — manages dark/light mode.
 *
 * Priority:
 * 1. Persisted localStorage value
 * 2. System preference (prefers-color-scheme)
 * 3. Default: 'dark' (matches the existing design)
 *
 * Adds/removes `class="dark"` on <html> and persists choice.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light'
    return 'dark'
  })

  // Sync <html> class whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const setTheme = useCallback((t) => {
    if (t === 'light' || t === 'dark') setThemeState(t)
  }, [])

  const isDark = theme === 'dark'

  return { theme, isDark, toggleTheme, setTheme }
}
