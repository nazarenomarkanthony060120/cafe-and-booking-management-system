import React, { useState } from 'react'
import { Button } from '@/components/common/Button'
import { ReservationData } from '@/types/types'
import { useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc, db, getDoc, collection, query, where, getDocs } from '@/lib/firebase'
import { ViewUserReservationDataLayout } from '@/feature/user/reservation/component/viewUserReservationData/viewUserReservationDataLayout/ViewUserReservationDataLayout'
import { ViewUserReservationDataHeader } from '@/feature/user/reservation/component/viewUserReservationData/viewUserReservationDataHeader/ViewUserReservationDataHeader'
import { ViewUserReservationDataDisplay } from '@/feature/user/reservation/component/viewUserReservationData/viewUserReservationDataDisplay/ViewUserReservationDataDisplay'
import { ViewUserReservationDataButton } from '@/feature/user/reservation/component/viewUserReservationData/viewUserReservationDataButton/ViewUserReservationDataButton'

interface ViewUserReservationDataProps {
  onClose: () => void
  isOpen: boolean
  reservationData: ReservationData
}

const DATE_FORMAT_OPTIONS = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
} as const

export const ViewUserReservationData = ({
  onClose,
  isOpen,
  reservationData,
}: ViewUserReservationDataProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleCancelReservation = async () => {
    setIsLoading(true)
    try {
      const reservationRef = doc(db, 'reservation', reservationData.id!)

      // Split the PC numbers if there are multiple
      const pcNumbers = reservationData.pcNumber.split(',').map((num) => num.trim())

      // Update each PC's status individually
      for (const pcNumber of pcNumbers) {
        const pcsQuery = query(collection(db, 'pcs_list'), where('pcNumber', '==', pcNumber))
        const querySnapshot = await getDocs(pcsQuery)

        if (querySnapshot.empty) {
          console.error(`PC ${pcNumber} does not exist in pcs_list collection`)
          continue // Skip this PC and continue with others
        }

        const pcDoc = querySnapshot.docs[0]
        const pcsListUpdate = doc(db, 'pcs_list', pcDoc.id)

        // Update PC status to Available
        await updateDoc(pcsListUpdate, {
          status: 'Available',
        })
      }

      // Update reservation status
      await updateDoc(reservationRef, {
        reservation_status: 'cancelled',
        reservation_updated_date: new Date()
          .toLocaleString('en-US', DATE_FORMAT_OPTIONS)
          .replace(',', ''),
        cancelled_date: new Date().toLocaleString('en-US', DATE_FORMAT_OPTIONS).replace(',', ''),
      })

      await queryClient.invalidateQueries({ queryKey: ['reservationDataResult'] })
      onClose()
    } catch (error) {
      console.error('Failed to cancel reservation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null
  return (
    <ViewUserReservationDataLayout onClose={onClose}>
      <ViewUserReservationDataHeader />
      <ViewUserReservationDataDisplay reservationData={reservationData} />
      <ViewUserReservationDataButton
        handleCancelReservation={handleCancelReservation}
        isLoading={isLoading}
        onClose={onClose}
      />
    </ViewUserReservationDataLayout>
  )
}
