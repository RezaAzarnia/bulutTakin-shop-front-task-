import { useCallback } from 'react'
import { Book, CartItems } from '../types';
type Key = "books" | "cart"
export default function useLocalStorage<T extends Book | CartItems>() {

    const getLocalValues = useCallback((key: Key): T[] => {
        const localStorageData = localStorage.getItem(key) || ""
        const parsedData = localStorageData.length ? JSON.parse(localStorageData) : []
        return parsedData
    }, [])

    const addToLocal = useCallback((key: Key, values: T[]): void => {
        localStorage.setItem(key, JSON.stringify(values))
    }, [])

    return { getLocalValues, addToLocal }
}
