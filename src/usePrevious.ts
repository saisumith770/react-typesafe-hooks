import { useRef } from "react"

type StatefulValue = any
type RefToPreviousValue = any

/**
 * @param value
 * @description
 * Hook to show the previous value of a stateful object.
 * @example
 * const [count,setCount] = useState(0)
 * const prevVal = usePrevious(count)
 * console.log(prevVal)
 */
export default function usePrevious(value: StatefulValue): RefToPreviousValue {
    const currentRef = useRef<StatefulValue>(value)
    const previousRef = useRef<StatefulValue>()

    if (currentRef.current !== value) {
        previousRef.current = currentRef.current
        currentRef.current = value
    }

    return previousRef.current
}