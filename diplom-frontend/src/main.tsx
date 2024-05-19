import './index.css'

import { CssBaseline } from '@mui/material'
import { config } from 'i18n'
import i18n from 'i18next'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'store'

import { App } from './App.tsx'

const store = createStore()

i18n.use(initReactI18next).init(config)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
)
