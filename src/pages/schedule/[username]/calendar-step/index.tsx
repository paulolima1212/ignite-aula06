import { useEffect, useState } from 'react'
import { Calendar } from '../../../../components/calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import dayjs from 'dayjs'
import { api } from '../../../../lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const selectedDay = selectedDate
    ? dayjs(selectedDate).format('DD[ of ]')
    : null
  const selectedMonth = selectedDate ? dayjs(selectedDate).format('MMMM') : null

  const selectDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })

      return response.data
    },
    { enabled: !!selectedDate }
  )

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}{' '}
            <span>
              {selectedDay} {selectedMonth}
            </span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.availableTimes?.map((hour) => {
              return (
                <TimePickerItem
                  disabled={!availability.availableTimes.includes(hour)}
                  key={hour}
                >
                  {String(hour).padStart(2, '0')}:00
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
