'use client'

import React, { useState } from 'react'
import { ReservationData } from '@/types/types'
import { Button } from '@/components/common/Button'
import { ViewUserReservationData } from '@/layout/user/sidebar/component/ViewUserReservationData'
import { CancelledReservationModal } from '@/layout/user/sidebar/component/CancelledReservationModal'

interface UserReservationDataResultProps {
  reservationDataResult: ReservationData[]
  startingRowNumber: number
}

export const UserReservationDataResult = ({
  reservationDataResult,
  startingRowNumber,
}: UserReservationDataResultProps) => {
  const [selectedReservation, setSelectedReservation] = useState<ReservationData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false)

  const handleOpenModal = (reservation: ReservationData) => {
    if (reservation.reservation_status === 'pending') {
      setSelectedReservation(reservation)
      setIsModalOpen(true)
    } else if (reservation.reservation_status === 'cancelled') {
      setSelectedReservation(reservation)
      setIsCancelledModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsCancelledModalOpen(false)
    setSelectedReservation(null)
  }

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200">
        {reservationDataResult.map((reservationDataResult, index) => (
          <tr
            key={index}
            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {startingRowNumber + index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationDataResult.pcNumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationDataResult.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationDataResult.reservation_type === 'single-reservation'
                ? 'Individual'
                : reservationDataResult.reservation_type === 'group-reservation'
                  ? 'Group'
                  : ''}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationDataResult.time_mode === 'fixed_time'
                ? 'Fix Time'
                : reservationDataResult.time_mode === 'open_time'
                  ? 'Open Time'
                  : ''}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              {reservationDataResult.reservation_time} mins
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  reservationDataResult.reservation_status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : reservationDataResult.reservation_status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : reservationDataResult.reservation_status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : reservationDataResult.reservation_status === 'logout'
                          ? 'bg-yellow-100 text-yellow-800'
                          : reservationDataResult.reservation_status === 'complete'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                }`}
              >
                {reservationDataResult.reservation_status.charAt(0).toUpperCase() +
                  reservationDataResult.reservation_status.slice(1)}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
              <Button
                text="See More"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handleOpenModal(reservationDataResult)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      {selectedReservation && (
        <>
          <ViewUserReservationData
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            reservationData={selectedReservation}
          />
          <CancelledReservationModal
            isOpen={isCancelledModalOpen}
            onClose={handleCloseModal}
            reservationData={selectedReservation}
          />
        </>
      )}
    </>
  )
}
