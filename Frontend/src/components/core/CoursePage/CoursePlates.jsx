import React, { useEffect } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useRating } from '../../../Pages/Contexts/RatingContext'
import Ratings from './Ratings';


const CoursePlates = ({content}) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const {avgRating,totalRatings,fetchAvgRating,fetchTotalRating} = useRating();
    useEffect(() => {
        const courseIds = content?.map(data => data?._id).filter(Boolean);
        if(courseIds?.length) {
            fetchAvgRating(courseIds);
            fetchTotalRating(courseIds);
        }
    },[content]);

    const generateCourseUrl = (courseName,id) => {
        return `${currentPath}/buy-courses/${courseName.replace(/\s+/g, '-').toLowerCase()}?id=${id}`
    }
    return (
        <div className='grid grid-cols-3 gap-6'>    
            {
                content.map((data) => {
                    const rating = avgRating[data?._id] ?? 0;
                    const total = totalRatings[data?._id] ?? 0;
                    return (
                        <div key={data?._id} className='flex flex-col gap-2'>
                            <Link to={generateCourseUrl(data?.courseName,data?._id)}>
                                <img src={data?.thumbnail} alt="Course thumbnail" className='rounded-xl' />
                            </Link>
                            <Link to={generateCourseUrl(data?.courseName,data?._id)} className='text-2xl tracking-wide'>{data.courseName}</Link>
                            <Ratings rating={rating} total={total}/>
                            <div className='text-[#C5C7D4]'>Rs. {data?.coursePrice}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CoursePlates