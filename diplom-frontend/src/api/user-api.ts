import { createApi } from '@reduxjs/toolkit/query/react'
import { RegisterData } from 'components/register-from'
import { QueryResponse, User } from 'type'

import { getBaseQuery } from './config'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/users'),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
    }),
    getUsers: builder.query<QueryResponse<User>, string>({
      query: params => `?${params}`,
      providesTags: ['Users'],
    }),
    getOneUser: builder.mutation<RegisterData, number>({
      query: id => `${id}`,
    }),
    updateUser: builder.mutation<void, RegisterData>({
      query: body => ({
        url: `${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<void, number>({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})
