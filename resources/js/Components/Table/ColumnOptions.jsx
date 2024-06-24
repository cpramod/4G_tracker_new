import React, { useState } from 'react'
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import AddColumn from './AddColumn'

export default function ColumnOptions() {

    const [addColumnDialog, setAddColumnDialog] = useState(false)

    return (
        <>
            <Menu>
                <MenuHandler>
                    <Button variant='gradient' size='sm' className='capitalize'>Column Options</Button>
                </MenuHandler>
                <MenuList className='font-semibold text-gray-600'>
                    <MenuItem onClick={() => { setAddColumnDialog(true) }}>Add Column</MenuItem>
                    <MenuItem>Show/Hide Columns</MenuItem>
                    <MenuItem>Rename Columns</MenuItem>
                    <MenuItem>Rearrange Columns</MenuItem>
                    <MenuItem className='text-red-500'>Delete Columns</MenuItem>
                </MenuList>
            </Menu>
            <AddColumn addColumnDialog={addColumnDialog} setAddColumnDialog={setAddColumnDialog} />
        </>
    )
}
