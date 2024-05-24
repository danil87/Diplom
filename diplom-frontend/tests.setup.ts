import '@testing-library/jest-dom'
import 'whatwg-fetch'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      languages: ['ru', 'en'],
      language: 'ru',
    },
  }),
}))
