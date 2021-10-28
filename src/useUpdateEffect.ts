import { useEffect, useRef } from "react"

/**
 * 
 * @param callback 
 * @param dependencies 
 * @description
 * Hook that works like useEffect but doesn't run on first render of the component.
 * @example
 * const [count,setCount] = useState(0)
 * useUpdateEffect(() => console.log("update worked"),[count])
 */
export function useUpdateEffect<CallbackType extends () => void>(callback: CallbackType, dependencies: any[]) {
    const firstRenderRef = useRef<boolean>(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }
        return callback()
    }, dependencies)
}