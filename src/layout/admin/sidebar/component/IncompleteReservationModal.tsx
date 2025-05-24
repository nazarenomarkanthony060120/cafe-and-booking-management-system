import React from 'react'
import { ReservationData } from '@/types/types'
import { IncompleteLayout } from '@/feature/admin/reservation/component/reservationIncompleteList/incompleteLayout/IncompleteLayout'
import { IncompleteHeader } from '@/feature/admin/reservation/component/reservationIncompleteList/incompleteHeader/IncompleteHeader'
import { IncompleteDataResult } from '@/feature/admin/reservation/component/reservationIncompleteList/incompleteDataResult/IncompleteDataResult'
import { IncompleteButton } from '@/feature/admin/reservation/component/reservationIncompleteList/incompleteButton/IncompleteButton'

interface IncompleteReservationModalProps {
    isOpen: boolean
    onClose: () => void
    reservationData: ReservationData
}

export const IncompleteReservationModal = ({
    isOpen,
    onClose,
    reservationData,
}: IncompleteReservationModalProps) => {
    if (!isOpen) return null

    return (
        <IncompleteLayout onClose={onClose}>
            <IncompleteHeader />
            <IncompleteDataResult reservationData={reservationData} />
            <IncompleteButton onClose={onClose} />
        </IncompleteLayout>
    )
}
