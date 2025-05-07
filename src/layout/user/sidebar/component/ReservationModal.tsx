import { Button } from '@/components/common/Button'
import { DocumentData } from 'firebase/firestore'
import React, { useState } from 'react'
import { SingleReservationHeader } from '@/feature/user/dashboard/component/singleReservation/singleReservationHeader/SingleReservationHeader'
import { SingleReservationLayout } from '@/feature/user/dashboard/component/singleReservation/singleReservationLayout/SingleReservationLayout'
import { SingleReservationForm } from '@/feature/user/dashboard/component/singleReservation/singleReservationForm/SingleReservationForm'
import { api } from '@/api/api'
import { ReservationData } from '@/types/types'
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useQueryClient } from '@tanstack/react-query'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  pcNumber: string
  status: string
  userData?: DocumentData
  monitorType: string
}

export const ReservationModal = ({ isOpen, onClose, pcNumber, status, userData, monitorType }: ReservationModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const queryClient = useQueryClient()

  const handleReserve = async () => {
    if (!selectedTime || !userData) return

    setIsLoading(true)
    try {
      const reservation: ReservationData = {
        pcNumber,
        reservation_status: 'pending',
        email: userData.email,
        contactNumber: userData.contactNumber,
        start_time: new Date().toISOString(),
        reservation_time: selectedTime,
        monitorType,
        name: userData.name
      }

      await api.reservationData(reservation)

      const pcsRef = collection(db, 'pcs_list')
      const q = query(pcsRef, where('pcNumber', '==', pcNumber))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const pcDoc = querySnapshot.docs[0]
        await updateDoc(pcDoc.ref, {
          status: 'In-use'
        })
      } else {
        console.error('PC not found in pcs_list')
      }

      // Invalidate and refetch the PC list query
      await queryClient.invalidateQueries({ queryKey: ['pcs'] })
      onClose()
    } catch (error) {
      console.error('Error creating reservation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <SingleReservationLayout onClose={onClose} isLoading={isLoading}>
      <SingleReservationHeader pcNumber={pcNumber} />
      <SingleReservationForm userData={userData} monitorType={monitorType} selectedTime={selectedTime} setSelectedTime={setSelectedTime} status={status} />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            type="button"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !selectedTime}
            onClick={handleReserve}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Reserve Now'
            )}
          </button>
          <Button
            text="Close"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            disabled={isLoading}
            onClick={onClose}
          />
        </div>
      </div>
    </SingleReservationLayout>
  )
}