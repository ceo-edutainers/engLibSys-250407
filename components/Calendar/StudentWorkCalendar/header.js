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
    <>
      <div
        className="header mb-0 pb-0"
        style={{ textAlign: 'center', width: '100%' }}
      >
        <div style={{ textAlign: 'center', width: '100%' }}>
          {currMonthName()} {currYearName()}
        </div>
      </div>
      <div className="header mt-0 pt-0">
        <div
          className="previous"
          onClick={() => !thisMonth() && setValue(prevMonth())}
        >
          {/* {!thisMonth() && ( */}
          <a className="btn btn-primary mr-1 " style={{ color: 'white' }}>
            {String('prev')}
          </a>
          {/* )} */}
        </div>

        <div onClick={() => setValue(thisMonth())}>
          <a className="btn btn-primary mr-1" style={{ color: 'white' }}>
            {String('today')}
          </a>
        </div>
        <div className="next" onClick={() => setValue(nextMonth())}>
          <a className="btn btn-primary" style={{ color: 'white' }}>
            {String('next')}
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
