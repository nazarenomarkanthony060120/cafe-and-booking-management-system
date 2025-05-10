import { api } from '@/api/api'
import { Button } from '@/components/common/Button'
import { ReservationData } from '@/types/types'
import { useQueryClient } from '@tanstack/react-query'
import { DocumentData } from 'firebase/firestore'
import React, { useState } from 'react'
import { updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { GroupReservationLayout } from '@/feature/user/dashboard/component/groupReservation/groupReservationLayout/GroupReservationLayout'
import { GroupReservationHeader } from '@/feature/user/dashboard/component/groupReservation/groupReservationHeader/GroupReservationHeader'
import GroupReservationForm from '@/feature/user/dashboard/component/groupReservation/groupReservationForm/GroupReservationForm'
import { GroupReservationButton } from '@/feature/user/dashboard/component/groupReservation/groupReservationButton/GroupReservationButton'

interface GroupReservationModalProps {
  isOpen: boolean
  onClose: () => void
  pcs: { pcName: string }[]
  userData?: DocumentData
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

export const GroupReservationModal = ({
  onClose,
  userData,
  pcs,
  isOpen,
}: GroupReservationModalProps) => {
  const [selectedPCOptions, setSelectedPCOptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [timeMode, setTimeMode] = useState<'open_time' | 'fixed_time'>('open_time')
  const [selectedDuration, setSelectedDuration] = useState<string>()
  const [selectedPCTimeMode, setSelectedPCTimeMode] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')
  const queryClient = useQueryClient()

  const validateForm = () => {
    if (selectedPCOptions.length === 0) {
      setValidationError('Please select at least one PC')
      return false
    }
    if (!selectedPCTimeMode) {
      setValidationError('Please select a PC Time Mode')
      return false
    }
    if (!selectedTime) {
      setValidationError('Please select a reservation time')
      return false
    }
    if (timeMode === 'fixed_time' && !selectedDuration) {
      setValidationError('Please select a duration for fixed time mode')
      return false
    }
    setValidationError('')
    return true
  }

  const handleReserve = async () => {
    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const reservation: ReservationData = {
        pcNumber: selectedPCOptions.join(', '),
        reservation_status: 'pending',
        email: userData?.email,
        contactNumber: userData?.contactNumber,
        reservation_time: selectedTime,
        monitorType: '',
        name: userData?.name,
        time_mode: timeMode,
        duration: timeMode === 'open_time' ? '' : selectedDuration || '',
        reservation_type: 'group-reservation',
        reservation_date: new Date().toLocaleString('en-US', DATE_FORMAT_OPTIONS).replace(',', ''),
        reservation_updated_date: new Date()
          .toLocaleString('en-US', DATE_FORMAT_OPTIONS)
          .replace(',', ''),
        uid: userData?.uid,
      }

      await api.reservationData(reservation)

      const pcsRef = collection(db, 'pcs_list')
      for (const pcNumber of selectedPCOptions) {
        const q = query(pcsRef, where('pcNumber', '==', pcNumber))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const pcDoc = querySnapshot.docs[0]
          await updateDoc(pcDoc.ref, {
            status: 'In-use',
          })
        }
      }

      await queryClient.invalidateQueries({ queryKey: ['pcs'] })
      onClose()
    } catch (error) {
      console.error('Error creating reservation:', error)
      setValidationError('Failed to create reservation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTimeModeChange = (mode: 'open_time' | 'fixed_time', duration?: string) => {
    setTimeMode(mode)
    setSelectedDuration(duration)
  }

  if (!isOpen) return null

  return (
    <GroupReservationLayout onClose={onClose}>
      <GroupReservationHeader />
      <GroupReservationForm
        userData={userData}
        pcs={pcs}
        selectedPCOptions={selectedPCOptions}
        onPCOptionsChange={setSelectedPCOptions}
        selectedTime={selectedTime}
        onTimeChange={setSelectedTime}
        timeMode={timeMode}
        onTimeModeChange={handleTimeModeChange}
        selectedDuration={selectedDuration}
        onPCTimeModeChange={setSelectedPCTimeMode}
      />
      {validationError && (
        <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {validationError}
        </div>
      )}
      <GroupReservationButton
        isLoading={isLoading}
        handleReserve={handleReserve}
        onClose={onClose}
      />
    </GroupReservationLayout>
  )
}
