import React from 'react'
import { WalkInCustomerData } from '@/types/types'

interface ViewPcUsersDisplayProps {
  isLoading: boolean
  matchedCustomers: WalkInCustomerData[]
  isError: boolean
}

export const ViewPcUsersDisplay = ({
  isLoading,
  matchedCustomers,
  isError,
}: ViewPcUsersDisplayProps) => {
  return (
    <>
      {isLoading && <p className="text-center text-gray-500">Loading user info...</p>}

      {isError && <p className="text-center text-red-500">Failed to load data.</p>}

      {!isLoading && matchedCustomers.length === 0 && (
        <p className="text-center text-gray-500">No user currently using this PC.</p>
      )}
      {!isLoading && matchedCustomers.length > 0 && (
        <div className="space-y-6">
          {matchedCustomers.map((customer) => (
            <div key={customer.pcNumber} className="flex flex-col items-center justify-center pt-5">
              <div className="w-full max-w-md text-gray-800">
                <div>
                  <label className="text-gray-600 text-sm">Name</label>
                  <div className="p-2 border rounded bg-gray-50 text-gray-800">{customer.name}</div>
                </div>
                <div className="pt-2">
                  <label className="text-gray-600 text-sm">Monitor Type</label>
                  <div className="p-2 border rounded bg-gray-50 text-gray-800">
                    {customer.monitorType}
                  </div>
                </div>
                <div className="pt-2">
                  <label className="text-gray-600 text-sm">Status</label>
                  <div className="p-2 border rounded bg-gray-50 text-gray-800">
                    {customer.status}
                  </div>
                </div>
                <div className="pt-2">
                  <label className="text-gray-600 text-sm">Time Mode</label>
                  <div className="p-2 border rounded bg-gray-50 text-gray-800">
                    {customer.time_mode === 'fixed_time'
                      ? 'Fixed Time'
                      : customer.time_mode === 'open_time'
                        ? 'Open Time'
                        : customer.time_mode}
                  </div>
                </div>
                <div className="pt-2">
                  <label className="text-gray-600 text-sm">User Type</label>
                  <div className="p-2 border rounded bg-gray-50 text-gray-800">
                    {customer.type === 'walk-in'
                      ? 'Walk-in'
                      : customer.time_mode === 'reservation'
                        ? 'Reservation'
                        : customer.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
