import React, { useState } from 'react'

export default function BasicCalendar() {
  const date = new Date()

  const [viewYear, setViewYear] = useState(date.getFullYear())
  const [viewMonth, setViewMonth] = useState(date.getMonth())
  // const viewYear = date.getFullYear()
  // const viewMonth = date.getMonth()

  // document.querySelector('.year-month').textContent = `${viewYear}年 ${
  //   viewMonth + 1
  // }月`

  const prevLastSet = date(viewYear, viewMonth, 0)
  const thisLastSet = date(viewYear, viewMonth, +1, 0)
  const [prevLast, setPrevLast] = useState(prevLastSet)
  const [thisLast, setThisLast] = useState(thisLastSet)

  // const prevLast = new date(viewYear, viewMonth, 0)
  // const thisLast = new date(viewYear, viewMonth, +1, 0)

  const PLDate = prevLast.getDate()
  const PLDay = prevLast.getDay()

  const TLDate = thisLast.getDate()
  const TLDay = thisLast.getDay()

  const prevDates = []
  const thisDates = [...Array(TLDate + 1).keys()].slice(1)
  const nextDates = []

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i)
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i)
  }

  const dates = prevDates.concat(thisDates, nextDates)

  dates.forEach((date, i) => {
    dates[i] = `<div className='date'>${date}</div>`
  })

  document.querySelector('.dates').innerHTML = dates.join('')

  return (
    <>
      <div className="calendar">
        <div className="header">
          <div className="year-month">
            {viewYear}年{viewMonth + 1}月
          </div>
          <div className="nav">
            <button className="nav-btn go-prev">&lt;</button>
            <button className="nav-btn go-today">&lt;</button>
            <button className="nav-btn go-next">&lt;</button>
          </div>
        </div>
        <div className="main">
          <div className="day">SUN</div>
          <div className="day">MON</div>
          <div className="day">TUE</div>
          <div className="day">WED</div>
          <div className="day">THUR</div>
          <div className="day">FRI</div>
          <div className="day">SAT</div>
        </div>
      </div>
    </>
  )
}
