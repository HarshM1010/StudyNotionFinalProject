import React, { useEffect } from 'react'
import { ProgressBar } from './AnimatedStrips';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { useUser } from '../../../Pages/Contexts/UserContext';
import { Link,useLocation,useNavigate } from 'react-router-dom';
const DisplayCourses = (props) => {

    const {userDetails,fetchUserDetails} = useUser();
    //make a controller for course progress..
    // const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // console.log(userDetails?.accountType);
    useEffect(() => {
        fetchUserDetails();
    },[])
    const accountType = userDetails?.accountType.trim();
    const location = useLocation();
    const currPath = location.pathname;
    const navigate = useNavigate();
    const handleNavigate = (courseName,courseId) => {
        if(accountType === "Student") {
            navigate(`${currPath}/${courseName.replace(/\s+/g, '-').toLowerCase()}/lectures`,{
                state:{
                    id:courseId,
                }
            });
        }
        else {
            //if the accountType is of Instructor then redirect him to stats page of the course.

        }
    }
    return (
    <div className='border-2 border-[#2C333F] rounded-b-md w-full'>
        {
            userDetails?.courses.map((ele,id) => (
                <div key={id} className={`w-full grid ${accountType === "Student" ? "grid-cols-[55%_45%]" : accountType === "Instructor" ? "grid-cols-[70%_30%]" : ""} pl-5 border-t border-[#2C333F] py-1`}>
                    <div className='flex flex-row items-start justify-start gap-6 py-4'>
                        <img src={ele?.thumbnail} alt="Course thumbnail" className='w-[100px] rounded-md cursor-pointer'/>
                        <div className='flex flex-col items-start gap-4'> 
                            <h1 
                            className='text-[#F1F2FF] font-semibold tracking-wide hover:text-[#FFE83D] cursor-pointer'
                            onClick={() => handleNavigate(ele?.courseName,ele?._id)}>{ele?.courseName}</h1>
                            <p className='text-[#838894] text-[14px] pr-10'>{ele?.courseDescription}</p>
                            {
                                accountType === "Instructor" && (
                                    <div className='bg-[#2C333F] flex flex-row items-center gap-2 w-fit rounded-2xl px-3 py-1 text-[13px] tracking-wide text-[#FFD60A]'><div className='scale-130'><CiCircleCheck/></div> Published</div>
                                )
                            }
                        </div>
                    </div>
                    {
                        accountType === "Student" && (
                            <div className='w-full grid grid-cols-[34%_66%] items-start '>
                                <div className='text-[#F1F2FF] tracking-wide w-full  h-full flex flex-row items-center'>{ele?.courseDuration.value} {ele?.courseDuration.unit}</div>
                                <div className='pr-7 w-full  h-full flex flex-row items-center'><ProgressBar value={25}/></div>
                            </div>  
                        )
                    }
                    {
                        accountType === "Instructor" && (
                            <div className='w-full grid grid-cols-[33%_34%_33%] items-start'>
                                <div className='tracking-wide w-full text-[#AFB2BF] h-full flex flex-row items-center'>{ele?.courseDuration.value} {ele?.courseDuration.unit}</div>
                                <div className='text-[#AFB2BF] h-full flex flex-row items-center'>Rs. {ele?.coursePrice}</div>
                                <div className='flex flex-row items-center gap-3 h-full'>
                                    <Link to={`${currPath}/add-new-course`} state={{ courseId:ele?._id }} className='cursor-pointer text-[#6E727F] scale-105'><MdOutlineModeEdit/></Link>
                                    <div className='cursor-pointer text-[#6E727F] scale-105'><RiDeleteBin6Line/></div>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            ))
        }  
    </div>
    )
}

export default DisplayCourses