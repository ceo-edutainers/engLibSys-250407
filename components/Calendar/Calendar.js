import React, { Fragment, useState } from 'react'

import useCalendar from './useCalendar'

const Calendar = () => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar()

  const dateClickHandler = (date) => {
    alert(date)
    console.log(date)
  }

  return (
    <Fragment>
      <p>
        Selected Month:{' '}
        {`${
          monthNames[selectedDate.getMonth()]
        } - ${selectedDate.getFullYear()}`}
      </p>
      <table className="table">
        <thead className="table-light">
          <tr>
            {daysShort.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendarRows).map((cols) => {
            return (
              <tr key={cols[0].date}>
                {cols.map((col) =>
                  col.date === todayFormatted ? (
                    <td
                      key={col.date}
                      className={`${col.classes} today`}
                      onClick={() => {
                        dateClickHandler(col.date)
                      }}
                    >
                      {col.value}
                    </td>
                  ) : (
                    <td
                      key={col.date}
                      className={col.classes}
                      onClick={(e) => {
                        dateClickHandler(col.date)
                      }}
                    >
                      {col.value}
                    </td>
                  )
                )}
              </tr>
            )
          })}
        </tbody>
      </table>

      <button className="button" onClick={getPrevMonth}>
        Prev
      </button>
      <button className="button" onClick={getNextMonth}>
        Next
      </button>
    </Fragment>
  )
}

export default Calendar
