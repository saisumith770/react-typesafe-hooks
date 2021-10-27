import { useCallback, useEffect, useState } from "react"

type ErrorData = any
type ReturnData = any

export default function useAsync(callback: () => Promise<() => void>, dependencies: any[] = []) {
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