import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'

const LoginFormNew = () => {
  const [email, setEmail] = useState('') //login入力時
  const [password, setPassword] = useState('') //login入力時

  const [loginStatus, setLoginStatus] = useState(false) //login時

  // const [mbn, setMbn] = useState('') //login時

  axios.defaults.withCredentials = true

  const submitlogin = () => {
    axios
      .post('http://localhost:3001/login-for-taiken', {
        email: email,
        password: password,
      })
      .then((response) => {
        if (!response.data.auth) {
          // console.log('err-response in LoginFormNEw', response)
          // setLoginStatus(false)
        } else {
          console.log('submit-login-ok-response in LoginFormNEw', response.data)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('loginStatus', true)
          console.log('1')
          setLoginStatus(true)
          //console.log('token return', response.data.token)
          // setLoginStatus(true)

          // console.log('setLoginStatus:after login', setLoginStatus)

          //페이지 리로드
        }
      })
  }

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      console.log('2')
      Router.push('/try-reg')
    }
  }, [loginStatus])

  return (
    <div className="login-form">
      <h2>体験のスケジュール設定のためにログインしてください。</h2>

      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value)
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
  )
}

export default LoginFormNew
