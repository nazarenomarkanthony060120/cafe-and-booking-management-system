import React from 'react'
import PCard from '@/components/PCard'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'

const WalkInCustomer = () => {
    const { data: pcs = [] } = useQuery({
        queryKey: ['pcs'],
        queryFn: api.getPcList,
    })

    const availablePcs = pcs
        .filter(pc => pc.status === 'Available')
        .sort((a, b) => parseInt(b.pcNumber) - parseInt(a.pcNumber))

    return (
        <div className="p-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availablePcs.map((pc) => (
                    <PCard
                        key={pc.id}
                        id={parseInt(pc.pcNumber)}
                        status={pc.status}
                        email={pc.email}
                        source="walk-in"
                        pcNumber={pc.pcNumber}
                    />
                ))}
            </div>
        </div>
    )
}

export default WalkInCustomer
