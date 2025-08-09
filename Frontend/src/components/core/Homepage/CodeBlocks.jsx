import React from 'react'
import CTAButton from './Button'
import {TypeAnimation} from 'react-type-animation'
import { FaArrowRightLong } from 'react-icons/fa6'

const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,bckgradient,codeColor,CodeBlock}) => {
  return (
    <div className={`justify-between flex ${position} flex-col lg:items-start lg:text-left text-center pt-20 items-center gap-y-15`}>
        <div className='lg:w-[45%] md:w-fit sm:w-fit flex flex-col gap-10'>
            <div className='flex flex-col gap-6'>
            {heading}
            <p className='text-[#838894] font-medium'>{subheading}</p>
            </div>
            <div className='gap-8 flex w-fit flex-wrap justify-center lg:mx-0 mx-auto'>
            <CTAButton linkto={ctabtn1.linkto} arrow={ctabtn1.arrow} active={ctabtn1.active}>
                {ctabtn1.btnText}
            </CTAButton>
            <CTAButton linkto={ctabtn2.linkto} arrow={ctabtn2.arrow} active={ctabtn2.active}>
                {ctabtn2.btnText}
            </CTAButton>
            </div>
        </div>
        <div className='border-[2px] border-[#7A6F7E] lg:w-[50%] md:w-fit sm:w-fit h-fit flex flex-row text-[17px] relative py-4'>
            <div className='text-center flex flex-col w-[10%] text-[#7A6F7E] font-semibold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
            <div className={`w-[90%] min-w-[300px] block gap-2 font-mono whitespace-pre-line code-block ${codeColor} text-start pr-2`}>
                <TypeAnimation  
                    sequence={[CodeBlock.code,2000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                />
            </div>
            <div className={`rounded-full ${bckgradient} w-[300px] h-[100px] absolute blur-[100px] top-[20%] left-9`}></div>
        </div>
    </div>
  )
}

export default CodeBlocks