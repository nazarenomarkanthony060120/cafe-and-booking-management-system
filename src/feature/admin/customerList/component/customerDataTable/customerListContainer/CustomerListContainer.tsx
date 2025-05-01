import React from 'react'

interface CustomerListContainerProps {
  children: React.ReactNode
}

export const CustomerListContainer = ({ children }: CustomerListContainerProps) => {
  return <div className="p-6 bg-white rounded-lg shadow-sm">{children}</div>
}
