import PageLayout from '@/Layouts/PageLayout';
import { Link, Head, usePage } from '@inertiajs/react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import React from 'react';

export default function HomePage({ auth }) {
    const { sites } = usePage().props
    return (
        <PageLayout>
            <Head title="Welcome" />
            <div className="page-content h-[calc(100vh-180px)]">
                <div className="container mx-auto">
                    <Typography variant="h1" color="black" className='text-center tracking-tight py-16' >4G Wireless Sites</Typography>
                    <div className="grid grid-cols-3 gap-6">
                        {sites.map((site, index) => (
                            <React.Fragment key={index}>
                                <Card>
                                    <Link href={route('wireless.sites.show', site.id)}>
                                        <CardBody>
                                            <Typography variant="h5" color="blue-gray" className="mb-2">{site.name}</Typography>
                                            <Typography>{site?.location?.name}, {site?.location?.address}</Typography>
                                        </CardBody>
                                    </Link>
                                </Card>

                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
