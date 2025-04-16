'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import PCard from '@/components/PCard'
import AddPCModal from '@/layout/user/sidebar/component/AddPCModal'
import { Button } from '@/components/common/Button'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: pcs = [], refetch } = useQuery({
    queryKey: ['pcs'],
    queryFn: api.getPcList,
  })

  const closeModal = () => {
    setIsModalOpen(false)
    refetch()
  }

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold"></h2>
        <Button
          text="Add new PC"
          className="px-5 py-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xl transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        />
        <AddPCModal isOpen={isModalOpen} onClose={closeModal} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {pcs
          .slice()
          .sort((a, b) => parseInt(a.pcNumber) - parseInt(b.pcNumber))
          .map((pc) => (
            <PCard key={pc.id} id={parseInt(pc.pcNumber)} status={pc.status} email={pc.email} />
          ))}
      </div>
    </div>
  )
}

export default Dashboard
