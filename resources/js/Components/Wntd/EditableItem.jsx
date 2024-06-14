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
            { label: 'Device Upgrade', value: 'device_upgrade' },
            { label: 'Reparent', value: 'reparent' },
            { label: 'Repan', value: 'repan' },
        ]
    }
    return (
        <FieldItem
            siteId={site?.id}
            locId={site?.loc_id}
            name={item.key}
            value={item.value}
            handleEditAbleItem={handleEditAbleItem}
            options={options[item.key]}
        />
    )
}
