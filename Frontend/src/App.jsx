import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Signup from './Pages/Signup'
import About from './Pages/About'
import CategoryTemplate from './Pages/CategoryTemplate'
import { useEffect, useState } from 'react'
import {Routes , Route ,  BrowserRouter } from "react-router-dom"
import Contact from './Pages/Contact'
import ForgotPassword from './Pages/ForgotPassword'
import Layout from './Pages/Layout'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyCourse from './Pages/BuyCourse'
import Payments from './Pages/Payments'
import Cart from './Pages/Cart'
import VerifyEmail from './Pages/VerifyEmail'
import ResetPassword from './Pages/ResetPassword'
import CheckEmail from './Pages/CheckEmail'
import axios from 'axios'
import Profile from './components/core/Dashboard/Profile'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import PurchaseHistory from './components/core/Dashboard/PurchaseHistory'
import DashboardLayout from './components/DashboardLayout'
import ChangePassword from './components/core/Dashboard/ChangePassword'
import WishList from './components/core/Dashboard/WishList';
import MyCourses from './components/core/Dashboard/MyCourses'
import AddNewCourse from './components/core/Dashboard/AddNewCourse'
import CourseBuilder from './components/core/Dashboard/CourseBuilder'
import VideoLecture from './components/core/Dashboard/VideoLecture'
import CourseVideoLecture from './components/core/Dashboard/CourseVideoLecture'

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className='text-white text-[18px] bg-[#000814] scroll-smooth w-screen min-h-screen'>
      <div className='w-[100%] mx-auto'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>  
            <Route path="/contact" element={<Contact/>}/>
            <Route path='/about' element={<About/>}/>    
            <Route path='/catalog/:categoryName' element={<CategoryTemplate/>}/>   
            <Route path='/catalog/:categoryName/buy-courses/:courseName' element={<BuyCourse/>}/>
          </Route>
          <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route path='my-profile' element={<Profile/>}/>
            <Route path='edit-my-profile' element={<Profile/>}/>
            <Route path='purchase-history' element={<PurchaseHistory/>}/>
            <Route path='enrolled-courses' element={<EnrolledCourses/>}/>
            <Route path='change-password' element={<ChangePassword/>}/>
            <Route path='cart' element={<WishList/>}/>
            <Route path='my-courses' element={<MyCourses/>}/>
            <Route path='my-courses/add-new-course' element={<AddNewCourse/>}/>
            <Route path='my-courses/add-new-course/course-builder' element={<CourseBuilder/>}/>
          </Route> 
          <Route path='/dashboard/enrolled-courses/:courseName/lectures' element={<CourseVideoLecture/>}/>
          <Route path='/dashboard/:courseName/:lectureName' element={<VideoLecture/>}/>  
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/catalog/:categoryName/buy-courses/:courseName/make-payment' element={<Payments/>}/>
          <Route path='/dashboard/cart/buy-courses/:courseName' element={<BuyCourse/>}/>
          {/* <Route path='/catalog/:categoryName/buy-courses/:courseName/add-to-cart' element={<Cart/>}/> */}
          <Route path='/signup/verify-email' element={<VerifyEmail/>}/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>
          <Route path='/forgot-password/check-email' element={<CheckEmail/>}/>
        </Routes>
        <ToastContainer/>
      </div>  
    </div>
  )
}

export default App