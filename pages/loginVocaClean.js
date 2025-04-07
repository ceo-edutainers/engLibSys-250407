import React, { useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import Footer from '@/components/_App/Footer'
import LoginFormNew from '@/components/Authentication/LoginFormNewVocaClean'

const Authentication = () => {
  const router = useRouter() //使い方：router.replace('/')
  useEffect(() => {
    if (
      localStorage.getItem('M_loginStatus') == 'true' &&
      localStorage.getItem('MypageMbn')
    ) {
      router.replace('quizappVocaClean') // ここでリダイレクト
      return false
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
              <LoginFormNew />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Authentication
