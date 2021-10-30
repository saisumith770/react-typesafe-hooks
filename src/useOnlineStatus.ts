import { useState } from "react"
import useEventListener from "./useEventListener"

/**
 * 
 * @returns OnlineStatus
 * @description
 * Hook that returns the online status of the browser.
 * @example
 * const online = useOnlineStatus()
 * console.log(online)
 */
export default function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine)

  useEventListener("online", () => setOnline(navigator.onLine))
  useEventListener("offline", () => setOnline(navigator.onLine))

  return online
}