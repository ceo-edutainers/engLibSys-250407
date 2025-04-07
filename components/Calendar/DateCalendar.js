import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
// import Search from './Search.js'
// import './Sample.less'

export default function DateCalendar() {
  const [selectedDate, setSelectedDate] = useState(null)

  //for Search Date button
  const [showSearch, setShowSearch] = useState(false)

  return (
    <>
      <div>
        <button
          className="btn btn-primary"
          varient="outlined"
          onClick={() => {
            setShowSearch(!showSearch)
          }}
        >
          Search Date
        </button>
      </div>
      <div>
        {showSearch && <Search />}
        {showSearch && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            maxDate={new Date(moment().add(3, 'months'))} //最大3ヶ月後のスケジュール
            filterDate={(date) => date.getDay() != 6 && date.getDay() != 0} //土日はSelectできないようにする
          />
        )}
      </div>
    </>
  )
}
