import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/api'
import { RegisterFormValues } from '@/types/types'

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterFormValues) => api.register(data),
  })
}
