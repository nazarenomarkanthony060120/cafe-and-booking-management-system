import React from 'react'

type ButtonType = 'submit' | 'reset' | 'button' | undefined

interface ButtonProps {
  className?: string
  text: string | React.ReactNode
  type?: ButtonType
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
}

export const Button = ({ className, text, type, onClick, disabled, isLoading }: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        className={`min-h-[38px] ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          </span>
        ) : (
          text
        )}
      </button>
    </div>
  )
}
