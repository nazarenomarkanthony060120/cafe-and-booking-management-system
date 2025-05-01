import React, { useState } from 'react'
import { WalkInCustomerSelectTime } from '../../walkInCustomerSelectTime/WalkInCustomerSelectTime'
import { WalkInCustomerData } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import { db, collection, updateDoc, getDocs, where, query } from '@/lib/firebase'
import WalkInCustomerCreateActionContainer from '../../walkInCustomerCreateActionContainer/WalkInCustomerCreateActionContainer'

interface WalkInCustomerInputFormProps {
  status: string
  pcNumber: string
  created_date?: string
  updated_date?: string
  onClose: () => void
}

const formatDateTime = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const WalkInCustomerInputForm = ({
  status,
  pcNumber,
  onClose,
}: WalkInCustomerInputFormProps) => {
  const [timeMode, setTimeMode] = useState<string>('open_time')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<WalkInCustomerData>()

  const mutation = useMutation({
    mutationFn: (data: WalkInCustomerData) => api.customerData(data),
    onSuccess: async (_data, variables) => {
      try {
        const q = query(collection(db, 'pcs_list'), where('pcNumber', '==', variables?.pcNumber))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref
          await updateDoc(docRef, {
            status: 'In-use',
          })
        } else {
          console.log('No matching document found.')
        }
      } catch (error) {
        console.error('Failed to update PC status', error)
      }

      reset()
      onClose()
    },
  })

  const onSubmit = (formData: WalkInCustomerData) => {
    const currentDate = new Date()
    const formattedTime = formatDateTime(currentDate)

    const dataToSend: WalkInCustomerData = {
      ...formData,
      pcNumber: pcNumber,
      status: 'In-use',
      type: 'walk-in',
      time_mode: timeMode,
      start_time: timeMode === 'open_time' ? formattedTime : '',
      end_time: '',
      payment: '',
      created_date: formattedTime,
      updated_date: formattedTime,
    }
    mutation.mutate(dataToSend)
  }

  const handleTimeModeChange = (mode: string) => {
    setTimeMode(mode)
  }

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <div className="w-full max-w-md text-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-gray-600 text-sm">PC Status</label>
            <div className="p-2 border rounded bg-gray-50 text-gray-800">{status}</div>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Name</label>
            <input
              {...register('name', { required: true })}
              className="w-full p-2 border rounded mt-1 text-sm"
              placeholder="Input Customer Name"
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </div>
          <div>
            <label className="text-gray-600 text-sm">Contact Number</label>
            <input
              {...register('contactNumber', { required: true })}
              className="w-full p-2 border rounded mt-1 text-sm"
              placeholder="Input Customer Contact Number"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">Contact number is required</p>
            )}
          </div>

          <WalkInCustomerSelectTime onTimeModeChange={handleTimeModeChange} />
          <WalkInCustomerCreateActionContainer onClose={onClose} isLoading={mutation.isPending} />
        </form>
      </div>
    </div>
  )
}
