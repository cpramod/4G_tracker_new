import { useForm } from '@inertiajs/react';
import { Button, Checkbox, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'

export default function HideColumn({ columns, additional_columns, hidden_columns }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { data, setData, post, processing, errors, reset } = useForm({
        type: "wntd",
        key: 'hide',
        items: hidden_columns?.length > 0 ? hidden_columns : []
    })

    const onCheckboxChangeHandler = (e, key) => {
        const isChecked = e.target.checked;
        setData(prevData => {
            if (isChecked) {
                return {
                    ...prevData,
                    items: [...prevData.items, key]
                };
            } else {
                return {
                    ...prevData,
                    items: prevData.items.filter(item => item !== key)
                };
            }
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        post(route('hide.columns.item'), {
            onSuccess: () => {
                setOpen(false)
                reset()
            }
        })
    }

    return (
        <>
            <Button variant="gradient" className='capitalize' size='sm' onClick={handleOpen}>Hide Column</Button>
            <Dialog open={open} size='xs'>
                <DialogHeader>Hide Column</DialogHeader>
                <DialogBody>
                    <div className="form-item">
                        <p className='text-[#333] font-semibold'>Please select the column you want to hide</p>
                        <div className="form-item grid grid-cols-2">
                            {columns?.length > 0 && columns.map((column, index) => (
                                <React.Fragment key={index}>
                                    <Checkbox
                                        containerProps={{ className: 'py-3', }}
                                        className='w-5 h-5 rounded-md'
                                        label={<Typography color="blue-gray" className="font-medium text-sm">{column?.name}</Typography>}
                                        onChange={(e) => onCheckboxChangeHandler(e, column?.key)}
                                        defaultChecked={hidden_columns?.includes(column?.key)}
                                    />
                                </React.Fragment>
                            ))}
                            {additional_columns?.length > 0 && additional_columns.map((column, index) => (
                                <React.Fragment key={index}>
                                    <Checkbox
                                        containerProps={{ className: 'py-3', }}
                                        className='w-5 h-5 rounded-md'
                                        label={<Typography color="blue-gray" className="font-medium text-sm">{column?.name}</Typography>}
                                        onChange={(e) => onCheckboxChangeHandler(e, column?.key)}
                                        defaultChecked={hidden_columns?.includes(column?.key)}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1 capitalize">
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={(e) => { onSubmitHandler(e) }} className='capitalize'>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
