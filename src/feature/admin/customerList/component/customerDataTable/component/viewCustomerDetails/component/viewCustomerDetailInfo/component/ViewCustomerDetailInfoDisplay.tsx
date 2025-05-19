import { WalkInCustomerData } from '@/types/types'
import React from 'react'

interface ViewCustomerDetailInfoDisplayProps {
  customerData: WalkInCustomerData
}

export const ViewCustomerDetailInfoDisplay = ({
  customerData,
}: ViewCustomerDetailInfoDisplayProps) => {
  console.log(customerData)
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Status</label>
        <input
          type="text"
          value={customerData.action_status}
          readOnly
          className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
            customerData.action_status === 'On-going'
              ? 'bg-yellow-50'
              : customerData.action_status === 'Waiting for Payment'
                ? 'bg-red-50'
                : customerData.action_status === 'Completed'
                  ? 'bg-green-50'
                  : 'bg-gray-50'
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
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Time Mode</label>
        <input
          type="text"
          value={
            customerData.time_mode === 'fixed_time'
              ? 'Fix Time'
              : customerData.time_mode === 'open_time'
                ? 'Open Time'
                : ''
          }
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
        />
      </div>
      {customerData?.action_status === 'Completed' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Payment
            </label>
            <input
              type="text"
              value={customerData?.payment}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Completed Date
            </label>
            <input
              type="text"
              value={customerData?.updated_date}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
        </>
      )}
    </div>
  )
}
