'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase' // adjust this path based on your Firebase config
import { format, parseISO, startOfWeek, startOfMonth } from 'date-fns'

export default function Reports() {
  const [dailyRevenue, setDailyRevenue] = useState([])
  const [weeklyRevenue, setWeeklyRevenue] = useState([])
  const [monthlyRevenue, setMonthlyRevenue] = useState([])
  const [peakHoursData, setPeakHoursData] = useState([])
  const [mostBookedPCs, setMostBookedPCs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'customers'))
      const customers = snapshot.docs.map((doc) => doc.data())

      const dailyMap: Record<string, number> = {}
      const weeklyMap: Record<string, number> = {}
      const monthlyMap: Record<string, number> = {}
      const hourMap: Record<string, number> = {}
      const pcMap: Record<string, number> = {}

      for (const c of customers) {
        const date = parseISO(c.created_date.replace(' ', 'T'))
        const day = format(date, 'EEE')
        const week = format(startOfWeek(date), "'Week of' MMM d")
        const month = format(startOfMonth(date), 'MMM')

        const payment = parseFloat(c.payment)
        if (!isNaN(payment)) {
          dailyMap[day] = (dailyMap[day] || 0) + payment
          weeklyMap[week] = (weeklyMap[week] || 0) + payment
          monthlyMap[month] = (monthlyMap[month] || 0) + payment
        }

        const hour = format(date, 'ha')
        hourMap[hour] = (hourMap[hour] || 0) + 1

        const pc = `PC-${c.pcNumber}`
        pcMap[pc] = (pcMap[pc] || 0) + 1
      }

      const toSortedArray = (map: Record<string, number>, key: string, value: string) =>
        Object.entries(map)
          .map(([k, v]) => {
            const numericValue = typeof v === 'number' ? v : parseFloat(v as any)
            return {
              [key]: k,
              [value]: Number.isFinite(numericValue) ? parseFloat(numericValue.toFixed(2)) : 0,
            }
          })
          .sort((a, b) => {
            if (key === 'hour') {
              const hourA = parseInt(a.hour.replace(/\D/g, ''), 10)
              const hourB = parseInt(b.hour.replace(/\D/g, ''), 10)
              return hourA - hourB
            }
            return 0
          })

      setDailyRevenue(toSortedArray(dailyMap, 'name', 'value'))
      setWeeklyRevenue(toSortedArray(weeklyMap, 'name', 'value'))
      setMonthlyRevenue(toSortedArray(monthlyMap, 'name', 'value'))

      const peakHours = toSortedArray(hourMap, 'hour', 'users')
      setPeakHoursData(peakHours)

      const topPCs = toSortedArray(pcMap, 'pc', 'bookings').sort((a, b) => b.bookings - a.bookings)
      setMostBookedPCs(topPCs.slice(0, 5))
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 mt-10">
      {/* Revenue Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Daily Revenue', data: dailyRevenue },
          { title: 'Weekly Revenue', data: weeklyRevenue },
          { title: 'Monthly Revenue', data: monthlyRevenue },
        ].map(({ title, data }) => (
          <Card key={title} className="bg-[#5041bc] text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-white text-sm font-medium">{title}</CardTitle>
              <CardDescription className="text-white text-xs">Revenue Trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4ade80"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      borderRadius: '6px',
                      border: '1px solid #4ade80',
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Peak Hours & Booked PCs */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-[#5041bc] text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-white text-sm font-medium">Peak Hours Analysis</CardTitle>
            <CardDescription className="text-white text-xs">User Activity per Hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={peakHoursData}>
                <XAxis dataKey="hour" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    borderRadius: '6px',
                    border: '1px solid #60a5fa',
                  }}
                />
                <Bar dataKey="users" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#5041bc] text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-white text-sm font-medium">Most Booked PCs</CardTitle>
            <CardDescription className="text-white text-xs">Top Used Machines</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mostBookedPCs}>
                <XAxis dataKey="pc" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    borderRadius: '6px',
                    border: '1px solid #facc15',
                  }}
                />
                <Bar dataKey="bookings" fill="#facc15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
