import { createApi } from '@reduxjs/toolkit/query/react'
import { Equipment, QueryResponse } from 'type'

import { getBaseQuery } from './config'

export const equipmentApi = createApi({
  reducerPath: 'equipmentApi',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/equipments/'),
  tagTypes: ['Equipment'],
  endpoints: builder => ({
    getEquipments: builder.query<QueryResponse<Equipment>, string>({
      query: params => ({
        url: `?${params}`,
      }),
      providesTags: ['Equipment'],
    }),
    getOneEquipment: builder.mutation<Equipment, number>({
      query: id => ({
        url: `${id}`,
      }),
    }),
    createEquipment: builder.mutation<void, Equipment>({
      query: body => ({
        url: '/create',
        body,
        method: 'POST',
      }),
    }),
    deleteEquipment: builder.mutation<void, number>({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Equipment'],
    }),
  }),
})
