import React, { useState, useMemo } from 'react'
import { CustomerListContainer } from './component/customerDataTable/customerListContainer/CustomerListContainer'
import { CustomerListSearchContainer } from './component/customerListSearchContainer/CustomerListSearchContainer'
import { getCustomerData } from '@/api/customerData/getCustomerData'
import { useQuery } from '@tanstack/react-query'
import { WalkInCustomerData } from '@/types/types'
import { CustomerDataTableLayout } from './component/customerDataTable/component/customerDataTableLayout/CustomerDataTableLayout'
import { CustomerTableHeader } from './component/customerDataTable/component/customerTableHeader/CustomerTableHeader'
import { CustomerListTableBody } from './component/customerDataTable/component/customerListTableBody/CustomerListTableBody'
import { CustomerListPagination } from './component/customerListPagination/CustomerListPagination'

type CustomerWithId = WalkInCustomerData & {
  id: string
}

type SortConfig = {
  key: keyof WalkInCustomerData | null
  direction: 'ascending' | 'descending'
}

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(5)
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  })

  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery<WalkInCustomerData[]>({
    queryKey: ['customers'],
    queryFn: async () => {
      const data = await getCustomerData({} as any)
      return data as unknown as WalkInCustomerData[]
    },
  })

  // Sort function
  const sortData = (data: WalkInCustomerData[]) => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!]
      const bValue = b[sortConfig.key!]

      if (aValue === undefined || bValue === undefined) return 0
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  const filteredData = useMemo(() => {
    if (!customers) return []
    const filtered = customers.filter(
      (customer: WalkInCustomerData) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.pcNumber.toString().includes(searchTerm)
    )
    return sortData(filtered)
  }, [customers, searchTerm, sortConfig])

  const requestSort = (key: keyof WalkInCustomerData) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Get sort direction indicator
  const getSortIndicator = (key: keyof WalkInCustomerData) => {
    if (sortConfig.key !== key) return '↕'
    return sortConfig.direction === 'ascending' ? '↑' : '↓'
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading customers</div>

  return (
    <CustomerListContainer>
      {/* Search Bar Part */}
      <CustomerListSearchContainer
        searchTerm={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1)
        }}
      />

      {/* Customer Table Part */}
      <CustomerDataTableLayout>
        <CustomerTableHeader requestSort={requestSort} getSortIndicator={getSortIndicator} />
        <CustomerListTableBody customers={currentRows} startingRowNumber={indexOfFirstRow} />
      </CustomerDataTableLayout>

      {/* Pagination Part */}
      <CustomerListPagination
        indexOfFirstRow={indexOfFirstRow}
        indexOfLastRow={indexOfLastRow}
        filteredData={filteredData}
        currentPage={currentPage}
        paginate={paginate}
        totalPages={totalPages}
      />
    </CustomerListContainer>
  )
}

export default CustomerList
