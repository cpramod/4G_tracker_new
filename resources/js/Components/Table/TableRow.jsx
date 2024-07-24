import React, { useState } from 'react'
import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';
import TableColumn from './TableColumn';

export default function TableRow({ headers, values, valueId }) {

    const [changed, setChanged] = useState(false);

    function getColumnValue(data, key) {
        for (let i = 0; i < data.length; i++) {
            if (key in data[i]) {
                return data[i][key];
            }
        }
        return '';
    }


    const handleItemChange = (slug, value) => {
        console.log('write function');
    }

    const handleOnSave = () => {
        // todo:write function
        setChanged(false)
    }


    return (
        <React.Fragment>
            <tr className="even:bg-blue-gray-50/50">
                {headers.length && headers.map((header, index) => {
                    return (
                        <TableColumn
                            key={index}
                            header={header}
                            itemValue={getColumnValue(values, header.slug)}
                            handleItemChange={handleItemChange}
                        />
                    )
                })}
                <td className='border-l h-10 text-[12px] font-medium ps-2'>
                    <div className="flex gap-1">
                        <SaveButton
                            changed={changed}
                            handleOnSave={handleOnSave}
                        />
                        <DeleteButton valueId={valueId} />
                    </div>
                </td>
            </tr>
        </React.Fragment>
    )
}

