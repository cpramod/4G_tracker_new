import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react'
import { Button, Chip, Dialog, DialogBody, DialogHeader, IconButton, Typography } from '@material-tailwind/react';
import { XIcon } from 'lucide-react';
import React from 'react'
import { useDropzone } from 'react-dropzone';
import { formatDistanceToNow } from 'date-fns';
import CommentItem from '@/Components/Comments/CommentItem';
import AddComment from '@/Components/Comments/AddComment';
import PageLayout from '@/Layouts/PageLayout';

export default function Show() {
    const { site, issues } = usePage().props
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        title: '',
        description: '',
        attachments: '',
        site_id: site?.id,
        status: 'open'
    });

    const handleOpen = () => setOpen(!open);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: acceptedFiles => {
            setData('attachments', [
                ...data?.attachments,
                ...acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            ]);
        }
    });
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const formSubmit = (e) => {
        e.preventDefault();
        post(route('issues.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false)
            }
        })
    }

    return (
        <PageLayout>
            <Head title="Site" />
            <div className="page-content">
                <div className="container mx-auto py-12">
                    <div className="flex justify-between items-center mb-12">
                        <div className="left relative">
                            <Chip value={site?.status} color={site?.status === 'active' ? 'green' : 'red'} className='w-max' />
                            <Typography variant='h1' color="blue-gray" className='font-bold' >{site.name}</Typography>
                            <Typography className='font-normal text-gray-500 text-lg'>{`${site?.location.name}, ${site?.location?.address}`}</Typography>
                        </div>
                        <div className="right">
                            <Button onClick={handleOpen} variant="gradient">Add Issue</Button>
                        </div>
                    </div>
                    <div className='py-6'>
                        {issues.length > 0 && issues.map((issue, index) => {
                            return (
                                <React.Fragment key={issue.id}>
                                    <div className='issue-wrapper border mb-4 py-3 px-6 rounded-md'>
                                        <div className="issue-content">
                                            <div className="flex justify-between items-center">
                                                <div className='flex items-center gap-6'>
                                                    <Typography variant='h4' className='font-bold tracking-tight'>{issue?.title}</Typography>
                                                    <Chip size='sm' value={issue?.status} color={issue?.status === 'open' ? 'green' : 'red'} className='w-max' />
                                                </div>
                                                <Typography className='font-normal text-sm text-gray-600'> {issue?.user.name} | {formatDistanceToNow(new Date(issue?.created_at), { addSuffix: true })}</Typography>
                                            </div>
                                            <Typography className='font-normal pt-2 text-sm' color="blue-gray">{issue?.description}</Typography>
                                            {issue?.attachments && (
                                                <div className='mt-3 bg-gray-100 w-max rounded-md'>
                                                    <img src={issue?.attachments} className='w-24 h-24 object-cover rounded-md' />
                                                </div>
                                            )}
                                            {issue?.comments.length > 0 && (
                                                <div className="comments-wrapper mt-6 border rounded py-3">
                                                    <Typography variant='h5' className='tracking-tight mb-3 px-4'>Comments</Typography>
                                                    {issue?.comments.map((comment, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <CommentItem comment={comment} />
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                            {issue?.status === 'open' && <AddComment issueId={issue?.id} />}
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Dialog open={open} handler={handleOpen} size='xs'>
                <DialogHeader className="justify-between">
                    <Typography variant="h3" className='tracking-tighter'>Add Issue</Typography>
                    <IconButton size="sm" variant="text" onClick={handleOpen}><XIcon /></IconButton>
                </DialogHeader>
                <DialogBody>
                    <form>
                        <div className="form-item mb-4">
                            <InputLabel value="Title" className='mb-2' />
                            <TextInput
                                className="w-full font-normal text-gray-700"
                                placeholder="Title..."
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            <InputError message={errors.title} className='mt-2' />
                        </div>
                        <div className="form-item mb-4">
                            <InputLabel value="Description" className='mb-2' />
                            <textarea
                                className="w-full font-normal text-gray-700 border-gray-300 rounded-md shadow-sm"
                                placeholder="Description..."
                                rows={6}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className='mt-2' />
                        </div>
                        <div className="form-item mb-4">
                            <InputLabel value="Image" className='mb-2' />
                            <div>
                                <div {...getRootProps({ className: 'dropzone' })} className='border-2 border-gray-300 border-dashed rounded-md text-center py-16'>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>

                                {acceptedFiles.length > 0 && (
                                    <aside className='mt-2'>
                                        <h4>Files</h4>
                                        <ul className='text-sm text-black font-normal font-poppins'>{files}</ul>
                                    </aside>
                                )}
                            </div>
                            <InputError message={errors.attachments} className='mt-2' />
                        </div>

                        <div className="form-item mb-4">
                            <div className="text-right">
                                <Button
                                    variant="gradient"
                                    color="green"
                                    loading={processing}
                                    onClick={formSubmit}
                                >
                                    <span>Submit</span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </PageLayout>
    )
}
