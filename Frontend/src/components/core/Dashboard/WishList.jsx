import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CiClock2 } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loading from "../../Loading"
import { useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRating } from '../../../Pages/Contexts/RatingContext';
import Ratings from '../CoursePage/Ratings';
import API_BASE_URL from '../../../config/api';

const WishList = () => {
  const [totalPrice,setTotalPrice] = useState(null);
  const [listDetails,setListDetails] = useState(null); 
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currPath = location.pathname;
  const {avgRating,totalRatings,fetchAvgRating,fetchTotalRating} = useRating();

  const fetchWishListDetails = async() => {
    setLoading(true);
    try{
      const res = await axios.get(`${API_BASE_URL}/api/v1/course/get-wishlist`);
      console.log(res.data);
      setTotalPrice(res?.data?.data?.totalPrice);
      setListDetails(res?.data?.data?.wishList);
      setLoading(false);
    }catch(err) {
      console.warn("cannot fetch wish list details.");
    }
  };
  useEffect(() => {
    fetchWishListDetails();
  }, []);
  
  useEffect(() => {
    const courseIds = listDetails?.map(ele => ele?.course?._id).filter(Boolean);
    if(courseIds?.length) {
        fetchAvgRating(courseIds);
        fetchTotalRating(courseIds);
    }
  },[]);
  const removeWishList = async({id}) => {
    try{
      const res = await axios.delete(`${API_BASE_URL}/api/v1/course/remove-course`,{data:{courseId:id}});
      toast.success("Course removed from wishlist.");
      fetchWishListDetails();
    }catch(err) {
      console.warn("Course can't be removed from wishlist.");
    }
  }
  function toBuyCourse({courseName,id}) {
    navigate(`${currPath}/buy-courses/${courseName.replace(/\s+/g, '-').toLowerCase()}?id=${id}`);
  }
  return (
    <div className='flex flex-col pl-7 pt-10 gap-10 pb-15'>
      <div className='flex flex-col gap-1 w-fit'>
        <div className='flex flex-row gap-1 text-[17px] w-fit'>
          <Link to={"/"} className='hover:text-[#FFE83D] text-[#838894]'>Home</Link>
          <p className='text-[#838894]'>/</p>
          <p className='text-[#838894]'>Dashboard</p>
          <p className='text-[#838894]'>/</p>
          <p className='text-[#FFE83D] cursor-pointer'>Wishlist</p>
        </div>
        <h1 className='text-3xl w-fit'>My Wishlist</h1>
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl tracking-wide text-[#6E727F]'>{`${listDetails?.length || "--"} Courses in Wishlist`}</h1>
        <div className='border-t border-[#2C333F] mr-20'>
          {
            loading ? (<div className='w-fit mx-auto py-20'><Loading/></div>) : 
            (
              <div className='grid grid-cols-[80%_20%] items-start'>
                <div className='flex flex-col gap-5'>
                  {
                    Array.isArray(listDetails) && listDetails.map((ele,id) => {
                      const rating = avgRating[ele?.course?.id] ?? 0;
                      const total = totalRatings[ele?.course?.id] ?? 0;
                      return (
                        <div key={ele?.course?._id} className='grid grid-cols-[30%_50%_20%] items-center border-b border-[#2C333F] py-6'>
                          <img onClick={() => toBuyCourse({courseName: ele?.course?.courseName,id:ele?.course?._id})} src={ele?.course?.thumbnail} alt="course thumbnail" className='rounded-xl w-[90%] mx-auto cursor-pointer'/>
                          <div className='flex flex-col gap-3 px-4'>
                            <h1 className='text-[#F1F2FF] text-2xl font-semibold cursor-pointer'>{ele?.course?.courseName}</h1>
                            <p className='text-[#838894] flex flex-row items-center gap-3'><CiClock2/> {ele?.course?.courseDuration?.value || "--"} {ele?.course?.courseDuration?.unit || "--"}</p>
                            <Ratings rating={rating} total={total}/>
                            <ul className='flex flex-row gap-3'>
                              {
                                Array.isArray(ele?.course?.tags) && ele.course.tags.map((element, idx) => (
                                  <li className='text-[#06D6A0] text-[17px]' key={idx}>{`#${element}`}</li>
                                ))
                              }
                            </ul>
                          </div>
                          <div className='flex flex-col items-center gap-3'>
                            <button onClick={() => removeWishList({id:ele?.course?._id})} className='px-2 py-2 text-[#EF476F] border-2 border-[#2C333F] bg-[#161D29] rounded-md flex flex-row items-center justify-center gap-2 cursor-pointer text-[17px]'><RiDeleteBin6Line/> Remove</button>
                            <p className='text-[#FFD60A] font-semibold text-3xl'>{`Rs. ${ele?.course?.coursePrice}`}</p>
                          </div>
                        </div>
                      )         
                    })
                  }
                </div>
                <div className='bg-[#161D29] border rounded-md border-[#2C333F] mt-6 px-5 py-4 gap-5 flex flex-col w-[95%] mx-auto'>
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-[#999DAA] text-2xl tracking-wide'>Total:</h1>
                    <p className='text-[#FFD60A] font-semibold text-3xl'>{`Rs. ${totalPrice}`}</p>
                  </div>    
                  <button className={`bg-[#FFD60A] text-black font-semibold py-2 rounded-[8px] 
                    shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                    transition ease-in-out hover:shadow-[0px] `}>Buy Now</button>
                </div>
              </div>
            )
          }
          
        </div>
      </div>
      <div>
        <h1></h1>
      </div>
    </div>
  )
}

export default WishList