import { CustomerSelectTime } from '@/components/common/CustomerSelectTime'
import { DocumentData } from 'firebase/firestore'
import React, { useState } from 'react'

interface SingleReservationFormProps {
  userData?: DocumentData
  status: string
  monitorType: string
  selectedTime: string
  setSelectedTime: (time: string) => void
  onTimeModeChange: (mode: 'open_time' | 'fixed_time', duration?: string) => void
}

export const SingleReservationForm = ({
  userData,
  status,
  monitorType,
  selectedTime,
  setSelectedTime,
  onTimeModeChange,
}: SingleReservationFormProps) => {
  const [timeMode, setTimeMode] = useState<'open_time' | 'fixed_time'>('open_time')
  const [selectedDuration, setSelectedDuration] = useState<string | undefined>()

  const handleTimeModeChange = (mode: 'open_time' | 'fixed_time', duration?: string) => {
    setTimeMode(mode)
    setSelectedDuration(duration)
    onTimeModeChange(mode, duration)
  }
  return (
    <div className="space-y-2">
      <div>
        <label className="text-gray-600 text-sm">PC Status</label>
        <div className="p-2 border rounded bg-gray-50 text-gray-800">{status}</div>
      </div>

      <div>
        <label className="text-gray-600 text-sm">Name</label>
        <input className="w-full p-2 border rounded mt-1 text-sm" value={userData?.name} readOnly />
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
        <label className="text-gray-600 text-sm">Monitor Type</label>
        <input
          className="w-full p-2 border rounded mt-1 text-sm"
          value={`${monitorType} | ${monitorType === 'Curved' ? '40' : '20'} Per Hours`}
          readOnly
        />
      </div>
      <CustomerSelectTime onTimeModeChange={handleTimeModeChange} />

      <div>
        <label className="text-gray-600 text-sm">Reservation Time</label>
        <select
          className="w-full p-2 border rounded mt-1 text-sm text-gray-800"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select time</option>
          <option value="10">10 Minutes</option>
          <option value="20">20 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="40">40 Minutes</option>
          <option value="50">50 Minutes</option>
          <option value="60">1 Hour</option>
        </select>
        <p className="text-xs text-red-500 mt-1 italic">
          Please select your preferred reservation time.
        </p>
      </div>
    </div>
  )
}
