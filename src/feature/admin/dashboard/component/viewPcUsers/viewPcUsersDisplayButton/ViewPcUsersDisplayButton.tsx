import { Button } from '@/components/common/Button'
import React from 'react'

interface ViewPcUsersDisplayButtonProps {
  onClose: () => void
}

export const ViewPcUsersDisplayButton = ({ onClose }: ViewPcUsersDisplayButtonProps) => {
  return (
    <div className="mt-6 flex justify-end space-x-3">
      <Button
        text="Close"
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        onClick={onClose}
      />
    </div>
  )
}
