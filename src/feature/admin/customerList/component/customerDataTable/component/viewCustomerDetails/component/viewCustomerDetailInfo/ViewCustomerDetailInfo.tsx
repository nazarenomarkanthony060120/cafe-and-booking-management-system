'use client'

import React, { useState } from 'react'
import { WalkInCustomerData } from '@/types/types'
import { ConfirmationModal } from '@/layout/admin/sidebar/component/ConfirmationModal'
import { Button } from '@/components/common/Button'
import { collection, db, getDocs, query, updateDoc, where } from '@/lib/firebase'
import { ViewCustomerDetailInfoDisplay } from './component/ViewCustomerDetailInfoDisplay'
import { ViewCustomerDetailInfoButton } from './component/ViewCustomerDetailInfoButton'

interface ViewCustomerDetailInfoProps {
  customerData: WalkInCustomerData
  onClose: () => void
}

export const ViewCustomerDetailInfo = ({ customerData, onClose }: ViewCustomerDetailInfoProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      const currentDate = new Date()
      const formattedTime = formatDateTime(currentDate)

      const q = query(collection(db, 'customers'), where('pcNumber', '==', customerData.pcNumber))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref
        await updateDoc(docRef, {
          end_time: formattedTime,
          updated_date: formattedTime,
        })
      }
    } catch (error) {
      console.error('Failed to update end time:', error)
      alert('Failed to update end time. Please try again.')
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    setShowConfirmation(true)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleComplete()
      }}
      className="space-y-6"
    >
      <ViewCustomerDetailInfoDisplay customerData={customerData} />
      <ViewCustomerDetailInfoButton
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onClick={onClose}
        customerData={customerData}
        onClose={onClose}
      />
    </form>
  )
}
