import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen ">
      <MainNavbar />
      <main className="flex flex-col h-full px-10 py-5 overflow-hidden">
        <div className="h-full p-8 overflow-auto bg-white rounded-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
