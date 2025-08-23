import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from '../config/api';

const CheckEmail = () => {
    const location = useLocation();
    const emailId = location.state?.email;
    const [timer, setTimer] = useState(100);

    useEffect(() => {
        let interval = null; 
        if(timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            },1000);
        }
        return () => clearInterval(interval);
    },[timer]);
    console.log(timer);
    async function handleResend() {
        if (timer > 0) return; // block early clicks
        try{
            const res = await axios.post(`${API_BASE_URL}/api/v1/user/forgot-password`,{email:emailId});
            toast.success("Reset password link resent to email");
            setTimer(300);
            console.log(res);
        }catch(err) {
            console.warn("Cannot send reset password link.");
            toast.error("Failed to send link");
        }  
    }

    return (
        <div className='flex items-center justify-center py-40'>
            <div className='w-[25%] mx-auto flex flex-col gap-5'>
                <h1 className='text-4xl font-semibold'>Check Email</h1>
                <p className='tracking-wide text-[#C5C7D4]'>{`We have sent the reset password link to your email ${emailId}`}</p>
                <button 
                onClick={handleResend}
                disabled={timer > 0}
                className={`font-semibold px-6 py-3 rounded-[8px] 
                    shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] hover:scale-90 
                    transition ease-in-out hover:shadow-[0px] 
                    ${timer > 0 
                    ? "bg-gray-400 text-white pointer-default" 
                    : "bg-[#FFD60A] text-black cursor-pointer hover:scale-95"}`}>Resend Email
                </button>
                <Link to={"/login"} className='flex flex-row items-center gap-2 tracking-wide text-[#C5C7D4] w-fit'><ArrowLeft />Back to Login</Link>
            </div>
        </div>
    )
}

export default CheckEmail