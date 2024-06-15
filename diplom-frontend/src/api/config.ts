import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { AccessToken } from 'type'

export const getBaseQuery = (baseUrl: string) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: headers => {
      const accessToken = localStorage.getItem('access')

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  })

  const baseQueryFn: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      const accessTokenData = await baseQuery(
        {
          url: 'http://localhost:8000/api/v1/token/refresh/',
          method: 'POST',
        },
        api,
        extraOptions
      )

      if (accessTokenData.error) {
        localStorage.removeItem('access')
        window.location.reload()
        return result
      }

      const { access } = accessTokenData.data as AccessToken
      localStorage.setItem('access', access)

      return await baseQuery(args, api, extraOptions)
    }

    return result
  }

  return baseQueryFn
}

export const baseQueryFnForAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = getBaseQuery('http://localhost:8000/api/v1/auth')

  const result = await baseQuery(args, api, extraOptions)

  if (
    !result.error &&
    result.data &&
    typeof result.data === 'object' &&
    'access' in result.data
  ) {
    const { access } = result.data as { access: string }
    localStorage.setItem('access', access)
  }

  return result
}
