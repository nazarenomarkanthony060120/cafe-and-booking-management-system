import React, { useState, useEffect } from 'react'
import { ReservationData } from '@/types/types'
import { WaitingArrivalLayout } from '@/feature/admin/reservation/component/reservationWaitingArrival/waitingArrivalLayout/WaitingArrivalLayout'
import { WaitingArrivalHeader } from '@/feature/admin/reservation/component/reservationWaitingArrival/waitingArrivalHeader/WaitingArrivalHeader'
import { WaitingArrivalDataResult } from '@/feature/admin/reservation/component/reservationWaitingArrival/waitingArrivalDataResult/WaitingArrivalDataResult'
import { WaitingArrivalButton } from '@/feature/admin/reservation/component/reservationWaitingArrival/waitingArrivalButton/WaitingArrivalButton'
import { useQueryClient } from '@tanstack/react-query'
import { doc, db, query, collection, where, getDocs, updateDoc, addDoc } from '@/lib/firebase'

interface WaitingArrivalModalProps {
    isOpen: boolean
    onClose: () => void
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

const formatDateTime = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const WaitingArrivalModal = ({ isOpen, onClose, reservationData }: WaitingArrivalModalProps) => {

    console.log("reservationDatatest", reservationData)
    const [loadingType, setLoadingType] = useState<"complete" | "incomplete" | null>(null)
    const queryClient = useQueryClient()
    const currentDate = new Date()
    const formattedTime = formatDateTime(currentDate)

    if (!isOpen) return null

    let expectedArrivalTime = ''
    if (reservationData.approved_date && reservationData.reservation_time) {
        const [datePart, timePart] = reservationData.approved_date.split(' ')
        if (timePart) {
            const [hours, minutes, seconds] = timePart.split(':').map(Number)
            const addMinutes = parseInt(reservationData.reservation_time)
            const date = new Date(2000, 0, 1, hours, minutes, seconds)
            date.setMinutes(date.getMinutes() + addMinutes)
            const pad = (n: number) => n.toString().padStart(2, '0')
            const newTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
            expectedArrivalTime = `${datePart} ${newTime}`
        }
    }

    //not need for now
    // useEffect(() => {
    //     if (!isOpen || !expectedArrivalTime) return;
    //     const msUntilExpectedArrival = new Date(expectedArrivalTime).getTime() - Date.now();
    //     if (msUntilExpectedArrival <= 0) {
    //         handleIncompleteReservation();
    //         return;
    //     }
    //     const timer = setTimeout(() => {
    //         handleIncompleteReservation();
    //     }, msUntilExpectedArrival);
    //     return () => clearTimeout(timer);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isOpen, expectedArrivalTime]);

    //handle complete reservation
    const handleCompleteReservation = async () => {
        setLoadingType("complete")
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
            }
            //update reservation status to complete
            await updateDoc(reservationRef, {
                reservation_status: 'complete',
                reservation_updated_date: new Date().toLocaleString('en-US', DATE_FORMAT_OPTIONS).replace(',', ''),
                complete_date: new Date().toLocaleString('en-US', DATE_FORMAT_OPTIONS).replace(',', ''),
            })

            let endTime = ''
            if (reservationData.time_mode === 'fixed_time') {
                endTime = formatDateTime(new Date(currentDate.getTime() + Number(reservationData.reservation_time) * 60 * 60 * 1000))
            }


            await addDoc(collection(db, 'customers'), {
                pcNumber: pcNumbers,
                name: reservationData.name,
                contactNumber: reservationData.contactNumber,
                created_date: formattedTime,
                updated_date: formattedTime,
                monitorType: reservationData.monitorType,
                end_time: endTime,
                payment: '',
                start_time: formattedTime,
                status: 'In-use',
                time_mode: reservationData.time_mode,
                type: 'reservation',
                action_status: 'On-going',
            })

            await queryClient.invalidateQueries({ queryKey: ['reservationData'] })
            onClose()
        } catch (error) {
            console.error('Failed to update reservation status:', error)
        } finally {
            setLoadingType(null)
        }
    }

    //handle incomplete reservation
    const handleIncompleteReservation = async () => {
        setLoadingType("incomplete")
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
                reservation_status: 'incomplete',
                reservation_updated_date: new Date().toLocaleString('en-US', DATE_FORMAT_OPTIONS).replace(',', ''),
                incomplete_date: new Date().toLocaleString('en-US', DATE_FORMAT_OPTIONS).replace(',', ''),
            })

            await queryClient.invalidateQueries({ queryKey: ['reservationData'] })
            onClose()
        } catch (error) {
            console.error('Failed to update reservation status:', error)
        } finally {
            setLoadingType(null)
        }
    }

    return (
        <WaitingArrivalLayout onClose={onClose}>
            <WaitingArrivalHeader />
            <WaitingArrivalDataResult reservationData={reservationData} expectedArrivalTime={expectedArrivalTime} />
            <WaitingArrivalButton loadingType={loadingType} handleCompleteReservation={handleCompleteReservation} handleIncompleteReservation={handleIncompleteReservation} />
        </WaitingArrivalLayout>
    )
}
