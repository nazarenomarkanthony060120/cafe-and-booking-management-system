import React from 'react'
import { CustomImage } from '../../../../../components/common/CustomImage'
import loginBackground from '@/assets/images/loginBackground.png'

export const LoginImageBackground = () => {
  return (
    <div>
      <CustomImage src={loginBackground} width={500} height={500} alt="Login Background" />
    </div>
  )
}
