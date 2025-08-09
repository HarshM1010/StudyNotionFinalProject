import React from 'react'
import SideBar from './core/Dashboard/SideBar'
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className={`flex flex-row w-full gap-0`}>
            <div className='w-[17%] h-screen'><SideBar/></div>
            <div className='w-[83%]'><Outlet/></div>
        </div>
    )
}

export default DashboardLayout