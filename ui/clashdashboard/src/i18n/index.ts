import en_US from './en_US'

export const Language = {
    en_US,
} as const

export type Lang = keyof typeof Language

export type LocalizedType = typeof Language.en_US

export const locales = Object.keys(Language) as Lang[]

export function getDefaultLanguage (): Lang {
    return 'en_US'
}
