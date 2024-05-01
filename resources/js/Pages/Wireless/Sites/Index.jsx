import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button, Card, Chip, Dialog, DialogBody, DialogHeader, IconButton, Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react'
import { XIcon } from 'lucide-react';
import React, { useState } from 'react'

export default function Index({ auth, users, locations, sites }) {

    const [addEditModal, setAddEditModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const [selectedItem, setSelectedItem] = useState('')
    const TABLE_HEAD = ["SN", "Site Name", "Location", "Assigned To", "Status", "Issue Type", ""];

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        status: '',
        issue: '',
        location_id: '',
        user_id: '',
    });

    const openAddEditModal = (type, id = 0) => {
        if (id !== 0) { setSelectedItem(id) }
        if (type === 'add') {
            setModalTitle('Add New')
            setFormType('_add')
        }
        else if (type === 'edit') {
            const selected = sites.filter(obj => obj.id === id)
            setData({ ...selected[0] });
            setModalTitle('Edit')
            setFormType('_edit')
        }
        setAddEditModal(true)
    }
    const closeAddEditModal = () => {
        setAddEditModal(false)
        reset();
    }

    const formSubmit = (e) => {
        e.preventDefault();

        if (formType === '_add') {
            post(route('wireless.sites.store'), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        }
        else if (formType === '_edit') {
            post(route('wireless.sites.update', selectedItem), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        }
    }

    const DeleteComp = ({ id }) => {
        const [deletePopOver, setDeletePopOver] = useState(false)
        const handleDeletePopOver = () => {
            setDeletePopOver(!deletePopOver)
        }
        const handleDeleteFunction = (id) => {
            if (id) {
                destroy(route('wireless.sites.delete', id), {
                    onSuccess: () => {
                        setDeletePopOver(false)
                    }
                })
            }
        }
        return (
            <Popover placement="top" open={deletePopOver} handler={handleDeletePopOver}>
                <PopoverHandler>
                    <Button color='red' size='sm'>Delete</Button>
                </PopoverHandler>
                <PopoverContent className="w-96">
                    <Typography variant="h4" className="mb-6 text-center text-black tracking-tighter">
                        Are You sure?
                    </Typography>
                    <div className="flex gap-2 justify-center items-center">
                        <Button variant="filled" size='sm' onClick={handleDeletePopOver}>No</Button>
                        <Button variant="gradient" size='sm' color='red' onClick={() => { handleDeleteFunction(id) }}>Yes</Button>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title='Wireless Sites' />
            <div className="top-section p-4">
                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tight'>Wireless Sites</Typography>
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('wireless.sites.index')}>Wireless Sites</Link></li>
                        </ul>
                    </div>
                    <Button onClick={() => { openAddEditModal('add') }} variant="gradient">Add New</Button>
                </div>
            </div>
            <div className="content mt-8">
                <Card className="h-full w-full overflow-scroll rounded-none">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" className="leading-none text-gray-800 font-semibold text-lg">
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sites.map((item, index) => (
                                <tr key={item?.id} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <Typography variant="small" className="font-medium text-lg">{index + 1}</Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" className="font-medium text-lg">{item?.name}</Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" className="font-medium text-lg">{item?.location?.name}</Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" className="font-medium text-lg">{item?.user?.name}</Typography>
                                    </td>
                                    <td className="p-4">
                                        <Chip value={item?.status} className='w-max' size="sm" />
                                    </td>
                                    <td className="p-4">
                                        <Chip value={item?.issue} className='w-max' size="sm" />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-1 items-center justify-center">
                                            <Button color='blue' size='sm' onClick={() => openAddEditModal('edit', item?.id)}>Edit</Button>
                                            <DeleteComp id={item?.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>


            <Dialog open={addEditModal} handler={closeAddEditModal} size={'xs'}>
                <DialogHeader className="justify-between">
                    <Typography variant="h3" className='tracking-tighter'>{modalTitle} Wireless Site</Typography>
                    <IconButton size="sm" variant="text" onClick={closeAddEditModal}><XIcon /></IconButton>
                </DialogHeader>
                <DialogBody>
                    <form>
                        <div className="form-item mb-4">
                            <InputLabel value={'Site Name'} className='mb-2' />
                            <TextInput
                                className="w-full font-normal text-gray-700"
                                placeholder="Site Name..."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="form-item mb-4">
                            <InputLabel value={'Status'} className='mb-2' />
                            <select
                                className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-normal text-gray-700'
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                        <div className="form-item mb-4">
                            <InputLabel value={'Issue type'} className='mb-2' />
                            <select
                                className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-normal text-gray-700'
                                value={data.issue}
                                onChange={(e) => setData('issue', e.target.value)}
                            >
                                <option value="">Select Issue type</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                            <InputError message={errors.issue} className="mt-2" />
                        </div>
                        <div className="form-item mb-4">
                            <InputLabel value={'Location'} className='mb-2' />
                            <select
                                className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-normal text-gray-700'
                                value={data.location_id}
                                onChange={(e) => setData('location_id', e.target.value)}
                            >
                                <option value="">Select Location</option>
                                {locations.length > 0 && locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                            </select>
                            <InputError message={errors.location_id} className="mt-2" />
                        </div>
                        <div className="form-item mb-4">
                            <InputLabel value={'Assigned Person'} className='mb-2' />
                            <select
                                className='w-full border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-normal text-gray-700'
                                value={data.user_id}
                                onChange={(e) => setData('user_id', e.target.value)}
                            >
                                <option value="">Select Assigned Person</option>
                                {users.length > 0 && users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                            </select>
                            <InputError message={errors.user_id} className="mt-2" />
                        </div>
                        <div className="text-right">
                            <Button
                                variant="gradient"
                                color="green"
                                loading={processing}
                                onClick={formSubmit}
                            >
                                <span>Confirm</span>
                            </Button>
                        </div>
                        <input type='hidden' name='type' value={formType} />
                    </form>
                </DialogBody>
            </Dialog>
        </Authenticated>
    )
}
