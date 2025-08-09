import React, { useState } from 'react'
import Template from './Template'
import "./Signup.css"

const Signup = () => {
  const [formData,setFormData] = useState(
    {
      firstname:"",lastname:"",email:"",createpassword:"",confirmpassword:"",accounttype:"",otp:""
    }
  )
  const title = `Join the millions learning to code with StudyNotion for free`;
  const desc = "Build skills for today, tomorrow, and beyond.";
  return (
    <div className='flex justify-center items-center '>
      <Template title={title} desc={desc} formtype="Signup" formData={formData} setFormData={setFormData}/>
    </div>
  )
}

export default Signup