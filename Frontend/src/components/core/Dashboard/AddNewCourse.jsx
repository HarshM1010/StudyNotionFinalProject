import React, { useEffect,useRef } from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { IoChevronBack } from "react-icons/io5";
import { MdTipsAndUpdates } from "react-icons/md";
// import StepIndicator from './StepIndicator';
import { useState } from 'react';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { IoIosCloudUpload } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCourseDetails } from '../../../Pages/Contexts/CourseContext';

const AddNewCourse = () => {
  // const [currentStep, setCurrentStep] = useState(1);
  const [categories,setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const duraUnit = ["days", "weeks", "months", "years"];
  const navigate = useNavigate();
  const location = useLocation();
  const currPath = location.pathname;
  const courseId = location.state?.courseId;
  const {courseDetails,fetchCourse} = useCourseDetails();

  // console.log(courseId);

  

  console.log(courseDetails);
  const [formData,setFormData] = useState({
    courseName:"",
    courseDescription:"",
    category:"",
    coursePrice:"",
    tags:"",
    thumbnailImage:null,
    languageUsed:"",
    durationNumber:"",
    durationUnit:"",
    prerequisites:"",
    whatYouWillLearn:"",
    existingCourseId:"",
  })

  useEffect(() => {
    if(courseDetails) {
      setFormData({
        courseName:courseDetails?.courseName || "",
        courseDescription:courseDetails?.courseDescription || "",
        category:courseDetails?.category?._id || "", 
        coursePrice: courseDetails?.coursePrice || "",
        tags: courseDetails?.tags?.join(" ") || "",
        languageUsed: courseDetails?.languageUsed || "",
        durationNumber:courseDetails?.courseDuration?.value || "",
        durationUnit: courseDetails?.courseDuration?.unit || "",
        prerequisites: courseDetails?.prerequisites?.join(" ") || "",
        whatYouWillLearn: courseDetails?.whatYouWillLearn?.join(" ") || "",
        existingCourseId: courseDetails?._id || "",
      });
      if(courseDetails?.thumbnail) {
        setPreviewImage(courseDetails?.thumbnail);
      } 
    }
  },[courseDetails]);

  useEffect(() => {
    if(courseId) {
      fetchCourse(courseId);
    }
    else {
      setFormData({
        courseName: "",
        courseDescription: "",
        category: "",
        coursePrice: "",
        tags: "",
        thumbnailImage: null,
        languageUsed: "",
        durationNumber: "",
        durationUnit: "",
        prerequisites: "",
        whatYouWillLearn: "",
        existingCourseId: "",
      });
      setPreviewImage(null);
    }
  },[courseId]);

  useEffect(() => {
    const fetchCategories = async() => {
      try{
        const res = await axios.get("http://localhost:3000/api/v1/course/get-all-categories");
        // console.log(res);
        console.log(res?.data?.allCategories);
        setCategories(res?.data?.allCategories);
      }catch(err) {
        console.warn("Failed to fecth category details.");
      }
    };
    fetchCategories();
  },[])

  function changeHandler(e) {   
    const {name,value,files} = e.target;
    if(name === "thumbnailImage"){
    const file = files?.[0] ? files[0] : "";
    setFormData((prev) => ({
      ...prev,
      thumbnailImage: file,
    }));
    setPreviewImage(URL.createObjectURL(file));
    }else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.trimStart(),
      }))
    }
  }

  const handleBrowseClick = () => {
    if (!formData.thumbnailImage && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  //That won’t work because you can’t send a File object inside JSON in an HTTP request. For file uploads, you need to use FormData
  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(formData);
     
    try{
      const courseData = new FormData();
      courseData.append("courseName",formData?.courseName);
      courseData.append("courseDescription",formData?.courseDescription);
      courseData.append("coursePrice",Number(formData?.coursePrice));
      courseData.append("category",formData?.category);
      courseData.append("languageUsed",formData?.languageUsed);
      courseData.append("durationNumber",Number(formData?.durationNumber));
      courseData.append("durationUnit",formData?.durationUnit);

      if(formData?.existingCourseId) {
        courseData.append("courseId",formData?.existingCourseId);  // course id of the previously created course.
        console.log(courseId);
      }
      
      if (formData?.tags && formData?.tags.trim() !== "") {
        const tagsArray = formData?.tags.trim().split(/\s+/); // Split by spaces
        tagsArray.forEach(tag => {
          courseData.append("tags", tag);
        });
      }
      console.log(formData?.prerequisites);
      if (formData?.prerequisites !== "" && formData?.prerequisites?.trim() !== "") {
        const prereqArray = formData?.prerequisites.trim().split(/\s+/);
        prereqArray.forEach(prereq => {
          courseData.append("prerequisites", prereq);
        });
        // console.log("Prerequisites array:", prereqArray);
      }
      if (formData?.whatYouWillLearn !== "" && formData?.whatYouWillLearn.trim() !== "") {
        const learningArray = formData?.whatYouWillLearn.trim().split(/\s+/);
        learningArray.forEach(item => {
          courseData.append("whatYouWillLearn", item);
        });
        // console.log("What you will learn array:", learningArray);
      }

      if(formData?.thumbnailImage) {
        courseData.append("thumbnailImage",formData?.thumbnailImage);
      }

      const res = await toast.promise(
        axios.post("http://localhost:3000/api/v1/course/create-course",
          courseData,
          {
            headers:{
              "Content-Type":"multipart/form-data",
            },
          }
        ),
        {
          pending: formData?.existingCourseId ? "Updating course details..." : "Creating course...",
          success: formData?.existingCourseId ? "Course Updated successfully" : "Course created successfully",
          error: formData?.existingCourseId ? "Failed to update course details" : "Failed to create course",
        }
      );
      //error handling of uploaded image is remaining....
      console.log(res);
      const newCourseId = formData?.existingCourseId ? formData?.existingCourseId : res?.data?.courseData?._id;
      navigate(`${currPath}/course-builder?id=${newCourseId}`);
    }catch(err) {
      console.log(err);
      console.warn("Unable to create course, please try again after a while");
    }
  }
  return (
    <div className='pt-10 pb-15 w-[90%] flex flex-row gap-8'>
      <div className='flex flex-col px-7 w-[65%] gap-10'>
        <div className='flex flex-col gap-1'>
          <Link to="/dashboard/my-courses" className='hover:text-[#FFE83D] flex flex-row gap-1 items-center text-[#838894] cursor-pointer w-fit'><IoChevronBack/> Back</Link>
          <h1 className='text-3xl w-fit '>Step I: <span className='text-[#FFE83D]'>Basic Information</span></h1>
        </div>
        <form onSubmit={submitHandler} className='bg-[#161D29] py-5 px-5 rounded-md border border-[#2C333F] flex flex-col gap-7'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <label htmlFor="courseName" className='text-[1rem]'>Course Title<span className='text-red-400'>*</span></label>
              <input 
              required
              type="text"
              placeholder={"Enter Course Title"}
              name="courseName"
              id='courseName'
              value= {formData?.courseName}
              onChange={changeHandler}
              className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[40px] border-b focus:outline-none '/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="courseDescription" className='text-[1rem]'>Course Description<span className='text-red-400'>*</span></label>
              <textarea 
              required
              rows='3'
              placeholder={"Enter Course Description"}
              name="courseDescription"
              id='courseDescription'
              value= {formData?.courseDescription}
              onChange={changeHandler}
                onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="languageUsed" className='text-[1rem]'>Language Used<span className='text-red-400'>*</span></label>
              <input 
              required
              type="text"
              placeholder={"Enter Language"}
              name="languageUsed"
              id='languageUsed'
              value= {formData?.languageUsed}
              onChange={changeHandler}
              className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[40px] border-b focus:outline-none '/>
            </div>
            <div className='flex flex-col relative'>
              <span span className="absolute left-3 top-11 scale-130 -translate-y-1/2 text-[#a1a8c1] text-[1.1rem]">
                <HiOutlineCurrencyRupee/>
              </span>
              <label htmlFor="coursePrice" className='text-[1rem]'>Course Price<span className='text-red-400'>*</span></label>
              <input 
              required
              type="text"
              placeholder="Enter Price"
              name="coursePrice"
              id='coursePrice'
              value= {formData?.coursePrice}
              onChange={changeHandler}
              className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-10 capitalize text-[#a1a8c1] h-[40px] border-b focus:outline-none '/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="category" className='text-[1rem]'>Category<span className='text-red-400'>*</span></label>
              <select 
                required
                type="text"
                placeholder={"Choose a Category"}
                name="category"
                id='category'
                value= {formData?.category}
                onChange={changeHandler}
                className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[45px] border-b focus:outline-none '>
                <option value="" disabled>Select Category</option>
                {
                  Array.isArray(categories) && categories.map((ele,id) => (
                    <option key={ele?._id} value={ele?._id}>{ele?.name}</option>
                  ))
                }
              </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="tags" className='text-[1rem]'>Tags<span className='text-red-400'>*</span> <span className='text-[14px] tracking-wide'>(give spaces in between to give multiple tags)</span></label>
              <input 
              required
              type="text"
              placeholder={"Choose a Tag"}
              name="tags"
              id='tags'
              value= {formData?.tags}
              onChange={changeHandler}
              className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[40px] border-b focus:outline-none '/>
            </div>
            <div className='w-[50%]'>
              <label htmlFor="languageUsed" className='text-[1rem]'>Course Duration<span className='text-red-400'>*</span></label>
              <div className='flex flex-row items-center justify-between gap-5'>
                <div className='flex flex-col w-full'>
                  <label htmlFor="durationNumber" className='text-[1rem]'>Enter Value<span className='text-red-400'>*</span></label>
                  <input 
                  required
                  type="text"
                  placeholder={formData?.durationNumber || "Enter value"}
                  name="durationNumber"
                  id='durationNumber'
                  value= {formData?.durationNumber}
                  onChange={changeHandler}
                  className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[45px] border-b focus:outline-none '/>
                </div>
                <div className='flex flex-col w-full'>
                  <label htmlFor="durationUnit" className='text-[1rem]'>Enter Duration<span className='text-red-400'>*</span></label>
                  <select
                  required
                  type="text"
                  placeholder={"Enter Duration"}
                  name="durationUnit"
                  id='durationUnit'
                  value= {formData?.durationUnit}
                  onChange={changeHandler}
                  className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[45px] border-b focus:outline-none '>
                  <option value="" disabled>Select duration unit</option>
                  {
                    duraUnit.map((ele,index) => (
                      <option key={index} value={ele}>{ele}</option>
                    ))
                  }
                  </select>
                </div>
              </div> 
            </div>
            <div className='flex flex-col relative'>
              <label htmlFor="thumbnailImage" className='text-[1rem]'>Course Thumbnail <span className='text-[14px] tracking-wide'>(If not given a default thumbnail will be set)</span></label>
              <div onClick={handleBrowseClick} className='absolute top-16 left-55 flex flex-col items-center text-[#999DAA] cursor-pointer'>
                <div className='text-[#FFD60A]'><IoIosCloudUpload/></div>
                <p><span className='text-[#FFD60A]'>Browse</span> an Image</p>
                <p>Max file size upto 6MB</p>
              </div>
              <input 
              type="file"
              ref={fileInputRef}
              disabled={!!formData.thumbnailImage}
              name="thumbnailImage"
              id='thumbnailImage'
              onChange={changeHandler}
              className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[150px] border border-dashed cursor-pointer'/>
              {previewImage && (
                <div className='relative'>
                  <img
                    src={previewImage}
                    alt="Thumbnail Preview"
                    className="mt-4 h-40 w-[250px] object-cover rounded-md border"
                  />
                  <button onClick={() => {
                    setPreviewImage(null);
                    setFormData((prev) => ({
                      ...prev,
                      thumbnailImage:null
                    }))
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }} className='cursor-pointer absolute left-56 top-6'><RxCrossCircled className='scale-150'/></button>
                </div>  
              )}
            </div>
          </div>
          <div className='flex justify-end'>
            <button className={`bg-[#FFD60A] text-black  font-semibold px-4 py-1 rounded-[8px] 
            shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
            transition ease-in-out hover:shadow-[0px]`}>{courseId ? "Save changes" : "Next"}</button>
          </div>
        </form>
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

export default AddNewCourse