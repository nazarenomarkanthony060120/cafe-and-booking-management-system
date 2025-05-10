import React from 'react'
import { ReservationData } from '@/types/types'
import { CancelledReservationLayout } from '@/feature/user/reservation/component/cancelledReservation/cancelledReservationLayout/CancelledReservationLayout'
import { CancelledReservationHeader } from '@/feature/user/reservation/component/cancelledReservation/cancelledReservationHeader/CancelledReservationHeader'
import { CancelledReservationData } from '@/feature/user/reservation/component/cancelledReservation/cancelledReservationData/CancelledReservationData'
import { CancelledReservationButton } from '@/feature/user/reservation/component/cancelledReservation/cancelledReservationButton/CancelledReservationButton'

interface CancelledReservationModalProps {
  isOpen: boolean
  onClose: () => void
  reservationData: ReservationData
}

export const CancelledReservationModal = ({
  isOpen,
  onClose,
  reservationData,
}: CancelledReservationModalProps) => {
  if (!isOpen) return null

  return (
    <CancelledReservationLayout onClose={onClose}>
      <CancelledReservationHeader />
      <CancelledReservationData reservationData={reservationData} />
      <CancelledReservationButton onClose={onClose} />
    </CancelledReservationLayout>
  )
}
