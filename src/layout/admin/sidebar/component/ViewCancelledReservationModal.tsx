import React from 'react'
import { ReservationData } from '@/types/types'
import { ReservationListCancelledLayout } from '@/feature/admin/reservation/component/reservationListCancelledData/reservationListCancelledLayout/ReservationListCancelledLayout'
import { ReservationListCancelledHeader } from '@/feature/admin/reservation/component/reservationListCancelledData/reservationListCancelledHeader/ReservationListCancelledHeader'
import { ReservationListCancelledResult } from '@/feature/admin/reservation/component/reservationListCancelledData/reservationListCancelledResult/ReservationListCancelledResult'
import { ReservationListCancelledButton } from '@/feature/admin/reservation/component/reservationListCancelledData/reservationListCancelledButton/ReservationListCancelledButton'

interface ViewCancelledReservationModalProps {
  isOpen: boolean
  onClose: () => void
  reservationData: ReservationData
}

export const ViewCancelledReservationModal = ({
  isOpen,
  onClose,
  reservationData,
}: ViewCancelledReservationModalProps) => {
  if (!isOpen) return null

  return (
    <ReservationListCancelledLayout onClose={onClose}>
      <ReservationListCancelledHeader />
      <ReservationListCancelledResult reservationData={reservationData} />
      <ReservationListCancelledButton onClose={onClose} />
    </ReservationListCancelledLayout>
  )
}
