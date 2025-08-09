import React from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { RiInstagramFill } from "react-icons/ri";
import './Footer.css'
const Footer = () => {
  return (
    <div className='bg-[#161D29] text-[#6E727F] text-[18px] pt-[60px] mt-20'>
      <div className='w-[100%] mx-auto flex flex-col gap-[80px] px-[100px]'>
        <div className='grid justify-between grid-cols-2'>
          <div className='grid gap-10 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1'>
            <div className='flex flex-col gap-3'>
              <img src="./images/logo.svg" alt="Logo"/>
              <h3 className='text-[#C5C7D4] font-bold'>Company</h3>
              <Link to="/about" className='text-[15px] hover:text-[#C5C7D4] duration-75'>About</Link>
              <Link to="/careers" className='text-[15px] hover:text-[#C5C7D4] duration-75'>Careers</Link>
              <Link to="/affiliates" className='text-[15px] hover:text-[#C5C7D4] duration-75'>Affiliates</Link>
              <div className='grid gap-5 lg:grid-cols-5  grid-cols-3'>
                <Link to='/facebook' className='navlinks'><FaFacebook/></Link>
                <Link to='/google' className='navlinks'><FaGoogle/></Link>
                <Link to='/twitter' className='navlinks'><FaXTwitter/></Link>
                <Link to='/youtube' className='navlinks'><FaYoutube/></Link>
                <Link to='/instagram' className='navlinks'><RiInstagramFill/></Link>           
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-3'>
                <h3 className='text-[#C5C7D4] font-bold'>Resourses</h3>
                <Link to='/articles' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Articles</Link>
                <Link to='/blogs' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Blog</Link>
                <Link to='/chart-sheets' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Chart Sheet</Link>
                <Link to='/code-challenges' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Code Challenges</Link>
                <Link to='/docs' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Docs</Link>
                <Link to='/projects' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Projects</Link>
                <Link to='/videos' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Videos</Link>
                <Link to='/workspaces' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Workspaces</Link>
              </div>
              <div className='flex flex-col gap-3'>
                <h3 className='text-[#C5C7D4] font-bold'>Support</h3>
                <Link to='/help-center' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Help Center</Link>
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-3'>
                <h3 className='text-[#C5C7D4] font-bold '>Plans</h3>
                <Link to='/paid-memberships' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Paid memberships</Link>
                <Link to='/for-students' className='text-[15px] hover:text-[#C5C7D4] duration-75'>For students</Link>
                <Link to='/business-solutions' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Business solutions</Link>
              </div>
              <div className='flex flex-col gap-3'>
                <h3 className='text-[#C5C7D4] font-bold hover:text-[#C5C7D4] duration-75'>Community</h3>
                <Link to='/forums' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Forums</Link>
                <Link to='/chapters' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Chapters</Link>
                <Link to='/events' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Events</Link>
              </div>
            </div>
          </div>
          <div className='grid gap-19 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1'>
            <div className='flex gap-5 h-[109%] pl-8'>
              <div className='flex flex-col gap-3'>
                <h3 className='text-[#C5C7D4] font-bold'>Subjects</h3>
                <Link to='/ai' className='text-[15px] hover:text-[#C5C7D4] duration-75'>AI</Link>
                <Link to='/for-students' className='text-[15px] hover:text-[#C5C7D4] duration-75'>For students</Link>
                <Link to='/cloud-computing' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Cloud Computing</Link>
                <Link to='/code-foundations' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Code Foundations</Link>
                <Link to='/computer-science' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Computer Science</Link>
                <Link to='/cybersecurity' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Cybersecurity</Link>
                <Link to='/data-analytics' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Data Analytics</Link>
                <Link to='/data-science' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Data Science</Link>
                <Link to='/data-visualization' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Data Visualization</Link>
                <Link to='/developer-tools' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Developer tools</Link>
                <Link to='/devops' className='text-[15px] hover:text-[#C5C7D4] duration-75'>DevOps</Link>
                <Link to='/it' className='text-[15px] hover:text-[#C5C7D4] duration-75'>IT</Link>
                <Link to='/machine-learning' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Machine Learning</Link>
                <Link to='/math' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Math</Link>
                <Link to='/mobile-development' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Mobile Development</Link>
                <Link to='/web-design' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Web Design</Link>
                <Link to='/web-developmet' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Web Development</Link>
              </div>
            </div>
            <div className='flex flex-col gap-3 pl-2'>
              <h3 className='text-[#C5C7D4] font-bold'>Languages</h3>
              <Link to='/bash' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Bash</Link>
              <Link to='/cpp' className='text-[15px] hover:text-[#C5C7D4] duration-75'>C++</Link>
              <Link to='/c#' className='text-[15px] hover:text-[#C5C7D4] duration-75'>C#</Link>
              <Link to='/go' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Go</Link>
              <Link to='/html-&-css' className='text-[15px] hover:text-[#C5C7D4] duration-75'>HTML & CSS</Link>
              <Link to='/java' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Java</Link>
              <Link to='/javascript' className='text-[15px] hover:text-[#C5C7D4] duration-75'>JavaScript</Link>
              <Link to='/kotlin' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Kotlin</Link>
              <Link to='/php' className='text-[15px] hover:text-[#C5C7D4] duration-75'>PHP</Link>
              <Link to='/python' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Python</Link>
              <Link to='/r' className='text-[15px] hover:text-[#C5C7D4] duration-75'>R</Link>
              <Link to='/ruby' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Ruby</Link>
              <Link to='/sql' className='text-[15px] hover:text-[#C5C7D4] duration-75'>SQL</Link>
              <Link to='/swift' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Swift</Link>
            </div>
            <div className='flex flex-col gap-3'>
              <h3 className='text-[#C5C7D4] font-bold'>Career building</h3>
              <Link to='/career-paths' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Career paths</Link>
              <Link to='/career-services' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Career services</Link>
              <Link to='/interview-prep' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Interview prep</Link>
              <Link to='/professional-certification' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Progessional Certification</Link>
              <Link to='/full-catalog' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Full Catalog</Link>
              <Link to='/beta-content' className='text-[15px] hover:text-[#C5C7D4] duration-75'>Beta Content</Link>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-between border-t pt-[50px] pb-[50px] w-[100%]'>
          <div className='flex flex-wrap'>
            <Link className='text-[15px] border-r pr-4 hover:text-[#C5C7D4] duration-75'>Privacy Policy</Link>
            <Link className='text-[15px] border-r px-4 hover:text-[#C5C7D4] duration-75'>Cookie Policy</Link>
            <Link className='text-[15px] pl-4 hover:text-[#C5C7D4] duration-75'>Terms</Link>
          </div>
          <p className='flex items-center text-[15px] w-fit '>Made with <span className='px-1.5'><FcLike/></span> (2025)</p>
        </div>
      </div>
    </div>
  )
}

export default Footer