import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ReservationData } from '@/types/types'
import { UserReservationListContainer } from './component/userReservationListContainer/UserReservationListContainer'
import { UserReservationListSearchContainer } from './component/userReservationListSearchContainer/UserReservationListSearchContainer'
import { UserReservationListTableLayout } from './component/userReservationListTableLayout/UserReservationListTableLayout'
import { UserReserrvationListHeader } from './component/userReservationListHeader/UserReserrvationListHeader'
import { UserReservationDataResult } from './component/userReservationDataResult/UserReservationDataResult'
import { getReservationData } from '@/api/reservationData/getReservationData'
import { useAuth } from '@/context/AuthProvider'
import { UserReservationPagination } from './component/userReservationPagination/UserReservationPagination'

type SortConfig = {
  key: keyof ReservationData | null
  direction: 'ascending' | 'descending'
}

const Reservation = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(5)
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  })

  const {
    data: reservationDataResult = [],
    isLoading,
    error,
  } = useQuery<ReservationData[]>({
    queryKey: ['reservationDataResult', user?.email],
    queryFn: async () => {
      const data = await getReservationData()
      return data.filter((reservation) => reservation.email === user?.email) as ReservationData[]
    },
    enabled: !!user?.email,
  })

  console.log('reservationDataResult', reservationDataResult)

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
    if (!reservationDataResult) return []
    const filtered = reservationDataResult.filter(
      (reservationDataResult: ReservationData) =>
        reservationDataResult.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservationDataResult.pcNumber.toString().includes(searchTerm)
    )
    return sortData(filtered)
  }, [reservationDataResult, searchTerm, sortConfig])

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
  if (error) return <div>Error loading customers</div>

  return (
    <UserReservationListContainer>
      {/* Search Bar Part */}
      <UserReservationListSearchContainer
        searchTerm={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1)
        }}
      />

      {/* User Reservation Table Part */}
      <UserReservationListTableLayout>
        <UserReserrvationListHeader requestSort={requestSort} getSortIndicator={getSortIndicator} />
        <UserReservationDataResult
          reservationDataResult={currentRows}
          startingRowNumber={indexOfFirstRow}
        />
      </UserReservationListTableLayout>

      {/* Pagination Part */}
      <UserReservationPagination
        indexOfFirstRow={indexOfFirstRow}
        indexOfLastRow={indexOfLastRow}
        filteredData={filteredData}
        paginate={paginate}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </UserReservationListContainer>
  )
}

export default Reservation
