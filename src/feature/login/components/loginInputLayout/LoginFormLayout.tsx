import React from 'react'

interface LoginFormLayoutProps {
  children: React.ReactNode
}

const LoginFormLayout = ({ children }: LoginFormLayoutProps) => {
  return (
    <section className="relative w-[40%] h-screen flex flex-col justify-center p-20 bg-[#4338CA]">
      {children}
    </section>
  )
}

export default LoginFormLayout
