import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { router, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import axios from 'axios';

export default function CSVMapping({ mappingDialog, setMappingDialog, mappingData, setBatchId }) {
    const handleOpen = () => setMappingDialog(!mappingDialog);
    const [data, setData] = useState({
        file_path: mappingData ? mappingData?.filePath : '',
        loc_id: '',
        wntd: '',
        imsi: '',
        version: '',
        avc: '',
        bw_profile: '',
        lon: '',
        lat: '',
        site_name: '',
        home_cell: '',
        home_pci: '',
        traffic_profile: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleOnChange = (fieldName, value) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: value
        }));
    }

    useEffect(() => {
        handleOnChange('file_path', mappingData?.filePath ? mappingData?.filePath : '')
    }, [mappingData])

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        ['loc_id', 'wntd', 'imsi', 'version', 'avc', 'bw_profile', 'lon', 'lat', 'site_name', 'home_cell', 'home_pci', 'traffic_profile'].forEach(field => {
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
            const res = await axios.post(route('wireless.sites.map.save'), data)
            if (res?.data) {
                setSuccessMsg(res?.data?.success?.message)
                setBatchId(res?.data?.batch_id)
                setTimeout(() => {
                    setMappingDialog(false)
                    setSuccessMsg('')
                    setErrorMsg('')
                }, 3000);
                router.visit(route('wireless.sites.index'));
            }

        } catch (err) {
            console.log('error:', err)
            setErrorMsg(`${err?.response?.data?.error?.message}`);
        } finally {
            setLoading(false)
        }

    }
    return (
        <React.Fragment>
            <Dialog open={mappingDialog} size='xs'>
                <DialogHeader>
                    CSV Mapping
                </DialogHeader>
                {errorMsg && <p className='text-red-500 font-medium text-[12px] px-4'>{errorMsg}</p>}
                {successMsg && <p className='text-green-500 font-medium text-[12px] px-4'>{successMsg}</p>}
                <DialogBody className='px-6 overflow-scroll'>
                    <div className="form-item mb-4">
                        <div className="flex items-center">
                            <InputLabel value={'LOCID'} className='w-1/3' />
                            <div className='w-full'>
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.loc_id}
                                    onChange={(e) => handleOnChange('loc_id', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.loc_id} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'WNTD'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.wntd}
                                    onChange={(e) => handleOnChange('wntd', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.wntd} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'IMSI'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.imsi}
                                    onChange={(e) => handleOnChange('imsi', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.imsi} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'VERSION'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.version}
                                    onChange={(e) => handleOnChange('version', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.version} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'AVC'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.avc}
                                    onChange={(e) => handleOnChange('avc', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.avc} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'BW Profile'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.bw_profile}
                                    onChange={(e) => handleOnChange('bw_profile', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.bw_profile} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Lon'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.lon}
                                    onChange={(e) => handleOnChange('lon', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.lon} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Lat'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.lat}
                                    onChange={(e) => handleOnChange('lat', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.lat} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'SiteName'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.site_name}
                                    onChange={(e) => handleOnChange('site_name', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.site_name} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'HomeCell'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.home_cell}
                                    onChange={(e) => handleOnChange('home_cell', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.home_cell} className='!text-[12px] font-medium' />
                            </div>

                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'HomePCI'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.home_pci}
                                    onChange={(e) => handleOnChange('home_pci', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.home_pci} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Traffic_Profile'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.traffic_profile}
                                    onChange={(e) => handleOnChange('traffic_profile', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.traffic_profile} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                        disabled={loading}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
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
