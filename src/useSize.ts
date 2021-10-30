import React, { useState, useEffect } from "react"

/**
 * 
 * @param ref 
 * @returns ComponentRectPoints
 * @description
 * Hook that returns the size of the component when resized.
 * @example
 * const ref = useRef()
  const size = useSize(ref)
  console.log(size)
 */
export function useSize(ref: React.MutableRefObject<any>) {
    const [size, setSize] = useState<Record<string, any>>({})

    useEffect(() => {
        if (ref.current == null) return
        const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect))
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return size
}