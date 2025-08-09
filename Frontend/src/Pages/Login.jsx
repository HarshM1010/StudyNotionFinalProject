import React from 'react'
import { useState } from 'react'
import Template from './Template'
import "./Login.css"
const Login = () => {
  
  const [formData,setFormData] = useState(
    {
      email:"",password:""
    }
  )
  const title = "Welcome Back";
  const desc = "Build skills for today, tomorrow, and beyond.";
  return (
    <div className='flex justify-center items-start'>
      <Template title={title} desc={desc} formtype="Login" formData={formData} setFormData={setFormData}/>
    </div>
  )
}

export default Login