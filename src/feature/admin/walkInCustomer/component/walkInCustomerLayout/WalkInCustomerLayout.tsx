interface WalkInCustomerLayoutProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const WalkInCustomerLayout = ({ isOpen, onClose, children }: WalkInCustomerLayoutProps) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto relative">
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
