import { Button } from '@/components/common/Button'
import React from 'react'

interface ConfirmCompletionLayoutProps {
  children: React.ReactNode
  onClose: () => void
  isOpen: true
}

export const ConfirmCompletionLayout = ({
  children,
  onClose,
  isOpen,
}: ConfirmCompletionLayoutProps) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto relative border-2 border-red-500">
        <Button
          text="✕"
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
        />
        {children}
      </div>
    </div>
  )
}
