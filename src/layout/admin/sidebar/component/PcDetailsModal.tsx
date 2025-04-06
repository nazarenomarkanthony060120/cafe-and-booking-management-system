    import React from 'react';

    interface PcDetailsModal {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    status: string;
    }

    const PcDetailsModal: React.FC<PcDetailsModal> = ({ isOpen, onClose, id, status }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto relative">
            <button onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            aria-label="Close modal"
            >
            ✕
            </button>
            <h2 className="text-2xl font-bold text-center mb-6"> View PC Status for <span className="text-blue-600">PC {id}</span></h2>

            <div className="mt-6 flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition">
                Close
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default PcDetailsModal;
