import React, { useState } from 'react'
import PCard from '@/components/PCard'
import { Button } from '@/components/common/Button'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import GroupReservationModal from '@/layout/user/sidebar/component/GroupReservationModal'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPc, setSelectedPc] = useState<{
    id: number
    status: string
    email: string
  } | null>(null)

  const { data: pcs = [], refetch } = useQuery({
    queryKey: ['pcs'],
    queryFn: api.getPcList,
  })

  // Filter PCs to show only available ones
  const availablePcs = pcs.filter((pc) => pc.status === 'Available')

  const openModal = (pc: { id: number; status: string; email: string }) => {
    setSelectedPc(pc)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold"></h2>
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
            pcs={availablePcs.map((pc) => ({ pcName: `PC No. ${pc.pcNumber}` }))}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {availablePcs.map((pc) => (
          <PCard
            key={pc.id}
            pcNumber={pc.pcNumber}
            status={pc.status}
            email={pc.email}
            monitorType={''}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
