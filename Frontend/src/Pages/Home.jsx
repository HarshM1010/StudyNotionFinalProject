import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import CTAButton from '../components/core/Homepage/Button';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import HighLightText from '../components/core/Homepage/HighLightText';
import Logo1 from "../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../assets/TimeLineLogo/Logo4.svg"
import LogoInfo from '../components/core/Homepage/LogoInfo';
import TimeLineImage from "../assets/Images/TimelineImage.png";
import Know_your_progress from "../assets/Images/Know_your_progress.svg";
import Compare_with_others from "../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../assets/Images/Plan_your_lessons.svg";
import Instructor from "../assets/Images/Instructor.png"
const Home = () => {
  const [checkType,setCheckType] = useState("Free");
  function colorHandler() {
    return `bg-[#000814]`;
  }
  return (
    <div className='mx-auto w-full'>
      {/*  section 1*/ }
      <div className=' bg-[#000814] pt-[4rem] flex flex-col gap-18 w-[82%] mx-auto'>
          <div className='mx-auto flex flex-col gap-7'>
              <Link to={"/signup"} className=' w-fit mx-auto'>
                <div className='flex justify-center w-fit mx-auto items-center gap-3 bg-[#161D29] px-[2rem] text-[19px] text-[#999DAA] font-medium py-2 rounded-3xl border-b border-b-[#999DAA] transition-all duration-200 hover:scale-95'>
                  <p className='w-fit'>Become an Instructor</p>
                  <FaArrowRightLong className='w-fit'/>
                </div>
              </Link>
              <h1 className='text-4xl font-semibold mx-auto text-center'>Empower Your Future with <HighLightText text={"Coding Skills"}/></h1>
              <p className='text-[#838894] text-[20px] font-sans text-center tracking-wide'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
          </div>
          <div className='gap-8 flex w-fit mx-auto flex-wrap '>
              <CTAButton linkto={"/signup"} active={true} arrow={false}>
                Learn More
              </CTAButton>
              <CTAButton linkto={"/login"} active={false} arrow={false}>
                Have a Demo
              </CTAButton>
          </div>
          <div className='shadow-[10px_-5px_50px_-5px] shadow-cyan-500 w-[96%] mx-auto border-none'>
            <video muted autoPlay loop className='shadow-[20px_20px_rgba(255,255,255)] border-none'>
              <source src={Banner} type="video/mp4"/>
            </video>
          </div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-medium'>
                Unlock your 
                <HighLightText text={"coding potential"}/> with our online courses
              </div>
            }
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
              {
                btnText:"Try it Yourself",
                linkto:"/signup",
                arrow:true,
                active:true
              }
            }
            ctabtn2={
              {
                btnText:"Learn More",
                linkto:"/login",
                arrow:false,
                active:false
              }
            }
            CodeBlock={
              {
                code:
                `export default function CourseList() {
                return (
                <div>
                {courses.map(course => (
                <div key={course.id}>
                <h3 className="text-xl">{course.title}</h3>
                <p className="text-green-600">{course.price}</p>
                <button className="bg-blue-600">Buy Now</button>
                </div>))}
                </div> 
                );
                }`
              }
            }
            bckgradient={
              "bg-amber-300"
            }
            codeColor={
              "text-[#F8D43F]"
            }
          />
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-medium'>
                Start 
                <HighLightText text={"coding in seconds"}/>
              </div>
            }
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1={
              {
                btnText:"Continue Lesson",
                linkto:"/signup",
                arrow:true,
                active:true
              }
            }
            ctabtn2={
              {
                btnText:"Learn More",
                linkto:"/login",
                arrow:false,
                active:false
              }
            }
            CodeBlock={
              {
                code:
                `export default function CourseList() {
                return (
                <div>
                {courses.map(course => (
                <div key={course.id}>
                <h3 className="text-xl">{course.title}</h3>
                <p className="text-green-600">{course.price}</p>
                <button className="bg-blue-600">Buy Now</button>
                </div>))}
                </div> 
                );
                }`
              }
            }
            bckgradient={
              "bg-blue-300"
            }
            codeColor={
              "text-[#D3F6FE]"
            }
          />
          <div className='flex flex-col gap-7 mt-10'>
              <div className='flex flex-col gap-2'>
                <h1 className='mx-auto w-fit text-4xl font-medium text-center'>Unlock the <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>Power of Code</span></h1>
                <p className='mx-auto w-fit text-[#838894] font-medium'>Learn to Build Anything You Can Imagine</p>
              </div>
            <div className='bg-[#161D29] rounded-4xl h-12 lg:flex hidden items-center border-b border-[#404650] mx-auto gap-10'>
                <button type='button' onClick={() => setCheckType("Free")} className={`px-4 py-1.5 rounded-4xl mr-auto ml-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer ${checkType === "Free" && "bg-[#000814] text-white"} hover:bg-[#000814] hover:text-white`}>Free</button>
                <button type='button' onClick={() => setCheckType("New to Coding")} className={`px-4 py-1.5 rounded-4xl ml-auto mr-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer ${checkType === "New to Coding" && "bg-[#000814] text-white"} hover:bg-[#000814] hover:text-white`}>New to Coding</button>
                <button type='button' onClick={() => setCheckType("Most Popular")} className={`px-4 py-1.5 rounded-4xl ml-auto mr-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer ${checkType === "Most Popular" && "bg-[#000814] text-white"} hover:bg-[#000814] hover:text-white`}>Most Popular</button>
                <button type='button' onClick={() => setCheckType("Skills Paths")} className={`px-4 py-1.5 rounded-4xl ml-auto mr-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer  ${checkType === "Skills Paths" && "bg-[#000814] text-white"} hover:bg-[#000814] hover:text-white`}>Skills Paths</button>
                <button type='button' onClick={() => setCheckType("Career Paths")} className={`px-4 py-1.5 rounded-4xl ml-auto mr-1.5 flex items-center justify-center text-[#999DAA] text-[19px] cursor-pointer  ${checkType === "Career Paths" && "bg-[#000814] text-white"} hover:bg-[#000814] hover:text-white`}>Career Paths</button>
            </div>
          </div>
          <div className='flex gap-20'>
            <div className={`bg-[#161D29] flex flex-col gap-12`}>
              <div className='px-7 py-7 flex flex-col gap-4'>
                <h1 className='capitalize font-medium text-[20px]'>Learn HTML</h1>
                <p className='text-[16px] text-left tracking-wider'>This course covers the basic concepts of HTML including creating and structuring web pages, 
                adding text, links, images, and more.</p>
              </div>
              <div className='flex justify-between border-t-[2px] border-dashed px-7 pb-7 pt-2.5'>
                <div className='flex items-center gap-2.5'>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" 
                  xmlns="http://www.w3.org/2000/svg"><path 
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                  <p className='capitalize'>Beginner</p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" 
                  xmlns="http://www.w3.org/2000/svg"><path 
                  d="M15.25 12h-0.25v-3.25c0-0.965-0.785-1.75-1.75-1.75h-4.25v-2h0.25c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.413-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.337-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h0.25v2h-4.25c-0.965 0-1.75 0.785-1.75 1.75v3.25h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.413 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.337-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75zM3 15h-2v-2h2v2zM9 15h-2v-2h2v2zM7 4v-2h2v2h-2zM15 15h-2v-2h2v2z">
                  </path></svg>
                  <p className='capitalize'>{6} Lessons</p>
                </div>
                
              </div>
            </div>
            <div>
              <h1>Learn HTML</h1>
              <p>This course covers the basic concepts of HTML including creating and structuring web pages, 
              adding text, links, images, and more.</p>
              <hr/>
              <div className='flex justify-between'>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" 
                xmlns="http://www.w3.org/2000/svg"><path 
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" 
                xmlns="http://www.w3.org/2000/svg"><path 
                d="M15.25 12h-0.25v-3.25c0-0.965-0.785-1.75-1.75-1.75h-4.25v-2h0.25c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.413-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.337-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h0.25v2h-4.25c-0.965 0-1.75 0.785-1.75 1.75v3.25h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.413 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.337-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75zM3 15h-2v-2h2v2zM9 15h-2v-2h2v2zM7 4v-2h2v2h-2zM15 15h-2v-2h2v2z">
                </path></svg>
              </div>
            </div>
            <div>
              <h1>Learn HTML</h1>
              <p>This course covers the basic concepts of HTML including creating and structuring web pages, 
              adding text, links, images, and more.</p>
              <hr/>
              <div className='flex justify-between'>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" 
                xmlns="http://www.w3.org/2000/svg"><path 
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" 
                xmlns="http://www.w3.org/2000/svg"><path 
                d="M15.25 12h-0.25v-3.25c0-0.965-0.785-1.75-1.75-1.75h-4.25v-2h0.25c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.413-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.337-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h0.25v2h-4.25c-0.965 0-1.75 0.785-1.75 1.75v3.25h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.413 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.337-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75zM3 15h-2v-2h2v2zM9 15h-2v-2h2v2zM7 4v-2h2v2h-2zM15 15h-2v-2h2v2z">
                </path></svg>
              </div>
            </div>
          </div>
      </div>
      {/* section 2 */}
      <div className='bg-[#F9F9F9]'>
          <div className='homepage_bg h-[333px] '>
            <div className='flex lg:flex-row md:flex-col flex-col justify-center gap-15 items-center h-full w-[82%] mx-auto'>
              <CTAButton linkto={"/signup"} active={true} arrow={true}>
                Explore Full Catalog
              </CTAButton>
              <CTAButton linkto={"/login"} active={false} arrow={false}>
                Learn More
              </CTAButton>
            </div>
          </div>
          <div className='bg-[#F9F9F9] w-full'>
            <div className='w-[82%] mx-auto flex flex-col gap-20'>
              <div className='flex lg:gap-30 lg:flex-row md:flex-col flex-col gap-10 md:gap-10 md:w-full'>
                <h1 className='text-4xl text-[#2C333F] font-bold font lg:text-start md:text-center text-center'>Get the skills you need for a <HighLightText text={"job that is in demand."}/></h1>
                <div className='flex flex-col lg:items-start md:items-center items-center lg:gap-10 md:gap-5 gap-5 tracking-wide lg:text-start lg:w-[60%] md:w-full md:text-center text-center '>
                  <p className='text-black'>The modern StudyNotion is the dictates its own terms. 
                  Today, to be a competitive specialist requires more than professional skills.</p>
                  <CTAButton linkto={"/signup"} active={true} arrow={false}>
                    Learn More
                  </CTAButton>
                </div>
              </div>
              <div className='w-full flex lg:flex-row md:flex-col flex-col gap-15 items-center justify-between'>
                <div className='flex flex-col gap-25 lg:w-[35%] lg:mx-0 md:mx-auto mx-auto md:w-fit w-fit'>
                  <LogoInfo image={Logo1} headline={"Leadership"} para={"Fully committed to the success company"} gradientclr={"shadow-[#118AB2]"}/>
                  <LogoInfo image={Logo2} headline={"Responsibility"} para={"Students will always be our top priority"} gradientclr={"shadow-[#EF476F]"}/>
                  <LogoInfo image={Logo3} headline={"Flexibility"} para={"The ability to switch is an important skills"} gradientclr={"shadow-[#05BF8E]"}/>
                  <LogoInfo image={Logo4} headline={"Responsibility"} para={"Students will always be our top priority"} gradientclr={"shadow-[#E7C009]"}/>
                </div>
                <div className='shadow-[-5px_-5px_30px_-5px] shadow-cyan-500 w-[50%]'>
                  <div className='relative'>
                    <img src={TimeLineImage} className='shadow-[15px_15px_rgba(237,232,231)] '/>
                    <div className='w-[90%] -bottom-[50px] left-8 bg-[#014A32] h-[150px] absolute z-100 flex lg:flex-row justify-between lg:px-12 px-5 items-center flex-col lg:py-0 py-4'>
                        <div className='flex flex-row items-center'>
                          <p className='lg:text-2xl font-extrabold md:text-[18px] text-[15px]'>400+</p>
                          <p className='lg:text-start lg:text-1xl text-[#05A77B] md:text-[18px] text-[15px] text-center'>Tutors teaching <br/> Online</p>
                        </div>
                        <div className='lg:h-[60%] border border-[#05A77B] lg:rotate-0 rotate-90 h-full'></div>
                        <div className='flex flex-row items-center'>
                          <p className='lg:text-2xl font-extrabold md:text-[18px] text-[15px]'>10+</p>
                          <p className='lg:text-start lg:text-1xl text-[#05A77B] md:text-[18px] text-[15px] text-center'>Avg Years of <br/> Experience</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-center pb-20'>
                <div className='w-fit mx-auto flex flex-col gap-4'>
                  <h1 className='text-4xl text-[#2C333F] font-bold mx-auto text-center'>Your swiss knife for <HighLightText text={"learning any language"}/></h1>
                  <p className='text-center text-[#2C333F]'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking,<br/> custom schedule and more.</p>
                </div>
                <div class="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
                  <img src={Know_your_progress} alt="image" className="contain-content lg:-mr-32 "/>
                  <img src={Compare_with_others} alt="image" className="contain-content lg:-mb-10 lg:-mt-0 -mt-12"/>
                  <img src={Plan_your_lessons} alt="image" className="contain-content lg:-ml-36 lg:-mt-5 -mt-16"/>
                </div>
                <CTAButton active={true} arrow={false} linkto={"/signup"}>
                  Learn More
                </CTAButton>
              </div>
            </div>    
          </div>
          <div className='bg-[#000814] py-20'>
              <div className='w-[82%] mx-auto flex md:flex-row flex-col items-center gap-20'>
                <img src={Instructor} alt="" className='shadow-[-15px_-15px_0px_0px] md:w-[40%] w-[60%]'/>
                <div className='flex flex-col  md:items-start items-center gap-10 w-[50%]'>
                  <h1 className='text-4xl md:text-start text-center'>Become an <HighLightText text={"Instructor"}/></h1>
                  <p className='tracking-wide md:text-start text-center'>Instructors from around the world teach millions of students on <br/> 
                  StudyNotion. We provide the tools and skills to teach what you love.</p>
                  <CTAButton active={true} arrow={true} linkto={"/signup"}>
                    Start Teaching Today
                  </CTAButton>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Home