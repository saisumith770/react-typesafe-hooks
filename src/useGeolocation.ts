import { useState, useEffect } from "react"

/**
 * @param options
 * @returns GeolocationStateProps
 * @description
 * Hook that returns Geolocation of the users device. This is possible due to PWA.
 * @example
 * const {
    loading,
    error,
    data: { latitude, longitude },
  } = useGeolocation()
  console.log(latitude, longitude)
 */
export default function useGeolocation(options?: PositionOptions) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>()
    const [data, setData] = useState<Partial<GeolocationCoordinates>>({})

    useEffect(() => {
        const successHandler = (e: GeolocationPosition) => {
            setLoading(false)
            setError(null)
            setData(e.coords)
        }
        const errorHandler = (e: GeolocationPositionError) => {
            setError(e)
            setLoading(false)
        }
        navigator.geolocation.getCurrentPosition(
            successHandler,
            errorHandler,
            options
        )
        const id = navigator.geolocation.watchPosition(
            successHandler,
            errorHandler,
            options
        )
        return () => navigator.geolocation.clearWatch(id)
    }, [options])

    return { loading, error, data }
}