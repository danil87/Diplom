import { createApi } from '@reduxjs/toolkit/query/react'
import dayjs from 'dayjs'
import {
  EquipmentAssignment,
  QueryResponse,
  RegEquipmentAssignment,
} from 'type'

import { getBaseQuery } from './config'

export const equipmentAssignmentApi = createApi({
  reducerPath: 'equipmentAssignmentApi',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/equipments/assignment'),
  tagTypes: ['EquipmentAssignment'],
  endpoints: builder => ({
    getEquipments: builder.query<QueryResponse<EquipmentAssignment>, string>({
      query: params => ({
        url: `?${params}`,
      }),
      providesTags: ['EquipmentAssignment'],
    }),
    getOneEquipment: builder.mutation<RegEquipmentAssignment, number>({
      query: id => ({
        url: `${id}`,
      }),
    }),
    createEquipment: builder.mutation<void, RegEquipmentAssignment>({
      query: body => ({
        url: '/create',
        body: {
          ...body,
          return_date: dayjs(body.return_date).format('YYYY-MM-DD'),
          assignment_date: dayjs(body.assignment_date).format('YYYY-MM-DD'),
        },
        method: 'POST',
      }),
      invalidatesTags: ['EquipmentAssignment'],
    }),
    changeEquipment: builder.mutation<void, RegEquipmentAssignment>({
      query: body => ({
        url: `${body.id}`,
        method: 'PUT',
        body: {
          ...body,
          return_date: dayjs(body.return_date).format('YYYY-MM-DD'),
          assignment_date: dayjs(body.assignment_date).format('YYYY-MM-DD'),
        },
      }),
      invalidatesTags: ['EquipmentAssignment'],
    }),
    deleteEquipment: builder.mutation<void, number>({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EquipmentAssignment'],
    }),
  }),
})
