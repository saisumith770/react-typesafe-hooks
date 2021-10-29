import { useEffect } from "react"
import useMediaQuery from "./useMediaQuery"
import { useLocalStorage } from "./useStorage"

export default function useDarkMode(): [
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