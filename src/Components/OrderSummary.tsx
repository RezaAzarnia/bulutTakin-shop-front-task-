import { useBooksStore } from '../context/BooksProvider'
import useCart from '../hooks/useCart'
import QuantityControler from './QuantityControler'

export default function OrderSummary() {
    const { state } = useBooksStore()
    const { handleIncrease, handleDecrease, handleDelete } = useCart()
    return (
        <div className="absolute  mt-0.5 left-4 z-50 py-4 bg-white rounded-lg shadow-md w-96 max-h-[560px] overflow-y-auto border border-gray-300">
            <div className="px-6 space-y-3 border-b border-gray-300">
                <span className="block pb-3 text-sxsfont-medium text-gray-950">
                    لیست انتخاب
                </span>
                {
                    state.cart.map(cart => {
                        return (
                            <div className="flex gap-4 pb-3 border-b border-gray-300" key={cart.id}>
                                <img
                                    src={String(cart.bookCover)}
                                    alt={cart.bookName}
                                    className="object-cover w-24 rounded-sm h-28"
                                />
                                <div className="flex flex-col justify-between gap-3">

                                    <p className="text-xs font-medium ">
                                        نام کتاب: <span className="font-bold ">{cart.bookName}</span>
                                    </p>
                                    <p className="text-xs font-medium ">
                                        {Number(cart.bookPrice).toLocaleString("fa-IR")} تومان
                                    </p>
                                    <QuantityControler
                                        quantity={cart.quantity}
                                        onIncrease={() => handleIncrease(cart.id)}
                                        onDecrease={() => handleDecrease(cart.id)}
                                        onDelete={() => handleDelete(cart.id)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex items-center justify-between w-full p-6'>
                <span className='text-sm font-medium text-gray-600'>مجموع تعداد درخواست: {state.cart.length}</span>
                <button
                    className="w-32 gap-3 px-4 py-3 font-medium text-white rounded-md bg-purple-primary"
                >ثبت سفارش</button>
            </div>

        </div>)
}
