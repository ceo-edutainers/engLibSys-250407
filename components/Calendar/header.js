import React from 'react'
import moment from 'moment'

const Header = ({ value, setValue }) => {
  function currMonthName() {
    return value.format('MMMM')
  }

  function currYearName() {
    return value.format('YYYY')
  }

  function prevMonth() {
    return value.clone().subtract(1, 'month')
  }
  function nextMonth() {
    return value.clone().add(1, 'month')
  }
  function thisMonth() {
    return value.isSame(new Date(), 'month')
  }
  return (
    <div className="header">
      <div
        className="previous"
        onClick={() => !thisMonth() && setValue(prevMonth())}
      >
        {!thisMonth() && <a className="btn btn-primary">{String('prev')}</a>}
      </div>
      <div>
        {currMonthName()} {currYearName()}
        <div onClick={() => setValue(thisMonth())}>
          <a className="btn btn-primary" style={{ color: 'white' }}>
            {String('today')}
          </a>
        </div>
      </div>
      <div className="next" onClick={() => setValue(nextMonth())}>
        <a className="btn btn-primary" style={{ color: 'white' }}>
          {String('next')}
        </a>
      </div>
    </div>
  )
}

export default Header
