import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function Dashboard({ auth }) {
    const { count_data, wntd, site_status, site_solution_type, open_locs, closed_locs } = usePage().props

    console.log(open_locs);

    const counts = wntd?.map(item => item.count);
    const wntds = wntd?.map(item => item.wntd);

    const status_label = site_status?.map(item => item.label);
    const status_count = site_status?.map(item => item.count);

    const solution_label = site_solution_type?.map(item => item.label);
    const solution_count = site_solution_type?.map(item => item.count);

    ChartJS.register(ArcElement, Tooltip, Legend);
    const wntd_data = {
        labels: wntds,
        datasets: [
            {
                label: 'Count',
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const status_data = {
        labels: status_label,
        datasets: [
            {
                label: 'Count',
                data: status_count,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const solution_data = {
        labels: solution_label,
        datasets: [
            {
                label: 'Count',
                data: solution_count,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const TABLE_HEAD = ['SN', 'LOCID', "WNTD", "IMSI"]
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="dashboard-page p-6">
                <Typography variant='h3' color='blue-gray'>Dashboard</Typography>
                <div className="items-row grid grid-cols-6 gap-6 pt-12">
                    <Card className='drop-shadow-sm shadow-lg'>
                        <CardBody className='px-3 py-2'>
                            <div className="flex items-center justify-between relative py-4">
                                <p className='font-semibold text-2xl capitalize'>locations</p>
                                <h4 className='text-gray-400 font-semibold text-5xl absolute right-0 leading-tight tracking-tighter'>{count_data?.loc_count ? count_data?.loc_count : '00'}</h4>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className='drop-shadow-sm shadow-lg'>
                        <CardBody className='px-3 py-2'>
                            <div className="flex items-center justify-between relative py-4">
                                <p className='font-semibold text-2xl capitalize'>WNTD</p>
                                <h4 className='text-gray-400 font-semibold text-5xl absolute right-0 leading-tight tracking-tighter'>{count_data?.wntd_count ? count_data?.wntd_count : '00'}</h4>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className='drop-shadow-sm shadow-lg'>
                        <CardBody className='px-3 py-2'>
                            <div className="flex items-center justify-between relative py-4">
                                <p className='font-semibold text-2xl capitalize'>AVC</p>
                                <h4 className='text-gray-400 font-semibold text-5xl absolute right-0 leading-tight tracking-tighter'>{count_data?.avc_count ? count_data?.avc_count : '00'}</h4>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className='drop-shadow-sm shadow-lg'>
                        <CardBody className='px-3 py-2'>
                            <div className="flex items-center justify-between relative py-4">
                                <p className='font-semibold text-2xl capitalize'>Sites</p>
                                <h4 className='text-gray-400 font-semibold text-5xl absolute right-0 leading-tight tracking-tighter'>{count_data?.site_count ? count_data?.site_count : '00'}</h4>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className='drop-shadow-sm shadow-lg'>
                        <CardBody className='px-3 py-2'>
                            <div className="flex items-center justify-between relative py-4">
                                <p className='font-semibold text-2xl capitalize'>Cells</p>
                                <h4 className='text-gray-400 font-semibold text-5xl absolute right-0 leading-tight tracking-tighter'>{count_data?.home_cell_count ? count_data?.home_cell_count : '00'}</h4>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className='drop-shadow-sm shadow-lg'>
                        <CardBody className='px-3 py-2'>
                            <div className="flex items-center justify-between relative py-4">
                                <p className='font-semibold text-2xl capitalize'>Heavy users locs</p>
                                <h4 className='text-gray-400 font-semibold text-5xl absolute right-0 leading-tight tracking-tighter'>{count_data?.traffic_profile_count ? count_data?.traffic_profile_count : '00'}</h4>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="items-row grid grid-cols-3 gap-6 pt-12">
                    <div className="item">
                        <div className="h-[600px] relative">
                            <Typography variant='h5' color='blue-gray' className='text-center mx-auto pb-8'>WNTD Version</Typography>
                            <Doughnut
                                options={{ responsive: true, plugins: { legend: { position: 'bottom', }, } }}
                                data={wntd_data}
                                style={{ margin: '0 auto', height: 500, width: 500 }}
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div className=" h-[600px] relative">
                            <Typography variant='h5' color='blue-gray' className='text-center mx-auto pb-8'>Solution Type</Typography>
                            <Doughnut
                                options={{ responsive: true, plugins: { legend: { position: 'bottom', }, } }}
                                data={solution_data}
                                style={{ margin: '0 auto', height: 500, width: 500 }}
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div className="h-[600px] relative">
                            <Typography variant='h5' color='blue-gray' className='text-center mx-auto pb-8'>Tasks</Typography>
                            <Doughnut
                                options={{ responsive: true, plugins: { legend: { position: 'bottom', }, } }}
                                data={status_data}
                                style={{ margin: '0 auto', height: 500, width: 500 }}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-24 clear-both">
                    <div className='item'>
                        <Typography variant='h5' color='blue-gray' className='pb-6'>Open LocId</Typography>
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <React.Fragment key={head}>
                                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border cursor-pointer">
                                                <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">{head}</Typography>
                                            </th>
                                        </React.Fragment>))}
                                </tr>
                            </thead>
                            <tbody>
                                {open_locs?.map((site, index) => {
                                    return (
                                        <tr key={site.id} className="even:bg-blue-gray-50/50">
                                            <td className="border-l h-10 text-[12px] font-medium ps-2">{index + 1}</td>
                                            <td className="border-l h-10 text-[12px] font-medium ps-2">
                                                <Link href={route('wireless.show.location.index', site?.loc_id)} className='font-semibold underline'>
                                                    {site?.loc_id}
                                                </Link>
                                            </td>
                                            <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.wntd}</td>
                                            <td className="border-l border-r h-10 text-[12px] font-medium ps-2">{site?.imsi}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='item'>
                        <Typography variant='h5' color='blue-gray' className='pb-6'>Closed LocId</Typography>
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <React.Fragment key={head}>
                                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border cursor-pointer">
                                                <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">{head}</Typography>
                                            </th>
                                        </React.Fragment>))}
                                </tr>
                            </thead>
                            <tbody>
                                {closed_locs?.map((site, index) => {
                                    return (
                                        <tr key={site.id} className="even:bg-blue-gray-50/50">
                                            <td className="border-l h-10 text-[12px] font-medium ps-2">{index + 1}</td>
                                            <td className="border-l h-10 text-[12px] font-medium ps-2">
                                                <Link href={route('wireless.show.location.index', site?.loc_id)} className='font-semibold underline'>
                                                    {site?.loc_id}
                                                </Link>
                                            </td>
                                            <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.wntd}</td>
                                            <td className="border-l h-10 text-[12px] font-medium ps-2 border-r">{site?.imsi}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
