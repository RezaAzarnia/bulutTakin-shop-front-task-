import { useToast } from "../context/ToastContext";
import { useBooksStore } from "../context/BooksProvider";
import { Book } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";
import CloseIcon from "../Icons/CloseIcon";
import Button from "./Button";
type Props = {
  onClose: () => void;
  bookId?: number;
  bookName?: string;
}
export default function DeleteModal({ bookId, bookName, onClose }: Props) {
  const { state, dispatch } = useBooksStore()
  const { addToLocal } = useLocalStorage<Book>();
  const toast = useToast()

  const handleDeleteBook = () => {
    const filterdBooks = state.books.filter(book => book.id !== bookId)
    dispatch({ type: "DeleteBook", payload: filterdBooks })
    addToLocal("books", filterdBooks)
    
    onClose()
    
    toast.open("حذف موفق",
      <p>
        کتاب <span className="font-bold">“{bookName}”</span> حذف شد.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="space-y-8">
        <div className="flex items-center justify-between pb-2 border-b border-gray-300 ">
          <h2 className="text-xl font-bold">حذف کتاب </h2>
          <button>
            <CloseIcon />
          </button>
        </div>
        <div className="">
          <h3 className="text-lg font-medium text-start">
            ایا از حذف کتاب{" "}
            <span className="text-red-500">({bookName})</span> مطمئن هستید؟
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-4">
        <Button style="border border-purple-primary text-purple-primary" onClick={onClose} >
          انصراف
        </Button>
        <Button style="bg-red-500  text-white" onClick={handleDeleteBook}>
          حذف
        </Button>
      </div>
    </div>
  );
}

