import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../components/Loading';
import API_BASE_URL from '../config/api';

// keep the link working only upto 5 mins after the link is sent to the user email
const ResetPassword = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    // console.log(token);
    const [resetComplete,setResetComplete] = useState(false);
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState({
        newPassword:"",confirmPassword:"",
    })
    function navigateToLogin() {
        navigate("/login");
    }
    function changeHandler(e) {
        const {name,value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    async function submitHandler(event) {
        event.preventDefault(); 
        // console.log(formData);
        setLoading(true);
        try{
            const res = await axios.post(`${API_BASE_URL}/api/v1/user/reset-password`,{
                newPassword:formData.newPassword,
                confirmPassword:formData.confirmPassword,
                token:token
            })  
            // console.log(res);
            setResetComplete(true);
            setLoading(false);
        }catch(err) {
            // console.log(err?.response?.data?.message);
            if(err?.response?.data?.message == "Passwords didn't match") {
                toast.error("Passwords didn't match");
            }
            else {
                console.warn("Token has expired.");
                toast.error("This link has been expired");
            }
            setLoading(false);
            // console.warn("Cannot change the password, try again later.");
        }
    }
    return (
        <div className={`flex items-center justify-center py-30 ${loading ? "h-[560px] flex items-center justify-center" : ""}`}>
            {
                loading ? (
                    <div className='mx-auto'><Loading/></div>
                )
                : 
                (
                    resetComplete ? (
                        <div className='flex flex-col items-start gap-5 py-25'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-3xl font-semibold'>Reset Complete!</h1>
                                <p className='tracking-wide text-[#C5C7D4]'>All Done! We have sent an Confirmation mail to you.</p>
                            </div>
                            
                            <button onClick={() => navigateToLogin()} className={`bg-[#FFD60A] text-black font-semibold px-6 py-3 rounded-[8px] 
                                shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                                transition ease-in-out hover:shadow-[0px]`}>
                                Return to login
                            </button>
                        </div>

                    )
                    : 
                    (
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-4xl font-bold tracking-wide'>Choose new Password</h1>
                                <p className='tracking-wide text-[#C5C7D4]'>Almost done! Enter your new Password and your all set.</p>
                            </div> 
                            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                            {/* apply password strength afterwards */}  
                                <div className='flex flex-col'>
                                    <label htmlFor="email" className='text-[1rem] capitalize'>New Password <span className='text-red-400'>*</span></label>
                                    <input 
                                    required
                                    type="password"
                                    placeholder='New Password'
                                    name="newPassword"
                                    id='newPassword'
                                    value={formData.newPassword}
                                    onChange={changeHandler}
                                    className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none '/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="email" className='text-[1rem] capitalize'>Confirm New Password <span className='text-red-400'>*</span></label>
                                    <input 
                                    required
                                    type="password"
                                    placeholder='Confirm New Password'
                                    name="confirmPassword"
                                    id='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={changeHandler}
                                    className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none '/>
                                </div>
                                <button className='text-[#000814] bg-[#FFD60A] text-[1.1rem] py-1 w-[100%] rounded-md font-medium mt-6 cursor-pointer h-[40px]'>Reset Password</button>
                            </form>
                            <div onClick={() => navigateToLogin()} className='flex items-center text-[17px] cursor-pointer tracking-wide text-[#C5C7D4] w-fit'><span className='scale-[0.75]'><ArrowLeft /></span> Back to Login</div>
                        </div>
                    )
                    
                )
            }
            
        </div>
    )
}

export default ResetPassword