import { useCallback, useEffect, useRef } from "react"

/**
 * 
 * @param callback 
 * @param delay 
 * @returns TimeoutControls
 * @description
 * Hook to handle setTimeout events with extra properties by resetting and clearing them. 
 * It also removes the event after component removal from DOM.
 * @example
 * const { reset, clear } = useTimeout<() => string>(() => "", 1000)
 * reset()
 * clear()
 */
export default function useTimeout<CallbackType extends () => void>(callback: CallbackType, delay: number) {
    const callbackRef = useRef<CallbackType>(callback)
    const timeoutRef = useRef<typeof delay>()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    }, [delay])

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    useEffect(() => {
        set()
        return clear
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    return { reset, clear }
}