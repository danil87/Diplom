import { createApi } from '@reduxjs/toolkit/query/react'
import { Manufacturer, QueryResponse } from 'type'

import { getBaseQuery } from './config'

export const manufacturerApi = createApi({
  reducerPath: 'manufacturer-api',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/manufacturers'),
  tagTypes: ['Manufacturer'],
  endpoints: builder => ({
    getManufacturers: builder.query<QueryResponse<Manufacturer>, string>({
      query: params => `?${params}`,
      providesTags: ['Manufacturer'],
    }),
    getOneManufacturer: builder.mutation<Manufacturer, number>({
      query: id => `${id}`,
    }),
    createManufacturer: builder.mutation<void, Manufacturer>({
      query: body => ({
        url: `create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Manufacturer'],
    }),
    updateManufacturer: builder.mutation<void, Manufacturer>({
      query: body => ({
        url: `${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Manufacturer'],
    }),
    deleteManufacturer: builder.mutation<void, number>({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Manufacturer'],
    }),
  }),
})
