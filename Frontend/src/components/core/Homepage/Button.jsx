import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";

const Button = ({children,linkto,active,arrow}) => {
  return (
        <NavLink to={linkto}>
            <div className={`${active ? "bg-[#FFD60A] text-black" : "bg-[#161D29] text-white"}  font-semibold px-6 py-3 rounded-[8px] 
            shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
            transition ease-in-out hover:shadow-[0px] ${arrow ? "flex items-center gap-2.5" : "text-center"} `}>{children} {arrow && <FaArrowRightLong />}</div>
        </NavLink>
  )
}

export default Button