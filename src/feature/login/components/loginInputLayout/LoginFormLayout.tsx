import React from 'react'

interface LoginFormLayoutProps {
  children: React.ReactNode
}
const LoginFormLayout = ({ children }: LoginFormLayoutProps) => {
  return (
    <section className='relative w-[35%] p-20'>
      {children}
    </section>
  )
}

export default LoginFormLayout