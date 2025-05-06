import React from 'react'
import { WalkInCustomerData } from '@/types/types'

interface ConfirmCompletionDataResultProps {
  customerData: WalkInCustomerData
}

export const ConfirmCompletionDataResult = ({ customerData }: ConfirmCompletionDataResultProps) => {
  return (
    <div className="space-y-3 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Status</label>
        <input
          type="text"
          value={customerData.action_status}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-red-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Customer Name
        </label>
        <input
          type="text"
          value={customerData.name}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Contact Number
        </label>
        <input
          type="text"
          value={customerData.contactNumber}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">PC Number</label>
        <input
          type="text"
          value={customerData.pcNumber}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Monitor Type
        </label>
        <input
          type="text"
          value={customerData.monitorType}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Start Time</label>
        <input
          type="text"
          value={customerData.start_time}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">End Time</label>
        <input
          type="text"
          value={customerData.end_time}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>
    </div>
  )
}
