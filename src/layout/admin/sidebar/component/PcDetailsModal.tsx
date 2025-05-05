import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { WalkInCustomerData } from '@/types/types'
import { api } from '@/api/api'
import { ViewPcUsersLayout } from '@/feature/admin/dashboard/component/viewPcUsers/viewPcUsersLayout/ViewPcUsersLayout'
import { ViewPcUsersHeader } from '@/feature/admin/dashboard/component/viewPcUsers/viewPcUsersHeader/ViewPcUsersHeader'
import { ViewPcUsersDisplay } from '@/feature/admin/dashboard/component/viewPcUsers/viewPcUsersDisplay/ViewPcUsersDisplay'
import { ViewPcUsersDisplayButton } from '@/feature/admin/dashboard/component/viewPcUsers/viewPcUsersDisplayButton/ViewPcUsersDisplayButton'

interface PcDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  pcNumber: string
  status: string
}

const PcDetailsModal = ({ isOpen, onClose, pcNumber }: PcDetailsModalProps) => {
  const { data, isLoading, isError } = useQuery<WalkInCustomerData[]>({
    queryKey: ['customers'],
    queryFn: api.getCustomerData,
    enabled: isOpen,
  })

  const matchedCustomers = data?.filter((customer) => customer.pcNumber === pcNumber) ?? []

  if (!isOpen) return null

  return (
    <ViewPcUsersLayout isOpen={isOpen} onClose={onClose}>
      <ViewPcUsersHeader pcNumber={pcNumber} />
      <ViewPcUsersDisplay isLoading={isLoading} matchedCustomers={matchedCustomers} isError={isError} />
      <ViewPcUsersDisplayButton onClose={onClose} />
    </ViewPcUsersLayout >
  )
}

export default PcDetailsModal
