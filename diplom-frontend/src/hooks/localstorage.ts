import { useCallback, useEffect, useState } from 'react'

export const useLocalStorage = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(
    !!localStorage.getItem('access')
  )

  const storageListener = useCallback((event: StorageEvent) => {
    if (event.key === 'access') {
      setIsAuthorized(!!event.newValue)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('storage', storageListener)

    return () => window.removeEventListener('storage', storageListener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isAuthorized
}
