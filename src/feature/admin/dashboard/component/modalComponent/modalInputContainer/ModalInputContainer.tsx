'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddPcFormValues } from '@/types/types'
import { api } from '@/api/api'
import { useMutation } from '@tanstack/react-query'
import AddPcActionContainer from '../addPcActionContainer/AddPcActionContainer'
import { collection, getDocs, query, where } from '@/lib/firebase'
import { db } from '@/lib/firebase'

interface ModalInputContainerProps {
  onClose: () => void
}

const ModalInputContainer = ({ onClose }: ModalInputContainerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<AddPcFormValues>()

  const [isChecking, setIsChecking] = useState(false)

  const mutation = useMutation({
    mutationFn: (data: AddPcFormValues) => api.addPcAdmin(data),
    onSuccess: () => {
      reset()
      onClose()
    },
  })

  const checkIfPcNumberExists = async (pcNumber: string): Promise<boolean> => {
    const pcsRef = collection(db, 'pcs_list')
    const q = query(pcsRef, where('pcNumber', '==', pcNumber))
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }

  const onSubmit = async (data: AddPcFormValues) => {
    setIsChecking(true)
    const exists = await checkIfPcNumberExists(data.pcNumber)

    if (exists) {
      setError('pcNumber', {
        message: 'This PC number is already taken',
      })
      setIsChecking(false)
      return
    }
    setIsChecking(false)
    mutation.mutate(data)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center mb-6">Add New PC</h2>

      <div>
        <label className="text-gray-600 text-sm">PC No.</label>
        <input
          className="w-full p-2 border rounded mt-1 text-sm"
          placeholder="Enter PC number"
          {...register('pcNumber', {
            required: 'PC Number is required',
          })}
        />
        {errors.pcNumber && <p className="text-red-500 text-sm mt-1">{errors.pcNumber.message}</p>}
      </div>
      <div>
        <label className="text-gray-600 text-sm">Monitor Type</label>
        <select
          className="w-full mt-1 p-2 border rounded bg-gray-50 text-gray-800 text-sm"
          {...register('monitorType', { required: 'Monitor Type is required' })}
          defaultValue=""
        >
          <option value="" disabled>
            Select Monitor Type
          </option>
          <option value="curved">Curved</option>
          <option value="normal">Normal</option>
        </select>
        {errors.monitorType && (
          <p className="text-red-500 text-sm mt-1">{errors.monitorType.message}</p>
        )}
      </div>

      <AddPcActionContainer onClose={onClose} isLoading={mutation.isPending || isChecking} />
    </form>
  )
}

export default ModalInputContainer
