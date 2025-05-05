import React from 'react'
import PCard from '@/components/PCard'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import Image from 'next/image'
import noData from '@/assets/svg/8961448_3973477.svg'
const WalkInCustomer = () => {
  const { data: pcs = [] } = useQuery({
    queryKey: ['pcs'],
    queryFn: api.getPcList,
  })

  const availablePcs = pcs
    .filter((pc) => pc.status === 'Available')
    .sort((a, b) => parseInt(b.pcNumber) - parseInt(a.pcNumber))

  return (
    <div className="p-6 w-full">
      {availablePcs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availablePcs.map((pc) => (
            <PCard
              key={pc.id}
              status={pc.status}
              email={pc.email}
              monitorType={pc.monitorType}
              source="walk-in"
              pcNumber={pc.pcNumber}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <Image src={noData} alt="No data available" width={500} height={500} />
          <p className="mt-4 text-lg text-gray-500">No available PC</p>
        </div>
      )}
    </div>
  )
}

export default WalkInCustomer
