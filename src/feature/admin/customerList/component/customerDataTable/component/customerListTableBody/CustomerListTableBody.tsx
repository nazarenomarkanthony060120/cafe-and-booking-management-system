import React, { useState } from 'react'
import { WalkInCustomerData } from '@/types/types'
import { Button } from '@/components/common/Button'
import { ViewCustomerListModal } from '@/layout/admin/sidebar/component/ViewCustomerListModal'

interface CustomerListTableBodyProps {
  customers: WalkInCustomerData[]
  startingRowNumber: number
}

export const CustomerListTableBody = ({
  customers,
  startingRowNumber,
}: CustomerListTableBodyProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<WalkInCustomerData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSeeMore = (customer: WalkInCustomerData) => {
    setSelectedCustomer(customer)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCustomer(null)
  }

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200">
        {customers.map((customer, index) => (
          <tr
            key={index}
            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {startingRowNumber + index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {customer.pcNumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {customer.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {customer.time_mode === 'open_time' ? 'Open Time' : customer.time_mode}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {customer.start_time}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {customer.end_time || '--'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  !customer.end_time
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {!customer.end_time ? 'On-going' : 'Completed'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {!customer.end_time ? '--' : customer.payment}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              <Button
                text="See More"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handleSeeMore(customer)}
              />
              {selectedCustomer && (
                <ViewCustomerListModal
                  customerData={selectedCustomer}
                  isOpen={isModalOpen}
                  onClose={closeModal}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  )
}
