import { useState } from "react"

type ToggleValues = boolean

/**
 * 
 * @param defaultValue 
 * @returns ToggleGetterSetterArray
 * @description
 * Toggles between true or false
 * @example
 * const [value,toggler] = useToggle() //optional boolean parameter can be entered
 * console.log(value)
 * toggler() //optional parameter => toggler(false)
 */
export default function useToggle(defaultValue: ToggleValues = false): [
    ToggleValues,
    (value?: ToggleValues) => void
] {
    const [value, setValue] = useState(defaultValue)

    function toggleValue(value?: ToggleValues): void {
        setValue(currentValue =>
            typeof value === "boolean" ? value : !currentValue
        )
    }

    return [value, toggleValue]
}