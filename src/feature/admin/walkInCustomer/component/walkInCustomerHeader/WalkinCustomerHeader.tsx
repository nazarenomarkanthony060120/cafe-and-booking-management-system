import React from 'react'

interface WalkInCustomerHeaderProps {
  pcNumber: string
}

export const WalkInCustomerHeader = ({ pcNumber }: WalkInCustomerHeaderProps) => {
  return (
    <h2 className="text-2xl font-bold text-center mb-6">
      Walk-in Process <span className="text-blue-600">PC {pcNumber}</span>
    </h2>
  )
}
