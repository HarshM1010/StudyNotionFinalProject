import React from 'react'
import "./Contact.css"
import { useState } from 'react';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import './phoneInputCustom.css';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
const Contact = () => {
  const [flag,setFlag] = useState("IN");
  const [formData,setFormData] = useState({firstname:"",lastname:"",email:"",phone:"",message:""});
  function changeHandler(event) {
    const {name,value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:value
    }))
  };
  function handlePhoneChange(value) {
    setFormData((prevData) => ({
      ...prevData,
      phone: value
    }));
  } 
  function submitHandler(event) {
    event.preventDefault();
    console.log(flag);  
    console.log(formData);
  }
  return (
    <div className='flex flex-col items-center gap-7'>
      <div className='w-[85%] flex justify-between py-[70px] px-6'>
        <div className='w-[40%] h-[400px] rounded-2xl flex flex-col gap-10 pl-10 py-9 bg-[#161D29]'>
          <div>
            <h2 className='text-[#F1F2FF] flex items-center gap-4 font-semibold'><span className='scale-[1.4] text-[#999DAA]'><IoChatbubbleEllipsesOutline/></span> Chat on us</h2>
            <article className='text-[#999DAA] text-[16px]'>Our friendly team is here to help.<br/>
            <span className='font-bold'>info@studynotion.com</span></article>
          </div>
          <div>
            <h2 className='text-[#F1F2FF] flex items-center gap-4 font-semibold'><span className='text-[#999DAA] scale-[1.4]'><FaEarthAmericas/></span> Visit us</h2>
            <article className='text-[#999DAA] text-[16px]'>Come and say hello at our office HQ.<br/>
            <span className='font-bold'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</span></article>
          </div>
          <div>
            <h2 className='text-[#F1F2FF] flex items-center gap-4 font-semibold'><span className='text-[#999DAA] scale-[1.4]'><IoCall/></span> Call us</h2>
            <article className='text-[#999DAA] text-[16px]'>Mon - Fri From 8am to 5pm<br/>
            <span className='font-bold'>+123 456 7869</span></article>
          </div>
        </div>
        <div className='border w-[57%] rounded-2xl border-[#424854]'>
          <div className='py-10 w-[85%] flex flex-col gap-9 mx-auto'>
            <div>
              <h1 className='font-bold text-4xl'>Got a Idea? We've got the skills.<br/> Let's team up</h1>
              <p className='pt-3 text-[18px] text-[#838894]'>Tell us more about yourself and what you're got in mind.</p>
            </div>
            <form className='w-[100%] flex flex-col gap-5' onSubmit={submitHandler}>
                <div className='grid grid-cols-2 gap-3 justify-between'>
                    <div className='flex flex-col'>
                    <label htmlFor="firstname" className='text-[1rem]'>First Name</label>
                    <input 
                    type="text"
                    placeholder='Enter first name'
                    name="firstname"
                    id='firstname'
                    value={formData.firstname}
                    onChange={changeHandler}
                    className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none  '/>
                  </div>
                  <div className='flex flex-col '>
                    <label htmlFor="lastname" className='text-[1rem]'>Last Name</label>
                    <input  
                    type="text"
                    placeholder='Enter last name'
                    name="lastname"
                    id='lastname'
                    value={formData.lastname}
                    onChange={changeHandler}
                    className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none  '/>
                  </div>
                </div>  
              <div className='flex flex-col'>
                <label htmlFor="email" className='text-[1rem]'>Email Address</label>
                <input 
                type="text"
                placeholder='Enter email address'
                name="email"
                id='email'
                value={formData.email}
                onChange={changeHandler}
                className='bg-[#2c333f] py-2 text-[1.2rem] rounded-md pl-3.5 text-[#a1a8c1] h-[50px] border-b focus:outline-none  '/>
              </div>   
              <div>
                <label htmlFor="phonenumber" className='text-[1rem]'>Phone Number</label>
                <PhoneInput
                  international
                  placeholder="Enter phone number"
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
                  className="bg-[#2c333f] h-[50px] rounded-md pl-3.5 py-2 text-[1.2rem] text-[#a1a8c1] border-b focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className='text-[1rem]'>Message</label>
                <textarea
                  name="message"
                  placeholder='Enter your message here'
                  value={formData.message}
                  onChange={changeHandler}
                  className='text-[#a1a8c1] text-[1.2rem] bg-[#2c333f] w-[100%] h-[200px] rounded-md pt-2 pl-3.5 border-b focus:outline-none'    
                />
              </div>
              <button className='text-[#000814] bg-[#FFD60A] text-[1.1rem] w-[100%] rounded-md font-medium mt-1 cursor-pointer h-[45px]'>Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <div className='w-[100%] flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>Reviews from other learners</h1>

      </div>
    </div>
    
  )
}

export default Contact