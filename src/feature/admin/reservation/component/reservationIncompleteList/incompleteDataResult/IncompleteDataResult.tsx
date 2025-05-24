import React from 'react'
import { ReservationData } from '@/types/types'

interface IncompleteDataResultProps {
    reservationData: ReservationData
}

export const IncompleteDataResult = ({
    reservationData,
}: IncompleteDataResultProps) => {
    return (
        <div className="space-y-3">
            <div>
                <label className="text-gray-600 text-sm">PC Number</label>
                <input
                    className="w-full p-2 border rounded mt-1 text-sm"
                    value={reservationData.pcNumber}
                    readOnly
                />
            </div>
            <div>
                <label className="text-gray-600 text-sm">Name</label>
                <input
                    className="w-full p-2 border rounded mt-1 text-sm"
                    value={reservationData.name}
                    readOnly
                />
            </div>
            <div>
                <label className="text-gray-600 text-sm">Reservation Type</label>
                <input
                    className="w-full p-2 border rounded mt-1 text-sm"
                    value={
                        reservationData.reservation_type === 'single-reservation'
                            ? 'Individual'
                            : reservationData.reservation_type === 'group-reservation'
                                ? 'Group'
                                : ''
                    }
                    readOnly
                />
            </div>
            <div>
                <label className="text-gray-600 text-sm">Reservation Status</label>
                <input
                    className="w-full p-2 border rounded mt-1 text-sm"
                    value={
                        reservationData.reservation_status.charAt(0).toUpperCase() +
                        reservationData.reservation_status.slice(1)
                    }
                    readOnly
                />
            </div>
            <div>
                <label className="text-gray-600 text-sm">Incomplete Date</label>
                <input
                    className="w-full p-2 border rounded mt-1 text-sm"
                    value={reservationData.incomplete_date}
                    readOnly
                />
            </div>
        </div>
    )
}
