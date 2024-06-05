import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import axios from 'axios';

export default function CSVMapping({ mappingDialog, setMappingDialog, mappingData }) {
    const handleOpen = () => setMappingDialog(!mappingDialog);
    const [data, setData] = useState({
        file_path: mappingData ? mappingData?.filePath : '',
        site_name: '',
        cell_name: '',
        lon: '',
        lat: '',
        bb_type: '',
        rru_type: '',
        antenna_type: '',
        frequency: '',
        pci: '',
        azimuth: '',
        height: '',
        last_epo: '',
        next_epo: '',
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
        ['site_name', 'cell_name', 'lon', 'lat', 'bb_type', 'rru_type', 'antenna_type', 'frequency', 'pci', 'azimuth', 'height', 'last_epo', 'next_epo'].forEach(field => {
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
            const res = await axios.post(route('site.field.map.save'), data)
            if (res?.data) {
                setSuccessMsg(res?.data?.success?.message)
                setTimeout(() => {
                    setMappingDialog(false)
                    setSuccessMsg('')
                    setErrorMsg('')

                }, 3000);
                router.visit(route('site.field.name.index'));
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
                            <InputLabel value={'Site Name'} className='w-1/3' />
                            <div className='w-full'>
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
                            <InputLabel value={'Cell Name'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.cell_name}
                                    onChange={(e) => handleOnChange('cell_name', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.cell_name} className='!text-[12px] font-medium' />
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
                            <InputLabel value={'BB Type'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.bb_type}
                                    onChange={(e) => handleOnChange('bb_type', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.bb_type} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'RRU Type'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.rru_type}
                                    onChange={(e) => handleOnChange('rru_type', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.rru_type} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Antenna Type'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.antenna_type}
                                    onChange={(e) => handleOnChange('antenna_type', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.antenna_type} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Frequency'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.frequency}
                                    onChange={(e) => handleOnChange('frequency', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.frequency} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>

                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'PCI'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.pci}
                                    onChange={(e) => handleOnChange('pci', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.pci} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Azimuth'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.azimuth}
                                    onChange={(e) => handleOnChange('azimuth', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.azimuth} className='!text-[12px] font-medium' />
                            </div>

                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Height'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.height}
                                    onChange={(e) => handleOnChange('height', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.height} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Last EPO'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.last_epo}
                                    onChange={(e) => handleOnChange('last_epo', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.last_epo} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                    <div className="form-item mb-4">
                        <div className='flex items-center'>
                            <InputLabel value={'Next EPO'} className='w-1/3' />
                            <div className="w-full">
                                <select
                                    className="w-full font-medium text-[12px] py-1 rounded-md border-gray-300"
                                    value={data.next_epo}
                                    onChange={(e) => handleOnChange('next_epo', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {mappingData?.header?.length > 0 && mappingData?.header.map((item, index) => { return <option key={index} value={item}>{item}</option> })}
                                </select>
                                <InputError message={errors.next_epo} className='!text-[12px] font-medium' />
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1" disabled={loading}>
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOnSubmit} loading={loading}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    )
}
