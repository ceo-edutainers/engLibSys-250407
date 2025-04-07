import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
//import TryRegisterFormEnter from './TryRegisterFormEnter'

const LoginFormNewGroup = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [email, setEmail] = useState('') //login入力時
  const [password, setPassword] = useState('') //login入力時
  const [loginStatus, setLoginStatus] = useState(false) //login時

  const router = useRouter() //使い方：router.replace('/')

  const submitlogin = () => {
    var url = DB_CONN_URL + '/loginBtoB'
    axios
      .post(url, {
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
          localStorage.setItem('loginStatus', true)
          localStorage.setItem('email', email)
          localStorage.setItem('userName', response.data.response[0].name_eng)
          localStorage.setItem('memberSort', response.data.response[0].sort)
          localStorage.setItem(
            'mbn',
            response.data.response[0].member_barcode_num
          )
          localStorage.setItem(
            'cbn',
            response.data.response[0].company_barcode_num
          )
          localStorage.setItem(
            'bbn',
            response.data.response[0].branchName_barcode_num
          )

          //alert(response.data.message)

          router.replace('/mytopGroup') // ここでリダイレクト
        }
      })
  }

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == true) {
      Router.push('/mytopGroup')
    }
  }, [loginStatus])

  return (
    <div className="row">
      <div className="col-lg-3 col-md-12"></div>
      <div className="col-lg-6 col-md-12">
        <div className="login-form">
          <h2>Login</h2>
          {/* <h3>loginstatus:{loginStatus}</h3> */}

          <div className="form-group">
            <label>&nbsp;Email</label>
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            {/* email:{email} */}
          </div>

          <div className="form-group">
            <label>&nbsp;Password</label>
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            {/* password:{password} */}
          </div>

          <div className="form-group">
            <button className="btn btn-info ml-0 w-100" onClick={submitlogin}>
              Log In
            </button>
          </div>

          {/* <div className="row align-items-center">
        <div className="col-lg-6 col-md-6  lost-your-password-wrap">
          <Link href="/reset-password">
            <a className="lost-your-password">Lost your password?</a>
          </Link>
        </div>
      </div> */}

          <div className="col-lg-3 col-md-12"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginFormNewGroup
