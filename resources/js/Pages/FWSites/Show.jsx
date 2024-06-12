import React from 'react'
import UploadItemField from '@/Components/FWSites/UploadItemField';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react';
import { Card, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Tooltip, Typography } from '@material-tailwind/react';
import { FileBarChartIcon, ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function Show({ auth, site, trackings }) {
    const TABLE_HEAD = [
        'Site Name',
        'Cell Name',
        'Lon',
        'Lat',
        'BB Type',
        'RRU Type',
        'Antenna Type',
        'Frequency',
        'PCI',
        'Azimuth',
        'Height',
        'Last EPO',
        'Next EPO',
        'Solution Type',
        'Start Date',
        'End Date',
        'Status',
        'Remarks',
        'Artifacts',
    ];
    const getTrackingValue = (tracking, key) => {
        if (tracking) {
            if (key === 'start_date' || key === 'end_date') {
                return showFromattedDate(tracking[key]?.value)
            } else if (key === 'solution_type' || key === 'status') {
                return getDropDownValue(tracking[key]?.value)
            }
            else {
                return tracking[key]?.value
            }
        }
    }
    const getDropDownValue = (value) => {
        if (value) {
            return value.replace(/_/g, ' ')
        }
    }
    const showFromattedDate = (date) => {
        if (date) {
            const dateObject = new Date(date);
            return format(dateObject, 'dd/MM/yyyy');
        }
    }

    const ShowFileIcons = ({ files }) => {
        if (files) {
            const existingFiles = JSON.parse(files)
            const getFileExtension = (filename) => {
                return filename.split('.').pop();
            };

            const getFileName = (filePath) => {
                const parts = filePath.split('/');
                let fileName = parts[parts.length - 1];
                fileName = fileName.replace(/^\d+_/, '');
                return fileName;
            }

            const handleDownload = (fileUrl, fileName) => {
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            return (
                <div className="flex mt-3">
                    {existingFiles?.map((file, index) => (
                        <React.Fragment key={index}>
                            {getFileExtension(file) === 'csv' && (
                                <Tooltip content={getFileName(file)}>
                                    <FileBarChartIcon onClick={() => handleDownload(file, getFileName(file))} className='cursor-pointer' />
                                </Tooltip>
                            )}
                            {getFileExtension(file) === 'txt' && (
                                <img src="txt-icon.png" alt="Text File Icon" />
                            )}
                            {getFileExtension(file) === 'pdf' && (
                                <Tooltip content={getFileName(file)}>
                                    <ImageIcon />
                                </Tooltip>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )
        }
    }
    return (
        <Authenticated user={auth?.user}>
            <Head title="FWSite" />
            <div className="top-section p-4">
                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tight'>{site?.site_name}</Typography>
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('site.field.name.index')}>FWSites</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="content mt-6">
                <Card className="h-full w-full rounded-none">
                    <div className="overflow-x-auto overflow-hidden">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer">
                                            <div className="flex justify-between">
                                                <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">{head}</Typography>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={site.id} className="even:bg-blue-gray-50/50">
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">
                                        <Link href={'#'}>
                                            {site?.site_name}
                                        </Link>
                                    </td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.cell_name}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.lon}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.lat}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.bb_type}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.rru_type}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.antenna_type}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.frequency}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.pci}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.azimuth}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.height}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.last_epo}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{site?.next_epo}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2 capitalize">{getTrackingValue(site?.tracking, 'solution_type')}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{getTrackingValue(site?.tracking, 'start_date')}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2">{getTrackingValue(site?.tracking, 'end_date')}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2 capitalize">{getTrackingValue(site?.tracking, 'status')}</td>
                                    <td className="border-l h-10 text-[12px] font-medium ps-2 capitalize">{getTrackingValue(site?.tracking, 'remarks')}</td>
                                    <td className="border-l h-10">
                                        <UploadItemField value={getTrackingValue(site?.tracking, 'artifacts')} name='artifacts' locId={site.loc_id} siteId={site.id} single={true} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            <div>
                <div className="py-12 px-12 relative z-10">
                    <Timeline>
                        {trackings?.map((tracking, index) => {
                            return (
                                <TimelineItem key={index}>
                                    {index + 1 !== trackings?.length && <TimelineConnector />}
                                    <TimelineHeader className="h-3">
                                        <TimelineIcon />
                                        <Typography variant="h6" color="blue-gray" className="leading-none">
                                            {format(new Date(tracking.created_at), 'MMMM dd, yyyy HH:mm:ss')}
                                        </Typography>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-8">
                                        {tracking?.key === 'artifacts' ? (
                                            <Typography variant="small" color="gray" className="font-normal text-gray-600"><span className='font-semibold'>{tracking?.user.name}</span> Uploaded New  <span className='capitalize font-semibold'>{tracking.key ? tracking.key.replace(/_/g, ' ') : ''}</span>
                                                {tracking?.value && <ShowFileIcons files={tracking?.value} />}
                                            </Typography>
                                        ) :
                                            <Typography variant="small" color="gray" className="font-normal text-gray-600"><span className='font-semibold'>{tracking?.user.name}</span> changed value of <span className='capitalize font-semibold'>{tracking.key ? tracking.key.replace(/_/g, ' ') : ''}</span> to
                                                <span className='capitalize block'>
                                                    {tracking?.key === 'start_date' || tracking?.key === 'end_date' ? showFromattedDate(tracking.value) : ''}</span>
                                                {tracking?.key === 'status' || tracking?.key === 'solution_type' ? getDropDownValue(tracking.value) : tracking.value}
                                            </Typography>
                                        }
                                    </TimelineBody>
                                </TimelineItem>
                            )
                        })}
                    </Timeline>
                </div>
            </div>
        </Authenticated>
    )
}
