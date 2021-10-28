import { useEffect, useRef } from "react"
import isEqual from "lodash/fp/isEqual"

export default function useDeepCompareEffect(callback: () => void, dependencies: any[]) {
    const currentDependenciesRef = useRef<any[]>()

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies
    }

    useEffect(callback, [currentDependenciesRef.current])
}