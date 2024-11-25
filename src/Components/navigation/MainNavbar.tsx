import { NavLink } from "react-router-dom";
import Profile from "../../Icons/Profile";
type NavItems = {
  to: string;
  text: string;
};
const navItems: NavItems[] = [
  {
    to: "/dashboard",
    text: "داشبورد",
  },
  {
    to: "/",
    text: "کتاب ها",
  },
  {
    to: "/authors",
    text: "ناشران",
  },
];

export default function MainNavbar() {
  return (
    <div className="w-full border-b border-gray-200">
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-8">
          <img src="/shoniz_logo.png" alt="navbar logo" />
          <ul className="flex items-center gap-14">
            {navItems.map((item: NavItems, index: number) => {
              return (
                <li key={index + 1} className="text-gray-950">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${isActive ? "font-bold text-purple-primary" : "font-medium"}`
                    }
                  >
                    {item.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 bg-gray-200 rounded-full">
              <Profile />
            </div>
            <span className="text-sm font-medium text-gray-700">
              رضا آذرنیا
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
