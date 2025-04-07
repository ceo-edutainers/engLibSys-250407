import React, { useEffect } from 'react'
// import Router, { useRouter } from 'next/router'
// import PageBanner from '../components/Common/PageBanner'
import TutorLoginFormNew from '@/components/Authentication/TutorLoginFormNew'
//import TryRegisterFormEnter from '../components/Authentication/TryRegisterFormEnter'
// import HowToApplyTaiken from '@/components/VendorCertificationTraining/HowToApplyTaiken'
// import NavbarEnglib_Tutor from '@/components/_App/NavbarEnglib_Tutor'
// import Footer_Tutor from '@/components/_App/Footer_Tutor'

const Authentication = () => {
  // const router = useRouter() //使い方：router.replace('/')

  // useEffect(() => {
  //   if (localStorage.getItem('T_loginStatus') == 'true') {
  //     router.replace('/tutor/tutorpage') // ここでリダイレクト
  //   }
  // })

  //ログイン後戻るページ
  var after_login_redirect = 'upcoming?tbn='
  // var after_login_redirect = '/index2?'

  return (
    <React.Fragment>
      {/* <NavbarEnglib_Tutor /> */}
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
              <TutorLoginFormNew after_login_redirect={after_login_redirect} />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer_Tutor /> */}
    </React.Fragment>
  )
}

export default Authentication
