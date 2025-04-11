import { Inter_Font } from '@/assets/fonts/Fonts'
import { Button } from '@/components/common/Button'
import Link from 'next/link'
import React from 'react'

interface LoginActionContainerProps {
  isPending: boolean
}

const LoginActionContainer = ({ isPending }: LoginActionContainerProps) => {
  return (
    <div className="flex gap-5 flex-col">
      <div className="flex justify-between w-full gap-2">
        <p className={`${Inter_Font.className} underline`}>Forgot Password</p>
      </div>
      <div className="grid grid-cols-2 w-full gap-2">
        <Button
          text={isPending ? 'Loading...' : 'Login'}
          className={`${Inter_Font.className} w-full text-sm bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 bg-gradient-to-l from-[#FB6564] to-[#A03CEA]`}
          type="submit"
        />
        <Link
          href="/register"
          className={`${Inter_Font.className} text-xs text-white hover:underline`}
        >
          <Button
            text="Register"
            className={`${Inter_Font.className} w-full text-sm bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700`}
          />
        </Link>
      </div>
    </div>
  )
}

export default LoginActionContainer
