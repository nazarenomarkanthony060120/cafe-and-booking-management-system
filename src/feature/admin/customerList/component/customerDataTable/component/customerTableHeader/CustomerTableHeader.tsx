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
          <span className="flex items-center justify-center space-x-1">
            <span>ID</span>
          </span>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('pcNumber')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>PC No.</span>
            <span className="text-gray-400">{getSortIndicator('pcNumber')}</span>
          </span>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('name')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>Name</span>
            <span className="text-gray-400">{getSortIndicator('name')}</span>
          </span>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('time_mode')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>Time Mode</span>
            <span className="text-gray-400">{getSortIndicator('time_mode')}</span>
          </span>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('start_time')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>Start Time</span>
            <span className="text-gray-400">{getSortIndicator('start_time')}</span>
          </span>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('end_time')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>End Time</span>
            <span className="text-gray-400">{getSortIndicator('end_time')}</span>
          </span>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('status')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>Status</span>
            <span className="text-gray-400">{getSortIndicator('status')}</span>
          </span>
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
