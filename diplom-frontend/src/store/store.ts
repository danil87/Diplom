import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './reducers'

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
  })
