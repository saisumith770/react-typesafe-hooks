import React from "react"
import useEventListener from "./useEventListener"

/**
 * @param ref 
 * @param cb 
 * @description
 * Hook that takes a ref object and runs an event listener to 
 * check if a click happend outside the ref.
 * @example
 * const [open, setOpen] = useState(false)
 * const modalRef = useRef()
 * useClickOutside(modalRef, () => {
    if (open) setOpen(false)
  })
 */
export default function useClickOutside(ref: React.MutableRefObject<any>, cb: (e: any) => void) {
  useEventListener("click", (e) => {
    if (ref.current == null || ref.current.contains(e.target)) return
    cb(e)
  }, document)
}