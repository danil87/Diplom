import { TypedUseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseQuery } from 'api/config'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QueryResponse } from 'type'

export const useQuery = <T>(
  limit: number,
  useGetQuery: TypedUseQuery<
    QueryResponse<T>,
    string,
    ReturnType<typeof getBaseQuery>
  >
) => {
  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(0)
  const [params, setParams] = useSearchParams()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { data, refetch, ...otherData } = useGetQuery(params.toString(), {
    skip: !params.toString(),
  })

  useEffect(() => {
    params.set('limit', limit + '')
    params.set('offset', (page - 1) * limit + '')
    setParams(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (data) {
      const { count } = data
      setMaxPage(Math.ceil(count / limit))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (data) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const isVisibilityKey = useCallback(
    (key: string) => key !== 'id' && key !== 'is_superuser',
    []
  )

  return {
    page,
    setPage,
    maxPage,
    setMaxPage,
    params,
    setParams,
    isOpenModal,
    setIsOpenModal,
    isVisibilityKey,
    data: data?.results,
    refetch,
    ...otherData,
  }
}
