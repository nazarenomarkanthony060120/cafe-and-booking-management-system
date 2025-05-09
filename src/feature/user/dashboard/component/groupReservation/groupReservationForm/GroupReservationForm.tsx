import { CustomerSelectTime } from '@/components/common/CustomerSelectTime'
import { DocumentData } from 'firebase/firestore'
import React, { useState } from 'react'

interface GroupReservationFormProps {
  userData?: DocumentData
  pcs: { pcName: string }[]
  selectedPCOptions: string[]
  onPCOptionsChange: (options: string[]) => void
  selectedTime: string
  onTimeChange: (time: string) => void
  timeMode: 'open_time' | 'fixed_time'
  onTimeModeChange: (mode: 'open_time' | 'fixed_time', duration?: string) => void
  selectedDuration?: string
  onPCTimeModeChange: (mode: string) => void
}

export default function GroupReservationForm({
  userData,
  pcs,
  selectedPCOptions,
  onPCOptionsChange,
  selectedTime,
  onTimeChange,
  timeMode,
  onTimeModeChange,
  selectedDuration,
  onPCTimeModeChange,
}: GroupReservationFormProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pcName = e.target.value
    if (e.target.checked) {
      if (selectedPCOptions.length < 3) {
        onPCOptionsChange([...selectedPCOptions, pcName])
      }
    } else {
      onPCOptionsChange(selectedPCOptions.filter((pc) => pc !== pcName))
    }
  }

  return (
    <div className="space-y-2">
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
        <label className="text-gray-600 text-sm">Select PC No.</label>
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="w-full p-2 border rounded bg-gray-50 text-gray-800 text-sm flex justify-between items-center"
          >
            {selectedPCOptions.length > 0
              ? `${selectedPCOptions.length} PC(s) Selected`
              : 'Select PCs'}
            <span className="ml-2">&#9660;</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 w-full bg-white border rounded shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
              {pcs.map((pc) => (
                <div key={pc.pcName} className="flex items-center p-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    id={`pc-${pc.pcName}`}
                    value={pc.pcName}
                    checked={selectedPCOptions.includes(pc.pcName)}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={`pc-${pc.pcName}`} className="text-sm">
                    {pc.pcName}
                  </label>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-red-500 mt-1 italic">
            Note: You can only reserve up to 3 PCs for a Group Reservation.
          </p>
        </div>
      </div>
      <CustomerSelectTime onTimeModeChange={onTimeModeChange} onModeChange={onPCTimeModeChange} />
      {timeMode === 'fixed_time' && !selectedDuration && (
        <p className="text-xs text-red-500 mt-1 italic">
          Please select a duration for fixed time mode
        </p>
      )}
      <div>
        <label className="text-gray-600 text-sm">Reservation Time</label>
        <select
          className="w-full p-2 border rounded mt-1 text-sm text-gray-800"
          value={selectedTime}
          onChange={(e) => onTimeChange(e.target.value)}
        >
          <option value="">Select Reservation Time</option>
          <option value="10">10 Minutes</option>
          <option value="20">20 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="40">40 Minutes</option>
          <option value="50">50 Minutes</option>
          <option value="60">1 Hour</option>
        </select>
      </div>
    </div>
  )
}
