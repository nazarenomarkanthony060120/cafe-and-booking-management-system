import React from 'react'

interface ViewCustomerDetailLayoutProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const ViewCustomerDetailLayout = ({
  children,
  isOpen,
  onClose,
}: ViewCustomerDetailLayoutProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[4px] flex items-center justify-center z-50">
      <div className="bg-white/95 p-6 md:p-8 rounded-2xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
