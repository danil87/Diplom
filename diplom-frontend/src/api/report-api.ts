import { createApi } from '@reduxjs/toolkit/query/react'
import dayjs from 'dayjs'
import { QueryResponse, RegReport, Report } from 'type'

import { getBaseQuery } from './config'

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: getBaseQuery('http://localhost:8000/api/v1/reports/'),
  tagTypes: ['Report'],
  endpoints: builder => ({
    getReports: builder.query<QueryResponse<Report>, string>({
      query: params => ({
        url: `?${params}`,
      }),
      providesTags: ['Report'],
    }),
    getOneReport: builder.mutation<RegReport, number>({
      query: id => ({
        url: `${id}`,
      }),
    }),
    createReport: builder.mutation<void, RegReport>({
      query: body => ({
        url: '/create',
        body: {
          ...body,
          report_date: dayjs(body.report_date).format('YYYY-MM-DD HH:mm'),
        },
        method: 'POST',
      }),
      invalidatesTags: ['Report'],
    }),
    changeReport: builder.mutation<void, RegReport>({
      query: body => ({
        url: `${body.id}`,
        method: 'PUT',
        body: {
          ...body,
          report_date: dayjs(body.report_date).format('YYYY-MM-DD HH:mm'),
        },
      }),
      invalidatesTags: ['Report'],
    }),
    deleteReport: builder.mutation<void, number>({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Report'],
    }),
  }),
})
