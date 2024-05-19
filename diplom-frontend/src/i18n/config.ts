import { resources } from './resources'

export const DEFAULT_LANGUAGE = 'ru'
export const DEFAULT_NAMESPACE = 'translation'
export const FALLBACK_LANGUAGE = 'en'

export const SUPPORTED_LANGUAGES = [
  FALLBACK_LANGUAGE,
  DEFAULT_LANGUAGE,
] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
export type SupportedRegion = 'RU'

// all options: https://www.i18next.com/overview/configuration-options
export const config = {
  // Languages, namespaces, resources
  lng: DEFAULT_LANGUAGE,
  fallbackLng: FALLBACK_LANGUAGE,
  defaultNS: DEFAULT_NAMESPACE,
  supportedLngs: SUPPORTED_LANGUAGES,

  // Translation defaults
  returnEmptyString: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },

  debug: true,
  resources,
}
