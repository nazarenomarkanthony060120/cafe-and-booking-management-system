'use client'

import { Button } from '@/components/common/Button'
import GroupReservationModal from '@/layout/user/sidebar/component/GroupReservationModal'
import { PcData } from '@/types/types'
import React from 'react'

interface GroupReservationProps {
    availablePcs: PcData[]
    selectedPc: {
        id: number
        status: string
        email: string
    } | null
    isModalOpen: boolean
    openModal: (pc: { id: number; status: string; email: string }) => void
    closeModal: () => void
}

export const GroupReservation = ({ availablePcs, selectedPc, isModalOpen, openModal, closeModal }: GroupReservationProps) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <Button
                text="Group Reservation"
                className="px-5 py-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xl transition-all duration-300"
                onClick={() =>
                    openModal({
                        id: parseInt(availablePcs[0].pcNumber),
                        status: availablePcs[0].status,
                        email: availablePcs[0].email,
                    })
                }
            />
            {selectedPc && (
                <GroupReservationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    id={selectedPc.id}
                    status={selectedPc.status}
                    email={selectedPc.email}
                    pcs={availablePcs.map((pc) => ({
                        pcName: `PC No. ${pc.pcNumber}`,
                    }))}
                />
            )}
        </div>
    )
}

