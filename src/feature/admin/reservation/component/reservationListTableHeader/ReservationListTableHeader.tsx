import { ReservationData } from '@/types/types'
import React from 'react'

interface ReservationListTableHeaderProps {
  requestSort: (key: keyof ReservationData) => void
  getSortIndicator: (key: keyof ReservationData) => '↕' | '↑' | '↓'
}

export const ReservationListTableHeader = ({
  requestSort,
  getSortIndicator,
}: ReservationListTableHeaderProps) => {
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
          onClick={() => requestSort('contactNumber')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>Contact Number</span>
            <span className="text-gray-400">{getSortIndicator('contactNumber')}</span>
          </span>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('reservation_type')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>Reservation Type</span>
            <span className="text-gray-400">{getSortIndicator('reservation_type')}</span>
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
          onClick={() => requestSort('reservation_time')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>Reservation Time</span>
            <span className="text-gray-400">{getSortIndicator('reservation_time')}</span>
          </span>
        </th>
        <th
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => requestSort('reservation_status')}
        >
          <span className="flex items-center justify-center space-x-1">
            <span>Status</span>
            <span className="text-gray-400">{getSortIndicator('reservation_status')}</span>
          </span>
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          Details
        </th>
      </tr>
    </thead>
  )
}
