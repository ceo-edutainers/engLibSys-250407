import React, { useState, useEffect } from 'react'
// import PageBanner from '@/components/Common/PageBanner'
// import LoginFormNew from '@/components/Authentication/LoginFormNew'
// import NavbarEnglib from '@/components/_App/NavbarEnglib'
import Footer from '@/components/_App/Footer'
import TryRegisterFormEnter from '@/components/Authentication/TryRegisterFormEnter'
import LoginFormNewForSchedule from '@/components/Authentication/LoginFormNewForSchedule'
import TrySchedule from '@/components/Calendar/TrySchedule'
import TryCourseSelect from '@/components/Trylesson/TryCourseSelect'

//PDF

// import HowToApplyTaiken from '@/components/VendorCertificationTraining/HowToApplyTaiken'

const Authentication = () => {
  const [tryRegFormEnd, setTryRegEnd] = useState()

  useEffect(() => {
    const tryRegEnd = localStorage.getItem('TryRegisterFormEnter') //localStorageの TryRegisterFormEnter=endなら、体験フォームの入力が終わったこと
    const loginStatus = localStorage.getItem('loginStatus') //ログインの状態を確認, localStorageの loginStatus == trueならログイン状態のこと

    if (loginStatus == true) {
      //会員登録情報をもってくる
      //status = try-lessonの場合、
      //sys_member_trylesson_scheduleの status状況を確認する。(体験スケジュール確定なのか, 体験が終わってるのか)
      //status = try-lessonのではない場合は、 try-lessonが終わってる状況
    }

    if (loginStatus !== true) {
      if (tryRegEnd !== 'end') {
        setTryRegEnd(<TryCourseSelect />)

        //setTryRegEnd(<TryRegisterFormEnter />)
      } else {
        setTryRegEnd(<TrySchedule />)
      }
    } else {
      if (loginStatus == true) {
        setTryRegEnd(<TrySchedule />)
      } else {
        setTryRegEnd(<LoginFormNewForSchedule />)
      }
    }
  }, [])
  // useEffect(() => {
  //   if (localSR == 'true') {
  //     setTryregview('step2')
  //   } else {
  //     setTryregview('step1')
  //   }
  //   console.log('localSR: ', localSR)
  //   console.log('tryregview: ', tryregview)
  // }, [])

  return (
    <React.Fragment>
      {/* <PageBanner
        pageTitle="Authentication"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Authentication" 
      /> */}
      {/* <NavbarEnglib /> */}
      <div className="profile-authentication-area ptb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              {/* {() => {
                localStorage.getItem('TryRegisterFormEnter') == 'end' ? (
                  <TryRegisterFormSchedule />
                ) : (
                  <TryRegisterFormEnter />
                )
              }} */}
              {/* {() => {
                return tryView
              }} */}
              {tryRegFormEnd}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Authentication
