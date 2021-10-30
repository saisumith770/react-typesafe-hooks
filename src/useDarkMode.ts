import { useEffect } from "react"
import { useMediaQuery } from "./useMediaQuery"
import { useLocalStorage } from "./useStorage"

/**
 * 
 * @returns DarkModeStatus
 * @description
 * Hook that sets and gets Dark mode details from local storage
 * @example
 * const [darkMode, setDarkMode] = useDarkMode()
 * console.log(darkMode)
 * setDarkMode(true)
 */
export function useDarkMode(): [
  enabled: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | undefined>>
] {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("useDarkMode")
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const enabled = darkMode ?? prefersDarkMode

  useEffect(() => {
    document.body.classList.toggle("dark-mode", enabled)
  }, [enabled])

  return [enabled, setDarkMode]
}