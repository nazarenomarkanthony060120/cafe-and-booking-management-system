import React from 'react'
import { ReservationData } from '@/types/types'

interface UserReservationPaginationProps {
  indexOfFirstRow: number
  indexOfLastRow: number
  filteredData: ReservationData[]
  paginate: (pageNumber: number) => void
  currentPage: number
  totalPages: number
}

export const UserReservationPagination = ({
  indexOfFirstRow,
  indexOfLastRow,
  filteredData,
  paginate,
  currentPage,
  totalPages,
}: UserReservationPaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{indexOfFirstRow + 1}</span> to{' '}
        <span className="font-medium">{Math.min(indexOfLastRow, filteredData.length)}</span> of{' '}
        <span className="font-medium">{filteredData.length}</span> results
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className={`px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              currentPage === number
                ? 'bg-blue-500 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
