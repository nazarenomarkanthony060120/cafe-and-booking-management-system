import React from 'react'

type ButtonType = 'submit' | 'reset' | 'button' | undefined

interface ButtonProps {
  className?: string
  text: string
  type?: ButtonType
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
}

export const Button = ({ className, text, type, onClick, disabled, isLoading }: ButtonProps) => {
  return (
    <div>
      <button type={type} className={className} onClick={onClick} disabled={disabled}>
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          </span>
        ) : (
          text
        )}
      </button>
    </div>
  )
}
