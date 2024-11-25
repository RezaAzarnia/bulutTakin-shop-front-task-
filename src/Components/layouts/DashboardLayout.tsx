import { Outlet } from "react-router-dom";
import DashboardNavbar from "../navigation/DashboardNavbar";
import Sidebar from "../navigation/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen">
      <DashboardNavbar />
      <main className="flex h-full overflow-hidden">
        <Sidebar />
        <div className="flex-grow w-full p-5">
          <div className="h-full overflow-auto bg-white p-7 rounded-2xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
