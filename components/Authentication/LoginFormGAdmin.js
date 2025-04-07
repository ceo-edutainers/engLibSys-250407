import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import TryRegisterFormEnter from './TryRegisterFormEnter'

const LoginFormGAdmin = () => {
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時

  const [G_email, setG_Email] = useState('')
  const [G_password, setG_Password] = useState('')
  const [G_timezone, setG_Timezone] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  const submitlogin = () => {
    axios
      .post(DB_CONN_URL + '/G_login', {
        G_email: G_email,
        G_password: G_password,
      })
      .then((response) => {
        if (!response.data.auth) {
          //console.log('err-response in TutorLoginFormNew', response)
          alert(response.data.message)
        } else {
          //console.log('submit-login-ok-response in LoginFormNEw', response.data)
          setG_LoginStatus(true)
          localStorage.setItem('G_token', response.data.G_token)
          localStorage.setItem('G_loginStatus', true)
          localStorage.setItem('G_email', G_email)
          localStorage.setItem(
            'cbm',
            response.data.response[0].company_barcode_num
          )

          localStorage.setItem('G_timezone', response.data.response[0].timeZone)
          localStorage.setItem(
            'G_countryCode',
            response.data.response[0].country_code
          )
          localStorage.setItem(
            'G_now_summer_time',
            response.data.response[0].now_summer_time
          )
          alert(response.data.message)
          router.replace('/GAdmin') // ここでリダイレクト
        }
      })
  }

  useEffect(() => {
    if (localStorage.getItem('G_loginStatus') == 'true') {
      console.log('2')
      router.push('/GAdmin')
    }
  }, [G_loginStatus])

  return (
    <>
      <div className="login-form">
        <h2>Login for Group Admin</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Email"
            name="G_email"
            type="email"
            onChange={(e) => {
              setG_Email(e.target.value)
            }}
          />
          {/* {G_email} */}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Password"
            name="G_password"
            type="password"
            onChange={(e) => {
              setG_Password(e.target.value)
            }}
          />
        </div>

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

export default LoginFormGAdmin
