import axios from 'axios'
import React, { useState } from 'react'
import Link from 'next/link'
const LoginTest = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [emailReg, setEmailReg] = useState('')
  const [passwordReg, SetPasswordReg] = useState('')

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [loginStatus, setLoginStatus] = useState(false)

  //axios.defaults.withCredentials = true

  const register = () => {
    axios
      .get(DB_CONN_URL + '/trytest_reg', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response)
      })
  }

  const login = () => {
    axios
      .get(DB_CONN_URL + '/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response)
        if (!response.data.auth) {
          setLoginStatus(false)
        } else {
          console.log(response.data)

          localStorage.setItem('token', 'Bearer ' + response.data.token)
          setLoginStatus(true)
        }
      })
  }

  const userAuthenticated = () => {
    axios
      .get(DB_CONN_URL + '/isUserAuth', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response)
      })
  }

  return (
    <>
      <div className="form-control">
        <h1>Login</h1>
        <input
          type="test"
          placeholder="email..."
          value="minjaekato@gmail.com"
          onChange={(e) => {
            setEmailReg(e.target.value)
          }}
        />
        {email}

        <input
          type="test"
          placeholder="password..."
          value="minedcom"
          onChange={(e) => {
            setPasswordReg(e.target.value)
          }}
        />
        {password}
        <button onClick={register}>REG</button>
      </div>
      <div className="form-control">
        <h1>Login</h1>
        <input
          type="test"
          placeholder="email..."
          value="minjaekato@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        {email}

        <input
          type="test"
          placeholder="password..."
          value="minedcom"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        {password}
        <button onClick={login}>LOGIN</button>
        {loginStatus && (
          <button onClick={userAuthenticated}>
            Check if userAuthentication
          </button>
        )}
      </div>
    </>
  )
}

export default LoginTest
