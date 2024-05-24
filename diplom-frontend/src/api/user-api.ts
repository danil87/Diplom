import { createApi } from '@reduxjs/toolkit/query/react'
import { QueryResponse, User } from 'type'

import { getBaseQuery } from './config'

export type QueryUser = {
  results: User[]
} & QueryResponse

export const userApi = createApi({
  reducerPath: 'user-api',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/users'),
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
    }),
    getUsers: builder.query<QueryUser, string>({
      query: params => `?${params}`,
    }),
  }),
})
