import { WalkInCustomerData } from '@/types/types'
import React from 'react'

interface ViewCustomerDetailInfoDisplayProps {
  customerData: WalkInCustomerData
  onChange: (e: any) => void
  isLoading: boolean
  sessionAction: string
}

export const ViewCustomerDetailInfoDisplay = ({
  customerData,
  onChange,
  isLoading,
  sessionAction,
}: ViewCustomerDetailInfoDisplayProps) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Status</label>
        <input
          type="text"
          value={!customerData.end_time ? 'On-going' : 'Completed'}
          readOnly
          className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
            !customerData.end_time ? 'bg-yellow-50' : 'bg-green-50'
          }`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Name</label>
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
          value={customerData.contactNumber || '--'}
          readOnly
          className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 ${!customerData.contactNumber ? 'text-center' : ''}`}
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
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Time Mode</label>
        <input
          type="text"
          value={customerData.time_mode === 'open_time' ? 'Open Time' : customerData.time_mode}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Session Action <span className="text-red-500">*</span>
        </label>
        <select
          value={sessionAction}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          required
          disabled={isLoading}
        >
          <option value="" disabled className="text-gray-400">
            Select an action
          </option>
          <option value="logout">Logout</option>
        </select>
      </div>
    </div>
  )
}
