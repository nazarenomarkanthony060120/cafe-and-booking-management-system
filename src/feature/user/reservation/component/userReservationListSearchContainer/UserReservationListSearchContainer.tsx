import React from 'react'

import { UserReservationSearchLayout } from './component/userReservationSearchLayout/UserReservationSearchLayout'
import { UserReservationSearchInput } from './component/userReservationSearchInput/UserReservationSearchInput'
import { UserReservationSearchSvgLayout } from './component/userReservationSearchSvgLayout/UserReservationSearchSvgLayout'

interface UserReservationListSearchContainerProps {
  searchTerm: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UserReservationListSearchContainer = ({
  searchTerm,
  onChange,
}: UserReservationListSearchContainerProps) => {
  return (
    <UserReservationSearchLayout>
      <UserReservationSearchInput searchTerm={searchTerm} onChange={onChange} />
      <UserReservationSearchSvgLayout />
    </UserReservationSearchLayout>
  )
}
