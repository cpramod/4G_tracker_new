import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Button, Card, IconButton, Typography } from '@material-tailwind/react'
import TextInput from '@/Components/TextInput'
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react'
import ImportCSV from '@/Components/Table/ImportCSV'

export default function ViewTableItem({ auth, table_item }) {
    const { role } = auth
    return (
        <Authenticated user={auth?.user}>
            <Head title={table_item?.title} />
            <div className="top-section p-4">
                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tight'>{table_item?.title}</Typography>
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('view.table.item', table_item?.slug)}>{table_item?.title}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            {table_item?.table_columns.length === 0 && (
                <div className='text-center border rounded py-6'>
                    <Typography variant='h4' color='blue-gray' className='mb-3'>It seems you haven't created any columns yet.</Typography>
                    <Link href={route('table.wizard.column.index', table_item?.id)}>
                        <Button variant='gradient' size='sm' className='capitalize'>Create Column</Button>
                    </Link>
                </div>
            )}
            {table_item?.table_columns.length > 0 && (
                <>
                    <div className="filter-wrapper md:px-4">
                        <div className="flex filter-details justify-end gap-2">
                            <div className="search-wrapper w-1/6 flex relative">
                                <TextInput
                                    placeholder="Search..."
                                    className="w-full text-sm rounded-md rounded-r-none border-r-0 focus:ring-0 h-8"
                                // value={searchText}
                                // onChange={(e) => setSearchText(e.target.value)}
                                />
                                <div className="search-icon"><IconButton size='sm' className='rounded-l-none'
                                // onClick={handleSearch}
                                ><SearchIcon color='white' size={18} /></IconButton></div>
                            </div>
                            {role === 'super-admin' && (
                                <>
                                    <ImportCSV table_header={table_item?.table_columns} />
                                    {/* <ColumnOptions columns={tableHeader} hidden_columns={hidden_columns} deleted_columns={deleted_columns ? deleted_columns : []} /> */}
                                    {/* <RestoreTable type={'wntd'} /> */}
                                </>
                            )}
                            {/* <ExportButton route_name={'wireless.sites.export'} file_name={'WNTD_Export'} /> */}
                        </div>
                    </div>
                    <div className="content mt-6">
                        <Card className="h-full w-full rounded-none">
                            <div className="overflow-x-auto overflow-hidden">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            {table_item?.table_columns?.map((head, index) => (
                                                <th key={index} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer">
                                                    <div className="flex justify-between">
                                                        <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">{head.column_name}</Typography>
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
                                </table>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </Authenticated>
    )
}
