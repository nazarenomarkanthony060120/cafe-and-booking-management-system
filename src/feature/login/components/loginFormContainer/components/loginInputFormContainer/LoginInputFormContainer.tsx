'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Input from '@/components/common/Input'
import LoginActionContainer from '../loginActionContainer/LoginActionContainer'
import { LoginFormValues } from '@/types/types'
import { api } from '@/api/api'
import { useRouter } from 'next/navigation'

const LoginInputFormContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (data: LoginFormValues) => api.login(data),
    onSuccess: (ctype) => {
      if (ctype !== 'user') {
        router.push('dashboard')
      } else {
        router.push('user-dashboard')
      }
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-md text-white">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="email"
            text="Email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <Input
            className="w-full mt-1 p-2 border rounded-md"
            type="password"
            text="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <LoginActionContainer isPending={mutation.isPending} />
        </form>
      </div>
    </div>
  )
}

export default LoginInputFormContainer
