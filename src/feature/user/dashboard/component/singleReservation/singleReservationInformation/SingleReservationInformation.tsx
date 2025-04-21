import React from 'react'

interface SingleReservationInformationProps {
  status: string
  userData: {
    name: string
    email: string
    contactNumber: string
  }
}

export const SingleReservationInformation = ({
  status,
  userData,
}: SingleReservationInformationProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-gray-600 text-sm">PC Status</label>
        <div className="p-2 border rounded bg-gray-50 text-gray-800">{status}</div>
      </div>

      <div>
        <label className="text-gray-600 text-sm">Name</label>
        <input className="w-full p-2 border rounded mt-1 text-sm" value={userData.name} readOnly />
      </div>
      <div>
        <label className="text-gray-600 text-sm">Email</label>
        <input className="w-full p-2 border rounded mt-1 text-sm" value={userData.email} readOnly />
      </div>
      <div>
        <label className="text-gray-600 text-sm">Contact Number</label>
        <input
          className="w-full p-2 border rounded mt-1 text-sm"
          value={userData.contactNumber}
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
  )
}
