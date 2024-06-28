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
            { label: 'Device Upgrade', value: 'device_upgrade' },
            { label: 'Reparent', value: 'reparent' },
            { label: 'Repan', value: 'repan' },
        ]
    }
    return (
        <FieldItem
            name={item.key}
            options={options[item.key]}
            handleItemOnChange={handleItemOnChange}
        />
    )
}
