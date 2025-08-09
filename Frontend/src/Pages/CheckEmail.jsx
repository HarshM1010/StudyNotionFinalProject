import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const CheckEmail = () => {
    const location = useLocation();
    const emailId = location.state?.email;
    return (
        <div className='flex items-center justify-center py-40'>
            <div className='w-[25%] mx-auto flex flex-col gap-5'>
                <h1 className='text-4xl font-semibold'>Check Email</h1>
                <p className='tracking-wide text-[#C5C7D4]'>{`We have sent the reset password link to your email ${emailId}`}</p>
                <button className={`bg-[#FFD60A] text-black font-semibold px-6 py-3 rounded-[8px] 
                    shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                    transition ease-in-out hover:shadow-[0px] `}>Resend Email
                </button>
                <Link to={"/login"} className='flex flex-row items-center gap-2 tracking-wide text-[#C5C7D4] w-fit'><ArrowLeft />Back to Login</Link>
            </div>
        </div>
    )
}

export default CheckEmail