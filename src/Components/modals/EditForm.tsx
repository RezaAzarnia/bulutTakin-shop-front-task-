import { FormEvent } from "react";
import useInput from "../../hooks/useInput";
import useLocalStorage from "../../hooks/useLocalStorage";
import CloseIcon from "../../Icons/CloseIcon";
import FormInput from "../forms/FormInput";
import Button from "../common/Button";
import BookIcon from "../../Icons/BookIcon";
import MoneyIcon from "../../Icons/MoneyIcon";
import { Book } from "../../types";
import { useBooksStore } from "../../context/BooksProvider";
import { useToast } from "../../context/ToastContext";

type Props = {
  onClose: () => void;
  bookId?: number
  bookName?: string;
  bookPrice?: number
};
export default function EditModal({ bookId, bookName, bookPrice, onClose }: Props) {
  const { inputValue, handleInputChange, validateAllInputs, error } = useInput({
    bookName: {
      initialValue: bookName!,
      required: "لطفا نام کتاب را وارد کنید",
      min: {
        value: 3, message: "نام کتاب حداقل باید 3 کاراکتر باشد"

      }
    },
    bookPrice: {
      initialValue: bookPrice!,
      required: "لطفا قیمت کتاب را وارد کنید",
      min: { value: 0, message: "قیمت کتاب نمیتواند صفر یا منفی باشد!!" }

    },
  })

  const { state, dispatch } = useBooksStore()
  const { addToLocal, } = useLocalStorage<Book>();
  const toast = useToast()

  const handleEditBook = (e: FormEvent) => {
    e.preventDefault()
    // we use this becasue it return the error obect immediatly and we can check for that.
    const formErrors = validateAllInputs()

    if (Object.keys(formErrors).length === 0) {

      const updatedBook = state.books?.map((book: Book) => {
        if (book.id === bookId) {
          return {
            ...book,
            bookName: inputValue.bookName,
            bookPrice: +inputValue.bookPrice
          }
        }
        return book
      })
      // console.log(updatedBook);

      addToLocal("books", updatedBook as Book[])
      dispatch({ type: "AddBookToLocal", payload: updatedBook as Book[] })
      onClose()
      toast.open("ویرایش موفق",
        <p>
          کتاب <span className="font-bold">“{inputValue.bookName}”</span> ویرایش شد.
        </p>
      )
    }
  }

  return (
    <>
      <div className="flex flex-col gap-12 ">
        <div className="flex items-center justify-between pb-8 border-b border-gray-300 ">
          <h2 className="text-xl font-bold" >ویرایش کتاب </h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form className="space-y-20" onSubmit={handleEditBook}>
          <div className="flex flex-col gap-7 min-h-[350px]">
            <FormInput label="نام کتاب"
              name="bookName"
              placeholder="مثال: تئوری انتخاب"
              value={inputValue.bookName || ""}
              onChange={handleInputChange}
              error={error}
              icon={<BookIcon />}
            />
            <FormInput
              label="قیمت کتاب"
              name="bookPrice"
              placeholder="مثال : 50.000"
              value={(inputValue.bookPrice || '')}
              onChange={handleInputChange}
              error={error}
              icon={<MoneyIcon />}

            />
          </div>
          <div className="flex items-center justify-end w-full gap-6">

            <Button style="border border-purple-primary text-purple-primary" onClick={onClose} >
              انصراف
            </Button>
            <Button style="bg-purple-primary  text-white" >
              ویرایش
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
