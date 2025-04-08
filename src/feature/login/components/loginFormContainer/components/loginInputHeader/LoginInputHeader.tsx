import { Passion_One_Font } from '@/assets/fonts/Fonts'
import React from 'react'
import Image from 'next/image'
import schoolLogo from '@/assets/images/system_logo.png'
const LoginInputHeader = () => {
  return (
    <div>
      <Image src={schoolLogo} alt="School Logo" width={200} height={200} />
      <p className={`${Passion_One_Font.className} text-3xl font-bold text-white`}>Hey, Hello👋</p>
      <p className={`${Passion_One_Font.className} text-lg font-normal text-white`}>
        Enter your email and password to login.
      </p>
    </div>
  )
}

export default LoginInputHeader
