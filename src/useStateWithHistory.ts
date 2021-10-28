import React, { useCallback, useRef, useState } from "react"

type StatefulValue = any

/**
 * @param defaultValue
 * @param capacity
 * @returns StateHistoryControls
 * @description
 * State function that works like useState but caches the previous values of the state and allows you to toggle the state value between 
 * the previous values.
 * @example
 * const [count, setCount, { history, pointer, back, forward, go }] = useStateWithHistory(1)
 * console.log(count)
 * setCount((prev) => prev + 1)
 * console.log(history)
 * console.log(pointer)
 * back()
 * forward()
 * go(1)
 */
export function useStateWithHistory(
    defaultValue: any,
    capacity: number = 10
): [
        value: StatefulValue,
        set: React.Dispatch<React.SetStateAction<any>>,
        StateHistoryControls: {
            history: any[],
            pointer: number,
            back: () => void,
            forward: () => void,
            go: (index: number) => void
        }
    ] {
    const [value, setValue] = useState(defaultValue)
    const historyRef = useRef([value])
    const pointerRef = useRef(0)

    const set = useCallback(
        v => {
            const resolvedValue = typeof v === "function" ? v(value) : v
            if (historyRef.current[pointerRef.current] !== resolvedValue) {
                if (pointerRef.current < historyRef.current.length - 1) {
                    historyRef.current.splice(pointerRef.current + 1)
                }
                historyRef.current.push(resolvedValue)

                while (historyRef.current.length > capacity) {
                    historyRef.current.shift()
                }
                pointerRef.current = historyRef.current.length - 1
            }
            setValue(resolvedValue)
        },
        [capacity, value]
    )

    const back = useCallback(() => {
        if (pointerRef.current <= 0) return
        pointerRef.current--
        setValue(historyRef.current[pointerRef.current])
    }, [])

    const forward = useCallback(() => {
        if (pointerRef.current >= historyRef.current.length - 1) return
        pointerRef.current++
        setValue(historyRef.current[pointerRef.current])
    }, [])

    const go = useCallback((index: number) => {
        if (index < 0 || index > historyRef.current.length - 1) return
        pointerRef.current = index
        setValue(historyRef.current[pointerRef.current])
    }, [])

    return [
        value,
        set,
        {
            history: historyRef.current,
            pointer: pointerRef.current,
            back,
            forward,
            go,
        },
    ]
}