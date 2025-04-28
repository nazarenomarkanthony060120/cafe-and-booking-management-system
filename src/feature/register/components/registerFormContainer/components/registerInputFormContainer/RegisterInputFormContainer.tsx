'use client'

import Input from '@/components/common/Input'
import React, { useState } from 'react'
import RegisterActionContainer from '../registerActionContainer/RegisterActionContainer'
import { useForm } from 'react-hook-form'
import { RegisterFormValues } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'
// import { useRouter } from 'next/router'

const RegisterInputFormContainer = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>()

  const [registerError, setregisterError] = useState<string | null>(null)

  // const router = useRouter()

  const mutation = useMutation({
    mutationFn: (data: RegisterFormValues) => api.register(data),
    onSuccess: () => {
      // router.push('/login')
    },
    onError: (error: any) => {
      if (error.message === 'email-already-in-use') {
        setError('email', { type: 'manual', message: 'Email address is already taken' })
      } else if (error.message === 'contactNumber-already-in-use') {
        setError('contactNumber', { type: 'manual', message: 'Mobile number is already taken' })
      } else {
        // fallback error
        alert('Registration failed.')
      }
    },
  })

  const onSubmit = (data: RegisterFormValues) => {
    mutation.mutate(data)
    reset()
  }

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-md text-white">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="text"
            text="Name"
            {...register('name')}
            errors={errors.name?.message}
          />

          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="text"
            text="Contact Number"
            {...register('contactNumber')}
            errors={errors.contactNumber?.message}
          />

          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="email"
            text="Email"
            {...register('email')}
            errors={errors.email?.message}
          />

          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="password"
            text="Password"
            {...register('password')}
            errors={errors.password?.message}
          />

          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="password"
            text="Confirm Password"
            {...register('confirmPassword', {
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            })}
            errors={errors.confirmPassword?.message}
          />
          <RegisterActionContainer isPending={mutation.isPending} />
        </form>
      </div>
    </div>
  )
}

export default RegisterInputFormContainer
