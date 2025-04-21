import React from 'react'
import { WalkInCustomerSelectTime } from '../../walkInCustomerSelectTime/WalkInCustomerSelectTime'
import { WalkInCustomerData } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'

interface WalkInCustomerInputFormProps {
    status: string
    onClose: () => void
}

export const WalkInCustomerInputForm = ({ status, onClose }: WalkInCustomerInputFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<WalkInCustomerData>()

    const mutation = useMutation({
        mutationFn: (data: WalkInCustomerData) => api.addWalkInData(data),
        onSuccess: () => {
            reset()
            onClose()
        },
    })

    const onSubmit = (formData: WalkInCustomerData) => {
        const dataToSend: WalkInCustomerData = {
            ...formData,
            status, // Add the status from props into the data object
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
                        {errors.contactNumber && <p className="text-red-500 text-sm">Contact number is required</p>}
                    </div>

                    <WalkInCustomerSelectTime />

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}