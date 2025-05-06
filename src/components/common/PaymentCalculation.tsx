interface PaymentCalculationProps {
  startTime: string
  endTime: string
  monitorType: string
}

const PaymentCalculation = ({ startTime, endTime, monitorType }: PaymentCalculationProps) => {
  if (!startTime || !endTime) return 0
  console.log('testing', monitorType)

  const start = new Date(startTime)
  const end = new Date(endTime)

  const diffInSeconds = (end.getTime() - start.getTime()) / 1000
  const hourlyRate = monitorType.toLowerCase() === 'curved' ? 40 : 20

  const fee = (diffInSeconds / 3600) * hourlyRate

  return parseFloat(fee.toFixed(2))
}

export default PaymentCalculation
