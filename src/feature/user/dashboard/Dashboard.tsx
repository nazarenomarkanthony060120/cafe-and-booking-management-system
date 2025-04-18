import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import { UserDashboardLayout } from './component/userDasboardLayout/UserDashboardLayout'
import { GroupReservation } from './component/groupReservation/GroupReservation'
import { DisplayPcList } from './component/displayPcList/DisplayPcList'

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

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: api.getUserInfo,
  })

  const availablePcs = pcs.filter(pc => pc.status === 'Available')

  const openModal = (pc: { id: number; status: string }) => {
    if (!userData) return
    setSelectedPc({
      ...pc,
      email: userData.email,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <UserDashboardLayout>
      <GroupReservation
        availablePcs={availablePcs}
        selectedPc={selectedPc}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
      {userData && <DisplayPcList availablePcs={availablePcs} userData={userData} />}
    </UserDashboardLayout>
  )
}

export default Dashboard
