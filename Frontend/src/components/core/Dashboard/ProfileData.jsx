import React from 'react'

const ProfileData = ({head,data,active}) => {
  return (
    <div className=''>
        <p className='text-[#424854]'>{head}</p>
        <h1 className={`${active ? "text-[#F1F2FF]" : "text-[#838894]"}`}>{data ? data : "-"}</h1>
    </div>
  )
}

export default ProfileData