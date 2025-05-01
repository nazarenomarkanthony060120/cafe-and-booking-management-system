import React from 'react'
import { CustomerListSearchBarLayout } from './component/customerListSearchBarLayout/CustomerListSearchBarLayout'
import { CustomerListSearchInput } from './component/customerListSearchInput/CustomerListSearchInput'
import { CustomerListSearchSvgLayout } from './component/customerListSearchSvgLayout/CustomerListSearchSvgLayout'

interface CustomerListSearchContainerProps {
  searchTerm: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CustomerListSearchContainer = ({
  searchTerm,
  onChange,
}: CustomerListSearchContainerProps) => {
  return (
    <CustomerListSearchBarLayout>
      <CustomerListSearchInput searchTerm={searchTerm} onChange={onChange} />
      <CustomerListSearchSvgLayout />
    </CustomerListSearchBarLayout>
  )
}
