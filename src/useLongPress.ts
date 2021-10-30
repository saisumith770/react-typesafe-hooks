import React, { useEffect } from "react"
import useEventListener from "./useEventListener"
import { useTimeout } from "./useTimeout"

/**
 * 
 * @param ref 
 * @param cb 
 * @param param2 
 * @description
 * Hook that checks whether the component has been pressed on for a long time,
 * and then executes the callback.
 * @description
 * const elementRef = useRef()
  useLongPress(elementRef, () => alert("Long Press"))
 */
export default function useLongPress(ref: React.MutableRefObject<any>, cb: () => void, { delay = 250 } = {}) {
  const { reset, clear } = useTimeout(cb, delay)
  useEffect(clear, [])

  useEventListener("mousedown", reset, ref.current)
  useEventListener("touchstart", reset, ref.current)

  useEventListener("mouseup", clear, ref.current)
  useEventListener("mouseleave", clear, ref.current)
  useEventListener("touchend", clear, ref.current)
}