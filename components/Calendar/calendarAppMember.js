import React, { Component, useState } from 'react'
import Calendar from '@/components/Calendar/MyCalendar'
import moment from 'moment'
// const Events = () => {
function CalendarAppMember() {
  var vd = moment()
  const [value, setValue] = useState(vd)
  console.log(vd)
  return (
    <React.Fragment>
      <div>
        <Calendar value={value} onChange={setValue} />
      </div>
      <div>
        {() => {
          console.log(value)
        }}
      </div>
    </React.Fragment>
  )
}

export default CalendarAppMember
