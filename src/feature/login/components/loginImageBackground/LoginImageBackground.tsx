import React from 'react'
import loginBackground from '@/assets/images/loginBackground.png'
import { CustomImage } from '@/components/common/CustomImage'

export const LoginImageBackground = () => {
  return (
    <div className="relative w-[60%] h-screen">
      <CustomImage
        className="h-full w-full"
        src={loginBackground}
        alt="Login Background"
        objectFit="cover"
      />
    </div>
  )
}
