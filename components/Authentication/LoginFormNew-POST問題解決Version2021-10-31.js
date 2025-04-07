import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'
//import TryRegisterFormEnter from './TryRegisterFormEnter'

const LoginFormNew = () => {
  const [email, setEmail] = useState('') //login入力時
  const [password, setPassword] = useState('') //login入力時
  const [loginStatus, setLoginStatus] = useState(false) //login時

  //axios.defaults.withCredentials = true

  const submitlogin = () => {
    axios
      .post(DB_CONN_URL + '/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        if (!response.data.auth) {
          console.log('err-response in LoginFormNEw', response)
          alert(response.data.message)
        } else {
          //console.log('submit-login-ok-response in LoginFormNEw', response.data)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('loginStatus', true)
          //console.log('1')
          alert(response.data.message)
          setLoginStatus(true)
        }
      })
  }

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      console.log('2')
      Router.push('/')
    }
  }, [loginStatus])

  return (
    <div className="login-form">
      <h2>Login</h2>
      <h3>loginstatus:{loginStatus}</h3>

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
        email:{email}
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
        password:{password}
      </div>

      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
          <Link href="/reset-password">
            <a className="lost-your-password">Lost your password?</a>
          </Link>
        </div>
      </div>

      <button onClick={submitlogin}>Log In</button>
    </div>
  )
}

export default LoginFormNew
