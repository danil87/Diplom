import { TypedUseMutation } from '@reduxjs/toolkit/query/react'
import { getBaseQuery } from 'api/config'

export const useUpdateOrCreate = <T>(
  useCreateMutation: TypedUseMutation<void, T, ReturnType<typeof getBaseQuery>>,
  useUpdateMutation: TypedUseMutation<void, T, ReturnType<typeof getBaseQuery>>
) => {
  const [
    createFn,
    { isSuccess: isSuccessCreate, isError: isErrorCreate, error: errorCreate },
  ] = useCreateMutation()

  const [
    updateFn,
    { isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateMutation()

  return {
    createFn,
    updateFn,
    isSuccess: isSuccessCreate || isSuccessUpdate,
    isError: isErrorCreate || isErrorUpdate,
    error: errorCreate || errorUpdate,
  }
}
