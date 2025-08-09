import React from 'react'

const LogoInfo = ({image,gradientclr,headline,para}) => {
  return (
    <div className='flex items-center gap-9'>
        <div className={`rounded-full bg-[#FFFFFF] p-3 shadow-[0px_0px_20px_2px] ${gradientclr} z-10 flex justify-center items-center w-[51px] h-[51px]`}>
            <img src={image} alt="image" className='z-10' loading='lazy'/>
        </div>
        <div className='text-black'>
            <h1 className='font-semibold text-[20px]'>{headline}</h1>
            <p className='text-[18px]'>{para}</p>
        </div>
    </div>
  )
}

export default LogoInfo