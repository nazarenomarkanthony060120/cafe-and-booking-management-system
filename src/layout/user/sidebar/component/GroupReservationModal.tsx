import React, { useState } from 'react';

interface GroupReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  status: string;
  email: string;
  pcs: { pcName: string }[];
}

const GroupReservationModal: React.FC<GroupReservationModalProps> = ({ isOpen, onClose, id, status, email, pcs }) => {
  if (!isOpen) return null;

  const userCredentialsSample = {
    name: "Example name",
    email: "sample_email@gmail.com",
    contactNumber: "09341494695",
  };

  const [selectedPCOptions, setSelectedPCOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the pcName to the selectedPCOptions array if it's checked
      setSelectedPCOptions((prev) => [...prev, value]);
    } else {
      // Remove the pcName from the selectedPCOptions array if it's unchecked
      setSelectedPCOptions((prev) => prev.filter((pcName) => pcName !== value));
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition" aria-label="Close modal">
          ✕
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Group Reservation</h2>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 text-sm">Name</label>
            <input className="w-full p-2 border rounded mt-1 text-sm" value={userCredentialsSample.name} readOnly />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input className="w-full p-2 border rounded mt-1 text-sm" value={userCredentialsSample.email} readOnly />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Contact Number</label>
            <input className="w-full p-2 border rounded mt-1 text-sm" value={userCredentialsSample.contactNumber} readOnly />
          </div>
          <div>
            <label className="text-gray-600 text-sm">Select PC No.</label>
            <div className="relative">
              <button onClick={toggleDropdown} className="w-full p-2 border rounded bg-gray-50 text-gray-800 text-sm flex justify-between items-center">
                {selectedPCOptions.length > 0 ? `${selectedPCOptions.length} PC(s) Selected` : 'Select PCs'}
                <span className="ml-2">&#9660;</span>
              </button>
              {/* Dropdown list */}
              {isDropdownOpen && (
                <div className="absolute left-0 w-full bg-white border rounded shadow-lg mt-1 max-h-48 overflow-y-auto z-10">
                  {pcs.map((pc, index) => (
                    <div key={index} className="flex items-center p-2 hover:bg-gray-100">
                      <input type="checkbox"
                        value={pc.pcName}
                        checked={selectedPCOptions.includes(pc.pcName)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label className="text-sm">{pc.pcName}</label>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-red-500 mt-1 italic">
                Note: You can only reserve up to 5 PCs for a Group Reservation.
              </p>
            </div>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Reservation Time</label>
            <input type="time" className="w-full p-2 border rounded mt-1 text-sm text-gray-800" placeholder="Booking Schedule"/>
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
  );
};

export default GroupReservationModal;
