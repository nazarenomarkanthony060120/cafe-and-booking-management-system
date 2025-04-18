'use client'

import React from 'react'
import { SingleReservationLayout } from '@/feature/user/dashboard/component/singleReservation/singleReservationLayout/SingleReservationLayout'
import { SingleReservationHeaderName } from '@/feature/user/dashboard/component/singleReservation/singleReservationHeaderName/SingleReservationHeaderName'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
  status: string
}

export const ReservationModal = ({ isOpen, onClose, id, status }: ReservationModalProps) => {
  if (!isOpen) return null

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: api.getUserInfo,
  })

  return (
    <SingleReservationLayout isOpen={isOpen} onClose={onClose}>
      <SingleReservationHeaderName id={id} />
      <div className="space-y-4">
        <div>
          <label className="text-gray-600 text-sm">PC Status</label>
          <div className="p-2 border rounded bg-gray-50 text-gray-800">{status}</div>
        </div>

        <div>
          <label className="text-gray-600 text-sm">Name</label>
          <input
            className="w-full p-2 border rounded mt-1 text-sm"
            value={userData?.name}
            readOnly
          />
        </div>
        <div>
          <label className="text-gray-600 text-sm">Email</label>
          <input
            className="w-full p-2 border rounded mt-1 text-sm"
            value={userData?.email}
            readOnly
          />
        </div>
        <div>
          <label className="text-gray-600 text-sm">Contact Number</label>
          <input
            className="w-full p-2 border rounded mt-1 text-sm"
            value={userData?.contactNumber}
            readOnly
          />
        </div>
        <div>
          <label className="text-gray-600 text-sm">Reservation Time</label>
          <input
            type="time"
            className="w-full p-2 border rounded mt-1 text-sm text-gray-800"
            placeholder="Booking Schedule"
          />
          <p className="text-xs text-red-500 mt-1 italic">
            Note: Reservation time should not exceed 1 hour.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Reserve Now
        </button>
      </div>
    </SingleReservationLayout>
  )
}