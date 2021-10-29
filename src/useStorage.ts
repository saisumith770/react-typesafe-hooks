import React, { useCallback, useState, useEffect } from "react"

/**
 * 
 * @param key 
 * @param defaultValue 
 * @returns LocalStorageControls
 * @description
 * Hook to moderate data in local storage.
 * @example
 * const [age, setAge, removeAge] = useLocalStorage("age", 26)
 * console.log(age)
 * setAge(12)
 * removeAge()
 */
export function useLocalStorage<DefaultValueType = any>(key: string, defaultValue?: DefaultValueType) {
    return useStorage(key, defaultValue, window.localStorage)
}

/**
 * 
 * @param key 
 * @param defaultValue 
 * @returns SessionStorageControls
 * @description
 * Hook to moderate data in session storage
 * @example
 * const [name, setName, removeName] = useSessionStorage("name", "Kyle")
 * console.log(name)
 * setName('Sai Sumith')
 * removeName()
 */
export function useSessionStorage<DefaultValueType = any>(key: string, defaultValue?: DefaultValueType) {
    return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage<DefaultValueType = any>(key: string, defaultValue: DefaultValueType, storageObject: Storage): [
    value: DefaultValueType,
    setValue: React.Dispatch<React.SetStateAction<DefaultValueType>>,
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