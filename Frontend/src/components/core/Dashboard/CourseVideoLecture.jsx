import React from 'react'
import { useCourseDetails } from '../../../Pages/Contexts/CourseContext';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PiPlayCircleDuotone } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { RiDeleteBin6Line } from "react-icons/ri";

const CourseVideoLecture = () => {
    const [playedSeconds,setPlayedSeconds] = useState(0);
    const [duration,setDuration] = useState(0);
    const token = localStorage.getItem("token");
    const {courseDetails,fetchCourse} = useCourseDetails();
    const location = useLocation();
    const courseId = location.state?.id;
    const [openSections,setOpenSections] = useState({});
    const [videoUrl,setVideoUrl] = useState(null);

    useEffect(() => {
        if(courseId) {
            fetchCourse(courseId);
        }
    },[courseId]);
    console.log(courseDetails);

    const handleProgress = (state) => {
        setPlayedSeconds(state.playedSeconds);
    }
    const handleDuration = (dur) => {
        setDuration(dur);
    }
    const toggleSection = (index) => {
        setOpenSections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }))
    };
    // useEffect(() => {
    //     if (duration > 0 && (playedSeconds / duration) >= 0.97) {
    //         const markCompleted = async() => {
    //             try{    
    //                 const res = axios.post("http://localhost:3000/api/v1/course/course-progress",{
    //                     courseId:courseId,
    //                     subSectionId:subSectionId
    //                 });
    //                 console.log(res);
    //             }catch(err) {
    //                 console.warn("Course progress cannot be fetched.");
    //             }
    //         };
    //         markCompleted();
    //     }
    // }, [playedSeconds, duration]);

    return (
        <div className='flex flex-row gap-10'>
            <div className=' bg-[#1e293b] h-screen w-[22%] flex flex-col gap-4'>
                <div className='py-3 flex flex-col items-start px-4 gap-2'>
                    <h1 className='text-[#DBDDEA] text-2xl py-2 font-semibold'>{courseDetails?.courseName}</h1>
                    <button className={`bg-[#FFD60A] text-black font-semibold px-6 py-3 rounded-[8px] 
                    shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                    transition ease-in-out hover:shadow-[0px] `}>Add Review</button>
                </div>
                { Array.isArray(courseDetails?.courseContent) &&
                    courseDetails?.courseContent.map((ele,index) => (
                        <div key={index} className='bg-[#2C333F] flex flex-col justify-between'>
                            <div className='flex flex-row gap-3 items-center cursor-pointer border border-[#424854] py-5 px-4' onClick={() => toggleSection(index)}>
                                <p>{ele.sectionName}</p>
                                {openSections[index] ? <FaChevronUp/> : <FaChevronDown/>}   
                            </div>   
                            {   
                                openSections[index] && (    
                                    ele?.subSection.map((sub,subIndex) => (   
                                        <div key={subIndex}>
                                            <div key={subIndex} className='px-14 bg-[#1e293b] py-4 flex flex-row items-center justify-between  tracking-wide text-[#C5C7D4]'>
                                                <div onClick={() => setVideoUrl(sub?.videoUrl)} className='flex flex-row gap-4 items-center cursor-pointer'>
                                                    <SiGoogledisplayandvideo360 />
                                                    {sub.title}
                                                </div> 
                                            </div>
                                        </div>  
                                    ))       
                                )        
                            }   
                        </div>
                    ))
                }
            </div>
            <ReactPlayer
                src={videoUrl}
                config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                controls
                onProgress={handleProgress}
                onDuration={handleDuration}
                width="65%"
                height="100%"
                className=' rounded-xl border-none cursor-pointer py-3'
            />
        </div>
    )
}

export default CourseVideoLecture