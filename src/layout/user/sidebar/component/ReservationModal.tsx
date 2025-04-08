import React from 'react'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
  status: string
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, id, status }) => {
  if (!isOpen) return null

  const userCredentialsSample = {
    name: 'Example name',
    email: 'sample_email@gmail.com',
    contactNumber: '09341494695',
  }

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
        <h2 className="text-2xl font-bold text-center mb-6">
          {' '}
          Reserve Booking for <span className="text-blue-600">PC {id}</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">PC Status</label>
            <div className="p-2 border rounded bg-gray-50 text-gray-800">{status}</div>
          </div>

          <div>
            <label className="text-gray-600 text-sm">Name</label>
            <input
              className="w-full p-2 border rounded mt-1 text-sm"
              value={userCredentialsSample.name}
              readOnly
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              className="w-full p-2 border rounded mt-1 text-sm"
              value={userCredentialsSample.email}
              readOnly
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Contact Number</label>
            <input
              className="w-full p-2 border rounded mt-1 text-sm"
              value={userCredentialsSample.contactNumber}
              readOnly
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Reservation Time</label>
            <input
              type="time"
              className="w-full p-2 border rounded mt-1 text-sm text-gray-800"
              placeholder="Booking Schedule"
            />
            <p className="text-xs text-red-500 mt-1 italic">
              Note: Reservation time should not exceed 1 hour.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReservationModal
