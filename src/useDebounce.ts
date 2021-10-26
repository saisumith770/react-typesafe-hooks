import { useEffect } from "react"
import useTimeout from "./useTimeout"

/**
 * 
 * @param callback 
 * @param delay 
 * @param dependencies 
 * @description
 * Hook that will fire the callback after no change in dependency state for the given interval.
 * @example
 * const [val,setVal] = useState(false)
 * useDebounce(() => console.log("debounced"),1000,[val])
 */
export default function useDebounce<CallbackType extends () => void>(callback: CallbackType, delay: number, dependencies: any[]) {
    const { reset, clear } = useTimeout(callback, delay)
    useEffect(reset, [...dependencies, reset])
    useEffect(clear, [])
}