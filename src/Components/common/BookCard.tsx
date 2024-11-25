import { Book } from "../../types";

type CardProps = Book & {
  children: React.ReactNode;
  type?: "dashboardCard" | "shoppingCard";
};

function BookCard({
  bookCover,
  bookName,
  bookPrice,
  children,
  type = "dashboardCard",
}: CardProps) {
  return (
    <div className="w-[306px] min-h-[400px] border border-gray-300 rounded-[4px] shadow-lg bg-white flex flex-col">
      <div className="flex-1 bg-gray-100 ">
        <img
          src={bookCover as string}
          alt={bookName}
          className="object-cover w-full h-[306px]"
        />
      </div>
      <div className="flex-grow p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-950">{bookName}</h3>
          {type === "dashboardCard" && children}
        </div>
        <div>
          <span className="text-sm font-medium text-gray-400">قیمت :</span>
          <span className="text-base font-bold text-gray-950">
            {Number(bookPrice).toLocaleString("fa-IR")} تومان
          </span>
        </div>
        {type === "shoppingCard" && children}
      </div>
    </div>
  );
}
export default BookCard