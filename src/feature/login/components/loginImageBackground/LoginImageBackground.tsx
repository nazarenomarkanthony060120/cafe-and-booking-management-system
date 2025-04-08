import React from 'react'
import loginBackground from '@/assets/images/loginBackground.png'
import { CustomImage } from '@/components/common/CustomImage'

export const LoginImageBackground = () => {
  return (
    <CustomImage
      className="relative w-3xl"
      src={loginBackground}
      alt="Login Background"
      objectFit="cover"
    />
  )
}
