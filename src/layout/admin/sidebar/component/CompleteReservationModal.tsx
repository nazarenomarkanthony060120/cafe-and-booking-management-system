import React from 'react'
import { ReservationData } from '@/types/types'
import { CompletationLayout } from '@/feature/admin/reservation/component/reservationListCompletedData/completationLayout/CompletationLayout'
import { CompletationHeader } from '@/feature/admin/reservation/component/reservationListCompletedData/completationHeader/CompletationHeader'
import { CompletationResult } from '@/feature/admin/reservation/component/reservationListCompletedData/completationResult/CompletationResult'
import { CompletationButton } from '@/feature/admin/reservation/component/reservationListCompletedData/completationButton/CompletationButton'

interface CompleteReservationModalProps {
    isOpen: boolean
    onClose: () => void
    reservationData: ReservationData
}

export const CompleteReservationModal = ({
    isOpen,
    onClose,
    reservationData,
}: CompleteReservationModalProps) => {
    if (!isOpen) return null

    return (
        <CompletationLayout onClose={onClose}>
            <CompletationHeader />
            <CompletationResult reservationData={reservationData} />
            <CompletationButton onClose={onClose} />
        </CompletationLayout>
    )
}
