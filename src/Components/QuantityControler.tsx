import DeleteIcon from "../Icons/DeleteIcon"
import MinusIcon from "../Icons/MinusIcon"
import PlusIcon from "../Icons/PlusIcon"

type Props = {
    onIncrease: () => void
    onDecrease: () => void
    onDelete: () => void
    quantity: number
}
export default function QuantityControler({ quantity, onIncrease, onDecrease, onDelete }: Props) {
    return (
        <div
            className="flex justify-center gap-4 min-w-[100px] w-full px-4 py-2 text-xs font-semibold leading-loose border rounded-lg border-purple-primary outline-none items-center text-center"
        >
            <button onClick={onIncrease} ><PlusIcon color='#6E21FF' /></button>
            <p className="text-sm font-semibold">{quantity}</p>
            {
                quantity === 1 ?
                    <button onClick={onDelete}><DeleteIcon /></button>
                    :
                    <button onClick={onDecrease}><MinusIcon /></button>
            }
        </div>)
}
