import { useState } from 'react'

type NewStateType<T> = (T extends Array<infer U> ?
    (U | U[]) :
    (T extends { [key: string | number]: any } ?
        Partial<T> :
        T)) | ((prev: T) => void)

/**
 * 
 * @param initialValue 
 * @returns MergeStateControls
 * @description
 * Hook that return mergeable state values
 * @example
 * const [state,setState] = useMergeState({
 *  a:1,
 * b:2
 * })
 * console.log(state)
 * setState({
 *  b:3
 * })
 */
export function useMergeState<StateType>(initialValue: StateType): [
    state: StateType,
    stateSetter: (newState: NewStateType<StateType>) => void
] {
    const [state, setState] = useState<StateType>(initialValue)

    function setMergeState(newState: NewStateType<StateType>) {
        if (typeof newState !== "function") {
            if (Array.isArray(initialValue)) {
                if (Array.isArray(newState)) setState(prev => ([...prev as any, ...newState] as any))
                else setState(prev => ([...prev as any, newState] as any))
            } else setState(prev => ({ ...prev, ...newState as any }))
        } else {
            setState(prev => (newState as any)(prev))
        }
    }

    return [
        state,
        setMergeState
    ]
}