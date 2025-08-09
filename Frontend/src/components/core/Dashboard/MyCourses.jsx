import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import DisplayCourses from './DisplayCourses';
import { useLocation } from 'react-router-dom';


const MyCourses = () => {
    const location = useLocation();
    const currPath = location.pathname;

    return (
        <div className='flex flex-col pl-7 pt-10 gap-10 pb-15 w-[85%]'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col gap-1 w-fit'>
                    <div className='flex flex-row gap-1 text-[17px] w-fit'>
                    <Link to={"/"} className='hover:text-[#FFE83D] text-[#838894]'>Home</Link>
                    <p className='text-[#838894]'>/</p>
                    <p className='text-[#838894]'>Dashboard</p>
                    <p className='text-[#838894]'>/</p>
                    <p className='text-[#FFE83D] cursor-pointer'>My Courses</p>
                    </div>
                    <h1 className='text-3xl w-fit'>My Courses</h1>
                </div>
                <Link to={`${currPath}/add-new-course`} className={`bg-[#FFD60A] text-black  font-semibold px-4 py-2 rounded-[8px] 
                shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                transition ease-in-out hover:shadow-[0px] flex flex-row items-center gap-2`}><IoIosAddCircleOutline/> New</Link>
            </div>
            <div className='flex flex-col gap-7'>
                <div className='w-full rounded-md border-[#2C333F]'>
                    <div className='mt-0 bg-[#2C333F] grid grid-cols-[70%_10%_10%_10%] py-4 rounded-t-md pl-5'>
                        <p className='text-[#C5C7D4] tracking-wide'>Course Name</p>
                        <p className='text-[#C5C7D4] tracking-wide'>Duration</p>
                        <p className='text-[#C5C7D4] tracking-wide'>Price</p>
                        <p className='text-[#C5C7D4] tracking-wide'>Actions</p>
                    </div>
                    <DisplayCourses/>
                </div>
            </div>
        </div>
    )
}

export default MyCourses