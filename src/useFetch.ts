import { useAsync } from "./useAsync"

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
}

/**
 * 
 * @param url 
 * @param options 
 * @param dependencies 
 * @returns FetchOperationRequest
 * @description
 * Hook to fetch api requests with all fetch api functionality.
 * @example
 * const { loading, error, value } = useFetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {},[id])
 */
export function useFetch(url: string, options: Partial<RequestInit> = {}, dependencies: any[] = []) {
    return useAsync(() => {
        return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
    }, dependencies)
}