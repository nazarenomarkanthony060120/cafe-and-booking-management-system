import React from 'react'

interface UserDashboardLayoutProps {
    children: React.ReactNode
}

export const UserDashboardLayout = ({ children }: UserDashboardLayoutProps) => {
    return (
        <div className="p-6 w-full">
            {children}
        </div>
    )
}
