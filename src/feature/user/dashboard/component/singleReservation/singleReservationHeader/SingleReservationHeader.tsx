import React from 'react'

interface SingleReservationHeaderProps {
    pcNumber: string
}

export const SingleReservationHeader = ({ pcNumber }: SingleReservationHeaderProps) => {
    return (
        <h2 className="text-2xl font-bold text-center mb-6">
            Reserve Booking for <span className="text-blue-600">PC {pcNumber}</span>
        </h2>
    )
}
