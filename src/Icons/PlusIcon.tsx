type Props = {
    color?: string
}
export default function PlusIcon({ color }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            fill="none"
            viewBox="0 0 17 16"
        >
            <path
                stroke={color ? color : "#fff"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3.834 8h9.333M8.5 3.333v9.334"
            ></path>
        </svg>
    )
}
