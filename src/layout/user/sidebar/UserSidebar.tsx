'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { UserSidebarList } from './component/UserSidebar'
import schoolLogo from '@/assets/images/system_logo.png'
import Image from 'next/image'

const UserSidebar = ({
  setCurrentSection,
}: {
  setCurrentSection: Dispatch<SetStateAction<string>>
}) => {
  const router = useRouter()
  const sidebars = UserSidebarList()

  const [open, setOpen] = useState(true)

  const handleLogout = async () => {
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }

  return (
    <div className={`flex ${open ? 'w-72' : 'w-16'} bg-[#5041BC] text-white duration-500`}>
      <div>
        {sidebars.map((item, index) => (
          <div key={index} onClick={() => setCurrentSection(item.section)}>
            <item.icon />
            {item.name}
          </div>
        ))}
      </div>
      <div
        className={`fixed top-0 left-0 bottom-0 bg-[#5041BC] text-white ${open ? 'w-72' : 'w-16'} duration-500 px-4 overflow-hidden`}
      >
        <div className="flex justify-start py-3">
          <HiMenuAlt3 size={39} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="flex justify-center items-center h-30">
          <Image src={schoolLogo} alt="School Logo" width={200} height={200} />
        </div>
        <div className="border-t-2 border-white-500 w-full"></div>
        <div className={`flex justify-between p-3 ${open ? '' : 'hidden'}`}>
          <span>User</span>
        </div>
        <div className="border-t-2 border-white-500 w-full"></div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {sidebars.map((sidebar, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 hover:text-white group rounded-md ${open ? 'pl-4' : 'pl-2'}`}
              onClick={() => {
                if (sidebar.name === 'Logout') {
                  handleLogout()
                } else {
                  setCurrentSection(sidebar.section)
                }
              }}
            >
              <div>{React.createElement(sidebar.icon, { size: 20 })}</div>
              <h2
                className={`whitespace-nowrap duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}
              >
                {sidebar.name}
              </h2>
              <h2
                className={`${open && 'hidden'} z-50 absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 w-0 overflow-hidden group-hover:w-fit`}
              >
                {sidebar?.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserSidebar
