import React from 'react'
import { ReservationData } from '@/types/types'
import { ApprovedReservationLayout } from '@/feature/user/reservation/component/approvedReservation/approvedLayout/ApprovedLayout'
import { ApprovedHeader } from '@/feature/user/reservation/component/approvedReservation/approvedHeader/ApprovedHeader'
import { ApprovedData } from '@/feature/user/reservation/component/approvedReservation/approvedData/ApprovedData'
import { ApprovedButton } from '@/feature/user/reservation/component/approvedReservation/approvedButton/ApprovedButton'

interface ApprovedReservationModalProps {
    isOpen: boolean
    onClose: () => void
    reservationData: ReservationData
}

export const ApprovedReservationModal = ({
    isOpen,
    onClose,
    reservationData,
}: ApprovedReservationModalProps) => {
    if (!isOpen) return null

    return (
        <ApprovedReservationLayout onClose={onClose}>
            <ApprovedHeader />
            <ApprovedData reservationData={reservationData} />
            <ApprovedButton onClose={onClose} />
        </ApprovedReservationLayout>
    )
}
