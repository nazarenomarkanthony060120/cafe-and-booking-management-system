import React from 'react'
import { ReservationData } from '@/types/types'

interface ReservationListViewDetailsDataProps {
  reservationData: ReservationData
}

export const ReservationListViewDetailsData = ({ reservationData }: ReservationListViewDetailsDataProps) => {
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
        <label className="text-gray-600 text-sm">Time Mode</label>
        <input
          className="w-full p-2 border rounded mt-1 text-sm"
          value={
            reservationData.time_mode === 'open_time'
              ? 'Open Time'
              : reservationData.time_mode === 'fixed_time'
                ? 'Fixed Time'
                : ''
          }
          readOnly
        />
      </div>
      {reservationData.duration !== '' && (
        <div>
          <label className="text-gray-600 text-sm">Duration</label>
          <input
            className="w-full p-2 border rounded mt-1 text-sm"
            value={`${reservationData.duration} hours`}
            readOnly
          />
        </div>
      )}
      <div>
        <label className="text-gray-600 text-sm">Reservation Time</label>
        <input
          className="w-full p-2 border rounded mt-1 text-sm"
          value={`${reservationData.reservation_time} mins`}
          readOnly
        />
      </div>
      <div>
        <label className="text-gray-600 text-sm">Reservation Date</label>
        <input
          className="w-full p-2 border rounded mt-1 text-sm"
          value={reservationData.reservation_date}
          readOnly
        />
      </div>
    </div>
  )
}
