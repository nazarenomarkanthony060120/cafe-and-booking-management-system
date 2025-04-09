import { Inter_Font } from '@/assets/fonts/Fonts'
import { Button } from '@/components/common/Button'
import Link from 'next/link'
import React from 'react'

interface RegisterActionContainerProps {
  isPending: boolean
}
const RegisterActionContainer = ({ isPending }: RegisterActionContainerProps) => {
  return (
    <div className="flex gap-5 flex-col">
      <div className="grid grid-cols-2 w-full gap-2">
        {/* Make a link Already Sign up? */}
        <Link
          href="/login"
          className={`${Inter_Font.className} text-xs text-white hover:underline`}
        >
          Already have an account? Login
        </Link>
        <Button
          text={!isPending ? 'Register' : 'Loading...'}
          className={`${Inter_Font.className} w-full text-sm bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700`}
        />
      </div>
    </div>
  )
}

export default RegisterActionContainer
