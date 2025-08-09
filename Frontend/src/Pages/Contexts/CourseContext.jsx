import React, { useState } from 'react'
import { useContext,createContext } from 'react'
import axios from 'axios';
export const courseContext = createContext();

export const CourseProvider = ({children}) => {
    const [courseDetails,setCourseDetails] = useState("");

    const fetchCourse = async(courseId) => {
        try{
            const res = await axios.post("http://localhost:3000/api/v1/course/get-course-details",
                {courseId:courseId},
            );
            setCourseDetails(res.data.courseDetails);
            // console.log(res.data.courseDetails);
        }catch(err) {
            console.warn("Course details cannot be fetched!",err);
        }
    };
 
    return (
        <courseContext.Provider value={{courseDetails,fetchCourse,setCourseDetails}}>
            {children}
        </courseContext.Provider>
    )
}

export const useCourseDetails = () => useContext(courseContext);