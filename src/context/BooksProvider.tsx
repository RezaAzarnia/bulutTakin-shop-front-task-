import { createContext, Dispatch, useContext, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Book, CartItems } from "../types";

type InitialStateTypes = { books: Book[], cart: CartItems[] }
type Action =
    | { type: "AddBookToLocal"; payload: Book[] }
    | { type: "AddBookToCart"; payload: Book & { quantity: number } }
    | { type: "DeleteBook"; payload: Book[] }
    | { type: "IncrementOrderQuantity"; payload: { bookId: number } }
    | { type: "DecrementOrderQuantity"; payload: { bookId: number } }
    | { type: "DeleteOrder"; payload: { bookId: number } };

type ContextValueTypes = {
    state: InitialStateTypes
    dispatch: Dispatch<Action>
}

type ChildrenProps = {
    children: React.ReactNode;
}
const BooksStorContext = createContext<ContextValueTypes | null>(null)

const reducer = (state: InitialStateTypes, action: Action) => {
    switch (action.type) {
        case "AddBookToLocal":
            return { ...state, books: action.payload }
        case "AddBookToCart":
            return { ...state, cart: [...state.cart, action.payload] }
        case "DeleteBook":
            return { ...state, books: action.payload }
        case "IncrementOrderQuantity":
            return {
                ...state,
                cart: state.cart?.map((cart: CartItems) => {
                    if (cart.id == action.payload.bookId) {
                        return {
                            ...cart,
                            quantity: cart.quantity + 1,
                        };
                    }
                    return cart;
                }),
            };
        case "DecrementOrderQuantity":
            return {
                ...state,
                cart: state.cart?.map((cart: CartItems) => {
                    if (cart.id == action.payload.bookId) {
                        return {
                            ...cart,
                            quantity: cart.quantity - 1,
                        };
                    }
                    return cart;
                }),
            };
        case "DeleteOrder":
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.bookId) }
        default:
            return state
    }
}
export const BooksProvider = ({ children }: ChildrenProps) => {
    // get the local storage values as initial values 
    const { getLocalValues } = useLocalStorage<Book & CartItems>()
    const initialState: InitialStateTypes = {
        books: getLocalValues('books') || [],
        cart: getLocalValues("cart") || []
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <BooksStorContext.Provider value={{ state, dispatch }}>
            {children}
        </BooksStorContext.Provider>
    )
}

export const useBooksStore = () => {
    const data = useContext(BooksStorContext)
    if (!data) {
        throw new Error("this value doens't exist on the book context")
    }
    return data
}