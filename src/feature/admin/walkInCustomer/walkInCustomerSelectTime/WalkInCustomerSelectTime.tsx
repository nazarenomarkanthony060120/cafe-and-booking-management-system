import React, { useState } from 'react';

export const WalkInCustomerSelectTime = () => {
    const [mode, setMode] = useState('');
    const [duration, setDuration] = useState('');

    const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMode(e.target.value);
        setDuration(''); // Reset duration when mode changes
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDuration(e.target.value);
    };

    return (
        <div className="space-y-4">
            {/* PC Time Mode Selection */}
            <div>
                <label className="text-gray-600 text-sm">PC Time Mode</label>
                <select
                    className="w-full mt-1 p-2 border rounded bg-gray-50 text-gray-800 text-sm"
                    value={mode}
                    onChange={handleModeChange}
                    required
                >
                    <option value="" disabled>
                        Select PC Time Mode
                    </option>
                    <option value="open">Open Time</option>
                    <option value="fixed">Fixed Time</option>
                </select>
            </div>

            {mode === 'fixed' && (
                <div>
                    <label className="text-gray-600 text-sm">Duration</label>
                    <select className="w-full mt-1 p-2 border rounded bg-gray-50 text-gray-800 text-sm" value={duration}
                        onChange={handleDurationChange} required
                    >
                        <option value="" disabled>
                            Select duration
                        </option>
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                        <option value="5">5 hours</option>
                    </select>
                </div>
            )}
        </div>
    );
};
