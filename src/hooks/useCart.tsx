import { useCallback, useEffect } from 'react'
import { useBooksStore } from '../context/BooksProvider'
import useLocalStorage from './useLocalStorage'
import { Book, CartItems } from '../types'

export default function useCart() {
    const { state, dispatch } = useBooksStore()
    const { addToLocal } = useLocalStorage<CartItems>()

    useEffect(() => {
        addToLocal("cart", state.cart);
    }, [state.cart]);

    const handleAddToCart = useCallback((book: Book) => {
        dispatch({ type: "AddBookToCart", payload: { ...book, quantity: 1 } })
    }, [dispatch])

    const handleIncrease = useCallback((bookId: number) => {
        dispatch({ type: "IncrementOrderQuantity", payload: { bookId } })
    }, [dispatch])

    const handleDecrease = useCallback((bookId: number) => {
        dispatch({ type: "DecrementOrderQuantity", payload: { bookId } })

    }, [dispatch])

    const handleDelete = useCallback((bookId: number) => {
        dispatch({ type: "DeleteOrder", payload: { bookId } })
    }, [dispatch])

    return { handleAddToCart, handleIncrease, handleDecrease, handleDelete }
}
