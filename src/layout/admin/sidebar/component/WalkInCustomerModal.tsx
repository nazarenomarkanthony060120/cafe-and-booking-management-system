'use client'

import React from 'react'
import { WalkInCustomerLayout } from '@/feature/admin/walkInCustomer/component/walkInCustomerLayout/WalkInCustomerLayout'
import { WalkInCustomerHeader } from '@/feature/admin/walkInCustomer/component/walkInCustomerHeader/WalkinCustomerHeader'
import { WalkInCustomerInputForm } from '@/feature/admin/walkInCustomer/component/walkInCustomerInputForm/WalkinCustomerForm'

interface WalkInCustomerModalProps {
    isOpen: boolean
    onClose: () => void
    id: number
    status: string
    pcNumber: string
}

const WalkInCustomerModal = ({
    isOpen,
    onClose,
    id,
    status,
    pcNumber,
}: WalkInCustomerModalProps) => {
    return (
        <WalkInCustomerLayout isOpen={isOpen} onClose={onClose}>
            <WalkInCustomerHeader id={id} />
            <WalkInCustomerInputForm status={status} pcNumber={pcNumber} onClose={onClose} />
        </WalkInCustomerLayout>
    )
}

export default WalkInCustomerModal
