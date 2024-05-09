import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button, Card, Typography, useSelect } from '@material-tailwind/react'
import axios from 'axios'
import React, { useState } from 'react'

export default function Index({ auth }) {

    const [query, setQuery] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(route('sql.run'), { sql_query: query });
            const { data } = res?.response
            console.log(data);

        } catch (err) {
            setErrorMsg(err?.response?.data?.error?.message)
        }
        finally {
            setIsLoading(false)
        }


    }


    return (
        <Authenticated user={auth?.user}>
            <Head title='Wireless Sites' />
            <div className="top-section p-4">
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
            <div className="filter-wrapper px-4">
                <Card className="mt-6 w-full px-6 py-4">
                    <InputLabel value={'SQl Code'} className='mb-2' />
                    <textarea
                        className='border rounded-md border-gray-300 text-base font-medium focus:ring-0'
                        rows={4}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <InputError message={errorMsg} className="mt-2" />
                    <div className='flex justify-end'>
                        <Button
                            className="mt-4 block capitalize"
                            onClick={onSubmit}
                            disabled={isLoading}
                        >
                            Run
                        </Button>
                    </div>
                </Card>
            </div>
        </Authenticated>
    )
}
