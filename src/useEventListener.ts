import { useEffect, useRef } from "react"

type EventCallback = (this: Window, ev: any) => any

/**
 * 
 * @param eventType 
 * @param callback 
 * @param element 
 * @description
 * Hook to add event listeners to the DOM.
 * @example
 * const [key, setKey] = useState("")
  useEventListener("keydown", e => {
    setKey(e.key)
  })
 */
export function useEventListener(
    eventType: string,
    callback: EventCallback,
    element: Window | Document = window
) {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        if (element == null) return
        const handler = (e: any) => (callbackRef as any).current(e)//have to check typings of Ref object.
        element.addEventListener(eventType, handler)

        return () => element.removeEventListener(eventType, handler)
    }, [eventType, element])
}