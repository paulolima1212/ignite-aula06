import { CaretLeft, CaretRight, CurrencyNgn } from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { getWeekDays } from '../../utils/get-week-days'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

interface CalendarWeek {
  week: number
  days: Array<{ date: dayjs.Dayjs; disabled: boolean }>
}

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelected: (date: Date) => void
}

type CalendarWeeks = CalendarWeek[]

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const weekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  const calendarWeeks = useMemo(() => {
    const daysInActiveMonth = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth()
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInActiveMonth.map((date) => {
        return { date, disabled: date.endOf('day').isBefore(new Date()) }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }
        return weeks
      },
      []
    )

    return calendarWeeks
  }, [currentDate])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMonth} title='NextMonth'>
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title='PreviousMonth'>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.date()}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
