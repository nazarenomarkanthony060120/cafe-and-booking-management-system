import React from 'react'
import { WalkInCustomerSelectTime } from '../../walkInCustomerSelectTime/WalkInCustomerSelectTime'
import { WalkInCustomerData } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
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

export const WalkInCustomerInputForm = ({
  status,
  pcNumber,
  onClose,
}: WalkInCustomerInputFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<WalkInCustomerData>()

  const mutation = useMutation({
    mutationFn: (data: WalkInCustomerData) => api.addWalkInData(data),
    onSuccess: async (_data, variables) => {
      try {
        const q = query(collection(db, 'pcs_list'), where('pcNumber', '==', variables?.pcNumber))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref
          console.log(docRef)

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
    const dataToSend: WalkInCustomerData = {
      ...formData,
      pcNumber: pcNumber,
      status: 'In-use',
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    }
    mutation.mutate(dataToSend)
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
            <label className="text-gray-600 text-sm">Email</label>
            <input
              {...register('email', { required: true })}
              className="w-full p-2 border rounded mt-1 text-sm"
              placeholder="Input Customer Email"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
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

          <WalkInCustomerSelectTime />
          <WalkInCustomerCreateActionContainer onClose={onClose} isLoading={mutation.isPending} />
        </form>
      </div>
    </div>
  )
}
