import React from 'react'

interface ViewPcUsersHeaderProps {
  pcNumber: string
}

export const ViewPcUsersHeader = ({ pcNumber }: ViewPcUsersHeaderProps) => {
  return (
    <h2 className="text-2xl font-bold text-center mb-6">
      View PC Status for <span className="text-blue-600">PC {pcNumber}</span>
    </h2>
  )
}
