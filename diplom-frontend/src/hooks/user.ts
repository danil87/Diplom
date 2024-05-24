import { userApi } from 'api/user-api'
import { useState } from 'react'

export const useUserData = () => {
  const [isAccessToken] = useState<boolean>(!!localStorage.getItem('access'))
  const fetchData = userApi.useGetUserQuery(undefined, { skip: !isAccessToken })

  return {
    isAccessToken,
    ...fetchData,
  }
}
