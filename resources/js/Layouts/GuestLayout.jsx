import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div className="w-full sm:max-w-md mt-6  bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
            <div className='bg-black p-10 mb-8 text-center'>
                <Link href="/" className='flex justify-center'>
                    <ApplicationLogo className="font-semibold text-5xl tracking-tight" />
                </Link>
            </div>
                {children}
            </div>
        </div>
    );
}
