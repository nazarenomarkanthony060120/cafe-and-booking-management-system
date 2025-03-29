import React from 'react'
import loginBackground from '@/assets/images/loginBackground.png'
import Image from 'next/image'
import { CustomImage } from '../../../../../components/common/CustomImage'

export const LoginImageBackground = () => {
  return (
    <div className="w-[65%] h-full relative">
      <CustomImage 
        src={loginBackground}
        alt="Background" 
        layout="fill" 
        objectFit="cover" 
      />
    </div>
  )
}
