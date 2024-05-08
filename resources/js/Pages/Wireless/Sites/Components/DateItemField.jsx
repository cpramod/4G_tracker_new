import axios from 'axios';
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';

export default function DateItemField({ siteId, locId, name, value, }) {
    const [item, setItem] = useState(value ? value : '');
    const handleOnChange = (dateString) => {
        setItem(dateString)
        axios.post(route('wireless.sites.save.item'), {
            site_id: siteId,
            location_id: locId,
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
            />
        </div>
    )
}
