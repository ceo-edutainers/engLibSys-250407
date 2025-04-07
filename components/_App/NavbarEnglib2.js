import React, { useEffect, useState } from 'react'
import Link from '@/utils/ActiveLink'
import { handleLogout } from '@/utils/auth'
import Router from 'next/router'
import cookie from 'js-cookie'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

import SearchForm from './SearchForm'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'

const NavbarEnglib = () => {
  // const NavbarEnglib = ({ user, loginStatus }) => {
  // //login status 確認
  // const [loginStatus, setLoginStatus] = useState('')

  const [loginStatus, setLoginStatus] = useState(false) //login時
  const [mbn, setMbn] = useState('')
  const [email, setEmail] = useState('')

  // console.log('loginStatusNavBarChek: ', loginStatus)

  useEffect(() => {
    var loginS = localStorage.getItem('loginStatus')

    if (loginS == null) {
      localStorage.setItem('loginStatus', false)

      setLoginStatus(false)
      // console.log('test1: ', loginStatus)
    }
    if (loginS == 'true') {
      setLoginStatus(true)
      // console.log('test2: ', loginStatus)
    }

    if (loginS == 'false') {
      setLoginStatus(false)
      // console.log('test3: ', loginStatus)
    }
  })

  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    setEmail('')
    console.log('bar reload', loginStatus)
    Router.push('/')
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
              <MediaQuery query="(min-width: 767px)">
                <Link href="/">
                  <a onClick={toggleNavbar} className="navbar-brand">
                    {/* <img src="/images/logo.png" alt="logo" /> */}
                    <h1 style={{ fontWeight: 800 }}>
                      engLib{mbn}
                      <br />
                      {email}
                      <p
                        style={{
                          textAlign: 'right',
                          paddingRight: 10,
                          fontSize: 10,
                          fontWeight: 500,
                          color: 'black',
                        }}
                      >
                        イ ン グ リ ブ
                      </p>
                    </h1>
                  </a>
                </Link>
              </MediaQuery>
              <MediaQuery query="(max-width: 767px)">
                <div
                  style={{
                    width: '100%',
                    textAling: 'center',
                  }}
                >
                  <center>
                    <Link href="/">
                      <a onClick={toggleNavbar} className="navbar-brand">
                        {/* <img src="/images/logo.png" alt="logo" /> */}
                        <h1 style={{ fontWeight: 800 }}>
                          engLib
                          <p
                            style={{
                              textAlign: 'center',
                              fontSize: 10,
                              fontWeight: 500,
                              paddingBottom: 0,
                              marginBottom: 0,
                              color: 'black',
                            }}
                          >
                            イ ン グ リ ブ
                          </p>
                          <p
                            style={{
                              textAlign: 'center',
                              paddingTop: 0,
                              marginTop: 0,
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'black',
                            }}
                          >
                            1:1 English Online Tutoring
                          </p>
                        </h1>
                      </a>
                    </Link>
                  </center>
                </div>
              </MediaQuery>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{
                  backgroundColor: '#ececec',
                  marginRight: 0,
                  marginLeft: 0,
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              >
                <center>
                  <span className="icon-bar top-bar"></span>
                  <span className="icon-bar middle-bar"></span>
                  <span className="icon-bar bottom-bar"></span>
                </center>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                {/* <SearchForm /> */}

                <ul className="navbar-nav pl-5 ml-0">
                  <MediaQuery query="(min-width: 767px)">
                    <li className="nav-item">
                      <Link href="/#core" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          大事なのはそれじゃない
                        </a>
                      </Link>
                    </li>
                  </MediaQuery>
                  <MediaQuery query="(max-width: 767px)">
                    <li className="nav-item">
                      <Link href="/#core" activeClassName="active">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          大事なのはそれじゃない
                        </a>
                      </Link>
                    </li>
                  </MediaQuery>

                  <li className="nav-item ">
                    <MediaQuery query="(min-width: 767px)">
                      <Link href="/#meta">
                        <a onClick={toggleNavbar} className="nav-link">
                          メタ認知式英感習得メソッド
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 767px)">
                      <Link href="/#meta">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          メタ認知式英感習得メソッド
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                  </li>

                  <li className="nav-item ">
                    <MediaQuery query="(min-width: 767px)">
                      <Link href="/#customer">
                        <a onClick={toggleNavbar} className="nav-link">
                          サクセスストーリー
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 767px)">
                      <Link href="/#customer">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          サクセスストーリー
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                  </li>

                  <li className="nav-item megamenu">
                    <MediaQuery query="(min-width: 767px)">
                      <Link href="/#price">
                        <a onClick={toggleNavbar} className="nav-link">
                          料金
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 767px)">
                      <Link href="/#price">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          料金
                        </a>
                      </Link>
                    </MediaQuery>
                  </li>

                  <li className="nav-item megamenu">
                    <MediaQuery query="(min-width: 767px)">
                      <Link href="/#textbook">
                        <a onClick={toggleNavbar} className="nav-link">
                          教材
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 767px)">
                      <Link href="/#textbook">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          教材
                        </a>
                      </Link>
                    </MediaQuery>
                  </li>

                  <li className="nav-item">
                    <MediaQuery query="(min-width: 767px)">
                      <Link href="/#tutor">
                        <a onClick={toggleNavbar} className="nav-link">
                          チューター
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 767px)">
                      <Link href="/#tutor">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          チューター
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                  </li>

                  <li className="nav-item">
                    <MediaQuery query="(min-width: 767px)">
                      <Link href="/#faq" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          よくある質問
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 767px)">
                      <Link href="/#faq" activeClassName="active">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          よくある質問
                        </a>
                      </Link>
                    </MediaQuery>
                  </li>

                  {/* <li className="nav-item">
                    <Link href="/" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        英語で活動 <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link href="/" activeClassName="active">
                          <a className="nav-link">Learning Provider</a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link href="/elearning" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            eLearning School
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/vendor-certification"
                          activeClassName="active"
                        >
                          <a onClick={toggleNavbar} className="nav-link">
                            Vendor Certification Training
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link href="/online-training" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Online Training School
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/distance-learning"
                          activeClassName="active"
                        >
                          <a onClick={toggleNavbar} className="nav-link">
                            Distance Learning
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link href="/language-school" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Language School
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link href="/modern-schooling" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Modern Schooling
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link href="/yoga-training" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Yoga Training
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link href="/health-coaching" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Health Coaching
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link href="/kindergaten" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Kindergaten
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li> */}

                  {/* <li className="nav-item">
                    <Link href="/become-a-teacher">
                      <a className="nav-link">親コース</a>
                    </Link>
                  </li> */}

                  {/* {((user isTeacher) || (user && isAdmin)) && (
                    <li className="nav-item">
                      <Link href="/teacher/dashboard">
                        <a className="nav-link">Teacher Dashboard</a>
                      </Link>
                    </li>
                  )}

                  {user && isAdmin && (
                    <li className="nav-item">
                      <Link href="/admin/dashboard">
                        <a className="nav-link">Dashboard</a>
                      </Link>
                    </li>
                  )} */}
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

                  {/* <div className="option-item">
                    <div>
                      {loginStatus ? (
                        <Link href="/">
                          <a className="btn btn-primary" onClick={logOut}>
                            LOGOUT
                          </a>
                        </Link>
                      ) : (
                        <Link href="/login">
                          <a className="btn btn-primary">
                            <i className="flaticon-user"></i>LOGIN
                          </a>
                        </Link>
                      )}
                    </div>
                  </div> */}

                  <MediaQuery query="(min-width: 767px)">
                    <div className="option-item">
                      <div>
                        <Link href="/#trial">
                          <a className="btn btn-danger">無料体験</a>
                        </Link>
                      </div>
                    </div>
                  </MediaQuery>
                  {/* <MediaQuery query="(max-width: 767px)">
                    <div
                      className="option-item"
                      style={{ textAlign: 'center', width: '100%' }}
                    >
                      <div>
                        <Link href="/#trial">
                          <a className="btn btn-danger">無料体験はこちらから</a>
                        </Link>
                      </div>
                    </div>
                  </MediaQuery> */}

                  {loginStatus && (
                    <div className="option-item">
                      {/* <div>
                        <Link href="/mypage">
                          <a className="btn btn-primary">
                            <i className="flaticon-user"></i>
                          </a>
                        </Link>
                      </div> */}
                    </div>
                  )}

                  {/* <div className="option-item">
                    <div>
                      <Link href="/tutor/">
                        <a className="btn btn-info">
                          <i className="flaticon-user"></i>Tutor
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="option-item">
                    <div>
                      <Link href="/admin2/">
                        <a className="btn btn-secondary">
                          <i className="flaticon-user"></i>Admin
                        </a>
                      </Link>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="mt-1 p-2"
          style={{ backgroundColor: '#eb595b', textAlign: 'center' }}
        >
          <h7 style={{ color: 'white' }}>
            オフラインそれ以上のオンライン英感プログラム、ただ今100人追加募集中。今なら入会金1.1万円が無料です。
            <br />
            英語はじめての生徒さんも英語圏の留学を目指す生徒さんも誰でも参加できます！まずは無料体験申込から！
          </h7>
        </div> */}
      </div>
    </React.Fragment>
  )
}

export default NavbarEnglib
