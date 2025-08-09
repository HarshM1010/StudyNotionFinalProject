import React from 'react'
import { useParams,useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Ratings from '../components/core/CoursePage/Ratings';
import Button from '../components/core/Homepage/Button';
import CourseSection from '../components/core/CoursePage/CourseSection';
import { toast } from 'react-toastify';
import { useRating } from './Contexts/RatingContext';
import { useCourseDetails } from './Contexts/CourseContext';

const BuyCourse = () => {
    const {courseName} = useParams();  
    const course = courseName.replace(/-/g,' ');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("id");
    const currentPath = location.pathname;
    const [isCollapse,setIsCollapse] = useState(false);
    const {avgRating,totalRatings,fetchAvgRating,fetchTotalRating} = useRating();
    const {courseDetails,fetchCourse} = useCourseDetails();
    // console.log(currentPath);
    //temporarily i am changing the expiry time of the token....
    
    useEffect(() => {
        fetchCourse(courseId);
    },[courseId]);

    useEffect(() => {
        if(courseId && (!avgRating[courseId] || !totalRatings[courseId])) {
            fetchAvgRating([courseId]);
            fetchTotalRating([courseId]);
        }
    },[courseId,avgRating,totalRatings]);
    
    const convertTime = (isoString) => {
        const dateObj = new Date(isoString);
        const day = dateObj.getDate();
        const monthName = dateObj.toLocaleString('default', { month: 'short' });
        const year = dateObj.getFullYear(); 
        const formattedTime = dateObj.toISOString().split("T")[1].split(".")[0]; //will give time in 24 hrs
        return (
            <span>{monthName} {day},{year} | {formattedTime}</span>
        );
    }
    const cartHandler = async() => {
        try{
            const res = await axios.post("http://localhost:3000/api/v1/course/add-to-cart",{
                courseId:courseId,
            })
            console.log(res);
            toast.success("Course added to Cart.")
        }catch(err) {
            if(err?.response?.data?.message == "This course is already in Cart.") {
                toast.error("This course is already in cart.");
            }
            else if(err?.response?.data?.message == "This course is already purchased.") {
                toast.error("This course is already purchased.")
            }
            console.warn("Course cannot be added to cart.",err);
        }   
    }
    //buy now and add to cart buttons will be change based on if the course is added to cart or buyed earlier...
    return (
        <div className='w-full'>
            <div className='w-full bg-[#161D29]'>
                <div className='w-[82%] flex flex-row mx-auto justify-between py-20 relative'>
                    <div className='flex flex-col gap-5 w-[50%]'>
                        <h1 className='text-4xl font-sans font-bold tracking-wide capitalize'>{courseDetails.courseName}</h1>
                        <p className='text-[#C5C7D4] text-[18px] tracking-wide'>{courseDetails.courseDescription}</p>
                        <Ratings rating={avgRating[courseId]} total={totalRatings[courseId]}/>
                        <div className='flex flex-col gap-1'>
                            {
                                courseDetails && Array.isArray(courseDetails.studentsEnrolled) ? (
                                    <p className='tracking-wide text-[#C5C7D4]'>{`(${courseDetails.studentsEnrolled.length}) Students enrolled`}</p>
                                )
                                :
                                (
                                    <p className='tracking-wide text-[#C5C7D4]'>-- Students enrolled</p>
                                )
                            }
                            {/* optional chaining is required to get rid of this error */}
                            {/* <p className='tracking-wide text-[#C5C7D4]'>{`Created by :- ${courseDetails.instructor.firstName} ${courseDetails.instructor.lastName}`}</p> */}  
                            <p className='tracking-wide text-[#C5C7D4]'>{`Created by :- ${courseDetails?.instructor?.firstName || ""} ${courseDetails?.instructor?.lastName || ""}`}</p> 
                            {
                                courseDetails?.createdAt && (   //conditional rendering
                                    <p className='tracking-wide text-[#C5C7D4]'>Created at {convertTime(courseDetails?.createdAt)}</p>
                                )
                            }   
                            <p className='flex flex-row items-center gap-4 tracking-wide text-[#C5C7D4]'>
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 

                                        9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 
                                        9a9 9 0 019-9">
                                    </path>
                                </svg>
                                {courseDetails.languageUsed}
                            </p>
                        </div>     
                    </div>
                    <div className='absolute right-0 bg-[#2C333F] w-[35%] rounded-md  p-3 flex flex-col gap-2'>
                        <div className='flex flex-col gap-4'>
                            <img src={courseDetails.thumbnail} alt="course image" loading='lazy' className='rounded-md'/>
                            <p className='tracking-wide text-[#C5C7D4] text-3xl'>{`Rs. ${courseDetails.coursePrice}`}</p>
                            <Button active={true} arrow={false} linkto={`${currentPath}/make-payment`}>Buy Now</Button>
                            <div 
                            className={`bg-[#161D29] text-white font-semibold px-6 py-3 rounded-[8px] 
                                shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                                transition ease-in-out hover:shadow-[0px] text-center`}
                            active={false} arrow={false} onClick={() => cartHandler()}>Add to Cart</div>
                            <p className='w-fit mx-auto tracking-wide text-[#C5C7D4]'>30-Day Money-Back Guarantee</p>
                        </div>
                        <div className='border border-[#C5C7D4] '></div>
                        <h1 className='w-fit mx-auto tracking-wide text-[#C5C7D4]'>{`Course Duration: ${courseDetails?.courseDuration?.value || ""} ${courseDetails?.courseDuration?.unit || ""}`}</h1>
                        <div className='mx-auto flex items-center gap-2 text-[#E7C009] cursor-pointer' >
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="19" width="19" xmlns="http://www.w3.org/2000/svg">
                                <path d="M568.482 177.448L424.479 313.433C409.3 327.768 384 317.14 384 295.985v-71.963c-144.575.97-205.566 35.113-164.775 171.353 4.483 
                                    14.973-12.846 26.567-25.006 17.33C155.252 383.105 120 326.488 120 269.339c0-143.937 117.599-172.5 264-173.312V24.012c0-21.174 25.317-31.
                                    768 40.479-17.448l144.003 135.988c10.02 9.463 10.028 25.425 0 34.896zM384 379.128V448H64V128h50.916a11.99 11.99 0 0 0 8.648-3.693c14.953-
                                    15.568 32.237-27.89 51.014-37.676C185.708 80.83 181.584 64 169.033 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 
                                    0 48-21.49 48-48v-88.806c0-8.288-8.197-14.066-16.011-11.302a71.83 71.83 0 0 1-34.189 3.377c-7.27-1.046-13.8 4.514-13.8 11.859z">
                                </path>
                            </svg>
                            {/* link must get copied if clicked on Share button */}
                            <p className='tracking-wide'>Share</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#000814]'>
                <div className='w-[82%] mx-auto pt-9 flex flex-col gap-10'>
                    <div className='border border-[#C5C7D4] rounded-xl w-[60%] py-4 px-10 flex flex-col gap-3'>
                        <h1 className='text-3xl font-bold tracking-wide'>What you'll Learn:</h1>
                        <ul className='pl-9'>
                            {
                                courseDetails?.whatYouWillLearn?.map((ele) => (
                                    <li className='tracking-wide list-disc marker:text-[#06D6A0] text-[#06D6A0]'>{ele}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='w-[60%] flex flex-col gap-3 '>
                        <div className='flex flex-row items-center justify-between '>
                            <h1 className='text-3xl font-semibold'>Course Content</h1>
                            <p onClick={() => setIsCollapse(true)} className='text-[#E7C009] cursor-pointer'>Collapse all sections</p>
                        </div>
                        {/* here the courseId in every section must be of the respect course but here it is of only one course as it was copied from one existing course only... */}
                        <CourseSection courseId={courseDetails._id} isCollapse={isCollapse} setIsCollapse={setIsCollapse}/>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default BuyCourse