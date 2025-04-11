import React, { useState } from 'react'

interface AddNewPcProps {
  isOpen: boolean
  onClose: () => void
}

const AddPCModal: React.FC<AddNewPcProps> = ({ isOpen, onClose }) => {
  const [pcNo, setPcNo] = useState('')
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
        <h2 className="text-2xl font-bold text-center mb-6"> Add New PC</h2>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Pc No.</label>
            <input
              className="w-full p-2 border rounded mt-1 text-sm"
              value={pcNo}
              onChange={(e) => setPcNo(e.target.value)}
              placeholder="Enter PC number"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddPCModal
