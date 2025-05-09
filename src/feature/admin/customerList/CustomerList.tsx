import React, { useState, useMemo } from 'react'
import { CustomerListContainer } from './component/customerDataTable/customerListContainer/CustomerListContainer'
import { CustomerListSearchContainer } from './component/customerListSearchContainer/CustomerListSearchContainer'
import { getCustomerData } from '@/api/customerData/getCustomerData'
import { useQuery } from '@tanstack/react-query'
import { WalkInCustomerData } from '@/types/types'
import { CustomerDataTableLayout } from './component/customerDataTable/component/customerDataTableLayout/CustomerDataTableLayout'
import { CustomerTableHeader } from './component/customerDataTable/component/customerTableHeader/CustomerTableHeader'
import { CustomerListTableBody } from './component/customerDataTable/component/customerListTableBody/CustomerListTableBody'

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
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{indexOfFirstRow + 1}</span> to{' '}
          <span className="font-medium">{Math.min(indexOfLastRow, filteredData.length)}</span> of{' '}
          <span className="font-medium">{filteredData.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </CustomerListContainer>
  )
}

export default CustomerList
