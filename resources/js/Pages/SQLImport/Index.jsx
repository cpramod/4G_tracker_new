import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button, Card, Typography, useSelect } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState,useMemo } from 'react'

import { AgGridReact } from "ag-grid-react";

export default function Index({ auth }) {

    const [query, setQuery] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [response, setResponse] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isImporting, setIsImporting] = useState(false)
    const [importErrorMsg, setImportErrorMsg] = useState('')
    const [importSuccessMsg, setImportSuccessMsg] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(route('sql.run'), { sql_query: query })
            setResponse(res?.data?.data)
            setErrorMsg('')
        } catch (err) {
            setErrorMsg(err?.response?.data?.error.message)
            setResponse([])
        }
        finally {
            setIsLoading(false)
        }
    }
    const handleImportBtn = async () => {
        if (response?.length > 0) {
            try {
                setIsImporting(true)
                const res = await axios.post(route('sql.store'), { data: response })
                setImportSuccessMsg(res?.data?.success.message)
            } catch (err) {
                setImportErrorMsg(err?.response?.data?.error.message)
            }
            finally {
                setIsImporting(false)
            }
        }
    }  
    const defaultColDef = useMemo(() => ({
    
        filter: true,
      }));

    const ShowResponse = ({ data }) => {
    
            console.log(data);
        if (data?.length >0) {
            const allKeys = Array.from(new Set(data.flatMap(item => Object.keys(item))));
               const changedData= allKeys.map((itm,index)=>{
             
                return {field:itm,headerName:itm}
                    // if(data[index] && itm && data[index]){
                    //     console.log(itm);
                    //     
                    // }
                })
               
               
            return (
                <div className='mt-8'>
                    {/* <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {allKeys?.map((head) => (
                                    <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer">
                                        <Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">{head}</Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => {
                                return (
                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                        {Object.keys(item).map(key => (
                                            <td key={key} className='border-l h-10 text-[12px] font-medium ps-2'>{item[key]}</td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table> */}
                          <div
                    className="ag-theme-quartz w-full" // applying the Data Grid theme
                    style={{ height: data.length>5?500:200 }} // the Data Grid will fill the size of the parent container
                  >
                    <AgGridReact
                    //   ref={gridRef}
                      rowData={data}
                      columnDefs={changedData}
                      defaultColDef={defaultColDef}
               
                    />
                  </div>
                    <div className='flex justify-between mt-6'>
                        <div className="">
                            <InputError message={importErrorMsg} className='mt-0 font-medium text-red-500' />
                            {importSuccessMsg && (
                                <Typography className='font-medium text-green-500'>
                                    {importSuccessMsg}
                                    <Link href={route('wireless.sites.index')} className='ps-1 underline'>Click here to check</Link>
                                </Typography>
                            )}
                        </div>
                        <Button
                            variant='gradient'
                            size='sm'
                            className='capitalize'
                            onClick={handleImportBtn}
                            disabled={isImporting}
                        >
                            Import Data
                        </Button>
                    </div>
                </div>
            )
        }
    }


    return (
        <Authenticated user={auth?.user}>
            <Head title='Wireless Sites' />
            <div className="top-section p-4">
            <div className="bg-white shadow rounded py-3 px-5 flex justify-between items-center">

                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tight'>SQL Import</Typography>
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('sql.import')}>SQL Import</Link></li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            <div className="filter-wrapper px-4">
                <Card className="mt-6 w-full px-6 py-4">
                    <InputLabel value={'SQl Code'} className='mb-2' />
                    <textarea
                        className='border rounded-md border-gray-300 text-base font-medium focus:ring-0'
                        rows={3}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <div className='flex justify-between'>
                        <div>
                            <InputError message={errorMsg} className="mt-0 font-medium text-red-500" />
                        </div>
                        <Button
                            className="mt-4 block capitalize"
                            onClick={onSubmit}
                            disabled={isLoading}
                        >
                            Run
                        </Button>
                    </div>
                </Card>
                <ShowResponse data={response} />
            </div>
        </Authenticated>
    )
}
