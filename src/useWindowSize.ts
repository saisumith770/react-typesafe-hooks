import { useState } from "react"
import { useEventListener } from "./useEventListener"

/**
 * 
 * @returns WindowSizeState
 * @description
 * Hook that returns the window size of the browser.
 * @example
 * const { width, height } = useWindowSize()
 * console.log(width, height)
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEventListener("resize", () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    })

    return windowSize
}