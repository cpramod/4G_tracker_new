import React, { useEffect, useRef, useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { Button, Card, IconButton, Typography } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/TextInput';
import ColumnOptions from '@/Components/Wntd/ColumnOptions/ColumnOptions';
import ExportButton from '@/Components/ExportButton';
import CSVMapping from '@/Components/Wntd/CSVMapping';
import Pagination from '@/Components/Pagination';
import SaveBtn from '@/Components/Wntd/SaveBtn';
import RestoreTable from '@/Components/RestoreTable';
import DeleteButton from '@/Components/Wntd/DeleteButton';
import AddNewRow from '@/Components/Wntd/NewRow/AddNewRow';
import EditableComponent from '@/Components/Wntd/FieldItems/Edit/EditableComponent';

export default function Index({ auth, sites, get_data, batch, additional_columns, hidden_columns, renamed_columns, deleted_columns, arrange_columns }) {
    const { role } = auth
    const wntd_header = [
        { name: 'LOCID', sortable: true, key: 'loc_id', position: 1, editable: false },
        { name: 'WNTD', sortable: true, key: 'wntd', position: 2, editable: false },
        { name: 'IMSI', sortable: true, key: 'imsi', position: 3, editable: false },
        { name: 'VERSION', sortable: true, key: 'version', position: 4, editable: false },
        { name: 'AVC', sortable: true, key: 'avc', position: 5, editable: false },
        { name: 'BW Profile', sortable: true, key: 'bw_profile', position: 6, editable: false },
        { name: 'Lon', sortable: true, key: 'lon', position: 7, editable: false },
        { name: 'Lat', sortable: true, key: 'lat', position: 8, editable: false },
        { name: 'SiteName', sortable: true, key: 'site_name', position: 9, editable: false },
        { name: 'HomeCell', sortable: true, key: 'home_cell', position: 10, editable: false },
        { name: 'HomePCI', sortable: true, key: 'home_pci', position: 11, editable: false },
        { name: 'Traffic Profile', sortable: true, key: 'traffic_profile', position: 12 },
        { name: 'Start Date', sortable: false, key: 'start_date', position: 13, editable: true, input_type: "date" },
        { name: 'End Date', sortable: false, key: 'end_date', position: 14, editable: true, input_type: "date" },
        { name: 'Solution Type', sortable: false, key: 'solution_type', position: 15, editable: true, input_type: "dropdown" },
        { name: 'Status', sortable: false, key: 'status', position: 16, editable: true, input_type: "dropdown" },
        { name: 'Remarks', sortable: false, key: 'remarks', position: 17, editable: true, input_type: "text" },
        { name: 'Artifacts', sortable: false, key: 'artifacts', position: 18, editable: true, input_type: "upload" },
    ];
    function mergeHiddenDeletedColumn(arr1, arr2) {
        if (arr1 === null || arr1 === undefined) {
            return arr2;
        }
        if (arr2 === null || arr2 === undefined) {
            return arr1;
        }
        const merged = [...new Set([...arr1, ...arr2])];
        return merged;
    }
    const hiddenColumnItems = mergeHiddenDeletedColumn(hidden_columns, deleted_columns);
    function get_table_header() {

        const updatedTableHeader = [...wntd_header];
        const updatedAdditionalTableHeader = additional_columns?.map(item => ({ ...item, editable: true }));
        const sortByPosition = (a, b) => {
            if (a.position !== undefined && b.position !== undefined) {
                return a.position - b.position;
            } else if (a.position !== undefined) {
                return -1;
            } else if (b.position !== undefined) {
                return 1;
            }
            return 0;
        };

        if (renamed_columns) {
            updatedTableHeader.forEach(column => {
                const renamedColumn = renamed_columns.find(renamed => renamed.key === column.key);
                if (renamedColumn) {
                    column.name = renamedColumn.name;
                }
            });
            updatedAdditionalTableHeader.forEach(column => {
                const renamedColumn = renamed_columns.find(renamed => renamed.key === column.key);
                if (renamedColumn) {
                    column.name = renamedColumn.name;
                }
            });
        }
        if (hiddenColumnItems) {
            updatedTableHeader.forEach(column => {
                const hiddenColumn = hiddenColumnItems.find(hidden => hidden === column.key);
                if (hiddenColumn) {
                    column.hidden = true;
                }
            });
            updatedAdditionalTableHeader.forEach(column => {
                const hiddenColumn = hiddenColumnItems.find(hidden => hidden === column.key);
                if (hiddenColumn) {
                    column.hidden = true;
                }
            });
        }
        if (arrange_columns) {
            updatedTableHeader.forEach(column => {
                const arrangedColumn = arrange_columns.find(arranged => arranged.key === column.key);
                if (arrangedColumn) {
                    column.position = arrangedColumn.position;
                }
            });
            updatedAdditionalTableHeader.forEach(column => {
                const arrangedColumn = arrange_columns.find(arranged => arranged.key === column.key);
                if (arrangedColumn) {
                    column.position = arrangedColumn.position;
                }
            });
        }
        const combinedTableHeader = [...updatedTableHeader, ...updatedAdditionalTableHeader];
        const sortedTableHeader = combinedTableHeader.sort(sortByPosition);
        return sortedTableHeader
    }
    const tableHeader = get_table_header();
    const hiddenFileInput = useRef(null);
    const [searchText, setSearchText] = useState(get_data?.search ? get_data?.search : '');
    const [perPage, setPerPage] = useState(get_data?.per_page ? get_data?.per_page : 10);
    const [siteItems] = useState(sites);
    const [mappingDialog, setMappingDialog] = useState(false)
    const [mappingData, setMappingData] = useState('')
    const [batchId, setBatchId] = useState(null)
    const [changedItems, setChangedItems] = useState([])
    const [addNewRow, setAddNewRow] = useState(false)

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChangeUpload = async (event) => {
        const form_input = new FormData();
        form_input.append('import_file', event.target.files[0]);
        try {
            const res = await axios.post(route('wireless.sites.import'), form_input);
            if (res?.data) {
                setMappingData(res?.data)
                setMappingDialog(true)
            }
        } catch (error) {
            toast.error(`${error?.response?.data?.error?.message}`);
        }
    };

    const handleSearch = async () => {
        router.get(route('wireless.sites.index', { 'search': searchText }))
    }

    const sortData = async (key, order) => {
        router.get(route('wireless.sites.index', { 'order_by': key, 'order': order }))
    };

    const onChangeFilter = async (key, value) => {
        router.get(route('wireless.sites.index', { 'filter_by': key, 'value': value }))
    }
    const handlePerPageChange = (val) => {
        setPerPage(val);
        router.get(route('wireless.sites.index', { ...get_data, 'per_page': val }))
    }
    useEffect(() => {
        if (batch?.batch_site_id) {
            setBatchId(batch?.batch_site_id)
        }
    }, [])
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                let progress = 0
                const response = await axios.get(route('import.progress', { 'batchId': batchId }))
                if (response?.data) {
                    let totalJobs = parseInt(response?.data?.total_jobs)
                    let pendingJobs = parseInt(response?.data?.pending_jobs)
                    let completedJobs = totalJobs - pendingJobs
                    let failedJobs = parseInt(response?.data?.failed_jobs)
                    if (failedJobs > 0) {
                        clearInterval(interval);
                    } else {
                        progress = parseInt((completedJobs / totalJobs) * 100).toFixed(0)
                        if (progress < 100) {
                            toast.loading(`CSV Data Import Progress: ${progress}%.\n Please wait....`, {
                                id: 'loading-toast',
                                style: {
                                    backgroundColor: '#424242',
                                    color: '#ffffff',
                                    fontSize: 14,
                                    borderRadius: 4,
                                    fontWeight: 'bold',
                                },
                            });
                        } else {
                            toast.dismiss('loading-toast');
                            clearInterval(interval);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        const interval = setInterval(() => {
            if (batchId) {
                fetchProgress()
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [batchId])

    const handleEditAbleItem = (site_id, loc_id, name, value) => {
        const index = changedItems.findIndex(item => item.site_id === site_id && item.loc_id === loc_id);
        if (index !== -1) {
            setChangedItems(prevItems => {
                const updatedItems = [...prevItems];
                updatedItems[index] = {
                    ...updatedItems[index],
                    items: {
                        ...updatedItems[index].items,
                        [name]: value
                    }
                };
                return updatedItems;
            });
        } else {
            setChangedItems(prevItems => [
                ...prevItems,
                {
                    site_id: site_id,
                    loc_id: loc_id,
                    items: {
                        [name]: value
                    }
                }
            ]);
        }
    }

    const convert_item_object_to_array = (siteItem) => {
        let newArray = []
        tableHeader.forEach(item => {
            const key = item.key;
            const value = siteItem[key];
            if (value !== undefined) {
                if (item?.position) {
                    newArray[item.position - 1] = {
                        'key': key,
                        'value': value,
                        editable: item?.editable,
                        input_type: item?.input_type ? item?.input_type : ''
                    };
                } else {
                    newArray.push({
                        'key': key,
                        'value': value,
                        editable: item?.editable,
                        input_type: item?.input_type ? item?.input_type : ''
                    });
                }
            } else {
                newArray.push({
                    'key': key,
                    'value': '',
                    editable: item?.editable,
                    input_type: item?.input_type ? item?.input_type : ''
                });
            }
        });
        return newArray
    }

    return (
        <Authenticated user={auth?.user}>
            <Head title='WNTD' />
            <div className="top-section p-4">
                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tight'>WNTD</Typography>
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('wireless.sites.index')}>WNTD</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="filter-wrapper md:px-4">
                <div className="flex filter-details justify-end gap-2">
                    <div className="search-wrapper w-1/5 flex relative">
                        <TextInput
                            placeholder="Search..."
                            className="w-full text-sm rounded-md rounded-r-none border-r-0 focus:ring-0 h-8"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div className="search-icon"><IconButton size='sm' className='rounded-l-none' onClick={handleSearch}><SearchIcon color='white' size={18} /></IconButton></div>
                    </div>
                    <div className='status-filter'>
                        <select
                            className='w-52 text-sm rounded-md focus:ring-0 h-8 border-gray-300 py-1 text-gray-600 font-medium'
                            onChange={(e) => onChangeFilter('status', e.target.value)}
                            value={get_data?.filter_by === 'status' ? get_data?.value : ''}
                        >
                            <option value="">Filter by Status</option>
                            <option value="in_progress">In Progress</option>
                            <option value="not_started">Not Started</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className='filter-solution-type'>
                        <select
                            className='w-52 text-sm rounded-md focus:ring-0 h-8 border-gray-300 py-1 text-gray-600 font-medium'
                            onChange={(e) => onChangeFilter('solution_type', e.target.value)}
                            value={get_data?.filter_by === 'solution_type' ? get_data?.value : ''}
                        >
                            <option value="">Filter by Solution Type</option>
                            <option value="device_upgrade">Device Upgrade</option>
                            <option value="reparent">Reparent</option>
                            <option value="repan">Repan</option>
                        </select>
                    </div>
                    {role === 'super-admin' && (
                        <>
                            <div className='import-type-field'>
                                <Button variant="gradient" className='capitalize' size='sm' onClick={handleClick}>Import from CSV</Button>
                                <input type="file" onChange={handleChangeUpload} ref={hiddenFileInput} style={{ display: 'none' }} />
                            </div>
                            <ColumnOptions columns={tableHeader} hidden_columns={hidden_columns} deleted_columns={deleted_columns ? deleted_columns : []} />
                            <RestoreTable type={'wntd'} />
                        </>
                    )}
                    <ExportButton route_name={'wireless.sites.export'} file_name={'WNTD_Export'} />
                </div>
            </div>

            <div className="content mt-6">
                <Card className="h-full w-full rounded-none">
                    <div className="overflow-x-auto overflow-hidden">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    {tableHeader.map((head) => (
                                        <th key={head.name} className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer ${hiddenColumnItems?.includes(head?.key) ? 'hidden' : ''}`}>
                                            <div className="flex justify-between">
                                                <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">{head.name}</Typography>
                                                {head?.sortable && (
                                                    <div className="relative mt-1">
                                                        <span className='absolute -top-2 right-0 hover:bg-blue-gray-100 rounded-sm'><ChevronUpIcon size={12} strokeWidth={2} onClick={() => { sortData(head.key, 'asc') }} /></span>
                                                        <span className='absolute -bottom-1 right-0 hover:bg-blue-gray-100 rounded-sm'><ChevronDownIcon size={12} strokeWidth={2} onClick={() => { sortData(head.key, 'desc') }} /></span>
                                                    </div>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {siteItems?.data.map((site) => {
                                    const siteArray = convert_item_object_to_array(site)
                                    return (
                                        <tr key={site.id} className="even:bg-blue-gray-50/50">
                                            {siteArray?.map((item, index) => (
                                                <React.Fragment key={index} >
                                                    <td className={`border-l h-10 text-[12px] font-medium ps-1 ${hiddenColumnItems?.includes(item?.key) ? 'hidden' : ''}`}>
                                                        {item?.key === "loc_id" ?
                                                            <Link href={route('wireless.show.location.index', item?.value)} className='font-semibold underline'>{item?.value}</Link> :
                                                            <React.Fragment>
                                                                {item?.editable ? <EditableComponent item={item} site={site} handleEditAbleItem={handleEditAbleItem} /> :
                                                                    <React.Fragment>
                                                                        {item?.key === 'imsi' ? parseFloat(item?.value) : item?.value}
                                                                    </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        }
                                                    </td>
                                                </React.Fragment>
                                            ))}
                                            <td className='border-l h-10 px-3'>
                                                <div className="flex gap-1">
                                                    <SaveBtn site_id={site?.id} changedItems={changedItems} setChangedItems={setChangedItems} />
                                                    <DeleteButton site_id={site?.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {addNewRow && <AddNewRow tableHeader={tableHeader} setAddNewRow={setAddNewRow} />}
                            </tbody>
                        </table>
                        {siteItems?.data?.length === 0 && <Typography variant="h6" color="blue-gray" className='text-center py-6' >No data found</Typography>}
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
                                <div className='text-sm font-medium'>{`${sites?.from}-${sites?.to} of ${sites?.total} Records`}</div>
                                <Pagination links={siteItems?.links} perPage={perPage} />
                            </div>
                        </div>
                    </div>
                </Card>
                <CSVMapping
                    mappingDialog={mappingDialog}
                    setMappingDialog={setMappingDialog}
                    mappingData={mappingData}
                    setBatchId={setBatchId}
                />
            </div>
        </Authenticated>
    )

}
