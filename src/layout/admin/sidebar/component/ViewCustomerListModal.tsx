import React from 'react'
import { WalkInCustomerData } from '@/types/types'
import { ViewCustomerDetailLayout } from '@/feature/admin/customerList/component/customerDataTable/component/viewCustomerDetails/component/viewCustomerDetailLayout/ViewCustomerDetailLayout'
import { ViewCustomerHeader } from '@/feature/admin/customerList/component/customerDataTable/component/viewCustomerDetails/component/viewCustomerHeader/ViewCustomerHeader'
import { ViewCustomerDetailInfo } from '@/feature/admin/customerList/component/customerDataTable/component/viewCustomerDetails/component/viewCustomerDetailInfo/ViewCustomerDetailInfo'

interface ViewCustomerListModalProps {
  customerData: WalkInCustomerData
  isOpen: boolean
  onClose: () => void
}

export const ViewCustomerListModal = ({
  customerData,
  isOpen,
  onClose,
}: ViewCustomerListModalProps) => {
  if (!isOpen) return null

  return (
    <ViewCustomerDetailLayout isOpen={isOpen} onClose={onClose}>
      <ViewCustomerHeader />
      <ViewCustomerDetailInfo customerData={customerData} onClose={onClose} />
    </ViewCustomerDetailLayout>
  )
}
