import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
const Layout = () => {
  return (
    <div>
        <Outlet/>  {/*renders current react components(here we can keep header body and the footer of the website which are common...) */}
        <Footer/>
    </div>
  )
}

export default Layout