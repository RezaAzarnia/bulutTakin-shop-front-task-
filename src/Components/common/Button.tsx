type Props = {
    children: React.ReactNode;
    style?: string;
    onClick?: () => void;

}
export default function Button({ children, style, onClick }: Props) {
    return (
        <button className={`flex justify-center items-center min-w-[168px]  gap-2 px-4 py-3 font-medium rounded-md  ${style}`}
            onClick={onClick}>
            {children}
        </button>
    )
}
