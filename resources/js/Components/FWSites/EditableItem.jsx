import React from 'react'
import InputItemField from './InputItemField'
import DateItemField from './DateItemField'
import SelectItemField from './SelectItemField'

const fieldComponents = {
    text: InputItemField,
    date: DateItemField,
    dropdown: SelectItemField
}

export default function EditableItem({ item, site, handleEditAbleItem }) {
    const FieldItem = fieldComponents[item['input_type']]
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
            siteId={site?.id}
            name={item.key}
            value={item.value}
            handleEditAbleItem={handleEditAbleItem}
            options={options[item.key]}
        />
    )
}
