import { useCallback, useEffect, useState } from "react"

type ErrorData = any
type ReturnData = any
type PromiseResolveFunction = any

/**
 * 
 * @param callback 
 * @param dependencies 
 * @returns AsynchronousFunctionHandlers
 * @description
 * Hook to handle Async functions
 * @example
 * const { loading, error, value } = useAsync(() => {
    return new Promise((resolve, reject) => {
      const success = false
      setTimeout(() => {
        success ? resolve("Hi") : reject("Error")
      }, 1000)
    })
  })
 */
export function useAsync(callback: () => Promise<PromiseResolveFunction>, dependencies: any[] = []) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ErrorData>()
    const [value, setValue] = useState<ReturnData>()

    const callbackMemoized = useCallback(() => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false))
    }, dependencies)

    useEffect(() => {
        callbackMemoized()
    }, [callbackMemoized])

    return { loading, error, value }
}