import { InputErrorType } from "../../types";

type Props = {
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    type?: string;
    error?: InputErrorType;
    icon: JSX.Element;
}

export default function FormInput(props: Props) {
    const { label, type, error, icon, ...rest } = props;
    return (
        <div className="space-y-1">
            {label && <label className="text-sm text-gray-950">{label}</label>}
            <div className="flex align-middle">
                <div className="flex items-center py-3 pr-4 border border-gray-300 rounded-l-none border-l-transparent w-fit rounded-r-md 
                [&>*]:stroke-[#333741]">
                    {icon}
                </div>
                <input
                    type={type || "text"}
                    {...rest}
                    className="w-full py-3 pr-2 border border-r-0 border-gray-300 rounded-md rounded-r-none outline-none placeholder:text:sm placeholder:text-gray-400 placeholder:font-medium"
                />
            </div>
            {error && error[props?.name] && <p className="mt-1.5 text-sm text-red-500 min-h-2">{error[props.name]}</p>}
        </div>
    )
}
