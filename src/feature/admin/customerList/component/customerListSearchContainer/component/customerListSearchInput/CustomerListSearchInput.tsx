import React from 'react'

interface CustomerListSearchInputProps {
  searchTerm: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CustomerListSearchInput = ({ searchTerm, onChange }: CustomerListSearchInputProps) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={onChange}
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
    />
  )
}
