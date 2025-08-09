import React, { useState,useEffect } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { IoChevronBack } from "react-icons/io5";
import { MdTipsAndUpdates } from "react-icons/md";
// import StepIndicator from './StepIndicator';
import { toast } from "react-toastify";
import { PiQueueLight } from "react-icons/pi";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import CourseSection from '../CoursePage/CourseSection';
import "react-toastify/dist/ReactToastify.css";
import { useCourseDetails } from '../../../Pages/Contexts/CourseContext';
import { IoAddCircleOutline } from "react-icons/io5";
import axios from 'axios';
import AddModal from './AddModal';
import { RxCrossCircled } from "react-icons/rx";

const CourseBuilder = () => {
   
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");
  const {courseDetails,fetchCourse} = useCourseDetails();
  const [isCollapse,setIsCollapse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [updateSectionId,setUpdateSectionId] = useState(null);
  const [updateSubSectionId,setUpdateSubSectionId] = useState({
    sectionId: "",
    subSectionId: "",
  });

  // console.log(updateSectionId);

  useEffect(() => {
    if(updateSectionId) {
      async function sectionDetails() {
        try{
          const res = await axios.post("http://localhost:3000/api/v1/course/get-section-details",{sectionId:updateSectionId});
          console.log(res);
          setFormData({
            sectionName:res?.data?.sectionDetails?.sectionName,
            courseId:courseId
          })
        }catch(err) {
          console.warn("Couldn't get section details");
        }
      };
      sectionDetails();
    }
  },[updateSectionId]);

  const [formData,setFormData] = useState({
    sectionName:"",courseId:"",
  })
  useEffect(() => {
    if(courseId) {
      fetchCourse(courseId);
    }
  },[courseId]);
  console.log(courseDetails);
  const changeHandler = (e) => {
    const {name,value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(formData);
    if(updateSectionId) {
      try{
        const res = await axios.put("http://localhost:3000/api/v1/course/update-section",{
          sectionName:formData.sectionName,
          courseId:courseId,
          sectionId:updateSectionId,
        });
        console.log(res);
        setFormData({ sectionName: "", courseId: "" });
        setUpdateSectionId(null);
        fetchCourse(courseId);
        toast.success("Section updated successfully");
      }catch(err) {
        console.warn("Error while updating the section.");
      }
    }
    else {
      try{
        const res = await axios.post("http://localhost:3000/api/v1/course/create-section",{
          sectionName:formData.sectionName,
          courseId:courseId,
        });
        console.log(res);
        setFormData({ sectionName: "", courseId: "" });
        fetchCourse(courseId);
        toast.success("Section created successfully");
      }catch(err) {
        console.warn("Error while creating a section.");
      }
    }
  } 
  return (
    <div className={`pt-10 pb-15 w-[90%] flex flex-row gap-8`}>
      {
        showModal && (
          <AddModal
            selectedSectionId={selectedSectionId}
            setSelectedSectionId={setSelectedSectionId}
            onClose={() => setShowModal(false)}
            courseId={courseId}
            updateSubSectionId={updateSubSectionId}
            setUpdateSubSectionId={setUpdateSubSectionId}
          />
        )
      }
      <div className='flex flex-col px-7 w-[65%] gap-10'>
        <div className='flex flex-col gap-1'>
          <Link to="/dashboard/my-courses/add-new-course" className='hover:text-[#FFE83D] flex flex-row gap-1 items-center text-[#838894] cursor-pointer w-fit'><IoChevronBack/> Back</Link>
          <h1 className='text-3xl w-fit '>Step II: <span className='text-[#FFE83D]'>Add Sections and Lectures</span></h1>
        </div>
        <div>
          <CourseSection 
          isCollapse={isCollapse} 
          setIsCollapse={setIsCollapse}
          setShowModal={setShowModal}
          setSelectedSectionId={setSelectedSectionId}
          courseId={courseId}
          setUpdateSectionId={setUpdateSectionId}
          setUpdateSubSectionId={setUpdateSubSectionId}
          />
        </div>
        <div className='bg-[#161D29] py-5 px-5 rounded-md border border-[#2C333F] flex flex-col gap-3'>
          <h1 className='font-semibold text-2xl'>Course Builder</h1>
          <form onSubmit={submitHandler} className='flex flex-col gap-5'> 
            <div className='relative'>
              <input 
              required
              type="text"
              placeholder={"Add a Section"}
              name="sectionName"
              id='sectionName'
              value= {formData?.sectionName}
              onChange={changeHandler}
              className='bg-[#2C333F] py-2 text-[1.2rem] w-full rounded-md pl-3.5 text-[#a1a8c1] h-[40px] border-b focus:outline-none '/> 
              {
                <div className='absolute right-4 top-3 cursor-pointer'
                onClick={() => {setFormData({
                  sectionName:"",courseId:"",
                });
                  setUpdateSectionId("");
                }}
                ><RxCrossCircled className='scale-130'/></div>
              }
            </div>
            <button className='flex flex-row w-fit items-center gap-2 text-[#FFE83D] rounded-md border border-[#FFE83D] py-1 px-2 cursor-pointer'><IoAddCircleOutline className='scale-110'/> {`${updateSectionId ? "Update Section" : "Create Section"}`}</button>
          </form> 
        </div>
      </div>
      <div className='bg-[#161D29] border rounded-md border-[#2C333F] px-7 py-7 w-[35%] flex flex-col gap-4 h-fit'>
        <h1 className='text-2xl flex flex-row items-center text-[#F1F2FF] gap-3'>
          <div className='text-[#FFE83D]'><MdTipsAndUpdates/></div>
          <div>Course Upload Tips</div>
        </h1>
        <ul className='text-[14px] text-[#F1F2FF] space-y-2 tracking-wide list-disc pl-5'>
          <li>Upload a course in three easy steps.</li>
          <li>First create a basic info about the course.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>In the second step add lectures section wise to your course.</li>
          <li>Add Topics in the Course Builder section to create lessons.</li>
          <li>In the third step you can publish or save your course in your drafts.</li>
        </ul>
      </div>
    </div>
  )
}

export default CourseBuilder