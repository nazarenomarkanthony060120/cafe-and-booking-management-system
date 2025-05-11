import React from 'react'

interface ReservationListLayoutProps {
  children: React.ReactNode
}

export const ReservationListLayout = ({ children }: ReservationListLayoutProps) => {
  return <div className="p-6 bg-white rounded-lg shadow-sm">{children}</div>
}
