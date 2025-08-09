import React from 'react'
import HalfRating from './RatingStar';
const Ratings = ({rating,total}) => {
  return (
    <div className='flex gap-4 items-center'>
        <div className='text-[#FFD700]'>{rating}</div>
        <HalfRating rating={rating} readTrue={true}/>
        <div className='text-[#C5C7D4]'>{`${total} Ratings`}</div>
    </div>
  )
}

export default Ratings