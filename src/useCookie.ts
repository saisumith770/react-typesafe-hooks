import { useState, useCallback } from "react"
import Cookies from "js-cookie"

/**
 * 
 * @param name 
 * @param defaultValue 
 * @returns CookieControls
 * @description
 * Hook to set or get cookies via javascript.
 * @example
 * const [value, update, remove] = useCookie("name", "John")
 */
export default function useCookie(name: string, defaultValue: string | object): [
  value: string | object | null,
  updateCookie: (newValue: any, options: any) => void,
  deleteCookie: () => void
] {
  const [value, setValue] = useState<typeof defaultValue | null>(() => {
    const cookie = Cookies.get(name)
    if (cookie && !defaultValue) return cookie
    Cookies.set(name, defaultValue)
    return defaultValue
  })

  const updateCookie = useCallback(
    (newValue, options) => {
      Cookies.set(name, newValue, options)
      setValue(newValue)
    },
    [name]
  )

  const deleteCookie = useCallback(() => {
    Cookies.remove(name)
    setValue(null)
  }, [name])

  return [value, updateCookie, deleteCookie]
}