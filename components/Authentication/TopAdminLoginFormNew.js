import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import TryRegisterFormEnter from './TryRegisterFormEnter'

const TopAdminLoginFormNew = () => {
  // const [mbn, setMbn] = useState('') //login時
  const [A_loginStatus, setA_LoginStatus] = useState(false) //login時
  const [tbn, setTbn] = useState('')
  const [A_email, setA_Email] = useState('')
  const [A_password, setA_Password] = useState('')
  const [A_timezone, setA_Timezone] = useState('')
  const [T_login_level, setT_login_level] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  // useEffect(() => {
  //   var A_loginS = localStorage.getItem('A_loginStatus')

  //   if (A_loginS == null) {
  //     localStorage.setItem('A_loginStatus', false)

  //     setA_LoginStatus(false)
  //     // console.log('test1: ', loginStatus)
  //   }
  //   if (A_loginS == 'true') {
  //     setA_LoginStatus(true)
  //     // console.log('test2: ', loginStatus)
  //   }

  //   if (A_loginS == 'false') {
  //     setA_LoginStatus(false)
  //     // console.log('test3: ', loginStatus)
  //   }
  // })

  const submitlogin = () => {
    axios
      .post(DB_CONN_URL + '/A_login', {
        A_email: A_email,
        A_password: A_password,
      })
      .then((response) => {
        if (!response.data.auth) {
          //console.log('err-response in TutorLoginFormNew', response)
          alert(response.data.message)
        } else {
          //console.log('submit-login-ok-response in LoginFormNEw', response.data)
          setA_LoginStatus(true)
          localStorage.setItem('A_token', response.data.A_token)
          localStorage.setItem('A_loginStatus', true)
          localStorage.setItem('A_email', A_email)
          localStorage.setItem('A_timezone', response.data.response[0].timeZone)
          localStorage.setItem(
            'A_countryCode',
            response.data.response[0].country_code
          )
          localStorage.setItem(
            'A_now_summer_time',
            response.data.response[0].now_summer_time
          )
          localStorage.setItem(
            'tbn',
            response.data.response[0].teacher_barcode_num
          )
          localStorage.setItem(
            'A_login_level',
            response.data.response[0].tutor_login_level
          )
          alert(response.data.message)
          router.replace('/admin2/') // ここでリダイレクト
        }
      })
  }

  useEffect(() => {
    if (localStorage.getItem('A_loginStatus') == 'true') {
      console.log('2')
      router.push('/admin2/')
    }
  }, [A_loginStatus])

  return (
    <>
      <div className="login-form">
        <h2>engLib's Top Admin Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Email"
            name="A_email"
            type="email"
            onChange={(e) => {
              setA_Email(e.target.value)
            }}
          />
          {/* {A_email} */}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Password"
            name="A_password"
            type="password"
            onChange={(e) => {
              setA_Password(e.target.value)
            }}
          />
        </div>
        {/* {A_password} */}

        <div className="row align-items-center">
          {/* <div className="col-lg-6 col-md-6 col-sm-6 remember-me-wrap">
          <p>
            <input type="checkbox" id="test2" />
            <label htmlFor="test2">Remember me</label>
          </p>
        </div> */}

          <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
            <Link href="/reset-password">
              <a className="lost-your-password">Lost your password?</a>
            </Link>
          </div>
        </div>

        <button type="submit" onClick={submitlogin}>
          Log In
          {/* {loading ? <Spinner color="success" /> : ''} */}
        </button>
        {/* <h1>
        {loginStatus && (
          <button onClick={userAuthenticated}>Check if Authenticated</button>
        )}
      </h1> */}
        {/* <h3>
        {loginStatus && (
          <button onClick={userAuthenticated}>
            login中{console.log('in LoginForm:loginStatus ', loginStatus)}
          </button>
        )}
      </h3> */}
      </div>
    </>
  )
}

export default TopAdminLoginFormNew
