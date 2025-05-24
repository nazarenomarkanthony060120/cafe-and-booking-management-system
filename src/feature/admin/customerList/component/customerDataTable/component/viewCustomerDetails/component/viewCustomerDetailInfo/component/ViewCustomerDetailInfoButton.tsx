import React from 'react'
import { Button } from '@/components/common/Button'
import { WalkInCustomerData } from '@/types/types'
import { collection, db, getDocs, query, updateDoc, where } from '@/lib/firebase'
import { useQueryClient } from '@tanstack/react-query'
import PaymentCalculation from '@/components/common/PaymentCalculation'

interface ViewCustomerDetailInfoButtonProps {
  onClick: () => void
  customerData: WalkInCustomerData
  onClose: () => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const ViewCustomerDetailInfoButton = ({
  onClick,
  customerData,
  onClose,
  isLoading,
  setIsLoading,
}: ViewCustomerDetailInfoButtonProps) => {
  const queryClient = useQueryClient()

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const currentDate = new Date()
      const formattedTime = formatDateTime(currentDate)

      const pcNumbers = Array.isArray(customerData.pcNumber)
        ? customerData.pcNumber
        : customerData.pcNumber.split(',').map((num) => num.trim())
      let totalPayment = 0
      let monitorTypes: string[] = []

      for (const pcNumber of pcNumbers) {
        const pcsQuery = query(collection(db, 'pcs_list'), where('pcNumber', '==', pcNumber))
        const pcsSnapshot = await getDocs(pcsQuery)
        if (pcsSnapshot.empty) {
          console.error(`PC ${pcNumber} does not exist in pcs_list collection`)
          continue
        }
        const pcDoc = pcsSnapshot.docs[0]
        const monitorType = pcDoc.data().monitorType || 'Normal'
        monitorTypes.push(monitorType)

        const payment = PaymentCalculation({
          startTime: customerData.start_time,
          endTime: formattedTime,
          monitorType: monitorType,
        })
        totalPayment += payment
      }

      const monitorTypeField = monitorTypes.length > 1 ? monitorTypes : monitorTypes[0]

      const customerQuery = query(
        collection(db, 'customers'),
        where('pcNumber', 'array-contains-any', pcNumbers)
      )
      const customerSnapshot = await getDocs(customerQuery)
      if (customerSnapshot.empty) {
        console.error(`No customer document found for pcNumbers: ${pcNumbers.join(', ')}`)
      } else {
        for (const docSnap of customerSnapshot.docs) {
          try {
            await updateDoc(docSnap.ref, {
              end_time: formattedTime,
              action_status: 'Waiting for Payment',
              updated_date: formattedTime,
              payment: totalPayment,
              monitorType: monitorTypeField,
            })
          } catch (updateError) {
            console.error(`Failed to update customer doc for pcNumbers: ${pcNumbers.join(', ')}`, updateError)
          }
        }
      }

      queryClient.invalidateQueries({ queryKey: ['customers'] })
      setIsLoading(false)
      onClose()
    } catch (error: any) {
      console.error('Failed to update status:', error)
      alert('Failed to update status. Please try again.\n' + (error && error.message ? error.message : error))
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`grid gap-4 mt-6 ${customerData?.action_status === 'Completed'
          ? 'grid-cols-1 justify-items-center'
          : 'grid-cols-2'
          }`}
      >
        {customerData?.action_status !== 'Completed' && (
          <button
            type="button"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={handleLogout}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              'Logout'
            )}
          </button>
        )}
        <Button
          text="Close"
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          onClick={onClick}
        />
      </div>
    </div>
  )
}
