import React from 'react'
import NavbarEnglib_Tutor from '@/components/_App/NavbarEnglib_Tutor'
import Footer_Tutor from '@/components/_App/Footer_Tutor'
import RecurSchedule from '@/components/Calendar/RecurSchedule'
import CalendarApp from '@/components/Calendar/calendarApp'

const Events = () => {
  return (
    <React.Fragment>
      <NavbarEnglib_Tutor />
      <div className="events-area pt-100 pb-70">
        <div className="container">
          <RecurSchedule />
          <div className="mt-4"></div>
          <CalendarApp />
        </div>
      </div>

      {/* <SubscribeForm /> */}
      <Footer_Tutor />
    </React.Fragment>
  )
}

export default Events
