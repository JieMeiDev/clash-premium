export type ThemePreference = 'light' | 'dark' | 'auto'

export const THEME_STORAGE_KEY = 'clash-dashboard-theme'

export function getStoredTheme (): ThemePreference {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    if (value === 'system') {
        return 'auto'
    }
    if (value === 'light' || value === 'dark' || value === 'auto') {
        return value
    }
    return 'auto'
}

export function applyTheme (preference: ThemePreference) {
    document.documentElement.dataset.theme = preference
    document.documentElement.style.colorScheme = preference === 'auto' ? 'light dark' : preference
}

export function setStoredTheme (preference: ThemePreference) {
    localStorage.setItem(THEME_STORAGE_KEY, preference)
    applyTheme(preference)
}
