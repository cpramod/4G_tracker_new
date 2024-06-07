import axios from 'axios';
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';

export default function DateItemField({ siteId, name, value, }) {
    const [item, setItem] = useState(value ? value : '');
    const handleOnChange = (dateString) => {
        setItem(dateString)
        axios.post(route('site.field.name.save.item'), {
            site_id: siteId,
            field_name: name,
            field_value: dateString
        })
    }
    return (
        <div className='w-full h-full'>
            <ReactDatePicker
                selected={item}
                onChange={(date) => handleOnChange(date)}
                className='border-none focus:ring-0 w-full bg-transparent !shadow-none text-[12px] font-medium'
                dateFormat="dd/MM/yyyy"
            />
        </div>
    )
}
