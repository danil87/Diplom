import { createApi } from '@reduxjs/toolkit/query/react'
import dayjs from 'dayjs'
import { Maintenance, QueryResponse, RegMaintenance } from 'type'

import { getBaseQuery } from './config'

export const maintenanceApi = createApi({
  reducerPath: 'maintenanceApi',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/maintenances/'),
  tagTypes: ['Maintenance'],
  endpoints: builder => ({
    getMaintenances: builder.query<QueryResponse<Maintenance>, string>({
      query: params => ({
        url: `?${params}`,
      }),
      providesTags: ['Maintenance'],
    }),
    getOneMaintenance: builder.mutation<RegMaintenance, number>({
      query: id => ({
        url: `${id}`,
      }),
    }),
    createMaintenance: builder.mutation<void, RegMaintenance>({
      query: body => ({
        url: '/create',
        body: {
          ...body,
          maintenance_date: dayjs(body.maintenance_date).format('YYYY-MM-DD'),
        },
        method: 'POST',
      }),
      invalidatesTags: ['Maintenance'],
    }),
    changeMaintenance: builder.mutation<void, RegMaintenance>({
      query: body => ({
        url: `${body.id}`,
        method: 'PUT',
        body: {
          ...body,
          maintenance_date: dayjs(body.maintenance_date).format('YYYY-MM-DD'),
        },
      }),
      invalidatesTags: ['Maintenance'],
    }),
    deleteMaintenance: builder.mutation<void, number>({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Maintenance'],
    }),
  }),
})
