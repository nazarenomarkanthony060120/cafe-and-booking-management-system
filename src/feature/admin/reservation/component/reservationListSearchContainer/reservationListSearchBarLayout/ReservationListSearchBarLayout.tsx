import React from 'react'

interface ReservationListSearchBarLayoutProps {
  children: React.ReactNode
}

export const ReservationListSearchBarLayout = ({
  children,
}: ReservationListSearchBarLayoutProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative">{children}</div>
    </div>
  )
}
