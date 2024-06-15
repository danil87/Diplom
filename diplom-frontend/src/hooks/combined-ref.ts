import { useCallback } from 'react'

export const useCombinedRef = <T>(...refs: unknown[]) =>
  useCallback(
    (elem: T) => {
      refs.forEach(ref => {
        if (!ref) {
          return
        }
        if (typeof ref === 'function') {
          ref(elem)
          return
        }
        if (typeof ref === 'object' && 'current' in ref) {
          ref.current = elem
        }
      })
    },
    [refs]
  )
