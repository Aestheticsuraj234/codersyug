"use client"
import React from 'react'
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { addDays, format, setYear } from "date-fns" // Import `setYear` function

const DashboardCalender = () => {
    // Calculate the `from` date based on today's date
    const today = new Date(); // Get the current date
    const fromDate = setYear(today, 2023); // Set the year to 2023
    fromDate.setMonth(10); // Set the month to November (zero-based, so 10 is November)
    fromDate.setDate(22); // Set the date to 22

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: fromDate, // Use the calculated `from` date
        to: addDays(fromDate, 20),
    })

    return (
        <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        numberOfMonths={2}
        className='
        bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-200
        rounded-md
        '
      />
    )
}

export default DashboardCalender
