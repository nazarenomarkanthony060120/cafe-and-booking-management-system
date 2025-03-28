import React from 'react'
import loginBackground from '@/assets/images/loginBackground.png'
import Image from 'next/image'

export const LoginImageBackground = () => {
  return (
    <div className="w-[65%] h-full relative">
      <Image 
        src={loginBackground}
        alt="Background" 
        layout="fill" 
        objectFit="cover" 
      />
    </div>
  )
}
