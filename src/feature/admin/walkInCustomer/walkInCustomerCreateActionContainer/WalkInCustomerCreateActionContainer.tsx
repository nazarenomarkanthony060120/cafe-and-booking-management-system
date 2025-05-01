import { Button } from '@/components/common/Button'
import React from 'react'

interface WalkInCustomerCreateActionContainerProps {
  isLoading: boolean
  onClose: () => void
}

const WalkInCustomerCreateActionContainer = ({
  isLoading,
  onClose,
}: WalkInCustomerCreateActionContainerProps) => {
  return (
    <div className="mt-6 flex justify-end space-x-3">
      <Button
        text="Cancel"
        type="button"
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        onClick={onClose}
      />
      <Button
        text={isLoading ? 'Adding...' : 'Add'}
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
        className="px-8 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      />
    </div>
  )
}

export default WalkInCustomerCreateActionContainer
