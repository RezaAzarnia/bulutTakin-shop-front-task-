import EditIcon from "../../Icons/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
type Props = {
  id: number;
  openDropdownId: number;
  onEdit: () => void;
  onDelete: () => void;
};
export default function CartDropdownMenu({
  id,
  openDropdownId,
  onEdit,
  onDelete,
}: Props) {
  return (
    <>
      <div
        className={`absolute top-0 right-0 w-[120px] bg-white border border-gray-300 rounded-lg shadow-lg ${openDropdownId === id ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity ease-in-out duration-300`}
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
