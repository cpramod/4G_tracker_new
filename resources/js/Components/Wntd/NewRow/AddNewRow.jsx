import React from 'react'
import { Button } from '@material-tailwind/react'
import { Trash2Icon } from 'lucide-react'
import EditableComponent from '@/Components/Wntd/FieldItems/New/EditableComponent'
import { useForm } from '@inertiajs/react'
import toast from 'react-hot-toast'

export default function AddNewRow({ tableHeader, setAddNewRow }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        newItem: {}
    })


    console.log(data);

    const handleItemOnChange = (name, value) => {
        const newItem = { ...data.newItem }
        setData('newItem', {
            ...newItem,
            [name]: value
        })
    }
    const handeOnDelete = () => {
        setData('newItem', {})
        setAddNewRow(false)
    }

    const onSubmitHandler = () => {
        if (!data?.newItem['loc_id']) {
            return toast.error('LocId is required')
        }
        post(route('wireless.sites.add.row'), {
            preserveScroll: true,
            onSuccess: () => {
                setAddNewRow(false)
                toast.success('Row Added successfully')
            }
        })
    }

    return (
        <tr className='border-b'>
            {tableHeader?.length > 0 && tableHeader.map((item, index) => (
                <td className='border-l h-10 text-[12px] font-medium ps-2' key={index}>
                    <EditableComponent item={item} handleItemOnChange={handleItemOnChange} />
                </td>
            ))}
            <td className='border-l h-10 px-3'>
                <div className="flex gap-1">
                    <Button variant='gradient' size='sm' className='capitalize py-1 px-2 rounded font-semibold' onClick={onSubmitHandler}>
                        Save
                    </Button>
                    <Button variant='gradient' color='red' size='sm' className='capitalize py-1 px-2 rounded' onClick={handeOnDelete}>
                        <Trash2Icon size={14} />
                    </Button>
                </div>
            </td>
        </tr>
    )
}