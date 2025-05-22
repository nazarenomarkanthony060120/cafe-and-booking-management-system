import React from 'react'
import { Button } from '@/components/common/Button'

interface WaitingArrivalLayoutProps {
    onClose: () => void
    children: React.ReactNode
}

export const WaitingArrivalLayout = ({
    onClose,
    children,
}: WaitingArrivalLayoutProps) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto relative">
                <Button
                    text="✕"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                    onClick={onClose}
                />
                {children}
            </div>
        </div>
    )
}
