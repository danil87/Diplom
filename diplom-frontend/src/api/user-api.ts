import { createApi } from '@reduxjs/toolkit/query/react'

import { getBaseQuery } from './config'

export const userApi = createApi({
  reducerPath: 'user-api',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/users'),
  endpoints: builder => ({
    getUser: builder.query<unknown, void>({
      query: () => 'user',
    }),
  }),
})
