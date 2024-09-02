import React, { useState } from 'react'
import { Button } from '@material-tailwind/react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';
export default function SaveBtn(props) {
   const {changedData}= useSelector(state=>state.table);

    const handleSave = async () => {
        if (changedData.length > 0) {
            let toSaveitems = changedData.filter(item => item.site_id === props.data.id)[0]
            if (toSaveitems) {
                // setLoading(true)
                const res = await axios.post(route('wireless.sites.save.item'), {
                    site_id: toSaveitems?.site_id,
                    location_id: toSaveitems?.loc_id,
                    items: toSaveitems?.items
                })
                if (res?.data?.success) {
                    // setLoading(false)
                    toast.success(res?.data?.success?.message)
                    // setChangedItems(prevItems => prevItems.filter(item => item.site_id !== site_id))
                }
            }

        }
    }
    return (
        <Button
            size='sm'
            className='capitalize py-1 px-2 rounded font-semibold'
            // disabled={!changedItems.some(item => item.site_id === site_id)}
            onClick={() => { handleSave() }}
            // loading={loading}
        >
            Save
        </Button>
    )
}
