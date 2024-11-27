import EditIcon from "../../Icons/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import { useEffect, useRef } from "react";
type Props = {
  BookId: number;
  openDropdownId: number;
  closeDropDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
};
export default function CartDropdownMenu({
  BookId,
  openDropdownId,
  closeDropDown,
  onEdit,
  onDelete,
}: Props) {
  const dropdownRef = useRef<null>(null);

  const handleCloseDropdown = (e: MouseEvent) => {
    const { target: dropDown } = e
    if (dropDown && (dropDown as Element)?.contains(dropdownRef.current)) {
      closeDropDown()
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleCloseDropdown, true);
    return () =>
      document.body.removeEventListener("click", handleCloseDropdown, true);
  }, []);
  return (
    <>
      <div
        className={`absolute top-0 right-0 w-[120px] bg-white border border-gray-300 rounded-lg shadow-lg ${openDropdownId === BookId ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity ease-in-out duration-300`}
        ref={dropdownRef}
      >
        <ul className="p-2 space-y-1">
          <li
            className="flex items-center gap-2 px-2 py-1 text-gray-700 cursor-pointer"
            onClick={onEdit}
          >
            <EditIcon />
            ویرایش
          </li>
          <li
            className="flex items-center gap-2 px-2 py-1 text-red-500 cursor-pointer"
            onClick={onDelete}
          >
            <DeleteIcon />
            حذف
          </li>
        </ul>
      </div>
    </>
  );
}
