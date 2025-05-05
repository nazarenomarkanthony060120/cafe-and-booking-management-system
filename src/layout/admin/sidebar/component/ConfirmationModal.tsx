import React from 'react'
import { WalkInCustomerData } from '@/types/types'

interface ConfirmationModalProps {
  customerData: WalkInCustomerData
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void // Handles the confirm action when user clicks 'Confirm'
  isLoading: Boolean
}

export const ConfirmationModal = ({
  customerData,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[4px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Completion</h3>
        <div className="space-y-3 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              PC Number
            </label>
            <input
              type="text"
              value={customerData.pcNumber}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Start Time
            </label>
            <input
              type="text"
              value={customerData.start_time}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              End Time
            </label>
            <input
              type="text"
              value={customerData.end_time || '--'}
              readOnly
              className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 ${!customerData.end_time ? 'text-center' : ''}`}
            />
          </div>
        </div>
        <p className="text-gray-600 mb-6">Are you sure you want to complete this session?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm} // Calls the onConfirm function passed from parent
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {isLoading ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}
