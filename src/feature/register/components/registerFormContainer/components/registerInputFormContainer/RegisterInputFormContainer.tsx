'use client'

import Input from '@/components/common/Input'
import React, { useState } from 'react'
import RegisterActionContainer from '../registerActionContainer/RegisterActionContainer'
import { useForm, Controller } from 'react-hook-form'
import { RegisterFormValues } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'
import { useRouter } from 'next/navigation'

const RegisterInputFormContainer = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>()

  const [registerError, setregisterError] = useState<string | null>(null)

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (data: RegisterFormValues) => api.register(data),
    onSuccess: () => {
      router.push('/login')
    },
    onError: (error: any) => {
      if (error.message === 'email-already-in-use') {
        setError('email', { type: 'manual', message: 'Email address is already taken' })
      } else if (error.message === 'contactNumber-already-in-use') {
        setError('contactNumber', { type: 'manual', message: 'Mobile number is already taken' })
      } else if (error.message === 'invalid-contact-number') {
        setError('contactNumber', {
          type: 'manual',
          message: 'Contact number must start with "09" and be exactly 11 digits',
        })
      } else if (error.message === 'invalid-name') {
        setError('name', {
          type: 'manual',
          message: 'Name must not contain special characters or numbers',
        })
      } else {
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
                text="Name"
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

          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="text"
            text="Contact Number"
            {...register('contactNumber', {
              required: 'Contact number is required',
              pattern: {
                value: /^09\d{9}$/,
                message: 'Contact number must start with "09" and be exactly 11 digits',
              },
            })}
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

          {registerError && <p className="text-red-500 text-sm">{registerError}</p>}

          <RegisterActionContainer isPending={mutation.isPending} />
        </form>
      </div>
    </div>
  )
}

export default RegisterInputFormContainer
