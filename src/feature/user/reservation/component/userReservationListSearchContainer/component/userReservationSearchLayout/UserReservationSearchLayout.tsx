import React from 'react'

interface UserReservationSearchLayoutProps {
    children: React.ReactNode
}

export const UserReservationSearchLayout = ({ children }: UserReservationSearchLayoutProps) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="relative">{children}</div>
        </div>
    )
}
