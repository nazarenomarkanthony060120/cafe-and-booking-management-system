'use client'

import React from 'react'
import PCard from '@/components/PCard'
import { PcData, UserData } from '@/types/types'

interface DisplayPcListProps {
    availablePcs: PcData[],
    userData: UserData
}
export const DisplayPcList = ({ availablePcs, userData }: DisplayPcListProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availablePcs.map((pc) => (
                <PCard
                    key={pc.id}
                    id={parseInt(pc.pcNumber)}
                    status={pc.status}
                    email={userData.email}
                />
            ))}
        </div>
    )
}
