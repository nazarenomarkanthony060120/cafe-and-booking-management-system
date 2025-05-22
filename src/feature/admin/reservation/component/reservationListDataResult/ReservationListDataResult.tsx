'use client'

import React, { useState } from 'react'
import { ReservationData } from '@/types/types'
import { Button } from '@/components/common/Button'
import { ViewReservationDataModal } from '@/layout/admin/sidebar/component/ViewReservationDataModal'
import { ViewCancelledReservationModal } from '@/layout/admin/sidebar/component/ViewCancelledReservationModal'
import { WaitingArrivalModal } from '@/layout/admin/sidebar/component/WaitinArrivalModal'

interface ReservationListDataResultProps {
  reservationData: ReservationData[]
  startingRowNumber: number
}

export const ReservationListDataResult = ({
  reservationData,
  startingRowNumber,
}: ReservationListDataResultProps) => {
  const [selectedReservation, setSelectedReservation] = useState<ReservationData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false)
  const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false)

  const handleOpenModal = (reservation: ReservationData) => {
    if (reservation.reservation_status === 'pending') {
      setSelectedReservation(reservation)
      setIsModalOpen(true)
    } else if (reservation.reservation_status === 'cancelled') {
      setSelectedReservation(reservation)
      setIsCancelledModalOpen(true)
    } else if (reservation.reservation_status === 'approved') {
      setSelectedReservation(reservation)
      setIsWaitingModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsCancelledModalOpen(false)
    setIsWaitingModalOpen(false)
    setSelectedReservation(null)
  }

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200">
        {reservationData.map((reservationData, index) => (
          <tr
            key={index}
            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {startingRowNumber + index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationData.pcNumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationData.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationData.contactNumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationData.reservation_type === 'single-reservation'
                ? 'Individual'
                : reservationData.reservation_type === 'group-reservation'
                  ? 'Group'
                  : ''}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationData.time_mode === 'fixed_time'
                ? 'Fix Time'
                : reservationData.time_mode === 'open_time'
                  ? 'Open Time'
                  : ''}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationData.reservation_time} mins
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reservationData.reservation_status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : reservationData.reservation_status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : reservationData.reservation_status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : reservationData.reservation_status === 'logout'
                        ? 'bg-yellow-100 text-yellow-800'
                        : reservationData.reservation_status === 'incomplete'
                          ? 'bg-red-100 text-red-800'
                          : reservationData.reservation_status === 'complete'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {reservationData.reservation_status === 'approved'
                  ? 'Waiting for Arrival'
                  : reservationData.reservation_status.charAt(0).toUpperCase() +
                  reservationData.reservation_status.slice(1)}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              <Button
                text="See More"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handleOpenModal(reservationData)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      {selectedReservation && (
        <>
          {/* view reservation data modal part */}
          <ViewReservationDataModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            reservationData={selectedReservation}
          />

          {/* cancelled reservation modal part */}
          <ViewCancelledReservationModal
            isOpen={isCancelledModalOpen}
            onClose={handleCloseModal}
            reservationData={selectedReservation}
          />

          {/* waiting arrival reservation modal part */}
          <WaitingArrivalModal
            isOpen={isWaitingModalOpen}
            onClose={handleCloseModal}
            reservationData={selectedReservation}
          />
        </>
      )}
    </>
  )
}
