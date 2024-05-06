import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip, Typography } from '@material-tailwind/react'
import axios from 'axios';
import { ChevronDownIcon, ChevronUpIcon, FileBarChartIcon, ImageIcon, SearchIcon } from 'lucide-react';
import React, { useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export default function Index({ auth, sites }) {
    const TABLE_HEAD = [
        { name: 'LOCID', sortable: true, sortKey: 'loc_id' },
        { name: 'WNTD', sortable: true, sortKey: 'wntd' },
        { name: 'IMSI', sortable: true, sortKey: 'imsi' },
        { name: 'VERSION', sortable: true, sortKey: 'version' },
        { name: 'AVC', sortable: true, sortKey: 'avc' },
        { name: 'BW Profile', sortable: true, sortKey: 'bw_profile' },
        { name: 'Lon', sortable: true, sortKey: 'lon' },
        { name: 'Lat', sortable: true, sortKey: 'lat' },
        { name: 'SiteName', sortable: true, sortKey: 'site_name' },
        { name: 'HomeCell', sortable: true, sortKey: 'home_cell' },
        { name: 'HomePCI', sortable: true, sortKey: 'home_pci' },
        { name: 'Traffic Profile', sortable: true, sortKey: 'traffic_profile' },
        { name: 'Start Date', sortable: false, sortKey: 'start_date' },
        { name: 'End Date', sortable: false, sortKey: 'end_date' },
        { name: 'Solution Type', sortable: false, sortKey: 'solution_type' },
        { name: 'Status', sortable: false, sortKey: 'status' },
        { name: 'Remarks', sortable: false, sortKey: 'remarks' },
        { name: 'Artifacts', sortable: false, sortKey: 'artifacts' },
    ];
    const hiddenFileInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [siteItems, setSiteItems] = useState(sites);


    const ItemField = ({ name, value, itemId = 0, read = true }) => {
        let timeoutId;
        const [open, setOpen] = useState(false);
        const [item, setItem] = useState(value ? value : '');

        const uploadInputValue = (val) => {
            setItem(val)
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                axios.post(route('wireless.sites.update.item', itemId), { field_name: name, field_value: val })
                setOpen(false)
            }, 1000);
        }
        return (
            <div className='w-full h-full' onClick={() => { setOpen(true) }}>
                <TextInput
                    className='border-none focus:ring-0 w-[100px] bg-transparent !shadow-none text-[12px] font-medium'
                    value={item}
                    onChange={(e) => { uploadInputValue(e.target.value) }}
                    readOnly={read}
                />
            </div>
        )
    }

    const SelectItemField = ({ options, name, value, itemId = 0, read = true }) => {
        const [open, setOpen] = useState(false);
        const [item, setItem] = useState(value ? value : '');
        const uploadInputValue = (val) => {
            setItem(val)
            axios.post(route('wireless.sites.update.item', itemId), { field_name: name, field_value: val })
            setOpen(false)
        }
        return (
            <div className='w-full h-full' onClick={() => { setOpen(true) }}>
                <select
                    name=""
                    value={item}
                    onChange={(e) => { uploadInputValue(e.target.value) }}
                    readOnly={read}
                    className='border-none focus:ring-0 w-full bg-transparent !shadow-none text-[12px] font-medium'
                >
                    <option value="">Select</option>
                    {options.length > 0 && options.map((option, index) => { return <option key={index} value={option.value}>{option.label}</option> })}
                </select>
            </div>
        )
    }

    const DateItemField = ({ name, value, itemId = 0, read = true }) => {
        const [open, setOpen] = useState(false);
        const [item, setItem] = useState(value ? value : '');

        const handleOnChange = (dateString) => {
            setItem(dateString)
            axios.post(route('wireless.sites.update.item', itemId), { field_name: name, field_value: dateString })
            setOpen(false)
        }
        return (
            <div className='w-full h-full' onClick={() => { setOpen(true) }}>
                <DatePicker
                    selected={item}
                    onChange={(date) => handleOnChange(date)}
                    readOnly={read}
                    className='border-none focus:ring-0 w-[100px] bg-transparent !shadow-none text-[12px] font-medium'
                />
            </div>
        )
    }

    const UploadItemField = ({ name, value, itemId = 0 }) => {
        const handleOpen = () => setOpen(!open);
        const [open, setOpen] = React.useState(false);

        const { data, setData, post, processing, reset } = useForm({
            field_name: name,
            artifacts: []
        });

        const { getRootProps, getInputProps } = useDropzone({
            onDrop: acceptedFiles => {
                setData('artifacts', [
                    ...data.artifacts,
                    ...acceptedFiles.map(file => Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    }))
                ]);
            }
        });
        const files = data?.artifacts.map(file => (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        ));

        const handleUpload = () => {
            post(route('wireless.sites.update.artifacts', itemId), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setOpen(false)
                }
            })
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

                return (
                    <div className="flex">
                        {existingFiles.map((file, index) => (
                            <React.Fragment key={index}>
                                {getFileExtension(file) === 'csv' && (
                                    <Tooltip content={getFileName(file)}>
                                        <FileBarChartIcon />
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
            <div className='w-full h-full'>
                <button className='font-medium text-[12px] opacity-0' onClick={handleOpen}>Uplaod</button>
                {value && <ShowFileIcons files={value ? value : ''} />}
                <Dialog open={open} handler={handleOpen} size='xs'>
                    <DialogHeader>Upload Artifacts</DialogHeader>
                    <DialogBody>
                        <div className="border-dashed border py-12 text-sm text-center font-medium rounded-md border-gray-300">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </div>
                        {data?.artifacts.length > 0 && (
                            <aside>
                                <h4 className='font-sm font-semibold'>Files</h4>
                                <ul className='text-[12px] font-normal'>{files}</ul>
                            </aside>
                        )}

                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            onClick={handleUpload}
                            loading={processing}
                        >
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChangeUpload = async (event) => {
        const form_input = new FormData();
        form_input.append('import_file', event.target.files[0]);
        try {
            const res = await axios.post(route('wireless.sites.import'), form_input);
            router.visit(route('wireless.sites.index'));
        } catch (error) {
            toast.error(`${error?.response?.data?.error?.message}`);
        }
    };

    const handleSearch = async () => {
        if (searchText) {
            const res = await axios.post(route('wireless.sites.search'), { search: searchText });
            if (res?.data) {
                setSiteItems(res?.data);
            }
        }
    }

    const sortData = async (key, order) => {
        router.get(route('wireless.sites.sort', { 'key': key, 'order': order }))
    };

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
                </div>
            </div>
            <div className="filter-wrapper px-4">
                <div className="flex justify-end gap-3">
                    <div className="search-wrapper w-1/3 flex relative">
                        <TextInput
                            placeholder="Search..."
                            className="w-full text-sm rounded-md rounded-r-none border-r-0 focus:ring-0 h-8"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div className="search-icon">
                            <IconButton size='sm' className='rounded-l-none' onClick={handleSearch}>
                                <SearchIcon color='white' size={18} />
                            </IconButton>
                        </div>
                    </div>
                    <div>
                        <Button variant="gradient" className='capitalize' size='sm' onClick={handleClick}>Import from CSV</Button>
                        <input
                            type="file"
                            onChange={handleChangeUpload}
                            ref={hiddenFileInput}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </div>
            <div className="content mt-6">
                <Card className="h-full w-full rounded-none">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head.name} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer">
                                        <div className="flex justify-between">
                                            <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">{head.name}</Typography>
                                            {head?.sortable && (
                                                <div className="relative mt-1">
                                                    <span className='absolute -top-2 right-0 hover:bg-blue-gray-100 rounded-sm'><ChevronUpIcon size={12} strokeWidth={2} onClick={() => { sortData(head.sortKey, 'asc') }} /></span>
                                                    <span className='absolute -bottom-1 right-0 hover:bg-blue-gray-100 rounded-sm'><ChevronDownIcon size={12} strokeWidth={2} onClick={() => { sortData(head.sortKey, 'desc') }} /></span>
                                                </div>
                                            )}
                                        </div>

                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {siteItems?.data.map((site, index) => (
                                <tr key={site.id} className="even:bg-blue-gray-50/50">
                                    <td className="border-l h-10">
                                        <ItemField value={site?.loc_id} name='loc_id' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.wntd} name='wntd' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.imsi} name='imsi' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.version} name='version' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.avc} name='avc' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.bw_profile} name='bw_profile' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.lon} name='lon' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.lat} name='lat' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.site_name} name='site_name' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.home_cell} name='home_cell' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.home_pci} name='home_pci' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.traffic_profile} name='traffic_profile' itemId={site?.id} />
                                    </td>
                                    <td className="border-l h-10">
                                        <DateItemField value={site?.start_date} name='start_date' itemId={site?.id} read={false} />
                                    </td>
                                    <td className="border-l h-10">
                                        <DateItemField value={site?.end_date} name='end_date' itemId={site?.id} read={false} />
                                    </td>
                                    <td className="border-l h-10">
                                        <SelectItemField
                                            value={site?.solution_type}
                                            name='solution_type'
                                            itemId={site?.id}
                                            read={false}
                                            options={[
                                                { label: 'Device Upgrade', value: 'device_upgrade' },
                                                { label: 'Reparent', value: 'reparent' },
                                                { label: 'Repan', value: 'repan' },
                                            ]}
                                        />
                                    </td>
                                    <td className="border-l h-10">
                                        <SelectItemField
                                            value={site?.status}
                                            name='status'
                                            itemId={site?.id}
                                            read={false}
                                            options={[
                                                { label: 'In Progress', value: 'in_progress' },
                                                { label: 'Not Started', value: 'not_started' },
                                                { label: 'Completed', value: 'completed' },
                                            ]}
                                        />
                                    </td>
                                    <td className="border-l h-10">
                                        <ItemField value={site?.remarks} name='remarks' itemId={site?.id} read={false} />
                                    </td>
                                    <td className="border-l h-10">
                                        <UploadItemField value={site?.artifacts} name='artifacts' itemId={site?.id} read={false} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {siteItems?.data?.length === 0 && <Typography variant="h6" color="blue-gray" className='text-center py-6' >No data found</Typography>}
                    <Pagination class="mt-6" links={siteItems.links} />
                </Card>
            </div>
        </Authenticated>
    )
}
