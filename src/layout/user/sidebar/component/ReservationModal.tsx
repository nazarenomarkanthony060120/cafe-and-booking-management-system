import { Button } from '@/components/common/Button'
import { DocumentData } from 'firebase/firestore'
import React, { useState } from 'react'
import { SingleReservationHeader } from '@/feature/user/dashboard/component/singleReservation/singleReservationHeader/SingleReservationHeader'
import { SingleReservationLayout } from '@/feature/user/dashboard/component/singleReservation/singleReservationLayout/SingleReservationLayout'
import { SingleReservationForm } from '@/feature/user/dashboard/component/singleReservation/singleReservationForm/SingleReservationForm'
import { api } from '@/api/api'
import { ReservationData } from '@/types/types'
import { doc, updateDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useQueryClient } from '@tanstack/react-query'
import { SingleReservationButton } from '@/feature/user/dashboard/component/singleReservation/singleReservationButton/SingleReservationButton'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  pcNumber: string
  status: string
  userData?: DocumentData
  monitorType: string
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

export const ReservationModal = ({
  isOpen,
  onClose,
  pcNumber,
  status,
  userData,
  monitorType,
}: ReservationModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [timeMode, setTimeMode] = useState<'open_time' | 'fixed_time'>('open_time')
  const [selectedDuration, setSelectedDuration] = useState<string>()
  const queryClient = useQueryClient()

  const handleTimeModeChange = (mode: 'open_time' | 'fixed_time', duration?: string) => {
    setTimeMode(mode)
    setSelectedDuration(mode === 'open_time' ? '' : duration)
  }

  const handleReserve = async () => {
    if (!selectedTime || !userData) return

    setIsLoading(true)
    try {
      const reservation: ReservationData = {
        pcNumber,
        reservation_status: 'pending',
        email: userData.email,
        contactNumber: userData.contactNumber,
        reservation_time: selectedTime,
        monitorType,
        name: userData.name,
        time_mode: timeMode,
        duration: timeMode === 'open_time' ? 'open' : selectedDuration || '',
        reservation_type: 'single-reservation',
        reservation_date: new Date().toLocaleString('en-US', DATE_FORMAT_OPTIONS).replace(',', ''),
        reservation_updated_date: new Date()
          .toLocaleString('en-US', DATE_FORMAT_OPTIONS)
          .replace(',', ''),
        uid: userData.uid,
      }

      const docRef = await addDoc(collection(db, 'reservation'), reservation)
      await updateDoc(docRef, { id: docRef.id })

      const pcsRef = collection(db, 'pcs_list')
      const q = query(pcsRef, where('pcNumber', '==', pcNumber))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const pcDoc = querySnapshot.docs[0]
        await updateDoc(pcDoc.ref, {
          status: 'In-use',
        })
      } else {
        console.error('PC not found in pcs_list')
      }

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
      <SingleReservationForm
        userData={userData}
        monitorType={monitorType}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        status={status}
        onTimeModeChange={handleTimeModeChange}
      />
      <SingleReservationButton
        isLoading={isLoading}
        handleReserve={handleReserve}
        selectedTime={selectedTime}
        onClose={onClose}
      />
    </SingleReservationLayout>
  )
}
