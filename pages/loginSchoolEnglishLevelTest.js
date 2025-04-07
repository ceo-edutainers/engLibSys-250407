import React, { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import LoginFormNewSchoolEnglishLevelTest from '@/components/Authentication/LoginFormNewSchoolEnglishLevelTest'
//import TryRegisterFormEnter from '@/components/Authentication/TryRegisterFormEnter'
// import HowToApplyTaiken from '@/components/VendorCertificationTraining/HowToApplyTaiken'

const Authentication = () => {
  const router = useRouter() //使い方：router.replace('/')
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      router.replace('/quizappSchoolEnglishTest') // ここでリダイレクト
    }
  })

  return (
    <React.Fragment>
      {/* <PageBanner
        pageTitle="Authentication"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Authentication"
      /> */}

      <div className="profile-authentication-area ptb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <LoginFormNewSchoolEnglishLevelTest />
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 text-align-center">
          <CopyrightFooter />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Authentication
