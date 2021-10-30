import React, { useEffect, useState } from "react"

/**
 * 
 * @param ref 
 * @param rootMargin 
 * @returns ComponentVisibilityStatus
 * @description
 * Hook that returns the visibility of the component.
 * @example
 * const headerTwoRef = useRef()
  const visible = useOnScreen(headerTwoRef, "-100px")
  console.log(visible)
 */
export function useOnScreen(ref: React.MutableRefObject<any>, rootMargin = "0px") {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (ref.current == null) return
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin }
        )
        observer.observe(ref.current)
        return () => {
            if (ref.current == null) return
            observer.unobserve(ref.current)
        }
    }, [ref.current, rootMargin])

    return isVisible
}