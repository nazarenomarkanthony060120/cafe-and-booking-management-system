import React from 'react'

interface WalkInCustomerHeaderProps {
  id: number
}

export const WalkInCustomerHeader = ({ id }: WalkInCustomerHeaderProps) => {
  return (
    <h2 className="text-2xl font-bold text-center mb-6">
      Walk-in Process <span className="text-blue-600">PC {id}</span>
    </h2>
  )
}
