import React, { useState } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Button, Card, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import TextInput from '@/Components/TextInput'
import { ChevronDownIcon, ChevronUpIcon, EllipsisVerticalIcon, SearchIcon } from 'lucide-react'
import ImportCSV from '@/Components/Table/ImportCSV'
import ColumnOptions from '@/Components/Table/ColumnOptions'
import RestoreTable from '@/Components/Table/RestoreTable'
import DeleteTable from '@/Components/Table/DeleteTable'
import DeleteButton from '@/Components/Table/DeleteButton'

export default function ViewTableItem({ auth, entity }) {
    const { role } = auth
    function getColumnValue(data, key) {
        for (let i = 0; i < data.length; i++) {
            if (key in data[i]) {
                return data[i][key];
            }
        }
        return '';
    }
    const [deleteTableDialog, setDeleteTableDialog] = useState(false);

    return (
        <Authenticated user={auth?.user}>
            <Head title={entity?.title} />
            <div className="top-section p-4">
                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tight'>{entity?.title}</Typography>
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('view.table.item', entity?.slug)}>{entity?.title}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <Menu>
                            <MenuHandler>
                                <Button variant='text' size='sm'>
                                    <EllipsisVerticalIcon size={18} color='gray' />
                                </Button>
                            </MenuHandler>
                            <MenuList className='font-semibold text-gray-600 max-w-32'>
                                <MenuItem onClick={() => { setDeleteTableDialog(true) }} className='text-red-500 hover:!text-red-500'>Delete</MenuItem>
                            </MenuList>
                        </Menu>
                        <DeleteTable deleteTableDialog={deleteTableDialog} setDeleteTableDialog={setDeleteTableDialog} tableId={entity?.id} />
                    </div>
                </div>
            </div>
            {entity?.attributes.length === 0 && (
                <div className='text-center border rounded py-6'>
                    <Typography variant='h4' color='blue-gray' className='mb-3'>It seems you haven't created any columns yet.</Typography>
                    <Link href={route('table.wizard.column.index', entity?.id)}>
                        <Button variant='gradient' size='sm' className='capitalize'>Create Column</Button>
                    </Link>
                </div>
            )}
            {entity?.attributes.length > 0 && (
                <>
                    <div className="filter-wrapper md:px-4">
                        <div className="flex filter-details justify-end gap-2">
                            <div className="search-wrapper w-1/6 flex relative">
                                <TextInput
                                    placeholder="Search..."
                                    className="w-full text-sm rounded-md rounded-r-none border-r-0 focus:ring-0 h-8"
                                />
                                <div className="search-icon"><IconButton size='sm' className='rounded-l-none'><SearchIcon color='white' size={18} /></IconButton></div>
                            </div>
                            {role === 'super-admin' && (
                                <React.Fragment>
                                    <ImportCSV columns={entity?.attributes} />
                                    <ColumnOptions columns={entity?.attributes} />
                                    <RestoreTable entity_id={entity?.id} />
                                    {/* <ExportTable entity_id={entity?.id} /> */}
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                    <div className="content mt-6">
                        <Card className="h-full w-full rounded-none">
                            <div className="overflow-x-auto overflow-hidden">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            {entity?.attributes?.map((head, index) => (
                                                <th key={index} className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer ${head?.hidden ? 'hidden' : ''}`}>
                                                    <div className="flex justify-between">
                                                        <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">{head?.alternative_name ? head?.alternative_name : head.name}</Typography>
                                                        {head?.sortable && (
                                                            <div className="relative mt-1">
                                                                <span className='absolute -top-2 right-0 hover:bg-blue-gray-100 rounded-sm'><ChevronUpIcon size={12} strokeWidth={2} onClick={() => { sortData(head.slug, 'asc') }} /></span>
                                                                <span className='absolute -bottom-1 right-0 hover:bg-blue-gray-100 rounded-sm'><ChevronDownIcon size={12} strokeWidth={2} onClick={() => { sortData(head.slug, 'desc') }} /></span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entity?.values?.length > 0 && entity?.values?.map((entity_values, index) => {
                                            const values = JSON.parse(entity_values?.values)
                                            return (
                                                <tr key={index} className="even:bg-blue-gray-50/50">
                                                    {
                                                        entity?.attributes?.map((head, index) => {
                                                            return (
                                                                <td key={index} className={`border-l h-10 text-[12px] font-medium ps-2 ${head?.hidden ? 'hidden' : ''}`}>{getColumnValue(values, head.slug)}</td>
                                                            )
                                                        })
                                                    }
                                                    <td className='border-l h-10 text-[12px] font-medium ps-2'>
                                                        <DeleteButton valueId={entity_values?.id} />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </Authenticated>
    )
}
