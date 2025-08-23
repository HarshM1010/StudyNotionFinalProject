import React from 'react';
import { useState } from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Loading from '../components/Loading';
import { useAuth } from './Contexts/AuthContext';
import API_BASE_URL from '../config/api';

const Template = (props) => {
    const [showPassword,setShowPassword] = useState(false);
    const [showPasswordEnter,setShowPasswordEnter] = useState(false);
    const [showPasswordConfirm,setShowPasswordConfirm] = useState(false);
    const [isChecked,setIsChecked] = useState("Student");
    const [loading,setLoading] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const emailId = location.state?.email;
    const {setIsLoggedIn} = useAuth();

    if(emailId) {
        props.formData.email = emailId;
    }
    function changeHandler(event) {
        const {name,value} = event.target;
        props.setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            accounttype:isChecked,
        }));
    }
    async function submitHandler(event) { 
        event.preventDefault();
        setLoading(true);
        if(props.formtype === "Signup") {
            if(props.formData.createpassword !== props.formData.confirmpassword) {
                toast.error("Passwords do not match");
                setLoading(false);
                return;
            } 
            else {
                try{
                    const res = await axios.post(`${API_BASE_URL}/api/v1/auth/send-otp`,{email: props.formData.email});
                    toast.success("This otp will be valid only for 5 mins.");
                    navigate(`${currentPath}/verify-email`, { state: { formData: props.formData } });
                }catch(err) {
                    console.warn("Otp cannot be generated");
                    toast.error("Failed to send OTP");
                    setLoading(false); 
                }   
            }
        }
        if(props.formtype === "Login") {
            try{
                const res = await axios.post(`${API_BASE_URL}/api/v1/auth/login`,{
                    email:props.formData.email,
                    password:props.formData.password
                });
                console.log(res);
                toast.success("Logged in successfully");
                localStorage.setItem("token", res?.data?.token);
                setIsLoggedIn(true);
                navigate("/dashboard/my-profile",{replace:true });
            }catch(err) {
                console.log(err?.response?.data?.message);
                if(err?.response?.data?.message == "Please signup to login.") {
                    toast.error("Please Signup to login");
                }
                else if(err?.response?.data?.message == "Password is Incorrect.") {
                    toast.error("Password is incorrect");
                }
                else {
                    toast.error("Failed to Login");
                }
                setLoading(false);
            }
        }
        // console.log(props.formData);             
    }
    return (
        <div className={`w-[100%] ${loading ? "h-[560px] flex items-center justify-center" : ""}`}>
            {
                loading ? ( <div className='w-fit my-auto mx-auto'><Loading/></div> ) :
                (
                    <div className='flex flex-col sm:flex-row items-start justify-between w-[82%] mx-auto pb-[62px] pt-[6rem] gap-[2rem]'>
                        <div className='flex flex-col gap-2.5 order-2 sm:order-1 lg:w-[50%] sm:w-[40%] w-fit'>
                            <div className='text-[34px] font-semibold text-[#F1F2FF] lg:w-[100%] w-fit'>{props.title}</div>
                            <div className='pb-1.5 flex flex-col'>
                                <p className='text-[#AFB2BF] w-fit'>{props.desc}</p>
                                <div className='text-[1rem] w-fit italic text-[#47A5C5]'>Education to future-proof your career.</div>
                            </div>
                            <form onSubmit={submitHandler}>
                                {props.formtype === "Login" ?
                                (
                                    <div className='flex flex-col gap-3 py-1.5'>
                                        <div className='flex flex-col'>
                                            <label htmlFor="email" className='text-[1rem]'>Email Address <span className='text-red-400'>*</span></label>
                                            <input 
                                            required
                                            type="text"
                                            placeholder='Enter email address'
                                            name="email"
                                            id='email'
                                            value= {props.formData.email}
                                            onChange={changeHandler}
                                            className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none '/>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="password" className='text-[1rem]'>Password <span className='text-red-400'>*</span></label>
                                            <div className='relative'>
                                                <input 
                                                required
                                                type={showPassword ? ("text") : ("password")}
                                                placeholder='Enter Password'
                                                name="password"
                                                id='password'
                                                value={props.formData.password}
                                                onChange={changeHandler}
                                                className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 w-[100%]  text-[#a1a8c1] h-[50px] border-b-2 focus:outline-none  '/>
                                                <button onClick={() => setShowPassword(!showPassword)} className='cursor-pointer absolute top-4 right-5'
                                                    type="button">      {/*Prevents form submission*/}
                                                    {showPassword ? <IoEyeOffOutline className='scale-110'/>  : <IoEyeOutline className='scale-110'/>}
                                                </button>
                                            </div>
                                            <Link className='ml-auto flex text-[#47A5C5] text-sm' to="/forgot-password">Forgot Password</Link>
                                        </div> 
                                        <button className='text-[#000814] bg-[#FFD60A] text-[1.1rem] py-1 w-[100%] rounded-md font-medium mt-[21px] cursor-pointer h-[40px]'>Sign in</button>
                                        <div className='w-[100%]'>
                                            <div className='flex items-center justify-between gap-2 '>
                                                <hr className='border border-[#262D39] w-[100%]'/>
                                                <div className='text-[#262D39] text-[15px] font-semibold '>OR</div>
                                                <hr className='border border-[#262D39] w-[100%]'/>
                                            </div>
                                            <button type='button' className='flex w-[100%] items-center justify-center gap-5 text-[17px] text-[#9ba3b4] font-semibold border-[#262D39] rounded-md py-2 border cursor-pointer mt-[11px]'><span className='scale-150'><FcGoogle /></span> Sign in with Google</button>
                                        </div>
                                    </div>
                                    
                                ) :
                                (
                                    <div className='flex flex-col gap-3 py-1.5'>
                                        <div className='bg-[#161D29] rounded-4xl h-12 w-fit flex items-center border-b border-[#404650]'>
                                            <button type='button' onClick={() => setIsChecked("Student")} className={`px-4 py-1.5 rounded-4xl mr-auto ml-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer ${isChecked === "Student" && "bg-[#000814] text-white"}`}>Student</button>
                                            <button type='button' onClick={() => setIsChecked("Instructor")} className={`px-4 py-1.5 rounded-4xl ml-auto mr-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer ${isChecked === "Instructor" && "bg-[#000814] text-white"}`}>Instructor</button>
                                        </div>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div className='flex flex-col w-[100%]'>
                                                <label htmlFor="firstname" className='text-[1rem]'>First Name<span className='text-red-400'>*</span></label>
                                                <input 
                                                required
                                                type="text"
                                                placeholder='Enter first name'
                                                name="firstname"
                                                id='firstname'
                                                value={props.formData.firstname}
                                                onChange={changeHandler}
                                                className='bg-[#2c333f] py-2 text-[1.2rem] capitalize rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none   '/>
                                            </div>
                                            <div className='flex flex-col w-[100%]'>
                                                <label htmlFor="lastname" className='text-[1rem]'>Last Name<span className='text-red-400'>*</span></label>
                                                <input 
                                                required
                                                type="text"
                                                placeholder='Enter last name'
                                                name="lastname"
                                                id='lastname'
                                                value={props.formData.lastname}
                                                onChange={changeHandler}
                                                className='bg-[#2c333f] py-2 text-[1.2rem] capitalize rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none  '/>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="email" className='text-[1rem]'>Email Address<span className='text-red-400'>*</span></label>
                                            <input 
                                            required
                                            type="text"
                                            placeholder='Enter email address'
                                            name="email"
                                            id='email'
                                            value={props.formData.email}
                                            onChange={changeHandler}
                                            className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none  '/>
                                        </div>
                                        <div className='flex gap-3'>
                                            <div className='flex flex-col w-[100%]'>
                                                <label htmlFor="createpassword" className='text-[1rem]'>Create Password <span className='text-red-400'>*</span></label>
                                                <div className='relative'>
                                                    <input 
                                                    required
                                                    type={showPasswordEnter ? "text" : "password"}
                                                    placeholder='Enter Password'
                                                    name="createpassword"
                                                    id='createpassword'
                                                    value={props.formData.createpassword}
                                                    onChange={changeHandler}
                                                    className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 w-[100%]  text-[#a1a8c1] h-[50px] border-b-2 focus:outline-none  '/>
                                                    <button onClick={() => setShowPasswordEnter(!showPasswordEnter)} className='cursor-pointer absolute top-4 right-5'
                                                        type="button">      {/*Prevents form submission*/}
                                                        {showPasswordEnter ? <IoEyeOffOutline className='scale-110'/>  : <IoEyeOutline className='scale-110'/>}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='flex flex-col w-[100%]'>
                                                <label htmlFor="confirmpassword" className='text-[1rem]'>Confirm Password <span className='text-red-400'>*</span></label>
                                                <div className='relative'>
                                                    <input 
                                                    required
                                                    type={showPasswordConfirm ? "text" : "password"}
                                                    placeholder='Confirm Password'
                                                    name="confirmpassword"
                                                    id='confirmpassword'
                                                    value={props.formData.confirmpassword}
                                                    onChange={changeHandler}
                                                    className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 w-[100%]  text-[#a1a8c1] h-[50px] border-b-2 focus:outline-none  '/>
                                                    <button onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className='cursor-pointer absolute top-4 right-5'
                                                        type="button">      {/*Prevents form submission*/}
                                                        {showPasswordConfirm ? <IoEyeOffOutline className='scale-110'/>  : <IoEyeOutline className='scale-110'/>}
                                                    </button>
                                                </div>
                                            </div>  
                                        </div>
                                        <button className='text-[#000814] bg-[#FFD60A] text-[1.1rem] py-1 w-[100%] rounded-md font-medium mt-5 cursor-pointer h-[40px]'>Create Account</button>
                                        <div className='w-[100%]'>
                                            <div className='flex items-center justify-between gap-2 '>
                                                <hr className='border border-[#262D39] w-[100%]'/>
                                                <div className='text-[#262D39] text-[15px] font-semibold '>OR</div>
                                                <hr className='border border-[#262D39] w-[100%]'/>
                                            </div>
                                            <button type='button' className='flex w-[100%] items-center justify-center gap-5 text-[17px] text-[#9ba3b4] font-semibold border-[#262D39] rounded-md py-2 border cursor-pointer mt-[11px]'><span className='scale-150'><FcGoogle /></span> Sign in with Google</button>
                                        </div>
                                    </div>

                                )}       
                            </form>    
                        </div>
                        <div className='py-7 order-1 lg:mx-0 md:mx-0 mx-auto md:w-[390px] md:h-[410px] max-w-[390px] max-h-[410px] min-w-[100px] min-h-[120px] sm:w-[300px] sm:h-[310px] w-[250px] h-[270px]'>
                            <div className='bg-[url(./images/static_frame.png)] relative w-[100%] h-[100%]' >
                                <img src="./images/static_login_pic.webp" alt="illustrative pic" className='absolute -left-4 object-fit h-[100%] w-[100%] -top-4 '/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Template
