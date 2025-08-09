import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import Loading from '../components/Loading';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from '../config/api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({email:""});
    const [loading,setLoading] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    function navigateToLogin() {
        navigate("/Login");
    }
    async function submitHandler(event) {
        event.preventDefault();
        setLoading(true);
        console.log(formData);
        try{
            const res = await axios.post(`${API_BASE_URL}/api/v1/user/forgot-password`,{email:formData.email});
            // toast.success("Reset password link sent to email");
            const token = res.data.url.split("/").pop();
            navigate(`${currentPath}/check-email`,{state:{ email:formData.email }});
            console.log(res);
        }catch(err) {
            console.warn("Cannot verify user");
            toast.error("Failed to verify user");
            setLoading(false);
        }   
    }
    function changeHandler(event) {
        const {name,value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    return (
        <div className='flex justify-center items-center text-left h-[91vh]'>
            {
                loading ? (
                    <div className='w-fit my-auto mx-auto'><Loading/></div>
                )
                : (
                    <div className='flex flex-col w-[460px] gap-3.5'>
                        <h1 className='font-semibold text-3xl tracking-wide'>Reset your password</h1>
                        <p className='text-[#AEB1BE] text-[19px]'>Have no fear. We'll email you instructions to reset your password.
                        If you dont have access to your email we can try account recovery</p>
                        <form onSubmit={submitHandler}>
                            <div className='flex flex-col'>
                                <label htmlFor="forgotpassword" className='text-[1rem]'>Email Address <span className='text-red-400'>*</span></label>
                                <input 
                                type="text"
                                placeholder='Enter email address'
                                name="email"
                                id='email'
                                value={formData.email}
                                onChange={changeHandler}
                                className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none  '/>
                            </div>
                            <button className='text-[#000814] bg-[#FFD60A] text-[1.1rem] py-1 w-[100%] rounded-md font-medium mt-6 cursor-pointer h-[40px]'>Submit</button>
                        </form>
                        <div onClick={navigateToLogin} className='flex items-center text-[17px] cursor-pointer w-fit'><span className='scale-[0.75]'><ArrowLeft /></span> Back to Login</div>
                    </div>
                )
            }
            
        </div>
    )
}

export default ForgotPassword