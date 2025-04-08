import React from 'react'

interface LoginInputLayoutProps {
  children: React.ReactNode
}
const LoginInputLayout = ({ children }: LoginInputLayoutProps) => {
  return <div className="p-6">{children}</div>
}

export default LoginInputLayout
