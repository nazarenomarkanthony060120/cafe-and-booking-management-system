'use client'

import React from 'react'
import { WalkInCustomerLayout } from '@/feature/admin/walkInCustomer/component/walkInCustomerLayout/WalkInCustomerLayout'
import { WalkInCustomerHeader } from '@/feature/admin/walkInCustomer/component/walkInCustomerHeader/WalkinCustomerHeader'
import { WalkInCustomerInputForm } from '@/feature/admin/walkInCustomer/component/walkInCustomerInputForm/WalkinCustomerForm'

interface WalkInCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  status: string
  pcNumber: string
  monitorType: string
}

const WalkInCustomerModal = ({
  isOpen,
  onClose,
  status,
  pcNumber,
  monitorType,
}: WalkInCustomerModalProps) => {
  return (
    <WalkInCustomerLayout isOpen={isOpen} onClose={onClose}>
      <WalkInCustomerHeader pcNumber={pcNumber} />
      <WalkInCustomerInputForm status={status} pcNumber={pcNumber} onClose={onClose} monitorType={monitorType} />
    </WalkInCustomerLayout>
  )
}

export default WalkInCustomerModal
