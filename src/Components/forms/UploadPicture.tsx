import { ChangeEvent, memo, useEffect, useState } from 'react'
import UploadIcon from '../../Icons/UploadIcon'
import DeleteIcon from '../../Icons/DeleteIcon'
type PictureInfo = {
    pictureSrc: string | ArrayBuffer | null,
    pictureName: string
}
type Props = {
    onLoadPicture: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
    isFormSubmited: boolean
}
function UploadPicture({ onLoadPicture, isFormSubmited }: Props) {
    const [pictureInfo, setPictureInfo] = useState<PictureInfo>({ pictureSrc: '', pictureName: '' })
    const [error, setError] = useState('')

    const handeFileUploader = (e: ChangeEvent<HTMLInputElement>) => {
        const { target } = e
        if (!target.files) return

        const file: File = target.files[0] as File

        if (!file.type.includes("image")) {
            setError("فرمت فایل انتخاب شده نامعتبر است. لطفا یک عکس انتخاب کنید.");
            return

        } else if (Math.floor(+(file.size / 1024).toFixed(2)) > 200) {
            setError("حجم عکس انتخاب شده نباید بیشتر از 200 کیلوبایت باشد.");
            return
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setPictureInfo((prev) => ({ ...prev, pictureSrc: fileReader.result, pictureName: file?.name }))
            onLoadPicture(fileReader.result)
            setError('')
        }
    }

    useEffect(() => {
        if (isFormSubmited && !pictureInfo.pictureSrc?.toString().length) {
            setError("لطفا عکسی برای کتاب خود انتخاب کنید")
        }
    }, [isFormSubmited, pictureInfo])

    const clearValues = () => {
        setPictureInfo({ pictureSrc: '', pictureName: "" });
        setError('')
    }

    return (
        <>
            {!pictureInfo.pictureSrc ?
                <div className='flex flex-col items-start justify-center gap-2 mx-auto text-center w-fit'>
                    <div className="relative flex flex-col items-center justify-center gap-4 px-16 py-2 text-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                        <input className="absolute m-auto text-transparent opacity-0 cursor-pointer size-full " type='file'
                            onChange={handeFileUploader}
                            name='bookPicture'
                        />
                        <UploadIcon />
                        <h2 className="text-lg font-bold text-gray-950">بارگذاری عکس</h2>
                        <p className="font-bold text-gray-500">
                            در این قسمت عکس محصول خودتان را میتوانید بارگزاری کنید.
                        </p>
                    </div>
                    {error && <p className='text-sm text-red-500 '>{error}</p>}
                </div>
                :
                <div className="space-y-1">
                    <div
                        className="flex justify-between w-full px-2 py-1 border border-gray-300 rounded-md outline-none placeholder:text:sm placeholder:text-gray-400 placeholder:font-medium">
                        <div className="flex items-center gap-2">
                            <img src={pictureInfo?.pictureSrc as string} alt="" className='object-cover rounded size-12' />
                            <span>{pictureInfo?.pictureName}</span>
                        </div>
                        <button onClick={clearValues}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            }
        </>
    )
}
export default memo(UploadPicture)