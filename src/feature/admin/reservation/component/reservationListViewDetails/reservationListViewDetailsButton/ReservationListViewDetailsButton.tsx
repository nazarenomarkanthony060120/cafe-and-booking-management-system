import React, { useState } from 'react'
import { Button } from '@/components/common/Button'

interface ReservationListViewDetailsButtonProps {
  handleCancelReservation: () => void
  handleApproveReservation: () => void
  isLoading: boolean
  onClose: () => void
}

export const ReservationListViewDetailsButton = ({
  handleCancelReservation,
  isLoading,
  onClose,
  handleApproveReservation,
}: ReservationListViewDetailsButtonProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('')

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
  }

  const handleConfirm = () => {
    switch (selectedStatus) {
      case 'approve':
        handleApproveReservation()
        break
      case 'cancel':
        handleCancelReservation()
        break
    }
  }

  return (
    <div className="mt-4">
      <div>
        <label className="text-gray-600 text-sm">Select Status</label>
        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <option value="">Select Status</option>
          <option value="approve">Approve Reservation</option>
          <option value="cancel">Cancel Reservation</option>
        </select>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button
          text="Confirm"
          onClick={handleConfirm}
          disabled={!selectedStatus || isLoading}
          isLoading={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <Button
          text="Close"
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
