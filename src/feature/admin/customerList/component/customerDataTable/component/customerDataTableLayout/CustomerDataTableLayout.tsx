import React from 'react'

interface CustomerDataTableLayoutProps {
  children: React.ReactNode
}

export const CustomerDataTableLayout = ({ children }: CustomerDataTableLayoutProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  )
}
