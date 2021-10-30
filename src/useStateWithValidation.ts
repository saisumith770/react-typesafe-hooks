import { useState, useCallback } from "react"

/**
 * @param validationFunc
 * @param initialValue
 * @returns ValidatedStateWithControls
 * @description
 * Hook that returns state after validating it.
 * @example
 * const [username, setUsername, isValid] = useStateWithValidation(
    name => name.length > 5,
    ""
  )
 */
export default function useStateWithValidation<ValidationFuncType extends (state: any) => boolean>(
    validationFunc: ValidationFuncType,
    initialValue: any
): [
        state: any,
        onChange: (nextState: any) => void,
        isValid: boolean
    ] {
    const [state, setState] = useState(initialValue)
    const [isValid, setIsValid] = useState(() => validationFunc(state))

    const onChange = useCallback(
        nextState => {
            const value =
                typeof nextState === "function" ? nextState(state) : nextState
            setState(value)
            setIsValid(validationFunc(value))
        },
        [validationFunc]
    )

    return [state, onChange, isValid]
}