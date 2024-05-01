import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button, ButtonGroup, Card, Dialog, DialogBody, DialogHeader, IconButton, Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react'
import { XIcon } from 'lucide-react';
import React, { useState } from 'react'

export default function Index({ auth, locations }) {

    const [addEditModal, setAddEditModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const [selectedItem, setSelectedItem] = useState('')
    const TABLE_HEAD = ["SN", "Name", "Address", ""];
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        address: '',
        map_code: '',
    });

    const openAddEditModal = (type, id = 0) => {
        if (id !== 0) { setSelectedItem(id) }
        if (type === 'add') {
            setModalTitle('Add New')
            setFormType('_add')
        } else if (type === 'edit') {
            const selected = locations.filter(obj => obj.id === id)
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
            post(route('wireless.location.store'), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                }
            })
        } else if (formType === '_edit') {
            post(route('wireless.location.update', selectedItem), {
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
                destroy(route('wireless.location.delete', id), {
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
            <Head title='Wireless Locations' />
            <div className="top-section p-4">
                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tightFont'>Wireless Locations</Typography>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('wireless.location.index')}>Wireless Locations</Link></li>
                            </ul>
                        </div>
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
                            {locations.map(({ id, name, address }, index) => (
                                <tr key={name} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <Typography variant="small" className="font-medium text-lg">{index + 1}</Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" className="font-medium text-lg">{name}</Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" className="font-medium text-lg">{address}</Typography>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex gap-1 items-center justify-center">
                                            <Button color='blue' size='sm' onClick={() => openAddEditModal('edit', id)}>Edit</Button>
                                            <DeleteComp id={id} />
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
                    <Typography variant="h5" color="blue-gray">{modalTitle} Location</Typography>
                    <IconButton color="blue-gray" size="sm" variant="text" onClick={closeAddEditModal}><XIcon /></IconButton>
                </DialogHeader>
                <DialogBody>
                    <form className='pb-5' onSubmit={formSubmit}>
                        <div className="form-item mb-4">
                            <InputLabel value={'Name'} className='mb-2' />
                            <TextInput
                                className="w-full font-normal text-gray-700"
                                placeholder="Name..."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="form-item mb-4">
                            <InputLabel value={'Address'} className='mb-2' />
                            <TextInput
                                className="w-full font-normal text-gray-700"
                                placeholder="Address..."
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        <div className="form-item mb-4">
                            <InputLabel value={'Map Code'} className='mb-2' />
                            <textarea
                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-normal text-gray-700"
                                placeholder="Address..."
                                rows={8}
                                value={data.map_code}
                                onChange={(e) => setData('map_code', e.target.value)}
                            />
                            <InputError message={errors.map_code} className="mt-2" />
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
