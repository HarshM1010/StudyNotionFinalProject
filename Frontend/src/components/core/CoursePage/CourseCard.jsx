import React from 'react'
import { useState,useEffect } from 'react'
import CoursePlates from './CoursePlates';

const CourseCard = ({filter,heading,content}) => {
  const [filterType,setFilterType] = useState("New Courses");
  // console.log(content[0].newCourses);
  // if(filter)
  // console.log(content[1].popularCourses);
  return (
    <div className='w-full flex flex-col gap-15'>
      <div className='w-[82%] pt-10 mx-auto flex flex-col items-start gap-6'>
        <h1 className='text-4xl font-bold'>{heading}</h1>
        {
          filter ? (
            <div className='w-full flex flex-col gap-8'>
              <div className='border-b border-[#424854] flex flex-row w-full gap-8'>
                <div className={`${filterType === "New Courses" ? "text-[#FFE83D] border-b" : "text-[#C5C7D4]"} cursor-pointer transition-all duration-75 ease-in-out`} onClick={() => setFilterType("New Courses")}>New Courses</div>
                <div className={`${filterType === "Most Popular" ? "text-[#FFE83D] border-b" : "text-[#C5C7D4]"} cursor-pointer transition-all duration-75 ease-in-out`} onClick={() => setFilterType("Most Popular")}>Most Popular</div>
              </div>
              {
                filterType === "New Courses" ? (<CoursePlates content={content[0].newCourses}/>) : (<CoursePlates content={content[1].popularCourses}/>)
              }
            </div>
            
          ) 
          :
          (
            <CoursePlates content={content[0].trendingCourses}/>
          )
        }
      </div>
    </div>
  )
}

export default CourseCard