import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Card, Typography } from '@material-tailwind/react'
import AddUser from '@/Components/Roles/AddUser'
export default function Index({ auth, roles, noRoles }) {
    const TABLE_HEAD = ['SN', 'Role Name', 'User Count']
    return (
        <Authenticated user={auth?.user}>
            <Head title='Wireless Sites' />
            <div className="top-section p-4">
                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tight'>Role Management</Typography>
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('roles.index')}>Role Management</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="filter-wrapper md:px-4">
                <div className="flex filter-details justify-end gap-3">
                    <AddUser roles={roles} />
                </div>
            </div>
            <div className="content mt-6">
                <Card className="h-full w-full rounded-none">
                    <div className="overflow-x-auto overflow-hidden">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer">
                                            <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm text-left">
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {roles?.length > 0 && roles?.map((item, index) => (
                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                        <td className="border-l h-10 text-[12px] font-medium ps-2 w-20">{index + 1}</td>
                                        <td className='border-l h-10 text-[12px] font-medium ps-2 capitalize'>{item?.name}</td>
                                        <td className='border-l h-10 text-[12px] font-medium ps-2 w-28'>{item?.name === 'guest' ? item?.users_count + noRoles : item?.users_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </Authenticated>
    )
}
