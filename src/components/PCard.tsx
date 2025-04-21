import React, { useState } from 'react'
import pcLogo from '@/assets/images/pc-icon.png'
import Image from 'next/image'
import { Button } from '@/components/common/Button'
import ReservationModal from '@/layout/user/sidebar/component/ReservationModal'
import PcDetailsModal from '@/layout/admin/sidebar/component/PcDetailsModal'
import WalkInCustomerModal from '@/layout/admin/sidebar/component/WalkInCustomerModal'

interface PCCardProps {
  id: number
  status: string
  email: string
  source?: string
  pcNumber: string
}

const PCard = ({ id, status, email, source, pcNumber }: PCCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  let statusClass = ''
  let showViewButton = false

  if (status === 'Available' && email !== 'admin@email.com') {
    statusClass = 'border border-red-300 text-gray-800'
    showViewButton = true
  } else if (status === 'Available' && email === 'admin@email.com') {
    statusClass = 'border border-gray-300 text-gray-800'
    showViewButton = true
  } else {
    statusClass = 'bg-yellow-400 text-black'
    showViewButton = true
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div
        className={`p-4 rounded-lg shadow-md flex flex-col justify-center min-w-[260px] h-[115px] ${statusClass}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">PC {id}</span>
          <Image src={pcLogo} alt="PC Icon" width={32} height={32} />
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm">{status}</p>
          {showViewButton && status === 'Available' && email !== 'admin@email.com' && (
            <>
              <Button
                text="View More"
                className="text-sm text-red-800 hover:underline transition"
                onClick={openModal}
              />
              <ReservationModal isOpen={isModalOpen} onClose={closeModal} id={id} status={status} />
            </>
          )}
          {showViewButton && status === 'Available' && email === 'admin@email.com' && (
            <>
              <Button
                text="View More"
                className="text-sm text-blue-800 hover:underline transition"
                onClick={openModal}
              />
              {source !== 'walk-in' ? (
                <PcDetailsModal isOpen={isModalOpen} onClose={closeModal} id={id} status={status} />
              ) : (
                <WalkInCustomerModal isOpen={isModalOpen} onClose={closeModal} id={id} status={status} pcNumber={pcNumber} />
              )}
            </>
          )}
          {showViewButton && status !== 'Available' && email === 'admin@email.com' && (
            <>
              <Button
                text="View More"
                className="text-sm text-gray-800 hover:underline transition"
                onClick={openModal}
              />
              <PcDetailsModal isOpen={isModalOpen} onClose={closeModal} id={id} status={status} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default PCard
