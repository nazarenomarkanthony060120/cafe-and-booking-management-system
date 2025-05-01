import { WalkInCustomerData } from '@/types/types'
import React from 'react'

interface CustomerTableHeaderProps {
  requestSort: (key: keyof WalkInCustomerData) => void
  getSortIndicator: (key: keyof WalkInCustomerData) => '↕' | '↑' | '↓'
}

export const CustomerTableHeader = ({
  requestSort,
  getSortIndicator,
}: CustomerTableHeaderProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="flex items-center justify-center space-x-1">
            <span>ID</span>
          </div>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('pcNumber')}
        >
          <div className="flex items-center justify-center space-x-1">
            <span>PC No.</span>
            <span className="text-gray-400">{getSortIndicator('pcNumber')}</span>
          </div>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('name')}
        >
          <div className="flex items-center justify-center space-x-1">
            <span>Name</span>
            <span className="text-gray-400">{getSortIndicator('name')}</span>
          </div>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('time_mode')}
        >
          <div className="flex items-center justify-center space-x-1">
            <span>Time Mode</span>
            <span className="text-gray-400">{getSortIndicator('time_mode')}</span>
          </div>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('start_time')}
        >
          <div className="flex items-center justify-center space-x-1">
            <span>Start Time</span>
            <span className="text-gray-400">{getSortIndicator('start_time')}</span>
          </div>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('end_time')}
        >
          <div className="flex items-center justify-center space-x-1">
            <span>End Time</span>
            <span className="text-gray-400">{getSortIndicator('end_time')}</span>
          </div>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('status')}
        >
          <div className="flex items-center justify-center space-x-1">
            <span>Status</span>
            <span className="text-gray-400">{getSortIndicator('status')}</span>
          </div>
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          Payment
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          Details
        </th>
      </tr>
    </thead>
  )
}
