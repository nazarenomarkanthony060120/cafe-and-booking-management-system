import React, { useState } from 'react'
import { ReservationData } from '@/types/types'
import { useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc, db, getDoc, collection, query, where, getDocs } from '@/lib/firebase'
import { ReservationListViewDetailsLayout } from '@/feature/admin/reservation/component/reservationListViewDetails/reservationListViewDetailsLayout/ReservationListViewDetailsLayout'
import { ReservationListViewDetailsHeader } from '@/feature/admin/reservation/component/reservationListViewDetails/reservationListViewDetailsHeader/ReservationListViewDetailsHeader'
import { ReservationListViewDetailsData } from '@/feature/admin/reservation/component/reservationListViewDetails/reservationListViewDetailsData/ReservationListViewDetailsData'
import { ReservationListViewDetailsButton } from '@/feature/admin/reservation/component/reservationListViewDetails/reservationListViewDetailsButton/ReservationListViewDetailsButton'

interface ViewReservationDataModalProps {
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

export const ViewReservationDataModal = ({
  onClose,
  isOpen,
  reservationData,
}: ViewReservationDataModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleCancelReservation = async () => {
    setIsLoading(true)
    try {
      const reservationRef = doc(db, 'reservation', reservationData.id!)

      const pcNumbers = reservationData.pcNumber.split(',').map((num) => num.trim())

      for (const pcNumber of pcNumbers) {
        const pcsQuery = query(collection(db, 'pcs_list'), where('pcNumber', '==', pcNumber))
        const querySnapshot = await getDocs(pcsQuery)

        if (querySnapshot.empty) {
          console.error(`PC ${pcNumber} does not exist in pcs_list collection`)
          continue
        }

        const pcDoc = querySnapshot.docs[0]
        const pcsListUpdate = doc(db, 'pcs_list', pcDoc.id)

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

      await queryClient.invalidateQueries({ queryKey: ['reservationData'] })
      onClose()
    } catch (error) {
      console.error('Failed to cancel reservation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveReservation = async () => {
    setIsLoading(true)
    try {
      const reservationRef = doc(db, 'reservation', reservationData.id!)

      const pcNumbers = reservationData.pcNumber.split(',').map((num) => num.trim())

      for (const pcNumber of pcNumbers) {
        const pcsQuery = query(collection(db, 'pcs_list'), where('pcNumber', '==', pcNumber))
        const querySnapshot = await getDocs(pcsQuery)

        if (querySnapshot.empty) {
          console.error(`PC ${pcNumber} does not exist in pcs_list collection`)
          continue
        }

        const pcDoc = querySnapshot.docs[0]
        const pcsListUpdate = doc(db, 'pcs_list', pcDoc.id)

        // Update PC status to In-use
        await updateDoc(pcsListUpdate, {
          status: 'In-use',
        })
      }

      await updateDoc(reservationRef, {
        reservation_status: 'approved',
        reservation_updated_date: new Date()
          .toLocaleString('en-US', DATE_FORMAT_OPTIONS)
          .replace(',', ''),
        approved_date: new Date().toLocaleString('en-US', DATE_FORMAT_OPTIONS).replace(',', ''),
      })

      await queryClient.invalidateQueries({ queryKey: ['reservationData'] })
      onClose()
    } catch (error) {
      console.error('Failed to cancel reservation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null
  return (
    <ReservationListViewDetailsLayout onClose={onClose}>
      <ReservationListViewDetailsHeader />
      <ReservationListViewDetailsData reservationData={reservationData} />
      <ReservationListViewDetailsButton
        handleCancelReservation={handleCancelReservation}
        handleApproveReservation={handleApproveReservation}
        isLoading={isLoading}
        onClose={onClose}
      />
    </ReservationListViewDetailsLayout>
  )
}
