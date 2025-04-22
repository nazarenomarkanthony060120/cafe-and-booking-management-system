'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import PCard from '@/components/PCard'
import AddPCModal from '@/layout/user/sidebar/component/AddPCModal'
import { Button } from '@/components/common/Button'
import Image from 'next/image'
import noData from '@/assets/svg/8961448_3973477.svg'

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

  const sortedPcs = pcs.slice().sort((a, b) => parseInt(b.pcNumber) - parseInt(a.pcNumber))

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

      {sortedPcs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sortedPcs.map((pc) => (
            <PCard key={pc.id} id={parseInt(pc.pcNumber)} status={pc.status} email={pc.email} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <Image src={noData} alt="No PCs available" width={500} height={500} />
          <p className="mt-4 text-lg text-gray-500">No PC available</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
