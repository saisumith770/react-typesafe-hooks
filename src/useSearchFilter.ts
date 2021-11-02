import React from "react";

type ValueType = string | Array<any> | { [key: string | number]: any }

function ValueIsString(value: ValueType): value is string {
    return typeof value === "string"
}

function ValueIsArray(value: ValueType): value is any[] {
    return Array.isArray(value)
}

function ValueIsObject(value: ValueType): value is { [key: string | number]: any } {
    return typeof value === "object"
}

/**
 * @param stateSetter
 * @return FunctionToOptimiseSearch
 * @description
 * Hook that filters a stateful array.
 */
export function useSearchFilter(stateSetter: React.Dispatch<React.SetStateAction<ValueType[]>>) {
    return function optimizeSearchOnState(originalState: ValueType[], value: ValueType) {
        if (typeof value === "string") {
            ValueIsString(value)
            stateSetter(() => {
                const newArr = originalState.filter(element => (element as string).includes(value))
                return newArr
            })
        } else if (Array.isArray(value)) {
            ValueIsArray(value)
            stateSetter(() => {
                const newArr = originalState.filter(element => {
                    let shouldAddElement: boolean = true;
                    value.forEach((el, _) => {
                        if (!(element as any[]).includes(el)) shouldAddElement = false
                    })
                    return shouldAddElement
                })
                return newArr
            })
        } else if (typeof value === "object") {
            ValueIsObject(value)
            stateSetter(() => {
                const objectKeys = Object.keys(value)
                const newArr = originalState.filter(element => {
                    let shouldAddElement: boolean = true
                    objectKeys.forEach((key, _) => {
                        if (!(value[key] === (element as { [key: string | number]: any })[key])) shouldAddElement = false
                    })
                    return shouldAddElement
                })
                return newArr
            })
        } else throw new Error("type not supported by the useSearchFilter hook.")
    }
}