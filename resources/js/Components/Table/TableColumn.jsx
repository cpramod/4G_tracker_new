import React from 'react'
import EditableComponent from './FieldOptions/EditableComponent'

export default function TableColumn({ header, itemValue, handleItemChange }) {
    return (
        <React.Fragment>
            <td className={`border-l h-10 text-[12px] font-medium ps-2 ${header?.hidden ? 'hidden' : ''}`}>
                {header?.editable ?
                    <EditableComponent
                        header={header}
                        itemValue={itemValue}
                        handleItemChange={handleItemChange}
                    />
                    : itemValue
                }
            </td>
        </React.Fragment>
    )
}
