import React, { useState } from 'react'
import BasicCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

const TutorCalendar = () => {
  const [date, setDate] = useState(new Date())
  const onChange = (date) => {
    setDate(date)
  }

  function handleSelect(ranges) {
    console.log('range:', ranges)
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  const onChange2 = (date) => {
    console.log('Change2:', date)
  }
  return (
    <React.Fragment>
      <div>
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        <Calendar date={new Date()} minDate={new Date()} onChange={onChange2} />
        <DatePicker />
        <BasicCalendar minDate={new Date()} onChange={onChange} value={date} />
        {console.log(date)}
        {console.log('Startdate:', date[0])}
        {console.log('Enddate:', date[1])}
        {date.toString()}
      </div>

      {/* <SubscribeForm /> */}
      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default TutorCalendar
