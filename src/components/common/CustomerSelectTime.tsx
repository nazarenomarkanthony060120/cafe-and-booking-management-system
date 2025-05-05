import React, { useState } from 'react'

interface CustomerSelectTimeProps {
  onTimeModeChange: (timeMode: 'open_time' | 'fixed_time', duration?: string) => void
}

export const CustomerSelectTime = ({ onTimeModeChange }: CustomerSelectTimeProps) => {
  const [mode, setMode] = useState('')
  const [duration, setDuration] = useState('')

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = e.target.value
    setMode(selectedMode)
    setDuration('')
    onTimeModeChange(selectedMode === 'open' ? 'open_time' : 'fixed_time')
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDuration = e.target.value
    setDuration(selectedDuration)
    onTimeModeChange('fixed_time', selectedDuration)
  }

  return (
    <div className="space-y-4">
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
          <select
            className="w-full mt-1 p-2 border rounded bg-gray-50 text-gray-800 text-sm"
            value={duration}
            onChange={handleDurationChange}
            required
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
  )
}
