import { Inter_Font } from '@/assets/fonts/Fonts'
import { RegisterFormValues } from '@/types/types'
import React from 'react'
import { FieldErrors } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string
  className: string
  required?: boolean
  placeHolder?: string
  type: string
  errors?: string | undefined
}

const Input = ({
  text,
  className,
  placeHolder,
  type,
  required = false,
  value,
  onChange,
  errors,
  ...rest
}: InputProps) => {
  return (
    <div>
      <label className={`${Inter_Font.className} block text-sm font-normal`}>{text}</label>
      <input
        type={type}
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        required={required}
        {...rest}
      />
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
    </div>
  )
}

export default Input
