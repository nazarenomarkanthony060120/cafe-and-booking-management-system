import React from 'react'
import { Button } from '@/components/common/Button'

interface ReservationListCancelledButtonProps {
  onClose: () => void
}

export const ReservationListCancelledButton = ({
  onClose,
}: ReservationListCancelledButtonProps) => {
  return (
    <div className="mt-10">
      <Button
        text="Close"
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        onClick={onClose}
      />
    </div>
  )
}
