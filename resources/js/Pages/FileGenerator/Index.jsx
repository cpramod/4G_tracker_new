import React, { useRef } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Button, Typography } from '@material-tailwind/react'
import toast from 'react-hot-toast';

export default function Index({ auth }) {

    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };


    const handleChangeUpload = async (event) => {
        const form_input = new FormData();
        form_input.append('import_file', event.target.files[0]);
        try {
            const res = await axios.post(route('mo.file.generator.upload'), form_input);
            if (res?.data?.output?.filePaths) {
                res?.data.output.filePaths.map(filePath => {
                    const link = document.createElement('a');
                    link.href = filePath;
                    link.download = '';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            } else if (res?.data?.output?.error) {
                toast.error(`${res?.data?.output?.error}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Authenticated user={auth?.user}>
            <Head title='MO File Generator' />
            <div className="top-section p-4">
                <div className='flex items-center justify-between'>
                    <div className="">
                        <Typography variant={'h3'} className='tracking-tight'>MO File Generator</Typography>
                        <ul className='flex gap-1 text-gray-600 text-sm'>
                            <li><Link href={route('dashboard')}>Dashboard</Link></li>
                            <li>/</li>
                            <li><Link href={route('mo.file.generator')}>MO File Generator</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="content mt-6">
                <div className="mx-6">
                    <Button variant="gradient" className='capitalize' size='sm' onClick={handleClick}>Upload xlsx file</Button>
                    <input type="file" onChange={handleChangeUpload} ref={hiddenFileInput} style={{ display: 'none' }} />
                </div>
            </div>
        </Authenticated>
    )
}
