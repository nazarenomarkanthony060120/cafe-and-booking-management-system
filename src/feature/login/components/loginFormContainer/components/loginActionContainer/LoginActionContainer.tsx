import { Inter_Font } from '@/assets/fonts/Fonts'
import { Button } from '@/components/common/Button'
import React from 'react'

const LoginActionContainer = () => {
  return (
    <div className="flex gap-5 flex-col">
      <div className="flex justify-between w-full gap-2"> 
        <p className={`${Inter_Font.className}`}>Forgot Password</p>
        <p className={`${Inter_Font.className} underline`}>Forgot Password</p>
      </div>
      <div className="grid grid-cols-2 w-full gap-2"> 
        <Button text="Login" className={`${Inter_Font.className} w-full text-sm bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 bg-gradient-to-l from-[#FB6564] to-[#A03CEA]`} type="submit"/>
        <Button text="Register" className={`${Inter_Font.className} w-full text-sm bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700`} />
      </div>
    </div>
    
  )
}

export default LoginActionContainer
