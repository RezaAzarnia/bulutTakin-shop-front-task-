import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";
import ModalProvider from "./context/ModalProvider.tsx";
import ModalManager from "./Components/modals/ModalManager.tsx";
import { BooksProvider } from "./context/BooksProvider.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import "./assets/styles/fonts.css"
import "./assets/styles/index.css"

export default function App() {
    //we have three context but each of them have a good reason 
    return (
        // book provider for add book to local storage and to the cart
        <BooksProvider>
            {/* toast provider handle toast in every where */}
            <ToastProvider>
                {/* the modal provider is for that modals and manager is to handle the modal in there for prevent repeat modal in the components */}
                <ModalProvider>
                    <ModalManager />
                    <RouterProvider router={router} />
                </ModalProvider>
            </ToastProvider>
        </BooksProvider >
    )
}
