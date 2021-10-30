import { useState } from "react"
import { useEventListener } from "./useEventListener"

/**
 * 
 * @param ref 
 * @returns HoveredState
 * @description
 * Hook that returns whether the component has hovered or not.
 * @example
 * const elementRef = useRef()
  const hovered = useHover(elementRef)
  console.log(hovered)
 */
export function useHover(ref: React.MutableRefObject<any>) {
  const [hovered, setHovered] = useState(false)

  useEventListener("mouseover", () => setHovered(true), ref.current)
  useEventListener("mouseout", () => setHovered(false), ref.current)

  return hovered
}