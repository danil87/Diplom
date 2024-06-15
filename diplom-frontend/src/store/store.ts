import { configureStore } from '@reduxjs/toolkit'
import { authApi, manufacturerApi } from 'api'
import { equipmentApi } from 'api/equipment-api'
import { userApi } from 'api/user-api'

import { rootReducer } from './reducers'

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(equipmentApi.middleware)
        .concat(manufacturerApi.middleware),
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
