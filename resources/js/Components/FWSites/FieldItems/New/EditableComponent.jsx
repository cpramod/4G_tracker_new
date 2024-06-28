import React from 'react'
import InputItem from './InputItem'
import DateItem from './DateItem'
import SelectItem from './SelectItem'
import UploadItem from './UploadItem'

const fieldComponents = {
    text: InputItem,
    date: DateItem,
    dropdown: SelectItem,
    upload: UploadItem
}

export default function EditableComponent({ item, handleItemOnChange }) {
    const FieldItem = fieldComponents[item['input_type'] ? item['input_type'] : 'text']
    const options = {
        status: [
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Not Started', value: 'not_started' },
            { label: 'Completed', value: 'completed' },
        ],
        solution_type: [
            { label: 'Opti Type-1', value: 'opti_type_1' },
            { label: 'Opti Type-5', value: 'opti_type_5' },
            { label: 'Opti Type-6', value: 'opti_type_6' },
        ]
    }
    return (
        <FieldItem
            name={item.key}
            value={item.value}
            handleItemOnChange={handleItemOnChange}
            options={options[item.key]}
        />
    )
}
