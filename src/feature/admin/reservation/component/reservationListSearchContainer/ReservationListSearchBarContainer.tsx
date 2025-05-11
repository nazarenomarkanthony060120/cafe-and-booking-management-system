import React from 'react'
import { ReservationListSearchBarLayout } from './reservationListSearchBarLayout/ReservationListSearchBarLayout'
import { ReservationListSearchInput } from './reservationListSearchInput/ReservationListSearchInput'
import { ReservationListSearchSvgLayout } from './reservationListSearchSvgLayout/ReservationListSearchSvgLayout'

interface ReservationListSearchBarContainerProps {
  searchTerm: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ReservationListSearchBarContainer = ({
  searchTerm,
  onChange,
}: ReservationListSearchBarContainerProps) => {
  return (
    <ReservationListSearchBarLayout>
      <ReservationListSearchInput searchTerm={searchTerm} onChange={onChange} />
      <ReservationListSearchSvgLayout />
    </ReservationListSearchBarLayout>
  )
}
