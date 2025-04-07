import React, { useState, useEffect } from 'react'
// import PageBanner from '@/components/Common/PageBanner'
// import LoginFormNew from '@/components/Authentication/LoginFormNew'
// import NavbarEnglib from '@/components/_App/NavbarEnglib'
import Footer from '@/components/_App/Footer'
import TryRegisterFormEnter from '@/components/Authentication/TryRegisterFormEnter'
import LoginFormNewForSchedule from '@/components/Authentication/LoginFormNewForSchedule'
import TrySchedule from '@/components/Calendar/TrySchedule'
import TryCourseSelect from '@/components/Trylesson/TryCourseSelect'
import MemberMakeupSchedule from '@/components/Calendar/MemberMakeupSchedule'
import CalendarAppMember from '@/components/Calendar/calendarAppMember'
//PDF

// import HowToApplyTaiken from '@/components/VendorCertificationTraining/HowToApplyTaiken'

const Makeup = () => {
  return (
    <React.Fragment>
      {/* <NavbarEnglib /> */}
      <div className="events-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h5>振替ご希望の日付を選択して下さい。</h5>
            </div>
          </div>
          <MemberMakeupSchedule />
          <div className="mt-4"></div>
          <CalendarAppMember />
        </div>
      </div>

      {/* <SubscribeForm /> */}
      <Footer />
    </React.Fragment>
  )
}

export default Makeup
