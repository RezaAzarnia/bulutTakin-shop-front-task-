import AlertIcon from "../Icons/AlertIcon";
import Profile from "../Icons/Profile";

export default function DashboardNavbar() {
  return (
    <div className="w-full border-b border-gray-200">
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-4">
          <img src="/shoniz_logo.png" alt="navbar logo" />
          <h3 className="text-lg font-bold text-gray-950">پروژه تستی</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center p-2 border border-gray-200 rounded-full">
            <AlertIcon />
          </div>
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
