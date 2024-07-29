import React, { useState } from 'react'


export default function selectItem({ headerSlug, handleOnChangeItem, options }) {

    const [item, setItem] = useState('');

    const uploadInputValue = (val) => {
        setItem(val)
        handleOnChangeItem(headerSlug, val)
    }
    const selectOptions = JSON.parse(options)

    return (
        <div className='w-full h-full min-w-32'>
            <select
                value={item}
                onChange={(e) => { uploadInputValue(e.target.value) }}
                className='border-none focus:ring-0 w-full bg-transparent !shadow-none text-[12px] font-medium px-1'
            >
                <option value="">Select</option>
                {selectOptions?.length > 0 && selectOptions.map((option, index) => { return <option key={index} value={option}>{option}</option> })}
            </select>
        </div>
    )
}
