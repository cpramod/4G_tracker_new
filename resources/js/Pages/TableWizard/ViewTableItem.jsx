import React, { useState } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Button, Card, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import TextInput from '@/Components/TextInput'
import { ChevronDownIcon, ChevronUpIcon, EllipsisVerticalIcon, SearchIcon } from 'lucide-react'
import ImportCSV from '@/Components/Table/ImportCSV'
import ColumnOptions from '@/Components/Table/ColumnOptions/ColumnOptions'
import RestoreTable from '@/Components/Table/ColumnOptions/RestoreTable'
import DeleteTable from '@/Components/Table/DeleteTable'
import TableRow from '@/Components/Table/TableRow'
import Pagination from '@/Components/Pagination'
import AddNewRow from '@/Components/Table/AddNewRow'

export default function ViewTableItem({ auth, entity }) {
    console.log(entity);
    const { role } = auth
    const [deleteTableDialog, setDeleteTableDialog] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [addNewRow, setAddNewRow] = useState(false)

    const handlePerPageChange = (val) => {
        setPerPage(val);
    }

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
                                        {entity?.values?.data?.length > 0 && entity?.values?.data?.map((entity_values, index) => {
                                            const values = JSON.parse(entity_values?.values)
                                            const headers = entity?.attributes
                                            return (
                                                <TableRow
                                                    key={index}
                                                    headers={headers}
                                                    values={values}
                                                    valueId={entity_values?.id}
                                                />
                                            )
                                        })}
                                        {addNewRow && <AddNewRow tableHeader={entity?.attributes} setAddNewRow={setAddNewRow} />}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination flex justify-between items-center">
                                <div className="px-4">
                                    <Button variant='gradient' size='sm' className='capitalize rounded' onClick={() => { setAddNewRow(true) }}>
                                        Add New Row
                                    </Button>
                                </div>
                                <div className='md:flex grid justify-start md:justify-end items-center pt-6 mb-8 gap-3 px-4'>
                                    <div className='flex items-center gap-2'>
                                        <div className='text-sm font-medium'>Rows per Page</div>
                                        <select
                                            className='rounded-md text-sm font-medium border-gray-400 focus:ring-0 py-2'
                                            value={perPage}
                                            onChange={(e) => { handlePerPageChange(e.target.value) }}
                                        >
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="20">25</option>
                                            <option value="50">50</option>
                                            <option value="all">All</option>
                                        </select>
                                    </div>
                                    <div className='text-sm font-medium'>{`${entity?.values?.from}-${entity?.values?.to} of ${entity?.values?.total} Records`}</div>
                                    <Pagination links={entity?.values?.links} perPage={perPage} />
                                </div>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </Authenticated>
    )
}
