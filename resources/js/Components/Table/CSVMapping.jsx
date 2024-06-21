import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function CSVMapping({ mappingDialog, setMappingDialog, table_header, mappingData }) {

    const initialColumns = table_header?.reduce((acc, obj) => {
        acc[obj.slug] = '';
        return acc;
    }, {});

    const [data, setData] = useState({ ...initialColumns, file_path: mappingData ? mappingData?.filePath : '', } || {})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    // const [errorMsg, setErrorMsg] = useState('')
    // const [successMsg, setSuccessMsg] = useState('')

    const handleOpen = () => setMappingDialog(!mappingDialog);
    const handleOnChange = (fieldName, value) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: value
        }));
    }
    useEffect(() => {
        handleOnChange('file_path', mappingData?.filePath ? mappingData?.filePath : '')
    }, [mappingData])

    console.log(data);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        Object.keys(data).forEach(field => {
            if (!data[field]) {
                errors[field] = 'This field is required.';
            }
        });
        setErrors(errors);
        if (Object.keys(errors).length > 0) {
            console.log(errors);
            return;
        }
        try {
            setLoading(true)
            const res = await axios.post(route('table.map.save'), data)
            console.log(res)
            //     if (res?.data) {
            //         setSuccessMsg(res?.data?.success?.message)
            //         setBatchId(res?.data?.batch_id)
            //         setTimeout(() => {
            //             setMappingDialog(false)
            //             setSuccessMsg('')
            //             setErrorMsg('')
            //         }, 3000);
            //         router.visit(route('wireless.sites.index'));
            //     }

        } catch (err) {
            //     console.log('error:', err)
            //     setErrorMsg(`${err?.response?.data?.error?.message}`);
        } finally {
            setLoading(false)
        }

    }


    return (
        <React.Fragment>
            <Dialog open={mappingDialog} size='xs'>
                <DialogHeader>CSV Mapping</DialogHeader>
                <DialogBody className='px-6 overflow-scroll'>
                    {table_header?.length > 0 && table_header?.map((item, index) => {
                        return (
                            <div className="form-item mb-4" key={index}>
                                <div className="flex items-center">
                                    <InputLabel value={item?.column_name} className='w-1/3' />
                                    <div className='w-full'>
                                        <select
                                            className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                            value={data[item?.slug]}
                                            onChange={(e) => handleOnChange(item?.slug, e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                        </select>
                                        <InputError message={errors[item?.slug]} className='!text-[12px] font-medium mt-1' />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1 capitalize"
                        disabled={loading}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        className='capitalize'
                        onClick={handleOnSubmit}
                        loading={loading}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    )
}
