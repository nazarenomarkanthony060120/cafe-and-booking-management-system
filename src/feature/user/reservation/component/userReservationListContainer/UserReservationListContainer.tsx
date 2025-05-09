import React from 'react'

interface UserReservationListContainerProps {
  children: React.ReactNode
}

export const UserReservationListContainer = ({ children }: UserReservationListContainerProps) => {
  return <div className="p-6 bg-white rounded-lg shadow-sm">{children}</div>
}
