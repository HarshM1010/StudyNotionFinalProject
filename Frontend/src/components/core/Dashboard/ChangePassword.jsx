import React, { useState } from 'react'
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../../Loading';

const ChangePassword = () => {
    const [resetComplete,setResetComplete] = useState(false);
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState({
      newPassword:"",confirmPassword:"",oldPassword:""
    })
    function changeHandler(e) {
        const {name,value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    async function submitHandler(event) {
        event.preventDefault(); 
        console.log(formData);
        setLoading(true);
        try{
            const res = await axios.put("http://localhost:3000/api/v1/profile/change-password",{
                oldPassword:formData.oldPassword,
                newPassword:formData.newPassword,
                confirmPassword:formData.confirmPassword,
            })  
            console.log(res);
            toast.success("Password changed");
            setResetComplete(true);
            setLoading(false);
        }catch(err) {
            // console.log(err);
            if(err?.response?.data?.message == "Please check newPassword and confirmPassword carefully.") {
                toast.error("New passwords didn't match");
            }
            else if(err?.response?.data?.message == "OldPassword doesn't match!"){
                toast.error("Old password is incorrect")
            }
            else {
              toast.error("Cannot change password");
            }  
            setLoading(false);
            console.warn("Cannot change the password, try again later.");
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
                        <div className='py-25'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-3xl font-semibold'>Password Changed Successfully</h1>
                                <p className='tracking-wide text-[#C5C7D4]'>All Done!</p>
                            </div>
                        </div>

                    )
                    : 
                    (
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-4xl font-bold tracking-wide'>Change Password</h1>
                                <p className='tracking-wide text-[#C5C7D4]'>Almost done! Enter your new Password and your all set.</p>
                            </div> 
                            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                            {/* apply password strength afterwards */}  
                                <div className='flex flex-col'>
                                    <label htmlFor="oldPassword" className='text-[1rem] capitalize'>Old Password <span className='text-red-400'>*</span></label>
                                    <input 
                                    required
                                    type="password"
                                    placeholder='Old Password'
                                    name="oldPassword"
                                    id='oldPassword'
                                    value={formData.oldPassword}
                                    onChange={changeHandler}
                                    className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none '/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="newPassword" className='text-[1rem] capitalize'>New Password <span className='text-red-400'>*</span></label>
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
                                    <label htmlFor="confirmPassword" className='text-[1rem] capitalize'>Confirm New Password <span className='text-red-400'>*</span></label>
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
                                <button className='text-[#000814] bg-[#FFD60A] text-[1.1rem] py-1 w-[100%] rounded-md font-medium mt-6 cursor-pointer h-[40px]'>Change Password</button>
                            </form>
                        </div>
                    )
                    
                )
            }
            
        </div>
    )
}

export default ChangePassword