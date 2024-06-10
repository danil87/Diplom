import { createApi } from '@reduxjs/toolkit/query/react'
import { QueryResponse, User } from 'type'

import { getBaseQuery } from './config'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/users'),
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
    }),
    getUsers: builder.query<QueryResponse<User>, string>({
      query: params => `?${params}`,
    }),
    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
