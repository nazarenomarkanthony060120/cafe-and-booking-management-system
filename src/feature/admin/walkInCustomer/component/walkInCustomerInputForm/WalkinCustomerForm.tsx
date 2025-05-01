import React, { useState } from 'react'
import { WalkInCustomerSelectTime } from '../../walkInCustomerSelectTime/WalkInCustomerSelectTime'
import { WalkInCustomerData } from '@/types/types'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'
import { db, collection, updateDoc, getDocs, where, query } from '@/lib/firebase'
import WalkInCustomerCreateActionContainer from '../../walkInCustomerCreateActionContainer/WalkInCustomerCreateActionContainer'
import Input from '@/components/common/Input'

interface WalkInCustomerInputFormProps {
  status: string
  pcNumber: string
  created_date?: string
  updated_date?: string
  onClose: () => void
  monitorType: string
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
  monitorType,
}: WalkInCustomerInputFormProps) => {
  const [timeMode, setTimeMode] = useState<string>('open_time')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
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
    onError: (error: any) => {
      if (error.message === 'contactNumber-already-in-use') {
        setError('contactNumber', { type: 'manual', message: 'Mobile number is already taken' })
      }
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
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: 'Name is required',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Name must not contain special characters or numbers',
                },
              }}
              render={({ field }) => (
                <Input
                  className="w-full mt-1 p-2 border rounded-md"
                  type="text"
                  text=""
                  value={field.value}
                  onChange={(e) => {
                    const capitalized = e.target.value
                      .replace(/\s+/g, ' ')
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                    field.onChange(capitalized)
                  }}
                  errors={errors.name?.message}
                />
              )}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Contact Number</label>
            <Input
              className="w-full mt-1 p-2 border rounded-md"
              type="text"
              text=""
              {...register('contactNumber', {
                required: 'Contact number is required',
                pattern: {
                  value: /^09\d{9}$/,
                  message: 'Contact number must start with "09" and be exactly 11 digits',
                },
              })}
              errors={errors.contactNumber?.message}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Monitor Type</label>
            <div className="p-2 border rounded bg-gray-50 text-gray-800">{monitorType}</div>
          </div>
          <WalkInCustomerSelectTime onTimeModeChange={handleTimeModeChange} />
          <WalkInCustomerCreateActionContainer onClose={onClose} isLoading={mutation.isPending} />
        </form>
      </div>
    </div>
  )
}
