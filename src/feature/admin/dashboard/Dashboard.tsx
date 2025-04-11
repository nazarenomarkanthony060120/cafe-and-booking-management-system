import React, { useState } from 'react'
import PCard from '@/components/PCard'
import AddPCModal from '@/layout/user/sidebar/component/AddPCModal'
import { Button } from '@/components/common/Button'
const pcs = [
  { id: 1, status: 'In-Use', email: 'admin@email.com' },
  { id: 2, status: 'In-Use', email: 'admin@email.com' },
  { id: 3, status: 'In-Use', email: 'admin@email.com' },
  { id: 4, status: 'Available', email: 'admin@email.com' },
  { id: 5, status: 'Available', email: 'admin@email.com' },
  { id: 6, status: 'Available', email: 'admin@email.com' },
  { id: 7, status: 'In-Use', email: 'admin@email.com' },
  { id: 8, status: 'Available', email: 'admin@email.com' },
  { id: 9, status: 'In-Use', email: 'admin@email.com' },
  { id: 10, status: 'In-Use', email: 'admin@email.com' },
]

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPc, setnewPc] = useState<{
    id: number
    status: string
    email: string
  } | null>(null)

  const openModal = (pc: { id: number; status: string; email: string }) => {
    setnewPc(pc)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold"></h2>
        <Button
          text="Add new PC"
          className="px-5 py-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xl transition-all duration-300"
          onClick={() => openModal(pcs[0])}
        />
        {newPc && <AddPCModal isOpen={isModalOpen} onClose={closeModal} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {pcs.map((pc) => (
          <PCard key={pc.id} id={pc.id} status={pc.status} email={pc.email} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
