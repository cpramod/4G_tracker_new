import TextInput from '@/Components/TextInput';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function InputItemField({ siteId, locId, name, value, }) {

    const [item, setItem] = useState(value ? value : '');
    useEffect(() => {
        const timer = setTimeout(() => {
            if (item) {
                axios.post(route('wireless.sites.save.item'), {
                    site_id: siteId,
                    location_id: locId,
                    field_name: name,
                    field_value: item
                })
            }
        }, 2000);
        return () => { clearTimeout(timer); };
    }, [item]);


    const uploadInputValue = (val) => {
        setItem(val);

    }

    return (
        <div className='w-full h-full'>
            <textarea
                className='border-none focus:ring-0 bg-transparent !shadow-none text-[12px] font-medium w-full'
                value={item}
                rows={1}
                onChange={(e) => { uploadInputValue(e.target.value) }}
            />
        </div>
    )
}
