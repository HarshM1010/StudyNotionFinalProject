import React from 'react'

export const ProgressBar = ({value}) => {
  return (
     
    <div className='flex flex-col items-start justify-center w-full gap-2'>
        <div className='text-[#C5C7D4] text-[17px]'>{`Progress ${value}%`}</div>
        <div className="w-full bg-[#2C333F] rounded-full h-4 overflow-hidden border">
            <div className="bg-[#47A5C5] h-4 transition-all duration-500 ease-in-out" style={{ width: `${value}%` }}></div>
        </div> 
    </div>
     
  )
}
