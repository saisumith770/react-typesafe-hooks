import { useRef } from "react"

type StatefulValue = any
type RefToPreviousValue = any

export default function usePrevious(value: StatefulValue): RefToPreviousValue {
    const currentRef = useRef<StatefulValue>(value)
    const previousRef = useRef<StatefulValue>()

    if (currentRef.current !== value) {
        previousRef.current = currentRef.current
        currentRef.current = value
    }

    return previousRef.current
}