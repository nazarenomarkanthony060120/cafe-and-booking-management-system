'use client'

import React, { useState } from 'react'
import { WalkInCustomerData } from '@/types/types'
import { Button } from '@/components/common/Button'
import { ViewCustomerListModal } from '@/layout/admin/sidebar/component/ViewCustomerListModal'
import { ConfirmationModal } from '@/layout/admin/sidebar/component/ConfirmationModal'
import { collection, db, getDocs, query, updateDoc, where } from '@/lib/firebase'
import { useQueryClient } from '@tanstack/react-query'

interface CustomerListTableBodyProps {
  customers: WalkInCustomerData[]
  startingRowNumber: number
}

export const CustomerListTableBody = ({
  customers,
  startingRowNumber,
}: CustomerListTableBodyProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<WalkInCustomerData | null>(null)
  const [modalType, setModalType] = useState<'view' | 'confirm' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleSeeMore = (customer: WalkInCustomerData) => {
    setSelectedCustomer(customer)
    if (customer.action_status === 'On-going') {
      setModalType('view')
    } else if (customer.action_status === 'Waiting for Payment') {
      setModalType('confirm')
    } else if (customer.action_status === 'Completed') {
      setModalType('view')
    } else {
      setModalType(null)
    }
  }

  const closeModal = () => {
    setModalType(null)
    setSelectedCustomer(null)
  }

  const handleConfirmCompletion = async () => {
    if (!selectedCustomer) return
    setIsLoading(true)
    try {
      const q = query(
        collection(db, 'customers'),
        where('pcNumber', '==', selectedCustomer.pcNumber)
      )
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref
        await updateDoc(docRef, {
          action_status: 'Completed',
        })

        const pcQuery = query(
          collection(db, 'pcs_list'),
          where('pcNumber', '==', selectedCustomer.pcNumber)
        )
        const pcQuerySnapshot = await getDocs(pcQuery)
        if (!pcQuerySnapshot.empty) {
          const pcDocRef = pcQuerySnapshot.docs[0].ref
          await updateDoc(pcDocRef, {
            status: 'Available',
          })
        }

        queryClient.invalidateQueries({ queryKey: ['customers'] })
        queryClient.invalidateQueries({ queryKey: ['pcs_list'] })
      }
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update status. Please try again.')
    } finally {
      setIsLoading(false)
      closeModal()
    }
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
              {customer.time_mode === 'fixed_time'
                ? 'Fix Time'
                : customer.time_mode === 'open_time'
                  ? 'Open Time'
                  : ''}
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
                  customer.action_status === 'On-going'
                    ? 'bg-yellow-100 text-yellow-800'
                    : customer.action_status === 'Waiting for Payment'
                      ? 'bg-red-100 text-red-800'
                      : customer.action_status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                }`}
              >
                {customer.action_status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {customer.payment ? `₱ ${customer.payment}` : '--'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              <Button
                text="See More"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handleSeeMore(customer)}
              />
            </td>
          </tr>
        ))}
      </tbody>

      {modalType === 'view' && selectedCustomer && (
        <ViewCustomerListModal customerData={selectedCustomer} isOpen={true} onClose={closeModal} />
      )}
      {modalType === 'confirm' && selectedCustomer && (
        <ConfirmationModal
          customerData={selectedCustomer}
          isOpen={true}
          onClose={closeModal}
          onConfirm={handleConfirmCompletion}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
