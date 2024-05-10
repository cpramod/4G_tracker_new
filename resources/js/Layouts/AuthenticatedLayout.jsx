import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import { AlignJustifyIcon, ChevronDownIcon, DatabaseZapIcon, GaugeCircleIcon, GlobeIcon, LocateFixedIcon, Settings2Icon, SettingsIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function Authenticated({ user, header, children }) {
    const currentRoute = route().current();
    const [showSidebar, setShowSidebar] = useState(false)

    const handleHamburgerIcon = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className="admin-layout">
            <div className="header w-full py-4 bg-white border-b-2 sticky top-0 z-50">
                <div className="full flex items-center justify-between px-6">
                    <div className="left">
                        <div className='flex items-center gap-4'>
                            <div className="ham flex items-center">
                                <button onClick={handleHamburgerIcon}><AlignJustifyIcon size={24} color='gray' strokeWidth={1.5} /></button>
                            </div>
                            <Typography variant="h5" color="blue-gray" className='text-center'>
                                FWP Tracker
                            </Typography>
                        </div>
                    </div>
                    <div className="right">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button type="button" className="flex items-center gap-2 text-gray-600 font-semibold">
                                        {user.name}
                                        <ChevronDownIcon />
                                    </button>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <aside className={`fixed w-full max-w-[15rem] transition-all ease-in-out duration-300 z-50 ${showSidebar ? "left-0" : "-left-full"}`}>
                    <Card className="h-screen bg-gradient-to-tr from-gray-900 to-gray-800 rounded-none">
                        <List className='text-white'>
                            <Link href='/dashboard' className={`${currentRoute === "dashboard" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}>
                                <ListItem>
                                    <ListItemPrefix className='mr-3'><GaugeCircleIcon size={20} /></ListItemPrefix>
                                    <span className='font-semibold text-sm'>Dashboard</span>
                                </ListItem>
                            </Link>
                            <Link href={route('wireless.sites.index')} className={`${currentRoute === "wireless.sites.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}>
                                <ListItem>
                                    <ListItemPrefix className='mr-3'><GlobeIcon size={20} /></ListItemPrefix>
                                    <span className='font-semibold text-base'>WNTD</span>
                                </ListItem>
                            </Link>
                            <Link href={route('sql.import')} className={`${currentRoute === "sql.import" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}>
                                <ListItem>
                                    <ListItemPrefix className='mr-3'><DatabaseZapIcon size={20} /></ListItemPrefix>
                                    <span className='font-semibold text-sm'>SQL Import</span>
                                </ListItem>
                            </Link>
                            <Link href={route('settings.index')} className={`${currentRoute === "settings.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}>
                                <ListItem>
                                    <ListItemPrefix className='mr-3'><Settings2Icon size={20} /></ListItemPrefix>
                                    <span className='font-semibold text-sm'>Settings</span>
                                </ListItem>
                            </Link>
                        </List>
                    </Card>
                </aside>
                <main className='main-content lg:w-full lg:max-w-[calc(100%)]'>{children}</main>
            </div>
            <Toaster />
        </div>
    );
}
