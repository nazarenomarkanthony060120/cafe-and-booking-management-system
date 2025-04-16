import React from 'react'

interface LoginLayoutProps {
  children: React.ReactNode
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <main className="flex h-screen w-full bg-[#4338CA]">{children}</main>
}
