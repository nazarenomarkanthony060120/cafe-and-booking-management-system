import React from "react"

type ButtonType = "submit" | "reset" | "button" | undefined 

interface ButtonProps {
  className?: string
  text: string
  type?: ButtonType
}

export const Button = ({ className, text, type }: ButtonProps) => {
  return (
    <div>
      <button 
        type={type} 
        className={className}
      >
        {text}
      </button>
    </div>
  )
}

