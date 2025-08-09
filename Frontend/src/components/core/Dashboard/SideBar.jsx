import React, { useEffect } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { BsBookmarkCheck } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import {Link} from 'react-router-dom';
import { useUser } from '../../../Pages/Contexts/UserContext';
import { useAuth } from '../../../Pages/Contexts/AuthContext';
import { useLocation,useNavigate } from 'react-router-dom';
import { PiMonitorPlay } from "react-icons/pi";

const SideBar = () => {
    const {setIsLoggedIn} = useAuth();
    const {setUserDetails,userDetails} = useUser();
    const location = useLocation();
    const currPath = location.pathname;
    const navigate = useNavigate();
    const accountType = userDetails?.accountType.trim();
    // console.log(accountType);
    return (    
        <div className='flex flex-col gap-6 fixed left-0 w-[17%] h-screen border-r-2 border-[#838894] z-100'>
            <div className='flex flex-col pt-10'>
                <Link to="/dashboard/my-profile" className={`flex flex-row gap-4 items-center text-[#838894] tracking-wide py-3 text-[18px] pl-7 cursor-pointer ${currPath.includes('/dashboard/my-profile') || currPath.includes('/dashboard/edit-my-profile') ? "bg-[#3D2A01] text-[#FFD60A] border-l-2 border-l-[#FFD60A]" : "hover:text-white"}`}><BsPersonCircle className='scale-110'/> My Profile</Link>
                {
                    accountType === "Student" && (
                        <div className='flex flex-col'>
                            <Link to='/dashboard/enrolled-courses' className={`flex flex-row gap-4 items-center text-[#838894] tracking-wide py-3 text-[18px] pl-7 cursor-pointer ${currPath.includes('/dashboard/enrolled-courses') ? "bg-[#3D2A01] text-[#FFD60A] border-l-2 border-l-[#FFD60A]" : "hover:text-white"}`}><FaBook className='scale-110'/> Enrolled Courses</Link>
                            <Link to='/dashboard/cart' className={`flex flex-row gap-4 items-center text-[#838894] tracking-wide py-3 text-[18px] pl-7 cursor-pointer ${currPath.includes('/dashboard/cart') ? "bg-[#3D2A01] text-[#FFD60A] border-l-2 border-l-[#FFD60A]" : "hover:text-white"}`}><BsBookmarkCheck className='scale-110'/> WishList</Link>
                            <Link to='/dashboard/purchase-history' className={`flex flex-row gap-4 items-center text-[#838894] tracking-wide py-3 text-[18px] pl-7 cursor-pointer ${currPath.includes('/dashboard/purchase-history') ? "bg-[#3D2A01] text-[#FFD60A] border-l-2 border-l-[#FFD60A]" : "hover:text-white"}`}><MdOutlineShoppingCart className='scale-110'/> Purchase History</Link>
                        </div>
                    )
                }
                {
                    accountType === "Instructor" && (
                        <div>
                            <Link to='/dashboard/my-courses' className={`flex flex-row gap-4 items-center text-[#838894] tracking-wide py-3 text-[18px] pl-7 cursor-pointer ${currPath.includes('/dashboard/my-courses') ? "bg-[#3D2A01] text-[#FFD60A] border-l-2 border-l-[#FFD60A]" : "hover:text-white"}`}><PiMonitorPlay className='scale-110'/> My Courses</Link>
                        </div>
                    )
                }
                <Link to='/dashboard/change-password' className={`flex flex-row gap-4 items-center text-[#838894] tracking-wide py-3 text-[18px] pl-7 cursor-pointer ${currPath.includes('/dashboard/change-password') ? "bg-[#3D2A01] text-[#FFD60A] border-l-2 border-l-[#FFD60A]" : "hover:text-white"}`}><FaKey className='scale-110'/> Change Password</Link>
            </div>
            <hr className='border text-[#838894] w-[80%] mx-auto'></hr>
            <div className={`flex flex-row gap-4 items-center text-[#838894] tracking-wide py-3 text-[18px] pl-7 cursor-pointer hover:text-[#FFD60A] hover:border-l-[#FFD60A]`} 
                onClick={() => {
                    setIsLoggedIn(false);
                    setUserDetails(null);
                    localStorage.removeItem("userDetails");
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("token");
                    navigate('/')
                }}><CiLogout className='rotate-180 scale-125'/> Log Out       
            </div>
        </div>
    )
}   

export default SideBar