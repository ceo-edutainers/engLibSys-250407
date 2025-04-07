import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
//import TryRegisterFormEnter from './TryRegisterFormEnter'

const LoginFormNewBtoB = () => {
  const [email, setEmail] = useState('') //login入力時
  const [password, setPassword] = useState('') //login入力時
  const [loginStatus, setLoginStatus] = useState(false) //login時

  const router = useRouter() //使い方：router.replace('/')

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
          setLoginStatus(true)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('M_loginStatus', true)
          localStorage.setItem('email', email)
          localStorage.setItem(
            'MypageMbn',
            response.data.response[0].member_barcode_num
          )
          localStorage.setItem('name_eng', response.data.response[0].name_eng)
          alert(response.data.message)

          router.replace('/quizappVocaClean') // ここでリダイレクト
        }
      })
  }

  useEffect(() => {
    if (localStorage.getItem('M_loginStatus') == true) {
      // console.log('2')
      Router.push('/quizappVocaClean')
    }
  }, [loginStatus])

  return (
    <div className="login-form">
      <h2>Login</h2>
      <h3>M_loginStatus:{loginStatus}</h3>

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

export default LoginFormNewBtoB
