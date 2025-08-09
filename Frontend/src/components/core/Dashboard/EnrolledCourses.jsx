import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DisplayCourses from './DisplayCourses';
import { useUser } from '../../../Pages/Contexts/UserContext';

const EnrolledCourses = () => {
  const [isChecked,setIsChecked] = useState("All");
  const {userDetails} = useUser();
  const accountType = userDetails?.accountType.trim();
  // console.log(accountType)
  return (
    <div className='flex flex-col pl-7 pt-10 gap-10 pb-15'>
      <div className='flex flex-col gap-1 w-fit'>
        <div className='flex flex-row gap-1 text-[17px] w-fit'>
          <Link to={"/"} className='hover:text-[#FFE83D] text-[#838894]'>Home</Link>
          <p className='text-[#838894]'>/</p>
          <p className='text-[#838894]'>Dashboard</p>
          <p className='text-[#838894]'>/</p>
          <p className='text-[#FFE83D] cursor-pointer'>Enrolled Courses</p>
        </div>
        <h1 className='text-3xl w-fit'>Enrolled Courses</h1>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-[#161D29] rounded-4xl h-12 w-fit flex items-center border-b border-[#404650]'>
            <button type='button' onClick={() => setIsChecked("All")} className={`px-4 py-1.5 rounded-4xl mr-auto ml-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer ${isChecked === "All" && "bg-[#000814] text-white"}`}>All</button>
            <button type='button' onClick={() => setIsChecked("Pending")} className={`px-4 py-1.5 rounded-4xl ml-auto mr-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer ${isChecked === "Pending" && "bg-[#000814] text-white"}`}>Pending</button>
            <button type='button' onClick={() => setIsChecked("Completed")} className={`px-4 py-1.5 rounded-4xl ml-auto mr-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer ${isChecked === "Completed" && "bg-[#000814] text-white"}`}>Completed</button>
        </div>
        <div className='w-[90%] rounded-md border-[#2C333F]'>
          <div className={`mt-0 bg-[#2C333F] grid grid-cols-[55%_15%_30%] py-4 rounded-t-md pl-5`}>
            <p className='text-[#C5C7D4] tracking-wide'>Course Name</p>
            <p className='text-[#C5C7D4] tracking-wide'>Duration</p>
            <p className='text-[#C5C7D4] tracking-wide'>Progress</p>
          </div>
          <DisplayCourses isChecked={isChecked}/>
        </div>
      </div>
    </div>
  )
}

export default EnrolledCourses