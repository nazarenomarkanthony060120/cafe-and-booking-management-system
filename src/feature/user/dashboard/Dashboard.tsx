import React, { useState } from 'react'
import PCard from '@/components/PCard'
import { Button } from '@/components/common/Button'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import { useAuth } from '@/context/AuthProvider'
import { doc, getDoc, db } from '@/lib/firebase'
import Image from 'next/image'
import noData from '@/assets/svg/8961448_3973477.svg'
import { GroupReservationModal } from '@/layout/user/sidebar/component/GroupReservationModal'

const Dashboard = () => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false)
  const { data: pcs = [] } = useQuery({
    queryKey: ['pcs'],
    queryFn: api.getPcList,
  })

  const { user } = useAuth()

  const { data: userData } = useQuery({
    queryKey: ['userData', user?.uid],
    queryFn: async () => {
      if (!user?.uid) return null
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      return userDoc.exists() ? userDoc.data() : null
    },
    enabled: !!user?.uid,
  })

  const availablePcs = pcs
    .filter((pc) => pc.status === 'Available')
    .sort((a, b) => parseInt(b.pcNumber) - parseInt(a.pcNumber))

  const handleOpenGroupModal = () => {
    setIsGroupModalOpen(true)
  }

  const handleCloseGroupModal = () => {
    setIsGroupModalOpen(false)
  }

  return (
    <div className="p-6 w-full">
      {availablePcs.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <Button
              text="Group Reservation"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              onClick={handleOpenGroupModal}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {userData &&
              availablePcs.map((pc) => (
                <PCard
                  key={pc.id}
                  pcNumber={pc.pcNumber}
                  status={pc.status}
                  email={userData.email}
                  monitorType={pc.monitorType}
                  userData={userData}
                />
              ))}
          </div>
          {userData && isGroupModalOpen && (
            <GroupReservationModal
              key="group-reservation-modal"
              isOpen={isGroupModalOpen}
              onClose={handleCloseGroupModal}
              pcs={availablePcs.map((pc) => ({ pcName: pc.pcNumber }))}
              userData={userData}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <Image src={noData} alt="No data available" width={500} height={500} />
          <p className="mt-4 text-lg text-gray-500">No available PC</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
