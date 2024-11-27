import { useBooksStore } from "../../context/BooksProvider";
import { FormEvent, useState } from "react";
import { Book } from "../../types";
import CloseIcon from "../../Icons/CloseIcon";
import FormInput from "../forms/FormInput";
import useInput from "../../hooks/useInput";
import UploadPicture from "../forms/UploadPicture";
import useLocalStorage from "../../hooks/useLocalStorage";
import PlusIcon from "../../Icons/PlusIcon";
import Button from "../common/Button";
import BookIcon from "../../Icons/BookIcon";
import MoneyIcon from "../../Icons/MoneyIcon";

type Props = {
  onClose: () => void
}
export default function AddBookForm({ onClose }: Props) {
  const { inputValue, handleInputChange, validateAllInputs, error } = useInput({
    bookName: {
      initialValue: "",
      required: "لطفا نام کتاب را وارد کنید",
      min: { value: 3, message: "نام کتاب حداقل باید 3 کاراکتر باشد" }
    },
    bookPrice: {
      initialValue: '',
      required: "لطفا قیمت کتاب را وارد کنید",
      min: { value: 0, message: "قیمت کتاب نمیتواند صفر یا منفی باشد!!" }
    },
  })
  const { dispatch } = useBooksStore()
  const [bookCover, setBookCover] = useState<string | ArrayBuffer | null>(null)
  const [isFormSubmited, setIsFormSubmited] = useState(false)
  const { getLocalValues, addToLocal } = useLocalStorage<Book>()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsFormSubmited(true)
    const formErrors = validateAllInputs()

    if (Object.keys(formErrors).length == 0 && bookCover?.toString().length) {

      const books = getLocalValues("books")

      const newData: Book = {
        id: books.length + 1,
        bookName: String(inputValue.bookName),
        bookPrice: Number(inputValue.bookPrice),
        bookCover: bookCover.toString(),
      };
      //add books to local storage
      dispatch({ type: "AddBookToLocal", payload: [...books, newData] })
      // add to local
      addToLocal("books", [...books, newData])
      onClose()
    }
  }
  return (
    <>
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-300">
        <h2 className="text-xl font-bold">افزودن کتاب</h2>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <form className="flex flex-col h-full space-y-20" onSubmit={handleSubmit}>
        <div className="pb-4 space-y-6 ">
          <FormInput label="نام کتاب"
            name="bookName"
            placeholder="مثال: تئوری انتخاب"
            value={inputValue.bookName || ""}
            onChange={handleInputChange}
            error={error}
            icon={<BookIcon />}
          />
          <FormInput
            name="bookPrice"
            placeholder="مثال : 50.000"
            label="قیمت (تومان)"
            value={inputValue.bookPrice || ''}
            onChange={handleInputChange}
            error={error}
            icon={<MoneyIcon />}
          />

          <UploadPicture onLoadPicture={setBookCover} isFormSubmited={isFormSubmited} />
        </div>
        <div className="flex items-center justify-end w-full gap-6">
          <Button style="border border-purple-primary text-purple-primary" onClick={onClose}>
            انصراف
          </Button>
          <Button style="bg-purple-primary text-white">
            <PlusIcon />
            افزودن
          </Button>

        </div>
      </form>
    </>
  );
}
