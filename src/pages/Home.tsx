import { useBooksStore } from '../context/BooksProvider'
import BookCard from '../Components/common/BookCard'
import OrderSummary from '../Components/cart/OrderSummary'
import CartIcon from '../Icons/CartIcon'
import PlusIcon from '../Icons/PlusIcon'
import { Book } from '../types'
import Button from '../Components/common/Button'
import useCart from '../hooks/useCart'
import { useState } from 'react'
import QuantityControler from '../Components/cart/QuantityControler'

export default function Home() {
    const { state } = useBooksStore()
    const { handleAddToCart } = useCart()
    const [isShowCart, setIshowCart] = useState(false)
    const { handleIncrease, handleDecrease, handleDelete } = useCart()
    return (
        <>
            <div className="flex items-center justify-between w-full py-4 border-b border-gray-300">
                <h2 className="text-xl font-bold text-gray-950">مدیریت کتاب ها</h2>
                <div className="relative"
                    onMouseEnter={() => setIshowCart(true)}
                    onMouseLeave={() => setIshowCart(false)}
                >
                    <button className='flex items-center gap-2 px-4 py-2 text-lg font-semibold border rounded-lg border-purple-primary text-purple-primary' >
                        <CartIcon />
                        سبد خرید
                    </button>
                    {state.cart.length > 0 &&
                        <div className="absolute z-50 flex items-center justify-center p-2 text-white rounded-full -top-10 -right-6 size-10 bg-purple-primary">
                            {state.cart.length}
                        </div>
                    }
                    {isShowCart && <OrderSummary />}
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-12">
                {
                    state.books.length > 0 ?
                        state.books?.map((book: Book) => {
                            const cartItem = state.cart.find(item => item.id === book.id);
                            return (
                                <BookCard {...book} key={book.id} type="shoppingCard">
                                    {!cartItem ?

                                        <Button style='w-full text-white bg-purple-primary' onClick={() => handleAddToCart(book)}>
                                            <PlusIcon />
                                            افزودن به سبد
                                        </Button>
                                        :
                                        <QuantityControler
                                            quantity={cartItem.quantity}
                                            onIncrease={() => handleIncrease(cartItem.id)}
                                            onDecrease={() => handleDecrease(cartItem.id)}
                                            onDelete={() => handleDelete(cartItem.id)}
                                        />
                                    }
                                </BookCard>
                            )
                        })
                        : <h1>کتابی موجود نیست به صفحه داشبورد مراجعه کنید</h1>
                }
            </div >
        </>
    )
}
