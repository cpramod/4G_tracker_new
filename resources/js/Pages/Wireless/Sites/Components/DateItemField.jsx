import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';

export default function DateItemField({ siteId, locId, name, value, handleEditAbleItem }) {
    const [item, setItem] = useState(value ? value : '');
    const handleOnChange = (dateString) => {
        setItem(dateString)
        handleEditAbleItem(siteId, locId, name, dateString)
    }
    return (
        <div className='w-full h-full'>
            <ReactDatePicker
                selected={item}
                onChange={(date) => handleOnChange(date)}
                className='border-none focus:ring-0 w-full bg-transparent !shadow-none text-[12px] font-medium'
            />
        </div>
    )
}
