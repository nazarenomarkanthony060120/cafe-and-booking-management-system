import React from 'react'

const SideBarHeader = ({title}: any) => {
  return (
    <div className='p-8 text-black flex items-center text-lg gap-116'>
      <span className="text-[40px] font-bold">{title}</span>
    </div> 
  )
}

export default SideBarHeader