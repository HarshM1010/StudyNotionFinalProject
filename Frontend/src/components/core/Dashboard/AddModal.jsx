import React, { useState,useRef } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoIosCloudUpload } from "react-icons/io";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCourseDetails } from '../../../Pages/Contexts/CourseContext';
import { useEffect } from 'react';
import API_BASE_URL from '../../../config/api';

const AddModal = ({selectedSectionId,setSelectedSectionId,onClose,courseId,updateSubSectionId,setUpdateSubSectionId}) => {
    const fileInputRef = useRef(null);
    const {fetchCourse} = useCourseDetails();

    const [formData,setFormData] = useState({
      title:"",description:"",videoFile:""
    })
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    const changeHandler = (e) => {
      const {name,value,files} = e.target;
      if(name === "videoFile") {
        setFormData((prevData) => ({
          ...prevData,
          videoFile:files[0],
        }))
      }
      else {
        setFormData((prevData) => ({
          ...prevData,
          [name]:value,
        }))
      }  
    }
    useEffect(() => {
      const getSubSectionDetails = async() => {
        // console.log(updateSubSectionId.sectionId);
        // console.log(updateSubSectionId.subSectionId);
        try{
          const res = await axios.post(`${API_BASE_URL}/api/v1/course/get-sub-section-details`,{subSectionId:updateSubSectionId.subSectionId});
          console.log(res);
          setFormData({
            title: res?.data?.subSectionDetails?.title || "",
            description: res?.data?.subSectionDetails?.description || "",
            videoFile: res?.data?.videoUrl || "",
          })
        }catch(err) {
          console.log("Failed to fetch subsection details.");
          toast.error("Please try again after a while");
        }
      };
      if(updateSubSectionId.sectionId  && updateSubSectionId.subSectionId) {
        getSubSectionDetails();
      }
    },[updateSubSectionId.subSectionId,updateSubSectionId.sectionId]);

    const resetFormData = () => {
      setFormData({
        title:"",description:"",videoFile:""
      })
    }

    const submitHandler = async(e) => {
      e.preventDefault();
      console.log(formData);
      try{
        const data = new FormData();
        data.append("sectionId",selectedSectionId);
        data.append("title",formData?.title);
        data.append("description",formData?.description);

        //Append subSectionId only for update
        if(updateSubSectionId.subSectionId) {
          data.append("subSectionId",updateSubSectionId.subSectionId);
        }

        if(formData?.videoFile && formData?.videoFile.size > 20 * 1024 * 1024) {
          toast.error("File size is too large");
          return;
        }
        if(formData?.videoFile) {
          data.append("videoFile",formData?.videoFile);
        }

        let res;
        if(updateSubSectionId.subSectionId) {
          res = await toast.promise(
            axios.put(`${API_BASE_URL}/api/v1/course/update-subsection`,
              data,
              {
                headers:{
                  "Content-Type":"multipart/form-data",
                },
              }
            ),
            {
              pending: "Updating Lecture details...",
              success: "Lecture details updated",
              error: "Failed to update lecture details",
            }
          );
          onClose();
          setUpdateSubSectionId({
            sectionId:"",subSectionId:""
          })
        }
        else {
          res = await toast.promise(
            axios.post(`${API_BASE_URL}/api/v1/course/create-subsection`,
              data,
              {
                headers:{
                  "Content-Type":"multipart/form-data",
                },
              }
            ),
            {
              pending: "Uploading Lecture...",
              success: "Lecture uploaded successfully",
              error: "Failed to upload lecture",
            }
          );
        }
        
        console.log(res);
        fetchCourse(courseId);
        setSelectedSectionId(null);
        setFormData({
          title:"",description:"",videoFile:"",
        });
      }catch(err) {
        console.warn("Unable to upload video.",err);
      }
    }
    const handleBrowseClick = () => {
      if (!formData.videoFile && fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const handleClose = () => {
      resetFormData();    
      onClose();          
    };
    return (
      <div className='fixed z-50 flex flex-row w-[85%] h-[100%] justify-center' onClick={handleClose}>
              <div className='w-[40%] rounded-xl h-fit bg-[#151b25] shadow-[#272e3931] text-white shadow-[0px_0px_10px_7px]' onClick={stopPropagation}>
                <div className='w-full bg-[#2C333F] rounded-t-xl py-3 px-7 flex flex-row items-center justify-between'>
                  <div className='tracking-wide'>Upload a Lecture</div>
                  <div className='cursor-pointer' onClick={handleClose}><RxCross2 className='scale-130'/></div>
                </div>
                  <form onSubmit={submitHandler} className='px-7 py-6 flex flex-col gap-5'>
                    <div className='flex flex-col relative'>
                      <label htmlFor="videoFile" className='text-[1rem] text-[#C5C7D4]'>Lecture Video<span className='text-red-400'>*</span> <span>{`${updateSubSectionId.sectionId ? "(upload a video if you want to change the existing one)" : ""}`}</span></label>
                      <div onClick={handleBrowseClick} className='absolute top-25 left-35 flex flex-col items-center text-[#999DAA] cursor-pointer'>
                        <div className='text-[#FFD60A]'><IoIosCloudUpload/></div>
                        <p><span className='text-[#FFD60A]'>Browse</span> an Video</p>
                        <p>Max file size upto 20MB</p>
                      </div>
                      <input
                      type="file"
                      required={!updateSubSectionId.sectionId}
                      ref={fileInputRef}
                      name="videoFile"
                      id='videoFile'
                      onChange={changeHandler}
                      className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[150px] border border-dashed cursor-pointer'/>
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor="title" className='text-[1rem] text-[#C5C7D4]'>Lecture Title<span className='text-red-400'>*</span></label>
                      <input 
                      required
                      type="text"
                      placeholder={"Enter Lecture Title"}
                      name="title"
                      id='title'
                      value= {formData?.title}
                      onChange={changeHandler}
                      className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[40px] border-b focus:outline-none '/>
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor="description" className='text-[1rem] text-[#C5C7D4]'>Lecture Description<span className='text-red-400'>*</span> </label>
                      <textarea 
                      required
                      rows='3'
                      placeholder={"Enter Lecture Description"}
                      name="description"
                      id='description'
                      value= {formData?.description}
                      onChange={changeHandler}
                        onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none'/>
                    </div>
                    <div className='flex flex-row items-center justify-end gap-5'>
                      <button className={`bg-[#1a253b76] text-white px-5 py-1 rounded-[8px] 
                      shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                      transition ease-in-out hover:shadow-[0px]`}
                      onClick={handleClose}>
                        Cancel
                      </button>
                      <button className={`bg-[#FFD60A] text-black  font-semibold px-5 py-1 rounded-[8px] 
                      shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                      transition ease-in-out hover:shadow-[0px]`}
                      >
                        {`${updateSubSectionId.sectionId ? "Update" : "Save"}`}
                      </button>
                    </div>
                  </form>
              </div>
          </div>  
    )
}

export default AddModal