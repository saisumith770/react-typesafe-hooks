import React, { useCallback, useState, useEffect } from "react"

type StatefulValue = any

export function useLocalStorage(key: string, defaultValue: any) {
    return useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage(key: string, defaultValue: any) {
    return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage(key: string, defaultValue: any, storageObject: Storage): [
    value: StatefulValue,
    setValue: React.Dispatch<React.SetStateAction<StatefulValue>>,
    remove: () => void
] {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof defaultValue === "function") {
            return defaultValue()
        } else {
            return defaultValue
        }
    })

    useEffect(() => {
        if (value === undefined) return storageObject.removeItem(key)
        storageObject.setItem(key, JSON.stringify(value))
    }, [key, value, storageObject])

    const remove = useCallback(() => {
        setValue(undefined)
    }, [])

    return [value, setValue, remove]
}