import { useEffect, useRef } from "react"

/**
 * 
 * @returns ComponentRenderCount
 * @description
 * Hook that returns the number of times the component re-rendered.
 * @example
 * const renderCount = useRenderCount()
 * console.log(renderCount)
 */
export default function useRenderCount() {
  const count = useRef(1)
  useEffect(() => { count.current++ })
  return count.current
}