import React, { useEffect, useState } from 'react'
import Link from '@/utils/ActiveLink'
//import { handleLogout } from '@/utils/auth'

import Router, { useRouter } from 'next/router'
import cookie from 'js-cookie'

// import SearchForm from './SearchForm'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'
import SweetAlert from 'react-bootstrap-sweetalert'

const NavbarEnglib_Tutor = () => {
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
  //Tutor-Authentication
  useEffect(() => {
    if (localStorage.getItem('T_loginStatus') !== 'true') {
      router.replace('/t_login') // ここでリダイレクト
    }
  })

  // totor material page
  const [openMaterialPage, setOpenMaterialPage] = useState()

  const [TloginStatus, setT_LoginStatus] = useState()

  const [isNowOpen, setIsNowOpen] = useState(false)
  useEffect(() => {
    var page = 'https://www.myben.app/materials/readingMaterials'
    // 'https://www.myenglib.com/onlesson/teacher_book_list_bc.php?mbn=123'

    setOpenMaterialPage(page)
  })
  const handleMaterialPage = () => {
    // router.replace('/' + openMaterialPage)

    setIsNowOpen(false)
    window.open(openMaterialPage, '_blank', 'noopener,noreferrer')
  }

  // console.log('TloginStatus', TloginStatus)
  useEffect(() => {
    if (localStorage.getItem('T_token')) {
      setT_LoginStatus(true)
    } else {
      setT_LoginStatus(false)
    }
  })

  let logOut = () => {
    setT_LoginStatus(false)
    localStorage.removeItem('T_token')
    localStorage.removeItem('T_loginStatus')
    localStorage.removeItem('T_email')
    localStorage.removeItem('tbn')
    localStorage.removeItem('T_login_level')
    localStorage.removeItem('T_timezone')
    localStorage.removeItem('T_now_summer_time')
    localStorage.removeItem('T_countryCode')
    localStorage.removeItem('mbn')
    localStorage.removeItem('memberTimezone')
    localStorage.removeItem('email')
    localStorage.removeItem('afterLoginRedirect')

    router.push('/t_login')
  }

  const [menu, setMenu] = React.useState(true)

  const toggleNavbar = () => {
    setMenu(!menu)
  }

  React.useEffect(() => {
    let elementId = document.getElementById('navbar')
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        elementId.classList.add('is-sticky')
      } else {
        elementId.classList.remove('is-sticky')
      }
    })
    window.scrollTo(0, 0)
  })

  // const isAdmin = user && user.role === 'admin'
  // const isTeacher = user && user.role === 'teacher'

  const classOne = menu
    ? 'collapse navbar-collapse'
    : 'collapse navbar-collapse show'
  const classTwo = menu
    ? 'navbar-toggler navbar-toggler-right collapsed'
    : 'navbar-toggler navbar-toggler-right'

  return (
    <React.Fragment>
      <div id="navbar" className="navbar-area">
        <div className="edemy-nav">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-lg-6 col-md-6 "
                style={{ backgroundColor: '#ececec', textAlign: 'left' }}
              >
                <div
                  className="navbar navbar-expand-lg navbar-light"
                  style={{ backgroundColor: '#ececec', textAlign: 'center' }}
                >
                  <h1 style={{ fontWeight: 800, textAlign: 'center' }}>
                    <Link href="/tutor/">
                      <a onClick={toggleNavbar} className="nav-link">
                        Tutor
                        {/* <i className="bx bx-chevron-down"></i> */}
                      </a>
                    </Link>

                    <p
                      style={{
                        textAlign: 'right',
                        paddingRight: 10,
                        fontSize: 10,
                        fontWeight: 500,
                        color: 'black',
                      }}
                    >
                      e n g l i b
                    </p>
                  </h1>

                  <button
                    onClick={toggleNavbar}
                    className={classTwo}
                    type="button"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar top-bar"></span>
                    <span className="icon-bar middle-bar"></span>
                    <span className="icon-bar bottom-bar"></span>
                  </button>
                  {TloginStatus ? (
                    <Link href="/t_login">
                      <a className="btn btn-primary" onClick={logOut}>
                        LOGOUT
                      </a>
                    </Link>
                  ) : (
                    <Link href="/t_login">
                      <a className="btn btn-primary">
                        <i className="flaticon-user"></i>LOGIN
                        {TloginStatus}
                      </a>
                    </Link>
                  )}

                  <div className={classOne} id="navbarSupportedContent"></div>
                </div>
              </div>
              <div
                className="col-lg-6 col-md-6 pt-4"
                style={{ backgroundColor: '#ececec', textAlign: 'right' }}
              >
                <a
                  // calendar/Calendar-2024-4-2025-3-for-student.pdf"
                  href={`https://${PUBLIC_R2_DOMAIN}/calendar/Calendar-2024-4-2025-3-for-student.pdf`}
                  target="_blank"
                >
                  Calendar Year 2024
                </a>{' '}
                &nbsp;{' '}
                <a
                  // /calendar/Calendar-2025-4-2026-3-for-student-ENG.pdf"
                  href={`https://${PUBLIC_R2_DOMAIN}/calendar/Calendar-2025-4-2026-3-for-student-ENG.pdf`}
                  target="_blank"
                >
                  Calendar Year 2025
                </a>{' '}
                &nbsp;
                <a
                  className="btn btn-info mr-2　"
                  //document/ORT-HowToUse-2022-9-ver1.pdf"
                  href={`https://${PUBLIC_R2_DOMAIN}/document/ORT-HowToUse-2022-9-ver1.pdf`}
                  target="_blank"
                >
                  How to use ORT
                </a>
                <a
                  className="btn btn-info mr-2 ml-2"
                  onClick={() => {
                    setIsNowOpen(true)
                  }}
                  target="_blank"
                >
                  Reading Materials
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SweetAlert
        title="Would you like to move to the reading materials page?"
        show={isNowOpen}
        onConfirm={() => handleMaterialPage()}
        onCancel={() => {
          setIsNowOpen(false)
        }}
        confirmBtnText="YES"
        cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          当社では、ウェブセキュリティチェックツールを使用して、教材リストページが第三者に公開されないようにしています。レッスン時に使用するコンピュータのブラウザ以外で開けたり、イングリブの講師ではない第３者に公開しないよう注意してください。
        </p>
        <p>
          At our company, we use web security check tools to prevent the course
          material list page from being made public to unauthorized third
          parties. Please ensure that it is not opened with anything other than
          the browser on the computer used during lessons, and do not share it
          with third parties who are not instructors at engLib."
        </p>
      </SweetAlert>
    </React.Fragment>
  )
}

export default NavbarEnglib_Tutor
