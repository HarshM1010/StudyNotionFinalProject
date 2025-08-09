import React from 'react'
import "./Dashboard.css"
import { useState } from 'react';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import SideBar from '../components/core/Dashboard/SideBar';
import {Link} from 'react-router-dom';
import { useUser } from '../Pages/Contexts/UserContext';
import ProfileData from '../components/core/Dashboard/ProfileData';
import { IoChevronBack } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import './phoneInputCustom.css';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Loading from "../components/Loading";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = (props) => {
  const {userDetails,loadingUserDetails} = useUser();
  const [isClickedEdit,setIsClickedEdit] = useState(false);
  const dateFromDB = userDetails?.additionalDetails?.dateOfBirth;
  const [flag,setFlag] = useState("IN");
  const [formData,setFormData] = useState({
    firstName:userDetails?.firstName || "",
    phone:userDetails?.additionalDetails?.contactNumber || "",
    gender:userDetails?.additionalDetails?.gender || "",
    clgName:userDetails?.additionalDetails?.college || "",
    lastName:userDetails?.lastName || "",
    dob:userDetails?.additionalDetails?.dateOfBirth || "",
    about:userDetails?.additionalDetails?.about || "",
  })
  let formatted;
  if(dateFromDB) {
    const parsedDate = new Date(dateFromDB);
    if(!isNaN(parsedDate)) {
      formatted = format(parsedDate, 'dd/MM/yyyy');
    }
  }
  function changeHandler(e) {
    const {name,value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trimStart(),
    }))
  }
  function handlePhoneChange(value) {
    setFormData((prevData) => ({
      ...prevData,
      phone: value
    }));
  } 
  const setGender = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };
  async function submitHandler(event) {
    event.preventDefault();
    console.log(formData);
    console.log(userDetails?.additionalDetails);
      try{
        const res = await axios.post("http://localhost:3000/api/v1/profile/create-profile",{
          firstName:formData.firstName.trim() || userDetails?.firstName,
          lastName:formData.lastName.trim() || userDetails?.lastName,
          about:formData.about.trim() ,
          dateOfBirth:formData.dob ,
          gender:formData.gender,
          college:formData.clgName.trim() || userDetails?.additionalDetails?.college,
          contactNumber:formData.phone ,
        });
        console.log(res);
        setFormData(res?.data?.profileDetails);
        toast.success("Profile details updated successfully.")
        console.log(formData);
      }catch(err) {
        console.warn("Profile details cannot be updated.");
      }
  }
  
  return (
    <div className={`grid grid-cols-[17%_83%] w-full gap-0 ${!isClickedEdit && "h-[639px]"}`}>
      <div className=''><SideBar/></div>
      {
        isClickedEdit ? (
          <div className='border-l-2 border-[#838894] flex flex-col pl-7 pt-10 gap-15'>
            <div className='flex flex-col gap-1'>
              <div className='hover:text-[#FFE83D] flex flex-row gap-1 items-center text-[#838894] cursor-pointer w-fit' onClick={() => setIsClickedEdit(false)}><IoChevronBack/> Back</div>
              <h1 className='text-3xl w-fit'>Edit Profile</h1>
            </div>
            <div className='pl-25 flex flex-col gap-6 pb-9'>
              <div className='rounded-xl bg-[#161D29] py-5 flex flex-row justify-between items-center px-7 w-[60%] border-[#2C333F] border-1 '>
                <div className='flex flex-row items-center justify-center gap-6 '>
                  <img src={userDetails?.image} className='rounded-full object-cover w-[70px] h-[70px] bg-amber-300' loading='lazy'></img>
                  <div className='flex flex-col gap-2 items-start'> 
                    <h1 className='font-semibold tracking-wide'>Change Profile Picture</h1>
                    <div className='flex flex-row gap-5'>
                      <button className='bg-[#FFD60A] rounded-md py-1 text-[18px] px-6 text-[#000814] cursor-pointer font-semibold tracking-wide'>Change</button>
                      <button className=' bg-[#2C333F] border-[#424854] border-2 rounded-md py-1 text-[18px] px-6 text-[#C5C7D4] cursor-pointer font-semibold tracking-wide'>Remove</button>
                    </div>  
                  </div>
                </div>
              </div>
              <div className='rounded-xl bg-[#161D29] py-5 flex flex-col gap-7 px-7 w-[60%] border-[#2C333F] border-1'>
                  <h1 className='font-semibold tracking-wide'>Profile Details</h1>  
                  <form id="myForm" className='flex flex-col gap-5' onSubmit={submitHandler}>
                    <div className='grid grid-cols-2 gap-10'>
                      <div className='flex flex-col gap-4'>
                          <div className='flex flex-col'>
                            <label htmlFor="firstName" className='text-[1rem]'>First Name</label>
                            <input 
                            type="text"
                            placeholder={userDetails?.firstName ? userDetails?.firstName : "first name"}
                            name="firstName"
                            id='firstName'
                            value= {formData.firstName}
                            onChange={changeHandler}
                            className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[40px] border-b focus:outline-none '/>
                          </div>
                          <div className='flex flex-col'>
                            <label htmlFor="dob" className='text-[1rem]'>Date of Birth</label>
                            <input 
                            type="date"
                            name="dob"
                            id='dob'
                            max={new Date().toISOString().split("T")[0]}
                            placeholder={formatted ? formatted : "Select date"}
                            value= {formData.dob}
                            onChange={changeHandler}
                            className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 
                            cursor-pointer text-[#a1a8c1] h-[40px] border-b focus:outline-none
                            [&::-webkit-calendar-picker-indicator]:cursor-pointer pr-4'/>
                          </div>
                          <div className='flex flex-col'>
                            <label htmlFor="phonenumber" className='text-[1rem]'>Phone Number</label>
                            <PhoneInput
                              international
                              placeholder={userDetails?.additionalDetails?.contactNumber ? userDetails?.additionalDetails?.contactNumber : "Enter contact number"}
                              value={formData.phone}
                              onChange={(value) => {handlePhoneChange(value);
                              if(value) {
                                const phoneNumber = parsePhoneNumberFromString(value);
                                if (phoneNumber) {
                                  setFlag(phoneNumber.country);
                                }
                              }
                              }}
                              defaultCountry={flag}
                              className="bg-[#2c333f] h-[38px] rounded-md pl-3.5 py-2 text-[1.2rem] text-[#a1a8c1] border-b focus:outline-none"
                            />
                          </div>
                      </div>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                          <label htmlFor="lastName" className='text-[1rem]'>Last Name</label>
                          <input 
                          type="text"
                          placeholder={userDetails?.lastName ? userDetails?.lastName : "last name"}
                          name="lastName"
                          id='lastName'
                          value= {formData.lastName}
                          onChange={changeHandler}
                          className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 capitalize text-[#a1a8c1] h-[40px] border-b focus:outline-none '/>
                        </div>
                        <div className='flex flex-col'>
                          <label htmlFor="clgName" className='text-[1rem]'>College/University Name</label>
                          <input 
                          type="text"
                          placeholder={userDetails?.additionalDetails?.college ? userDetails?.additionalDetails?.college : "College name"}
                          name="clgName"
                          id='clgName'
                          value= {formData.clgName}
                          onChange={changeHandler}
                          className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[40px] border-b focus:outline-none '/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="Gender" className='text-[1rem]'>Gender</label>
                            <div className='flex flex-row items-center justify-center gap-6 rounded-md text-[#a1a8c1] h-[40px] cursor-pointer bg-[#2C333F] border-b focus:outline-none '>    
                                  {["male", "female", "other"].map((option) => (
                                    <label key={option} className="cursor-pointer">
                                      <div key={option}>
                                        <input
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={formData.gender === option}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="appearance-none w-4 rounded-full border-2 h-4 border-[#5C6370] checked:outline-1-[#44434E] checked:bg-[#FFD60A] transition-all duration-200 cursor-pointer"
                                        />
                                        <span className={`capitalize pl-1 ${formData.gender === option ? "text-white" : "text-[#7b8499]"}`}>
                                          {option}
                                        </span>
                                      </div>
                                      </label>
                                  ))}
                            </div>
                        </div>
                      </div>
                    </div>  
                    <div>
                      <div className='flex flex-col'>
                        <label htmlFor="about" className='text-[1rem]'>About</label>
                        <textarea 
                        rows='3'
                        placeholder={userDetails?.additionalDetails?.about ? userDetails?.additionalDetails?.about : "Enter bio details"}
                        name="about"
                        id='about'
                        value= {formData.about}
                        onChange={changeHandler}
                         onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        className='bg-[#2C333F] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none'/>
                      </div>
                    </div>
                    <div className='flex flex-row gap-6 items-center justify-end'>
                      <button className={`bg-[#FFD60A] text-black  font-semibold px-4 py-1 rounded-[8px] 
                      shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                      transition ease-in-out hover:shadow-[0px] order-2`}>Save</button>
                      <button className={`bg-[#161D29] text-white font-semibold px-4 py-1 rounded-[8px]
                      shadow-[3px_3px_0px_0px_rgba(30,41,59,0.6)] shadow-[#2E353E] cursor-pointer hover:scale-90 
                      transition ease-in-out hover:shadow-[0px]`}>Cancel</button>
                    </div>
                  </form>
              </div>
              
              <div className='w-[60%] rounded-xl bg-[#340019] flex flex-row gap-4 py-7 px-7 cursor-pointer'>
                  <div className='rounded-full w-[60px] h-[60px] bg-[#691432] flex items-center justify-center cursor-pointer'>
                    <AiFillDelete className='text-[#EF476F] scale-160 cursor-pointer'/>
                  </div>
                  <div className='flex flex-col gap-4 cursor-pointer'>
                    <h1 className='text-[#FFF1F1] text-3xl cursor-pointer'>Delete Account</h1>
                    <p className='text-[#FBC7D1] cursor-pointer'>Would like to delete account? <br/> Deleting your account will remove all the progress.</p>
                    <p className='text-[#D43D63] italic cursor-pointer'>I want to delete my account.</p>
                  </div>
              </div>
            </div>
          </div>
        ) 
        :
        (
          <div className='border-l-2 border-[#838894] flex flex-col pl-7 pt-10 gap-15'>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row gap-1 text-[17px] w-fit'>
                <Link to={"/"} className='hover:text-[#FFE83D] text-[#838894]'>Home</Link>
                <p className='text-[#838894]'>/</p>
                <p className='text-[#838894]'>Dashboard</p>
                <p className='text-[#838894]'>/</p>
                <p className='text-[#FFE83D] cursor-pointer'>My Profile</p>
              </div>
              <h1 className='text-3xl w-fit'>My Profile</h1>
            </div>
            <div>
              {
                loadingUserDetails ? (
                  <div className='w-fit mx-auto'><Loading/></div>
                )
                : 
                (
                  <div className='pl-25 flex flex-col gap-6'>
                    <div className='rounded-xl bg-[#161D29] py-5 flex flex-row justify-between items-center px-7 w-[60%] border-[#2C333F] border-1'>
                        <div className='flex flex-row items-center justify-center gap-6'>
                          <img src={userDetails?.image} className='rounded-full object-cover w-[70px] h-[70px] bg-amber-300' loading='lazy'></img>
                          <div className='flex flex-col gpa-2 items-start'> 
                            <h1 className='font-semibold tracking-wide'>{userDetails?.firstName}</h1>
                            <p className='text-[15px] text-[#838894]'>{userDetails?.email}</p>
                          </div>
                        </div>
                    </div>
                    <div className='rounded-xl bg-[#161D29] py-5 flex flex-col gap-7 px-7 w-[60%] border-[#2C333F] border-1'>
                      <div className='w-full flex flex-row items-center justify-between gap-6'>
                        <h1 className='font-semibold tracking-wide'>Personal Details</h1>
                        <button className='flex flex-row items-center gap-1 bg-[#FFD60A] rounded-md py-1 text-[17px] px-3 text-black cursor-pointer' onClick={() => setIsClickedEdit(true)}><FaRegEdit className='scale-90'/> Edit</button>
                      </div>
                      <div className='grid grid-cols-2'>
                        <div className='flex flex-col items-start gap-3'>
                          <ProfileData head="First Name" data={userDetails?.firstName} active={true}/>
                          <ProfileData head="Email" data={userDetails?.email} active={false}/>    
                        </div>
                        <div className='flex flex-col items-start gap-3'>
                          <ProfileData head="Last Name" data={userDetails?.lastName} active={true}/>
                          <ProfileData head="Phone Number" data={userDetails?.additionalDetails?.contactNumber} active={true}/> 
                        </div>
                      </div>  
                    </div>
                  </div>
                )
              }
              
            </div>
          </div>   
        )
      }
    </div>
  )
}

export default Dashboard