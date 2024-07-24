import React from 'react'
import InputItem from './InputItem'

const fieldComponents = {
    text: InputItem,
}

export default function EditableComponent({ header, itemValue, handleItemChange }) {
    const FieldItem = fieldComponents[header?.input_type]
    return (
        <React.Fragment>
            <FieldItem
                value={itemValue}
                handleItemChange={handleItemChange}
                headerSlug={header.slug}
            />
        </React.Fragment>
    )
}
