import React, { useEffect, useState } from 'react'
import Link from '@/utils/ActiveLink'
//import { handleLogout } from '@/utils/auth'

import Router, { useRouter } from 'next/router'
import cookie from 'js-cookie'

import SearchForm from './SearchForm'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'

const NavbarEnglib_Admin = () => {
  const router = useRouter() //使い方：router.replace('/')

  //Tutor-Authentication
  useEffect(() => {
    if (localStorage.getItem('A_loginStatus') !== 'true') {
      router.replace('/login_a-d-m-i-n-i-s-trator_l-i-r-l-2948fljs') // ここでリダイレクト
    }
  })
  const [TloginStatus, setA_LoginStatus] = useState()

  // console.log('TloginStatus', TloginStatus)
  useEffect(() => {
    if (localStorage.getItem('A_token')) {
      setA_LoginStatus(true)
    } else {
      setA_LoginStatus(false)
    }
  })

  let logOut = () => {
    setA_LoginStatus(false)
    localStorage.removeItem('A_token')
    localStorage.removeItem('A_loginStatus')
    localStorage.removeItem('A_email')
    localStorage.removeItem('abn')
    localStorage.removeItem('A_login_level')
    router.push('/login_a-d-m-i-n-i-s-trator_l-i-r-l-2948fljs')
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
            <div className="navbar navbar-expand-lg navbar-light">
              {/* <Link href="/"> */}
              {/* <a onClick={toggleNavbar} className="navbar-brand"> */}
              {/* <img src="/images/logo.png" alt="logo" /> */}
              <h1 style={{ fontWeight: 800 }}>
                <Link href="/admin2/">
                  <a onClick={toggleNavbar} className="nav-link">
                    Admin
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

              {/* </a> */}
              {/* </Link> */}

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

              <div className={classOne} id="navbarSupportedContent">
                {/* <SearchForm /> */}

                <ul className="navbar-nav">
                  <li className="nav-item megamenu">
                    <Link href="/">
                      <a onClick={toggleNavbar} className="nav-link">
                        Pages<i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <div className="container">
                          <div className="row">
                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <hr></hr>
                                  <Link
                                    href="/courses-1"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ color: 'red' }}
                                    >
                                      by 生徒層
                                    </a>
                                  </Link>
                                  <hr></hr>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/tutor/tutor-set"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      tutor info
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/tutor/modal"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      modal
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/tutor/pdfviewer"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      pdfViewer
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/tutor/panel"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      split-panel
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/tutor/googledoc"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      googledoc
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/tutor/tutor-calendar-reg"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      tutor-calendar-reg{' '}
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/tutor/tutor-set"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      tutor-set
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/tutor/history"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      history
                                    </a>
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    href="/courses-6"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      英語やり直したいママ・パパ
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <hr></hr>
                                  <Link
                                    href="/single-courses-1"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ color: 'red' }}
                                    >
                                      by 年齢
                                    </a>
                                  </Link>
                                  <hr></hr>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/single-courses-2"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      ●
                                      英語にとっても興味があって、オンライ授業の２５分間集中できる年長さん
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/categories"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      ● 公立・和立の幼児・小中高大学生
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/membership-levels"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      ● インターの幼児・小中高生
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/become-a-teacher"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      ● 英語をやり直したい親
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/profile"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Profile
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <hr></hr>
                                  <Link
                                    href="/courses-1"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ color: 'red' }}
                                    >
                                      by 失敗経験
                                      <hr></hr>
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-2"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      長い期間色んな英語塾を通っても英語が喋れない・読めない生徒さん
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-3"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      英語は喋れるが、アカデミックな英語力が不足してるインターの生徒さん
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-4"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Phonicsを学んでも英語の本が読めるようにならない幼児や小学生
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-5"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      英文法や単語力はあるが、発音やリスニングが弱い生徒さん
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-6"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Right Sidebar
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <hr></hr>
                                  <Link
                                    href="/single-courses-1"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ color: 'red' }}
                                    >
                                      by 目的別
                                    </a>
                                  </Link>
                                  <hr></hr>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/single-courses-2"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      小学校の内英語の感覚を身に付けたい
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/categories"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      海外の中・高・大学を目指していて、エッセイ対策をしたい生徒
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/membership-levels"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      帰国子女の中高受験を準備している生徒
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/become-a-teacher"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Become a Teacher
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/profile"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Profile
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="row m-0 mobile-none">
                            <div className="col-lg-3 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                {/* <div className="icon">
                                  <i className="bx bx-code-radio"></i>
                                </div> */}
                                <h3 style={{ fontSize: 16, fontWeight: 600 }}>
                                  リアルタイム
                                  <br />
                                  生徒の練習声
                                </h3>
                                <span className="sub-title">
                                  音読/シャドーイング
                                </span>

                                <Link href="/courses-1">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-9 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                {/* <h3>アウトプットコース</h3> */}
                                <p className="sub-title">*play</p>
                                <p className="sub-title">*play</p>
                                <p className="sub-title">*play</p>
                                <Link href="/courses-2">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link href="/tutor/">
                      <a onClick={toggleNavbar} className="nav-link">
                        Mypage
                        {/* <i className="bx bx-chevron-down"></i> */}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/tutor/tutor-set">
                      <a onClick={toggleNavbar} className="nav-link">
                        MyInfo
                        {/* <i className="bx bx-chevron-down"></i> */}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/tutor/tutor-calendar-reg">
                      <a onClick={toggleNavbar} className="nav-link">
                        Schedule
                        {/* <i className="bx bx-chevron-down"></i> */}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item megamenu">
                    <Link href="/">
                      <a onClick={toggleNavbar} className="nav-link">
                        Class
                        {/* <i className="bx bx-chevron-down"></i> */}
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/">
                      <a onClick={toggleNavbar} className="nav-link">
                        Pay
                        {/* <i className="bx bx-chevron-down"></i> */}
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/products-list-2" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        Materials
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/products-list-2" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        Message
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/">
                      <a onClick={toggleNavbar} className="nav-link">
                        Lesson-History
                        {/* <i className="bx bx-chevron-down"></i> */}
                      </a>
                    </Link>
                  </li>
                </ul>

                <div className="others-option d-flex align-items-center">
                  {/* <div className="option-item">
                    <div className="cart-btn">
                      <Link href="/cart">
                        <a>
                          <i className="flaticon-shopping-cart"></i>{' '}
                          <span>3</span>
                        </a>
                      </Link>
                    </div>
                  </div> */}

                  <div className="option-item">
                    <div>
                      <Link href="/tutor/tutor-calendar-reg">
                        <a className="btn btn-danger">Schedule</a>
                      </Link>
                      <Link href="/tutor/calendarApp">
                        <a className="btn btn-info ml-4">Class</a>
                      </Link>
                    </div>
                  </div>
                  <div className="option-item">
                    <div>
                      {TloginStatus ? (
                        <Link href="/A_login">
                          <a className="btn btn-primary" onClick={logOut}>
                            LOGOUT
                          </a>
                        </Link>
                      ) : (
                        <Link href="/A_login">
                          <a className="btn btn-primary">
                            <i className="flaticon-user"></i>LOGIN
                            {TloginStatus}
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link href="/admin2/reg_youtube_scripA_time">
            <a onClick={toggleNavbar} className="nav-link">
              REG-youtubeScriptTime
              {/* <i className="bx bx-chevron-down"></i> */}
            </a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NavbarEnglib_Admin
