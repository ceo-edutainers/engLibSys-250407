import React, { useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import LoginFormNewGroup from '@/components/Authentication/LoginFormNewGroupTest'
//import TryRegisterFormEnter from '@/components/Authentication/TryRegisterFormEnter'
// import HowToApplyTaiken from '@/components/VendorCertificationTraining/HowToApplyTaiken'

const Authentication = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      router.replace('/mytopGroup') // ここでリダイレクト
    } else {
      localStorage.setItem('MODE', 'TEST')
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
              <center>
                <h1>TEST用</h1>
              </center>
              <LoginFormNewGroup />
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
