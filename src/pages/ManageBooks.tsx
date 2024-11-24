import { useEffect, useState } from "react";
import { useModal } from "../context/ModalProvider";
import { useBooksStore } from '../context/BooksProvider'
import { Book } from "../types";
import CardWrraper from "../Components/CardWrraper";
import DotIcon from "../Icons/DotIcon";
import CartDropdownMenu from "../Components/CartDropdownMenu";
import Button from "../Components/Button";
import PlusIcon from "../Icons/PlusIcon";
import SearchIcon from "../Icons/SearchIcon";

export default function ManageBooks() {
  const { openModal } = useModal();
  const [openDropdownId, setOpenDropdownId] = useState<null | number>(null);
  const { state } = useBooksStore()
  const handleOpenDropdown = (id: number) => {
    setOpenDropdownId(id);
  };
  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  useEffect(() => {
    document.body.addEventListener("click", handleCloseDropdown, true);
    return () =>
      document.body.removeEventListener("click", handleCloseDropdown, true);
  }, []);
  return (
    <>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-950">مدیریت کتاب ها</h2>
        <div className="flex items-center gap-5">
          <div className="flex">
            <div className="flex items-center py-3 pr-4 border border-l-0 border-gray-400 rounded-l-none w-fit rounded-r-md ">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="جستجو بر اساس نام کتاب"
              className="py-3 px-4 border border-gray-400 rounded-md outline-none placeholder:text:sm placeholder:text-gray-400 w-[456px] border-r-0 rounded-r-none"
            />
          </div>
          <Button style="bg-purple-primary text-white" onClick={() =>
            openModal("addModal")}>
            <PlusIcon />
            افزودن
          </Button>
        </div>
      </div >
      <div className="mt-12">
        <div className="flex flex-wrap gap-2">
          {
            state.books.length > 0 ?
              state.books?.map((book: Book) => {
                return (
                  <CardWrraper
                    {...book}
                    key={book.id}
                    type="dashboardCard"
                  >
                    <div className="relative">
                      <button onClick={() => handleOpenDropdown(book.id)}>
                        <DotIcon />
                      </button>
                      <CartDropdownMenu
                        id={book.id}
                        openDropdownId={openDropdownId!}
                        // pass the props to modal manager as the second argument
                        onEdit={() => openModal("editModal", { bookId: book.id, bookName: book.bookName, bookPrice: book.bookPrice })}
                        onDelete={() => openModal("deleteModal", { bookId: book.id, bookName: book.bookName })}
                      />
                    </div>
                  </CardWrraper>
                )
              })
              : <h1>کتابی موجود نیست به صفحه داشبورد مراجعه کنید</h1>

          }
        </div>
      </div>
    </>
  );
}
