import { createApi } from '@reduxjs/toolkit/query/react'
import dayjs from 'dayjs'
import { Equipment, QueryResponse, RegEquipment } from 'type'

import { getBaseQuery } from './config'

export const equipmentApi = createApi({
  reducerPath: 'equipmentApi',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/equipments/'),
  tagTypes: ['Equipment', 'resetEquipment'],
  endpoints: builder => ({
    getEquipments: builder.query<QueryResponse<Equipment>, string>({
      query: params => ({
        url: `?${params}`,
      }),
      providesTags: ['Equipment'],
    }),
    getOneEquipment: builder.mutation<RegEquipment, number>({
      query: id => ({
        url: `${id}`,
      }),
    }),
    createEquipment: builder.mutation<void, RegEquipment>({
      query: body => ({
        url: '/create',
        body: {
          ...body,
          date_purchased: dayjs(body.date_purchased).format('YYYY-MM-DD'),
          warranty_expiration: dayjs(body.warranty_expiration).format(
            'YYYY-MM-DD'
          ),
        },
        method: 'POST',
      }),
      invalidatesTags: ['Equipment'],
    }),
    changeEquipment: builder.mutation<void, RegEquipment>({
      query: body => ({
        url: `${body.id}`,
        method: 'PUT',
        body: {
          ...body,
          date_purchased: dayjs(body.date_purchased).format('YYYY-MM-DD'),
          warranty_expiration: dayjs(body.warranty_expiration).format(
            'YYYY-MM-DD'
          ),
        },
      }),
      invalidatesTags: ['Equipment'],
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
