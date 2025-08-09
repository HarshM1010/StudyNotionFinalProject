import React from 'react'
import { useState,useRef } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../components/Loading';
const VerifyEmail = () => {
    const [otp,setOtp] = useState(new Array(6).fill(""));
    const location = useLocation();
    const formData = location.state?.formData;
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    function changeHandler(e,ind) {
        console.log(otp);
        const value = e.value.replace(/[^0-9]/g,"");
        if(value.length > 1) return;
        const newOtp = [...otp];
        newOtp[ind] = value;
        setOtp(newOtp);
        if (value && ind < inputsRef.current.length - 1 && inputsRef.current[ind + 1]) {
            inputsRef.current[ind + 1].focus();
        }
    }
    function keyDownHandler(e,ind) {
        if(e.key === "Backspace") {
            if(otp[ind] === "") {
                if(ind > 0) {
                    inputsRef.current[ind-1].focus();
                }
            }
            else {
                const newOtp = [...otp];
                newOtp[ind] = "";
                setOtp(newOtp);
            }
        }
    }
    async function submitHandler(event) {
        event.preventDefault(); 
        setLoading(true);
        const numberOtp = (otp.join(""));
        console.log(numberOtp);
        if(numberOtp.toString().length === 6) {
            formData.otp = numberOtp;
            console.log(formData);
            try{
                const res = await axios.post("http://localhost:3000/api/v1/auth/signup",{
                    firstName:formData.firstname,
                    lastName:formData.lastname,
                    email:formData.email,
                    otp:formData.otp,
                    password:formData.createpassword,
                    confirmPassword:formData.confirmpassword,
                    accountType:formData.accounttype
                })
                toast.success("Signed in");
                navigate("/login",{ state: { email: formData.email } });
            }catch(err) {
                console.error("Signup error:", err.response?.data || err.message);
                setLoading(false);
            }
        }
        else return;
    }
    return (
        <div className={`py-25 ${loading ? "h-[560px] flex items-center justify-center" : ""}`}>
            {
                loading ? (
                    <div className='mx-auto'><Loading/></div>
                ) :
                (
                    <div className="max-w-[550px] p-4 lg:p-8 mx-auto flex flex-col items-start">
                        <h1 className="text-[#F1F2FF] font-semibold text-4xl tracking-wide">
                            Verify Email
                        </h1>
                        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-[#747986] tracking-wide">
                            A verification code has been sent to you. Enter the code below
                        </p>
                        <form className='flex flex-col gap-6 w-full' onSubmit={submitHandler}>
                            <div className='flex flex-row justify-between items-center'>
                                {
                                    otp.map((digit,ind) => (
                                        <input 
                                            key={ind} 
                                            placeholder="-" 
                                            autocomplete="off" 
                                            maxlength="1" 
                                            type="text" 
                                            inputMode='numeric'
                                            value={digit}
                                            required
                                            className="w-[48px] lg:w-[60px] border-0 bg-[#161D29]
                                            rounded-[0.5rem] aspect-square text-center outline" 
                                            style={{boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)'}}
                                            onChange={(e) => changeHandler(e.target,ind)}
                                            ref={(el) => (inputsRef.current[ind] = el)}
                                            onKeyDown={(e) => keyDownHandler(e,ind)}
                                        />   
                                    ))
                                }   
                            </div>
                            <button className={`bg-[#FFD60A] text-black font-semibold px-6 py-3 rounded-[8px] 
                                shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                                transition ease-in-out hover:shadow-[0px]`}>
                                Verify Email
                            </button>
                        </form>
                        <div className='flex flex-row w-full py-4 justify-between'>
                            <a href="/signup">
                                <p className='flex flex-row items-center gap-2'>
                                    <svg  fill="currentColor" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                                    </svg>
                                    Back To Signup
                                </p>
                            </a>
                            <button className='text-[#47A5C5] flex flex-row items-center gap-2 cursor-pointer'>
                                <svg  fill="currentColor" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
                                    <path
                                        d="M13.15 7.49998C13.15 4.66458 10.9402 1.84998 7.50002 
                                        1.84998C4.7217 1.84998 3.34851 3.90636 2.76336 4.99997H4.5C4.77614 4.99997 5 5.22383 5 5.49997C5 5.77611 4.77614 
                                        5.99997 4.5 5.99997H1.5C1.22386 5.99997 1 5.77611 1 5.49997V2.49997C1 2.22383 1.22386 1.99997 1.5 1.99997C1.77614 1.99997 2 2.22383 
                                        2 2.49997V4.31318C2.70453 3.07126 4.33406 0.849976 7.50002 0.849976C11.5628 0.849976 14.15 4.18537 14.15 7.49998C14.15 10.8146 11.5628 
                                        14.15 7.50002 14.15C5.55618 14.15 3.93778 13.3808 2.78548 12.2084C2.16852 11.5806 1.68668 10.839 1.35816 10.0407C1.25306 9.78536 1.37488 
                                        9.49315 1.63024 9.38806C1.8856 9.28296 2.17781 9.40478 2.2829 9.66014C2.56374 10.3425 2.97495 10.9745 3.4987 11.5074C4.47052 12.4963 5.83496 
                                        13.15 7.50002 13.15C10.9402 13.15 13.15 10.3354 13.15 7.49998ZM7 10V5.00001H8V10H7Z">
                                    </path>
                                </svg>Resend it
                            </button>
                        </div>
                    </div>
                )
            }      
        </div>
    )
}

export default VerifyEmail