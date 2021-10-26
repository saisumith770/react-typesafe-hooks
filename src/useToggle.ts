import { useState } from "react"

type ToggleValues = boolean
type ReturnType = [
    ToggleValues,
    (value?: ToggleValues) => void
]

/**
 * 
 * @param defaultValue 
 * @returns {[boolean,(value?:boolean) => void]}
 * @description
 * Toggles between true or false
 * @example
 * const [value,toggler] = useToggle() //optional boolean parameter can be entered
 * console.log(value)
 * toggler() //optional parameter => toggler(false)
 */
export default function useToggle(defaultValue: ToggleValues = false): ReturnType {
    const [value, setValue] = useState(defaultValue)

    function toggleValue(value?: ToggleValues): void {
        setValue(currentValue =>
            typeof value === "boolean" ? value : !currentValue
        )
    }

    return [value, toggleValue]
}