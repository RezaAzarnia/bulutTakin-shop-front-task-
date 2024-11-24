import { createContext, useCallback, useContext, useState } from "react";
import BookIcon from "../Icons/BookIcon";
import CloseIcon from "../Icons/CloseIcon";

type childrenProps = {
    children: React.ReactNode;
}
type Toast = {
    id: number;
    title: string;
    component: React.ReactNode;
}

type ToastContextType = {
    toast: Toast;
    open: (title: string, component: React.ReactNode) => void;
}

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: childrenProps) => {
    const [toast, setToast] = useState<Toast>({ id: 0, title: '', component: null });

    const open = useCallback((title: string, component: React.ReactNode) => {
        const id = Date.now()
        setToast({ id, title, component })
        setTimeout(() => close(), 4000)
    }, [])

    const close = useCallback(() => {
        setToast({ id: 0, title: "", component: null })
    }, [])
    return (
        <ToastContext.Provider value={{ toast, open }}>
            {children}

            <div className={`fixed p-4 space-y-1 bg-green-100 border border-green-500 rounded-lg bottom-10  w-96 transition-transform duration-300 
                ${toast.id ? "translate-x-0 left-10" : "-translate-x-full left-0"}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className='[&>*]:stroke-green-700'><BookIcon /></span>
                        <span className='text-green-700'>
                            {toast.title}
                        </span>
                    </div>
                    <button onClick={close}>
                        <CloseIcon />
                    </button>
                </div>
                <div className='mr-5 text-sm'>
                    {toast.component}
                </div>
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => {

    const data = useContext(ToastContext)
    console.log(data);

    if (!data) {
        throw new Error("this value doesn't exist in the ")
    }

    return data
}