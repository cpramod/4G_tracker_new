import PageLayout from '@/Layouts/PageLayout';
import { Link, Head, usePage } from '@inertiajs/react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import React from 'react';

export default function HomePage({ auth }) {
    const { sites } = usePage().props
    return (
        <PageLayout>
            <Head title="Welcome" />
            <header>
                <nav>
                    {auth.user ? (
                        <>
                            <Link href={route('dashboard')} className='mr-3'>
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
                </div>
            </div>
        </PageLayout>
    );
}
