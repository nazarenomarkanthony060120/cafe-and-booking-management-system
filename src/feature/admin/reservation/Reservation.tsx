import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ReservationData } from '@/types/types'
import { getReservationData } from '@/api/reservationData/getReservationData'
import { ReservationListLayout } from './component/reservationListLayout/ReservationListLayout'
import { ReservationListSearchBarContainer } from './component/reservationListSearchContainer/ReservationListSearchBarContainer'
import { ReservationListPagination } from './component/reservationListPagination/ReservationListPagination'
import { ReservationListTableLayout } from './component/reservationListTableLayout/ReservationListTableLayout'
import { ReservationListTableHeader } from './component/reservationListTableHeader/ReservationListTableHeader'
import { ReservationListDataResult } from './component/reservationListDataResult/ReservationListDataResult'

type SortConfig = {
  key: keyof ReservationData | null
  direction: 'ascending' | 'descending'
}

const Reservation = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(5)
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  })

  const {
    data: reservationData = [],
    isLoading,
    error,
  } = useQuery<ReservationData[]>({
    queryKey: ['reservationData'],
    queryFn: async () => {
      const data = await getReservationData()
      return data as unknown as ReservationData[]
    },
  })

  // Sort function
  const sortData = (data: ReservationData[]) => {
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
    if (!reservationData) return []
    const filtered = reservationData.filter(
      (customer: ReservationData) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.pcNumber.toString().includes(searchTerm)
    )
    return sortData(filtered)
  }, [reservationData, searchTerm, sortConfig])

  const requestSort = (key: keyof ReservationData) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Get sort direction indicator
  const getSortIndicator = (key: keyof ReservationData) => {
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
  if (error) return <div>Error loading reservationData</div>

  return (
    <ReservationListLayout>
      {/* Search Bar Part */}
      <ReservationListSearchBarContainer
        searchTerm={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1)
        }}
      />

      {/* Customer Table Part */}
      <ReservationListTableLayout>
        <ReservationListTableHeader requestSort={requestSort} getSortIndicator={getSortIndicator} />
        <ReservationListDataResult
          reservationData={currentRows}
          startingRowNumber={indexOfFirstRow}
        />
      </ReservationListTableLayout>

      {/* Pagination Part */}
      <ReservationListPagination
        indexOfFirstRow={indexOfFirstRow}
        indexOfLastRow={indexOfLastRow}
        filteredData={filteredData}
        paginate={paginate}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </ReservationListLayout>
  )
}

export default Reservation
