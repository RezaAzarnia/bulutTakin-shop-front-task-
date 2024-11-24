import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/MainLayout";
import DashboardLayout from "../Components/DashboardLayout";
import ManageBooks from "../pages/ManageBooks";
import Home from "../pages/Home";
const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <h1>خطایی رخ داده است</h1>,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/authors", element: <h1>این صفحه  بعدا ساخته خواهد شد</h1> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", index: true, element: <h1>این صفحه  بعدا ساخته خواهد شد</h1> },
      {
        path: "manageBooks",
        element: <ManageBooks />,
      },
    ],
  },
]);
export default router;
