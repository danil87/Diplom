import { combineReducers } from '@reduxjs/toolkit'
import { authApi, manufacturerApi, reportApi } from 'api'
import { equipmentApi } from 'api/equipment-api'
import { equipmentAssignmentApi } from 'api/equipment-assignment'
import { userApi } from 'api/user-api'

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [equipmentApi.reducerPath]: equipmentApi.reducer,
  [manufacturerApi.reducerPath]: manufacturerApi.reducer,
  [equipmentAssignmentApi.reducerPath]: equipmentAssignmentApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
})
