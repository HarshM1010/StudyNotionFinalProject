import React, { useEffect } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { useState } from 'react';
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useCourseDetails } from '../../../Pages/Contexts/CourseContext';
import { useNavigate,useLocation } from 'react-router-dom'
import API_BASE_URL from '../../../config/api';

const CourseSection = ({isCollapse,setIsCollapse,setShowModal,setSelectedSectionId,courseId,setUpdateSectionId,setUpdateSubSectionId}) => {
    const token = localStorage.getItem("token");
    const {courseDetails,fetchCourse} = useCourseDetails();
    const [openSections,setOpenSections] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const currPath = location.pathname;

    const toggleSection = (index) => {
        setOpenSections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }))
    };

    useEffect(() => {
        fetchCourse(courseId);
    },[courseId]);
    async function deleteSubSecion(sectionId,subSectionId) {
        try{
            const res = await toast.promise(
                axios.post(`${API_BASE_URL}/api/v1/course/delete-subsection`,{
                    sectionId:sectionId,
                    subSectionId:subSectionId,
                }),
                {
                    pending: "Deleting lecture",
                    success: "Lecture deleted",
                    error: "Failed to delete lecture",
                }
            );
            fetchCourse(courseId);
            console.log(res);
        }catch(err) {
            console.warn("Couldn't delete subsection");
        }
    }
    async function deleteSection(sectionId) {
    
        try{
            const res = await toast.promise(
                axios.post("http://localhost:3000/api/v1/course/delete-section",{
                    sectionId:sectionId,
                    courseId:courseId,
                }),
                {
                    pending: "Deleting section",
                    success: "Section deleted",
                    error: "Failed to delete section",
                }
            );
            fetchCourse(courseId);
            console.log(res);
        }catch(err) {
            console.warn("Couldn't delete section");
        }
    }
    // we should run side-effects like state updates inside useEffect, not directly in the function body.
    useEffect(() => {
        if(isCollapse) {
            const allClosed = {};
            courseDetails?.courseContent.forEach((_,index) => {
                allClosed[index] = false;
            });
            setOpenSections(allClosed)
            setIsCollapse(false);
        }
    },[isCollapse,courseDetails?.courseContent,setIsCollapse]);

    const handleAddLecture = (sectionId) => {
        console.log(sectionId);
        setSelectedSectionId(sectionId);
        setShowModal(true);
    }

    const handleUpdateSection = (sectionId) => {
        setUpdateSectionId(sectionId);
    }
    const handleUpdateSubSection = (sectionId,subSectionId) => {
        setUpdateSubSectionId({
            sectionId:sectionId,
            subSectionId:subSectionId
        });
        setShowModal(true);
    }
    return (
        <div className=''>
            { Array.isArray(courseDetails?.courseContent) &&
                courseDetails?.courseContent.map((ele,index) => (
                    <div key={index} className='bg-[#2C333F] flex flex-col justify-between w-full'>
                        <div className='flex flex-row justify-between items-center px-6 py-5 border-2 border-[#424854] w-full ' >
                            <div className='flex flex-row gap-3 items-center cursor-pointer' onClick={() => toggleSection(index)}>
                                {openSections[index] ? <FaChevronUp/> : <FaChevronDown/>} 
                                <p>{ele.sectionName}</p>
                            </div>
                            <div className='flex flex-row items-center gap-4'>
                                {
                                    token && (
                                        <div className='flex flex-row gap-2 text-[#6E727F] scale-105'>
                                            <div className='hover:text-[#E7C009] cursor-pointer' onClick={() => handleUpdateSection(ele?._id)}><MdOutlineModeEdit/></div>
                                            <div onClick={() => deleteSection(ele?._id)} className='hover:text-[#E7C009] cursor-pointer'><RiDeleteBin6Line/></div>
                                        </div>
                                    )
                                }
                                <div className='text-[#E7C009]'>{`${ele?.subSection.length} ${ele?.subSection.length > 1 ? "Lectures" : "Lecture"}`}</div>
                            </div>
                        </div>
                        {   
                            openSections[index] && (
                                <>   {/*fragment*/}
                                    {
                                        ele?.subSection.map((sub,subIndex) => (   
                                            <div key={subIndex}>
                                                <div key={subIndex} className='px-14 bg-[#000814] border-2 border-[#424854] py-5 flex flex-row items-center justify-between  tracking-wide text-[#C5C7D4]'>
                                                    <div onClick={() => {
                                                                    if (token) navigate(`/dashboard/${ele?.sectionName.replace(/\s+/g,'-').toLowerCase()}/${sub?.title.replace(/\s+/g, '-').toLowerCase()}`,
                                                                    {
                                                                        state:{
                                                                            subSectionId:sub?._id,
                                                                        }
                                                                    });
                                                                }} 
                                                        className='flex flex-row gap-4 items-center cursor-pointer'>
                                                        <SiGoogledisplayandvideo360 />
                                                        {sub.title}
                                                    </div>     
                                                    {
                                                        token && (
                                                            <div className='flex flex-row gap-2 text-[#6E727F] scale-105'>
                                                                <div className='hover:text-[#E7C009] cursor-pointer' onClick={() => handleUpdateSubSection(ele?._id,sub?._id)}><MdOutlineModeEdit/></div>
                                                                <div onClick={() => deleteSubSecion(ele?._id,sub?._id)} className='hover:text-[#E7C009] cursor-pointer'><RiDeleteBin6Line/></div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            
                                        )) 
                                    } 
                                    {
                                        <div className="px-14 py-4 bg-[#000814] border-[#424854] border-2">
                                            <button
                                                className="text-white bg-[#1D4ED8] px-4 py-2 rounded hover:bg-[#2563EB] transition duration-150 cursor-pointer"
                                                onClick={() => handleAddLecture(ele?._id)}
                                            >
                                                + Add Lecture
                                            </button>
                                        </div>
                                    }
                                </>
                            )
                                
                        }   
                    </div>
                ))
            }
        </div>
    )
}

export default CourseSection