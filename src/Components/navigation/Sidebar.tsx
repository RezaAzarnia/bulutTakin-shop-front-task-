import { memo, useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../../Icons/DashboardIcon";
import BookIcon from "../../Icons/BookIcon";
import AuthorsIcon from "../../Icons/AuthorsIcon";
import LogoutIcon from "../../Icons/LogoutIcon";
import ArrowIcon from "../../Icons/ArrowIcon";
const navItems = [
  {
    icon: <DashboardIcon />,
    text: "داشبورد",
    to: "/dashboard",
  },
  {
    icon: <BookIcon />,
    text: "مدیریت کتاب ها",
    to: "/dashboard/manageBooks",
  },
  {
    icon: <AuthorsIcon />,
    text: "فروشگاه",
    to: "/",
  },
];
function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  return (
    <div className="flex-1 hidden md:block">
      <aside
        className={`flex flex-col py-6 px-4 bg-white transition-all duration-300 ease-in-out ${isExpanded ? "w-64" : "w-20"} h-full border-l border-gray-200`}
      >
        <ul className="flex flex-col flex-1 gap-2">
          <li className="flex items-center gap-2 p-3">
            <button
              onClick={toggleSidebar}
              className={`flex items-center gap-2 py-1.5 px-1 bg-gray-200 rounded-md outline-none transition-transform duration-300
                ${isExpanded ? "rotate-180" : "rotate-0"}
                `}
            >
              <ArrowIcon />
            </button>
          </li>
          {navItems.map((item, index) => {
            return (
              <li key={index + 1} className="text-gray-700">
                <NavLink
                  to={item?.to}
                  end
                  className={({ isActive }) =>
                    `sidebar-link flex items-center gap-2 p-3 rounded-lg ${isActive ? "active bg-purple-primary  text-white" : ""
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span
                    className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${isExpanded ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    {item.text}
                  </span>
                </NavLink>
              </li>
            );
          })}
          <li className="flex items-center gap-2 p-3 mt-auto text-gray-700 cursor-pointer">
            <span>
              <LogoutIcon />
            </span>
            <span
              className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${isExpanded ? "opacity-100" : "opacity-0"
                }`}
            >
              خروج از حساب کاربری
            </span>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default memo(Sidebar);
