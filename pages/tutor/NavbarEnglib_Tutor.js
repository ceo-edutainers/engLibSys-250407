import React, { useEffect, useState } from 'react'
import Link from '@/utils/ActiveLink'
//import { handleLogout } from '@/utils/auth'

import Router, { useRouter } from 'next/router'
import cookie from 'js-cookie'

// import SearchForm from './SearchForm'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'

const NavbarEnglib_Tutor = () => {
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.DB_CONN_URL
  //Tutor-Authentication
  useEffect(() => {
    if (localStorage.getItem('T_loginStatus') !== 'true') {
      router.replace('/t_login') // ここでリダイレクト
    }
  })
  const [TloginStatus, setT_LoginStatus] = useState()

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
                  href="https://englib-materials.s3.ap-northeast-1.amazonaws.com/calendar/Calendar-2023-4-2024-3-for-student.pdf"
                  target="_blank"
                >
                  num4月〜
                </a>{' '}
                &nbsp;
                <a
                  href="https://englib-materials.s3.ap-northeast-1.amazonaws.com/calendar/Calendar-2024-4-2025-3-for-student.pdf"
                  target="_blank"
                >
                  2024年4月〜
                </a>{' '}
                &nbsp;
                <a
                  className="btn btn-info mr-2 ml-2"
                  href="https://englib-materials.s3.ap-northeast-1.amazonaws.com/document/Student-Rule-2024-3-ver4.pdf"
                  target="_blank"
                >
                  生徒ルール　
                </a>
                <a
                  className="btn btn-info mr-2"
                  href="https://englib-materials.s3.ap-northeast-1.amazonaws.com/document/ORT-HowToUse-2022-9-ver1.pdf"
                  target="_blank"
                >
                  ORC使用方法
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NavbarEnglib_Tutor
