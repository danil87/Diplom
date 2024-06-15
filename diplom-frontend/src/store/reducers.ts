import { combineReducers } from '@reduxjs/toolkit'
import { authApi, manufacturerApi } from 'api'
import { equipmentApi } from 'api/equipment-api'
import { userApi } from 'api/user-api'

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [equipmentApi.reducerPath]: equipmentApi.reducer,
  [manufacturerApi.reducerPath]: manufacturerApi.reducer,
})
