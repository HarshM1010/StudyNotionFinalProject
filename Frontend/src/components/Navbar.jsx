import React, { useState,useEffect } from 'react'
import { NavLink,Link,useLocation} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMenu } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Catalog from '../Pages/Catalog';
import axios from 'axios';
import { useUser } from '../Pages/Contexts/UserContext';
import { useAuth } from '../Pages/Contexts/AuthContext'

const Navbar = () => {
    const location = useLocation();
    const {isLoggedIn,setIsLoggedIn} = useAuth();
    const currentPath = location.pathname;
    const [activeNav,setActiveNav] = useState("");
    const {setUserDetails} = useUser();
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    function getNavbarBg() {
      switch(location.pathname) {
        case"/": return "bg-[#000814] ";
        default: return "bg-[#161D29]";
      };
    }

  return (
    <div className={`border-[#2C333F] border-b-[1px] ${getNavbarBg()} ease-in duration-75`}>
      <div className='flex gap-2 justify-between h-[55px]  mx-auto items-center w-[82%]'>
        <div className='w-fit'>
          <Link to="/">
            <img src="./images/logo.svg"alt="Logo" loading='lazy' className='object-cover w-full max-w-[160px] max-h-[32px] min-w-[160px] min-h-[32px]'/>
          </Link>
        </div>
        <div className='text-[#DBDDEA] invisible w-0  lg:w-fit lg:visible md:w-fit md:visible'>
          <nav>
            <ul className='flex gap-4 lg:gap-8 '>
              <li className='w-fit'>
                <NavLink onClick={() => setActiveNav("Home")} to="/">Home</NavLink>    {/*NavLink creates a active named class in the current Page... */}
              </li>
              <li>
                <Catalog isClicked={activeNav} setActiveNav={setActiveNav}/>
              </li>
              <li className=''>
                <NavLink onClick={() => setActiveNav("contact")} to="/contact">Contact us</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className='gap-3 items-center w-0  invisible  lg:w-fit lg:visible md:w-fit md:visible'>
          {
            !isLoggedIn && (
              <div className='flex flex-row gap-4'>
                  <NavLink to="/login">
                    <button className={`border bg-[#161D29] px-[11px] py-[5px] text-[#AFB2BF] border-[#2C333F] rounded-md cursor-pointer hover:text-[#cdd1e0] extra`}>Log in</button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button className='border bg-[#161D29] px-[11px] py-[5px] text-[#AFB2BF] border-[#2C333F] rounded-md cursor-pointer hover:text-[#cdd1e0] extra'>Sign up</button>
                  </NavLink>
              </div>
            )
          }
          {
            isLoggedIn && 
            (!currentPath.startsWith("/dashboard") ? (
                <div className='flex flex-row gap-4'>
                    <Link to="/">
                      <button onClick={() => {
                        setIsLoggedIn(false);
                        setUserDetails(null);
                        localStorage.removeItem("userDetails");
                        localStorage.removeItem("isLoggedIn");
                        localStorage.removeItem("token");
                        toast.success("Logged out");
                      }} className='border bg-[#161D29] px-[13px] py-[7px] text-[#AFB2BF] border-[#2C333F] rounded-md  block cursor-pointer hover:text-[#cdd1e0]'>Log out</button>
                    </Link>
                    <Link to="/dashboard/my-profile">
                      <button className='border bg-[#161D29] px-[13px] py-[7px] text-[#AFB2BF] border-[#2C333F] rounded-md flex justify-center items-center cursor-pointer hover:text-[#cdd1e0] extra'>Dashboard</button>
                    </Link>
                </div>   
            ) 
            : (
              <div className='flex flex-row gap-7 items-center'>
                <FiSearch className='scale-140 text-[#AFB2BF] cursor-pointer'/>
                <MdOutlineShoppingCart className='scale-140 text-[#AFB2BF] cursor-pointer'/>
                <img src={userDetails?.image} className='rounded-full object-cover w-[30px] h-[30px] bg-amber-300 cursor-pointer' loading='lazy'></img>
              </div>
            ))
          }   
        </div>
      </div> 
    </div>
  )
}

export default Navbar