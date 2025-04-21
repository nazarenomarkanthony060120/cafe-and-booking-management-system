import React from 'react'
import { WalkInCustomerSelectTime } from '../../walkInCustomerSelectTime/WalkInCustomerSelectTime'
import { WalkInCustomerData } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'


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
        mutationFn: (data: WalkInCustomerData)
    })


    return (
        <div className="flex flex-col items-center justify-center pt-5">
            <div className="w-full max-w-md text-gray-800">
                <form>
                    <div>
                        <label className="text-gray-600 text-sm">PC Status</label>
                        <div className="p-2 border rounded bg-gray-50 text-gray-800">{status}</div>
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Name</label>
                        <input className="w-full p-2 border rounded mt-1 text-sm" placeholder="Input Customer Name" required />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Email</label>
                        <input className="w-full p-2 border rounded mt-1 text-sm" placeholder="Input Customer Email" required />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm">Contact Number</label>
                        <input className="w-full p-2 border rounded mt-1 text-sm" placeholder="Input Customer Contact Number" required />
                    </div>
                    <WalkInCustomerSelectTime />

                    <div className="mt-6 flex justify-end space-x-3">
                        <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                            Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}