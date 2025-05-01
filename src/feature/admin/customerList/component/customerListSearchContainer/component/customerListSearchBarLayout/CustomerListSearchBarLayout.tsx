import React from 'react'

interface CustomerListSearchBarLayoutProps {
  children: React.ReactNode
}

export const CustomerListSearchBarLayout = ({ children }: CustomerListSearchBarLayoutProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative">{children}</div>
    </div>
  )
}
