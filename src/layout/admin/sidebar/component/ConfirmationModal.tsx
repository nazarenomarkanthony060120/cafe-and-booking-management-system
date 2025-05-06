import React from 'react'
import { WalkInCustomerData } from '@/types/types'
import { Button } from '@/components/common/Button'
import { ConfirmCompletionLayout } from '@/feature/admin/customerList/component/customerDataTable/component/confirmCompletion/confirmCompletionLayout/ConfirmCompletionLayout'
import { ConfirmCompletionHeader } from '@/feature/admin/customerList/component/customerDataTable/component/confirmCompletion/confirmCompletionHeader/ConfirmCompletionHeader'
import { ConfirmCompletionDataResult } from '@/feature/admin/customerList/component/customerDataTable/component/confirmCompletion/confirmCompletionDataResult/ConfirmCompletionDataResult'
import { ConfirmCompletionButton } from '@/feature/admin/customerList/component/customerDataTable/component/confirmCompletion/confirmCompletionButton/ConfirmCompletionButton'

interface ConfirmationModalProps {
  customerData: WalkInCustomerData
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading: boolean
}

export const ConfirmationModal = ({
  customerData,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <ConfirmCompletionLayout onClose={onClose} isOpen={isOpen}>
      <ConfirmCompletionHeader />
      <ConfirmCompletionDataResult customerData={customerData} />
      <ConfirmCompletionButton
        isLoading={isLoading}
        onConfirm={onConfirm}
        onClose={onClose}
        customerData={customerData}
      />
    </ConfirmCompletionLayout>
  )
}
