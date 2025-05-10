import React from 'react'
import { Button } from '@/components/common/Button'

interface ViewUserReservationDataButtonProps {
  handleCancelReservation: () => void
  isLoading: boolean
  onClose: () => void
}

export const ViewUserReservationDataButton = ({
  handleCancelReservation,
  isLoading,
  onClose,
}: ViewUserReservationDataButtonProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <button
        type="button"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleCancelReservation}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          'Cancel Reservation'
        )}
      </button>
      <Button
        text="Close"
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        disabled={isLoading}
        onClick={onClose}
      />
    </div>
  )
}
