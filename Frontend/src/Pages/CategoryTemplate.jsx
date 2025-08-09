import React from 'react'
import { useEffect } from 'react';
import { useParams,useLocation, Link } from 'react-router-dom'
import Loading from "../components/Loading";
import { useState } from 'react';
import axios from "axios"; 
import CourseCard from '../components/core/CoursePage/CourseCard';
import Footer from '../Pages/Footer';
import API_BASE_URL from '../config/api';

const CategoryTemplate = () => {
  const [loading,setLoading] = useState(false);
  const {categoryName} = useParams();  
  const category = categoryName.replace(/-/g,' ');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("id");
  const [newCourses,setNewCourses] = useState([]);
  const [trendingCourses,setTrendingCourses] = useState([]);
  const [popularCourses,setPopularCourses] = useState([]);
  const [noCourse,setNoCourse] = useState("");
  const [descp,setDescp] = useState("");
  useEffect(() => {
    console.log(category);
    console.log(categoryId);
  },[categoryId]);
  
  useEffect(() => {
    const fetchCourses = async() => {
      let allFailed = true;
      setLoading(true);
      try{
        const newRes = await axios.post(`${API_BASE_URL}/api/v1/course/new-courses`,{categoryId:categoryId});
        setNewCourses(newRes.data.recentCourses);
        if (newRes.data.recentCourses.length > 0) allFailed = false;
      }catch(err) {
        console.warn("Failed to fetch new courses:", err);
      }
      try{
        const popularRes = await axios.post(`${API_BASE_URL}/api/v1/course/popular-courses-by-category`, { categoryId:categoryId });
        setPopularCourses(popularRes.data.popularCourses);
        if (popularRes.data.popularCourses.length > 0) allFailed = false;
      }catch(err) {
        console.warn("Failed to fetch popular courses:", err);
      }
        try {
        const trendingRes = await axios.post(`${API_BASE_URL}/api/v1/course/trending-courses`, { categoryId:categoryId });
        setTrendingCourses(trendingRes.data.trendingCourse);
        if (trendingRes.data.trendingCourse.length > 0) allFailed = false;
      } catch (err) {
        console.warn("Failed to fetch trending courses:", err);
      }

      // const results = await Promise.allSettled([       //not working...
      //   axios.post("http://localhost:3000/api/v1/course/newCourses",{categoryId:categoryId}),
      //   axios.post("http://localhost:3000/api/v1/course/popularCoursesByCategory",{categoryId:categoryId}),
      //   axios.post("http://localhost:3000/api/v1/course/trendingCourses",{categoryId:categoryId})
      // ]);

      if (allFailed) {
        setNoCourse("No courses available!");
      } else {
        setNoCourse("");
      }
      setLoading(false);

    };
    fetchCourses();
    // console.log(newCourses);
    // console.log(popularCourses);
    // console.log(trendingCourses);
  },[categoryId]);
  
  useEffect(() => {
    const fetchDescp = async() => {
      try{
        const res = await axios.post(`${API_BASE_URL}/api/v1/course/find-category`,{categoryId});
        setDescp(res.data.response.description);
        // console.log(res.data.response.description);
      }catch(err) {
        console.warn("Failed to fetch description of the category:", err);
      }
    };
    fetchDescp();
  },[categoryId])
  if(loading) return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Loading/> 
    </div>
  );
  return (
    <div className=''>
        {
          (noCourse !== "") ? (
            <div className='w-full h-screen flex justify-center items-center'>{noCourse}</div>
          ) 
          : (
            <div className='w-full flex flex-col gap-15'>
              <div> 
                <div className='w-full bg-[#161D29] flex flex-col'>
                  <div className='w-[82%] py-15 mx-auto'>
                    <div className='flex flex-col items-start gap-6'>
                      <div className='flex flex-row gap-1 text-[16px]'>
                        <Link to={"/"} className='hover:text-[#FFE83D] text-[#838894]'>Home</Link>
                        <p className='text-[#838894]'>/</p>
                        <p className='text-[#838894]'>Catalog</p>
                        <p className='text-[#838894]'>/</p>
                        <p className='text-[#FFE83D] cursor-pointer'>{categoryName}</p>
                      </div>
                      <h1 className='capitalize text-4xl tracking-wide'>{categoryName}</h1>
                      {
                        (descp) ? (
                          <div className='text-[17px] tracking-wide text-[#838894]'>{descp.trim()}</div>
                        )
                        : (
                          <div>...</div>
                        )
                      }
                    </div>
                  </div>
                </div>
                <CourseCard filter={true} heading={"Courses to get you started"} content={[{newCourses},{popularCourses}]}/>
                <CourseCard filter={false} heading={"Trending Courses"} content={[{trendingCourses}]}/>
              </div>
              
              {/* <Footer/> */}
            </div>
          )
        }
    </div>
  )
}

export default CategoryTemplate