import { createApi } from '@reduxjs/toolkit/query/react'
import { LoginData } from 'components/login-from'
import { RegisterData } from 'components/register-from'
import { AccessToken } from 'type'

import { baseQueryFnForAuth } from './config'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryFnForAuth,
  endpoints: builder => ({
    signIn: builder.mutation<AccessToken, LoginData>({
      query: body => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<void, RegisterData>({
      query: body => ({
        url: 'create',
        method: 'POST',
        body,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
})
