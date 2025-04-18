import React from 'react'

interface SingleReservationHeaderNameProps {
    id: number
}

export const SingleReservationHeaderName = ({ id }: SingleReservationHeaderNameProps) => {
    return (
        <h2 className="text-2xl font-bold text-center mb-6">
            {' '}
            Reserve Booking for <span className="text-blue-600">PC {id}</span>
        </h2>
    )
}