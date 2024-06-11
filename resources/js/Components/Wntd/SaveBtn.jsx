import React, { useState } from 'react'
import { Button } from '@material-tailwind/react'
import toast from 'react-hot-toast'

export default function SaveBtn({ site_id, changedItems, setChangedItems }) {
    const [loading, setLoading] = useState(false)

    const handleSave = async (site_id) => {
        if (changedItems.length > 0) {
            let toSaveitems = changedItems.filter(item => item.site_id === site_id)[0]
            if (toSaveitems) {
                setLoading(true)
                const res = await axios.post(route('wireless.sites.save.item'), {
                    site_id: toSaveitems?.site_id,
                    location_id: toSaveitems?.loc_id,
                    items: toSaveitems?.items
                })
                if (res?.data?.success) {
                    setLoading(false)
                    toast.success(res?.data?.success?.message)
                    setChangedItems(prevItems => prevItems.filter(item => item.site_id !== site_id))
                }
            }

        }
    }
    return (
        <Button
            size='sm'
            className='capitalize py-1 px-2 rounded font-semibold'
            disabled={!changedItems.some(item => item.site_id === site_id)}
            onClick={() => { handleSave(site_id) }}
            loading={loading}
        >
            Save
        </Button>
    )
}
