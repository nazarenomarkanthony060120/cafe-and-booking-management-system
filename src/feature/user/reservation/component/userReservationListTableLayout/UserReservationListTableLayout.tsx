import React from 'react'

interface UserReservationListTableLayoutProps {
  children: React.ReactNode
}

export const UserReservationListTableLayout = ({
  children,
}: UserReservationListTableLayoutProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  )
}
