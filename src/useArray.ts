import { useState } from "react"

type TypedFlatten<T> = T extends Array<infer U> ? U : T

/**
 * @param defaultValue
 * @description 
 * Hook that takes an array and returns stateful data with mutation functions.
 * @example
 * const {array, set, push, filter, update, remove, clear} = useArray([1,2,3])
 * console.log(array)
 * set(() => [])
 * push(1)
 * filter(FilterFunc)
 * update(0,2)
 * remove(0)
 * clear()
 */
export default function useArray<ArrayType extends any[]>(defaultValue: ArrayType) {
    const [array, setArray] = useState<ArrayType>(defaultValue)

    function push(element: TypedFlatten<ArrayType>) {
        setArray(a => [...a, element] as any)
    }

    function filter(callback: (value: TypedFlatten<ArrayType>, index: number, array: ArrayType) => void) {
        setArray(a => a.filter((element, position, arr: any) => callback(element, position, arr)) as any)
    }

    function update(index: number, newElement: TypedFlatten<ArrayType>) {
        setArray(a => [
            ...a.slice(0, index),
            newElement,
            ...a.slice(index + 1, a.length),
        ] as any)
    }

    function remove(index: number) {
        setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length)] as any)
    }

    function clear() {
        setArray([] as any)
    }

    return { array, set: setArray, push, filter, update, remove, clear }
}