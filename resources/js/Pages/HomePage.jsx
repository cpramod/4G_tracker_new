import { Link, Head, usePage } from '@inertiajs/react';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Typography } from '@material-tailwind/react';
import React from 'react';

export default function HomePage({ auth }) {
    const { sites } = usePage().props
    return (
        <>
            <Head title="Welcome" />
            <header className='hidden'>
                <nav>
                    {auth.user ? (
                        <>
                            <Link href={route('dashboard')}>
                                Dashboard
                            </Link>
                            <Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={route('login')}>
                                Log in
                            </Link>
                            <Link href={route('register')}>
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
            <div className="page-content">
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
        </>
    );
}
