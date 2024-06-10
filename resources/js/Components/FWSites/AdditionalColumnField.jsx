import React from 'react'
import InputItemField from './InputItemField'
import DateItemField from './DateItemField'
import SelectItemField from './SelectItemField'

const fieldComponents = {
    text: InputItemField,
    date: DateItemField,
    dropdown: SelectItemField
}
export default function AdditionalColumnField({ column, item, value, handleEditAbleItem }) {
    const FieldItem = fieldComponents[column['input_type']]
    return (
        <FieldItem
            siteId={item?.id}
            name={column.key}
            value={value}
            handleEditAbleItem={handleEditAbleItem}
            options={JSON.parse(column?.options)}
        />
    )
}