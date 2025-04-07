import React, { useEffect, useState } from 'react'
import Link from '@/utils/ActiveLink'
// import { handleLogout } from '@/utils/auth'
import Router from 'next/router'
// import cookie from 'js-cookie'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

// // import SearchForm from './SearchForm'
// import axios from 'axios'
// import { parseCookies } from 'nookies'
// import Cookies from 'js-cookie'

const NavbarEnglib = () => {
  // const NavbarEnglib = ({ user, loginStatus }) => {
  // //login status 確認
  // const [loginStatus, setLoginStatus] = useState('')

  const [loginStatus, setLoginStatus] = useState(false) //login時
  const [mbn, setMbn] = useState('')
  const [email, setEmail] = useState('')

  // console.log('loginStatusNavBarChek: ', loginStatus)

  // useEffect(() => {
  //   var loginS = localStorage.getItem('loginStatus')

  //   if (loginS == null) {
  //     localStorage.setItem('loginStatus', false)

  //     setLoginStatus(false)
  //     // console.log('test1: ', loginStatus)
  //   }
  //   if (loginS == 'true') {
  //     setLoginStatus(true)
  //     // console.log('test2: ', loginStatus)
  //   }

  //   if (loginS == 'false') {
  //     setLoginStatus(false)
  //     // console.log('test3: ', loginStatus)
  //   }
  // })

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
      <div
        id="navbar"
        className="navbar-area   "
        // style={{ backgroundColor: 'yellow' }}
      >
        <div
          className="edemy-nav"
          // style={{ backgroundColor: 'green' }}
        >
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg navbar-light">
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

                <ul className="navbar-nav">
                  <MediaQuery query="(max-width: 992px)">
                    <li className="nav-item">
                      <Link href="/" activeClassName="active">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          TOP
                        </a>
                      </Link>
                    </li>
                  </MediaQuery>
                  <MediaQuery query="(min-width: 992px)">
                    <li className="nav-item">
                      <Link href="/#core" activeClassName="active">
                        <a onClick={toggleNavbar} className="nav-link">
                          大事なのはそれじゃない
                        </a>
                      </Link>
                    </li>
                  </MediaQuery>
                  <MediaQuery query="(max-width: 992px)">
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
                    <MediaQuery query="(min-width: 992px)">
                      <Link href="/#meta">
                        <a onClick={toggleNavbar} className="nav-link">
                          英感習得
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 992px)">
                      <Link href="/#meta">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          英感習得メソッド
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                  </li>

                  <li className="nav-item ">
                    <MediaQuery query="(min-width: 992px)">
                      <Link href="/#customer">
                        <a onClick={toggleNavbar} className="nav-link">
                          サクセスストーリー
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 992px)">
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
                    {/* <Link href="/englibPrice">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link"
                      >
                        プログラム <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link> */}
                    <MediaQuery query="(min-width: 992px)">
                      <Link href="/englibPrice">
                        <a onClick={toggleNavbar} className="nav-link">
                          プログラム
                          <i className="bx bx-chevron-down"></i>
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 992px)">
                      <Link href="/englibPrice">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontSize: '20px' }}
                        >
                          プログラム
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <div className="container">
                          <div className="row ml-5">
                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li
                                  className="nav-item  mt-2"
                                  style={{ textAlign: 'center' }}
                                >
                                  <Link
                                    href="/englibPrice#input"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link pt-2 pb-2"
                                      style={{
                                        color: 'red',
                                        fontSize: '15px',
                                        backgroundColor: '#D5D8DC',
                                      }}
                                    >
                                      本コース
                                      <br />
                                      【インプットプログラム】
                                    </a>
                                  </Link>
                                </li>
                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#input"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉リーディングコースA
                                    </a>
                                  </Link>
                                </li>
                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#input"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉リーディングコースB
                                    </a>
                                  </Link>
                                </li>
                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#input"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉リーディングコースZ
                                    </a>
                                  </Link>
                                </li>
                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#inputself"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉セルフコース(レッスン無)
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            {/* <div className="col">
                              <ul
                                className="megamenu-submenu"
                                style={{ textAlign: 'center' }}
                              >
                                <li className="nav-item">
                                  <Link
                                    href="/englibPrice#inputself"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link pt-2 pb-2"
                                      style={{
                                        color: 'red',
                                        fontSize: '15px',
                                        backgroundColor: '#D5D8DC',
                                      }}
                                    >
                                      本コース
                                      <br />
                                      【インプットプログラム】
                                    </a>
                                  </Link>
                                </li>

                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#inputself"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉セルフコース(ﾚｯｽﾝ無)
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div> */}
                            <div className="col">
                              <ul className="megamenu-submenu mt-2">
                                <li
                                  className="nav-item"
                                  style={{ textAlign: 'center' }}
                                >
                                  <Link
                                    href="/englibPrice#output"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link pt-2 pb-2"
                                      style={{
                                        color: 'red',
                                        fontSize: '15px',
                                        backgroundColor: '#D5D8DC',
                                      }}
                                    >
                                      本コース
                                      <br />
                                      【アウトプットプログラム】
                                    </a>
                                  </Link>
                                </li>

                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#output"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉SHOW AND TELL
                                    </a>
                                  </Link>
                                </li>
                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#output"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉DISCUSSION
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li
                                  className="nav-item mt-2 pt-2 pb-2"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#D5D8DC',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#support"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{
                                        color: 'red',
                                        fontSize: '15px',
                                        paddingTop: '10px',
                                        paddingBottom: '12px',
                                      }}
                                    >
                                      サポートコース
                                    </a>
                                  </Link>
                                </li>

                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#support"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉英検サポート
                                    </a>
                                  </Link>
                                </li>
                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#support"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉学校英語サポート
                                    </a>
                                  </Link>
                                </li>
                                <li
                                  className="nav-item"
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ececec',
                                  }}
                                >
                                  <Link
                                    href="/englibPrice#support"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                      style={{ fontWeight: '500' }}
                                    >
                                      ◉文法サポート
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* <div
                            className="row m-0 mobile-none"
                            style={{ textAlign: 'center' }}
                          >
                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-code-alt"></i>
                                </div>
                                <h3>Development</h3>
                                <span className="sub-title">60 Courses</span>

                                <Link href="/courses-1">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-camera"></i>
                                </div>
                                <h3>Photography</h3>
                                <span className="sub-title">21 Courses</span>

                                <Link href="/courses-2">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-layer"></i>
                                </div>
                                <h3>Design</h3>
                                <span className="sub-title">58 Courses</span>

                                <Link href="/courses-3">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bxs-flag-checkered"></i>
                                </div>
                                <h3>Language</h3>
                                <span className="sub-title">99 Courses</span>

                                <Link href="/courses-4">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-health"></i>
                                </div>
                                <h3>Fitness</h3>
                                <span className="sub-title">21 Courses</span>

                                <Link href="/courses-5">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-line-chart"></i>
                                </div>
                                <h3>Business</h3>
                                <span className="sub-title">49 Courses</span>

                                <Link href="/courses-6">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item megamenu">
                    <MediaQuery query="(min-width: 992px)">
                      <Link href="/#price">
                        <a onClick={toggleNavbar} className="nav-link">
                          料金
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 992px)">
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

                  <li className="nav-item">
                    <MediaQuery query="(min-width: 992px)">
                      <Link href="/#tutor">
                        <a onClick={toggleNavbar} className="nav-link">
                          チューター
                          {/* <i className="bx bx-chevron-down"></i> */}
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 992px)">
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
                    <MediaQuery query="(min-width: 992px)">
                      <Link href="/#faq" activeClassName="active">
                        <a
                          onClick={toggleNavbar}
                          className="nav-link"
                          style={{ fontWeight: '900' }}
                        >
                          FAQ
                        </a>
                      </Link>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 992px)">
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

                  <MediaQuery query="(min-width: 992px)">
                    <div className="option-item">
                      <Link href="/#trial">
                        <a className="btn btn-danger">無料体験</a>
                      </Link>
                    </div>
                  </MediaQuery>
                  <MediaQuery query="(max-width: 992px)">
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
                  </MediaQuery>

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
