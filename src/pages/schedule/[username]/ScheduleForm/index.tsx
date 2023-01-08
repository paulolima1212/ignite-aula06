import { useState } from 'react'
import { ConfirmStep } from '../Confirm-step'
import { CalendarStep } from '../calendar-step'

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        handleClearSelectedDateTime={handleClearSelectedDateTime}
        schedulingDate={selectedDateTime}
      />
    )
  }
  return <CalendarStep onSelectDateTime={setSelectedDateTime} />
}
