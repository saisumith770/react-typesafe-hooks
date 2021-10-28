import { useEffect, useRef } from "react"
import isEqual from "lodash/fp/isEqual"

/**
 * 
 * @param callback 
 * @param dependencies 
 * @description
 * Hook that runs like useEffect but compares the values of state variables
 * rather than their working on the basis of variable reference point.
 * @example
 * const [age, setAge] = useState(0)
 * const useDeepCompareEffectCountRef = useRef()
 * const person = { age: age, name: "Kyle" }
 * useDeepCompareEffect(() => {
    useDeepCompareEffectCountRef.current.textContent =
      parseInt(useDeepCompareEffectCountRef.current.textContent) + 1
  }, [person])
 */
export function useDeepCompareEffect<CallbackType extends () => void>(callback: CallbackType, dependencies: any[]) {
    const currentDependenciesRef = useRef<any[]>()

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies
    }

    useEffect(callback, [currentDependenciesRef.current])
}