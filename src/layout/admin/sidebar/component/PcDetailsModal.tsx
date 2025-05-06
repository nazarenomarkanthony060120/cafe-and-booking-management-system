import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { WalkInCustomerData } from '@/types/types'
import { api } from '@/api/api'
import { ViewPcUsersLayout } from '@/feature/admin/dashboard/component/viewPcUsers/viewPcUsersLayout/ViewPcUsersLayout'
import { ViewPcUsersHeader } from '@/feature/admin/dashboard/component/viewPcUsers/viewPcUsersHeader/ViewPcUsersHeader'
import { ViewPcUsersDisplay } from '@/feature/admin/dashboard/component/viewPcUsers/viewPcUsersDisplay/ViewPcUsersDisplay'
import { ViewPcUsersDisplayButton } from '@/feature/admin/dashboard/component/viewPcUsers/viewPcUsersDisplayButton/ViewPcUsersDisplayButton'
import { collection, db, getDocs, query, where } from '@/lib/firebase'

interface PcDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  pcNumber: string
  status: string
}

const PcDetailsModal = ({ isOpen, onClose, pcNumber }: PcDetailsModalProps) => {
  const {
    data: customersData,
    isLoading: isCustomersLoading,
    isError: isCustomersError,
  } = useQuery<WalkInCustomerData[]>({
    queryKey: ['customers'],
    queryFn: api.getCustomerData,
    enabled: isOpen,
  })

  const {
    data: pcData,
    isLoading: isPcLoading,
    isError: isPcError,
  } = useQuery({
    queryKey: ['pc-status', pcNumber],
    queryFn: async () => {
      const q = query(collection(db, 'pcs_list'), where('pcNumber', '==', pcNumber))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data()
      }
      return null
    },
    enabled: isOpen,
  })

  const matchedCustomers = customersData?.filter((customer) => customer.pcNumber === pcNumber) ?? []
  const isLoading = isCustomersLoading || isPcLoading
  const isError = isCustomersError || isPcError

  if (!isOpen) return null

  return (
    <ViewPcUsersLayout isOpen={isOpen} onClose={onClose}>
      <ViewPcUsersHeader pcNumber={pcNumber} />
      <ViewPcUsersDisplay
        isLoading={isLoading}
        matchedCustomers={pcData?.status === 'Available' ? [] : matchedCustomers}
        isError={isError}
      />
      <ViewPcUsersDisplayButton onClose={onClose} />
    </ViewPcUsersLayout>
  )
}

export default PcDetailsModal
