import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { Button, Card, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import {  AlignLeftIcon, BarChart3Icon, BellIcon, MoonIcon, SearchIcon, SettingsIcon, UploadIcon, XIcon ,AlignJustifyIcon, ChevronDownIcon, DatabaseZapIcon, FileCog2Icon, FileCogIcon, GaugeCircleIcon, GitCommitVerticalIcon, GlobeIcon, LocateFixedIcon, NfcIcon, Settings2Icon, User2Icon, UserRoundCogIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { setOpenCloseMenu } from '@/Store/Reducers/MenuSlice';
import { useDispatch,useSelector } from 'react-redux';
import ApplicationLogo from '@/Components/ApplicationLogo';
export default function Authenticated({ user, children }) {
    const dispatch=useDispatch();
    const { minimizedSidebar } = useSelector((state) => state.menu)
    const { role } = usePage().props?.auth
    const { entities } = usePage().props
    const currentRoute = route().current();


    const handleHamburgerIcon = () => {
        dispatch(setOpenCloseMenu());
    }

 
    return (
        <div className="bg-[#f7f9fb] min-h-screen">
        <div className="main-layout">
            <div className="layout-wrapper flex flex-wrap">
                <div className={`sidebar h-screen bg-gray-900 w-full shadow-sm rounded-none overflow-hidden ${minimizedSidebar ? "w-max sm:w-full sm:left-[-100px] sm:max-w-[64px]" : "w-max sm:w-full -left-full sm:max-w-[250px]"} transition-all ease-in-out duration-300 fixed sm:left-0 z-50`}>
                    <div className="close sm:hidden rounded-full block w-max top-2 right-2 absolute p-1 " onClick={()=>{}}>
                        <XIcon size={22} color="white" />
                    </div>
                    <div className="logo-wrapper p-3 px-8 my-2">
                    <Link href='/dashboard' className='flex items-center'>
                    <ApplicationLogo className="w-40" />
                        {/* <h2 className='text-white font-bold text-xl'>FWP Tracker</h2> */}
                    </Link>
                    </div>
                    <div className="side-menu px-3">
                        <List className={`p-0 rounded-none ${currentRoute === "dashboard" ? " border-l-4 border-green-700  bg-gray-700/90" : ""}`}>
                        <Link href='/dashboard' className={``}>
                                <ListItem className={`py-3 rounded-none text-white `}>
                                <ListItemPrefix className='mr-3'><GaugeCircleIcon size={20} /></ListItemPrefix>
                                    <span className='font-semibold text-sm'>Dashboard</span>
                                </ListItem>
                            </Link>
                        </List>
                        <List className={`p-0 ${currentRoute === "wireless.sites.index" ?  " border-l-4 border-green-700  bg-gray-700/90" : ""}`} data-voyager="report-menu">
                        <Link href={route('wireless.sites.index')} >
                                <ListItem className={`py-3 rounded-none  text-white`}>
                                <ListItemPrefix className='mr-3'><GlobeIcon size={20} /></ListItemPrefix>
                                    <span className='font-semibold text-base'>WNTD</span>
                                </ListItem>
                            </Link>
                        </List>
                        <List className={`p-0 ${currentRoute === "site.field.name.index" ?  " border-l-4 border-green-700  bg-gray-700/90" : ""}`}>
                        <Link href={route('site.field.name.index')} className=''>
                                <ListItem className={`py-3 rounded-none text-white `}>
                                <ListItemPrefix className='mr-3'><NfcIcon size={20} /></ListItemPrefix>
                                    <span className='font-semibold text-base'>FW Site</span>
                                </ListItem>
                            </Link>
                        </List>
                    
                        {entities?.length > 0 && entities?.map((item, index) => (
                                <List className={`p-0 ${currentRoute === "view.table.item" ? "border-l-4 border-green-700  bg-gray-700/90" : ""}`} key={index}>
                                    <Link href={route('view.table.item', item?.slug)}>
                                    <ListItem className={`py-3 rounded-none text-white`}>

                                            <ListItemPrefix className='mr-3'><GitCommitVerticalIcon size={20} /></ListItemPrefix>
                                            <span className='font-semibold text-sm'>{item?.title}</span>
                                        </ListItem>
                                    </Link>
                                </List>
                            ))}
                                  {role === 'super-admin' && (
                                <>
                                       <List  className={`p-0 ${currentRoute === "sql.import" ?  " border-l-4 border-green-700  bg-gray-700/90" : ""}`}>
                                    <Link href={route('settings.index')} >
                                    <ListItem className={`py-3 rounded-none text-white`}>
                                            <ListItemPrefix className='mr-3'><DatabaseZapIcon size={20} /></ListItemPrefix>
                                            <span className='font-semibold text-sm'>SQL Import</span>
                                        </ListItem>
                                    </Link>
                                    </List>
                                    <List className={`p-0 ${currentRoute === "mo.file.generator" ?  " border-l-4 border-green-700  bg-gray-700/90" : ""}`}>
                                    <Link href={route('mo.file.generator')} >
                                    <ListItem className={`py-3 rounded-none text-white`}>

                                            <ListItemPrefix className='mr-3'><FileCog2Icon size={20} /></ListItemPrefix>
                                            <span className='font-semibold text-sm'>MO File Generator</span>
                                        </ListItem>
                                    </Link>
                                    </List>
                                    <List className={`p-0 ${currentRoute === "roles.index" ?  " border-l-4 border-green-700  bg-gray-700/90" : ""}`}>
                                    <Link href={route('roles.index')} >
                                    <ListItem className={`py-3 rounded-none text-white`}>

                                            <ListItemPrefix className='mr-3'><UserRoundCogIcon size={20} /></ListItemPrefix>
                                            <span className='font-semibold text-sm'>Roles Management</span>
                                        </ListItem>
                                    </Link>
                                    </List>
                                    <List className={`p-0 ${currentRoute === "settings.index" ?  " border-l-4 border-green-700  bg-gray-700/90" : ""}`}>
                                    {/* <Link href={route('settings.index')}>
                                    <ListItem className={`py-3 rounded-none  text-white`}>
                                            <ListItemPrefix className='mr-3'><Settings2Icon size={20} /></ListItemPrefix>
                                            <span className='font-semibold text-sm'>Settings</span>
                                        </ListItem>
                                    </Link> */}
                                    </List>
                                </>
                            )}
                    </div>  
                </div>
                <div className={`main-content w-full ${minimizedSidebar ? "w-full  " : "sm:max-w-[calc(100%-250px)] sm:ms-[250px]"} transition-all ease-in-out duration-300`}>
                    <header className='bg-white p-3 shadow border-b sticky top-0 z-50'>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="toggle-menu cursor-pointer">
                                    <AlignLeftIcon onClick={handleHamburgerIcon} size={28} strokeWidth={1.5} color='rgba(61, 67, 74, 0.9)' />
                                </div>
                           
                            </div>
                            <div className="right-item flex items-center justify-center gap-4 ">
                        
                                <div className="user-item font-normal">
                                <div className="flex items-center gap-4">
                            {currentRoute !== 'table.wizard.index' && (
                                <Link href={route('table.wizard.index')}>
                                    <Button variant='gradient' size='sm' className='capitalize rounded text-sm'>
                                        Create Table
                                    </Button>
                                </Link>
                            )}
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className='flex items-center gap-2'>
                                                <div className="border rounded-full w-10 h-10 bg-[#F4F7F9] flex items-center justify-center">
                                                    <User2Icon color='rgba(61, 67, 74, 0.9)' size={18} strokeWidth={1.5} />
                                                </div>
                                                <button type="button" className="text-xs sm:text-base flex items-center gap-2 text-gray-600 font-semibold">{user?.name}<ChevronDownIcon /></button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link onClick={()=>{localStorage.removeItem('minimized')}} href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        <Toaster position='top-right' />
    </div>
    );
}
