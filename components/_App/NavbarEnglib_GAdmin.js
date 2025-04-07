import React, { useEffect, useState } from 'react'
import Link from '@/utils/ActiveLink'
//import { handleLogout } from '@/utils/auth'

import Router, { useRouter } from 'next/router'
import cookie from 'js-cookie'

// import SearchForm from './SearchForm'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'

const NavbarEnglib_Admin = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const router = useRouter() //使い方：router.replace('/')
  const [groupInfo, setGroupInfo] = useState()

  useEffect(() => {
    if (localStorage.getItem('G_loginStatus') == 'true') {
      var cbn = localStorage.getItem('cbm')
      var url = DB_CONN_URL + '/get-group-info/'
      var Url = url + cbn

      const fetchData = async () => {
        try {
          const response = await axios.get(Url)

          setGroupInfo(response.data.response)
          // alert(response.data.totalPoint)
          console.log('info:', response.data.response)
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [])
  //Tutor-Authentication
  useEffect(() => {
    if (localStorage.getItem('G_loginStatus') !== 'true') {
      router.replace('/g_admin_login') // ここでリダイレクト
    }
  })
  const [GloginStatus, setG_LoginStatus] = useState()

  // console.log('TloginStatus', TloginStatus)
  useEffect(() => {
    if (localStorage.getItem('G_token')) {
      setG_LoginStatus(true)
    } else {
      setG_LoginStatus(false)
    }
  })

  let logOut = () => {
    setG_LoginStatus(false)
    localStorage.removeItem('G_token')
    localStorage.removeItem('G_loginStatus')
    localStorage.removeItem('G_email')
    localStorage.removeItem('G_timezone')
    localStorage.removeItem('cbm')
    router.push('/g_admin_login')
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
              <h1
                className="ml-5"
                style={{ fontWeight: 800, paddingLeft: '50px' }}
              >
                <Link href="/GAdmin/">
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

                <div className="others-option d-flex align-items-center">
                  <div className="option-item">
                    {groupInfo &&
                      groupInfo.map((val, key) => {
                        return (
                          <>
                            <span className="mr-3" style={{ fontSize: '25px' }}>
                              {val.companyName}
                            </span>
                          </>
                        )
                      })}

                    {GloginStatus ? (
                      <Link href="/g_admin_login">
                        <a className="btn btn-primary" onClick={logOut}>
                          LOGOUT
                        </a>
                      </Link>
                    ) : (
                      <Link href="/g_admin_login">
                        <a className="btn btn-primary">
                          <i className="flaticon-user"></i>LOGIN
                          {GloginStatus}
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
    </React.Fragment>
  )
}

export default NavbarEnglib_Admin
