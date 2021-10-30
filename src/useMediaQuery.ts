import { useState, useEffect } from "react"
import { useEventListener } from "./useEventListener"

/**
 * 
 * @param mediaQuery 
 * @returns MediaQuerySatisfiedState
 * @description
 * Hook that will check for the media query given and return its state.
 * @example
 * const isLarge = useMediaQuery("(min-width: 200px)")
 * console.log(isLarge)
 */
export function useMediaQuery(mediaQuery: string) {
    const [isMatch, setIsMatch] = useState(false)
    const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>()

    useEffect(() => {
        const list = window.matchMedia(mediaQuery)
        setMediaQueryList(list)
        setIsMatch(list.matches)
    }, [mediaQuery])

    useEventListener("change", e => setIsMatch(e.matches), mediaQueryList as any)//check typings

    return isMatch
}