import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import TryRegisterFormEnter from './TryRegisterFormEnter'

const TutorLoginFormNew = ({ after_login_redirect }) => {
  const [url, setUrl] = useState('')
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!base) {
      console.error(
        '❌ 환경변수 NEXT_PUBLIC_API_BASE_URL이 정의되지 않았습니다.'
      )
      return
    } else {
      console.log('NEXT_PUBLIC_API_BASE_URL OK')
    }
    setUrl(base + '/t_login')
    console.log('✅ API Base URL:', base + '/t_login')
  }, [])

  // console.log('DB_CONN_URL', DB_CONN_URL)
  console.log('✅ API Base URL:', url)

  const [T_loginStatus, setT_LoginStatus] = useState(false) //login時
  const [tbn, setTbn] = useState('')
  const [T_email, setT_Email] = useState('')
  const [T_password, setT_Password] = useState('')
  const [T_timezone, setT_Timezone] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  const submitlogin = () => {
    axios
      .post(url, {
        T_email: T_email,
        T_password: T_password,
      })
      .then((response) => {
        if (!response.data.auth) {
          //console.log('err-response in TutorLoginFormNew', response)
          alert(response.data.message)
        } else {
          //console.log('submit-login-ok-response in LoginFormNEw', response.data)
          setT_LoginStatus(true)
          //ログイン後戻るページ
          localStorage.setItem('afterLoginRedirect', after_login_redirect)

          localStorage.setItem('T_token', response.data.T_token)
          localStorage.setItem('T_loginStatus', true)
          localStorage.setItem('T_email', T_email)
          localStorage.setItem(
            'T_timezone',
            response.data.response[0].timezoneCity
          )
          localStorage.setItem(
            'T_countryCode',
            response.data.response[0].timezoneCountryCode
          )
          localStorage.setItem(
            'T_now_summer_time',
            response.data.response[0].now_summer_time
          )
          localStorage.setItem(
            'tbn',
            response.data.response[0].teacher_barcode_num
          )
          localStorage.setItem(
            'T_login_level',
            response.data.response[0].tutor_login_level
          )

          alert(response.data.message)
          // router.replace('/tutor/tutor-temporary-page/') // ここでリダイレクト
          var alr = localStorage.getItem('afterLoginRedirect')
          var tbn = localStorage.getItem('tbn')
          var alr = '/tutor/' + alr + tbn
          // alert('1' + alr)
          router.push(alr)
        }
      })
  }

  useEffect(() => {
    if (localStorage.getItem('T_loginStatus') == 'true') {
      var alr = localStorage.getItem('afterLoginRedirect')
      var tbn = localStorage.getItem('tbn')
      var alr = '/tutor/' + alr + tbn
      // alert('2' + alr)
      router.push(alr)
    }
  }, [T_loginStatus])

  return (
    <>
      <div className="login-form">
        <div style={{ padding: '2rem' }}>
          <h1>🌐 환경변수 테스트 페이지</h1>
          <p>
            <strong>process.env.NEXT_PUBLIC_API_BASE_URL:</strong>{' '}
            {/* {process.env.NEXT_PUBLIC_API_BASE_URL || '❌ 환경변수 없음'} */}
            {url || '❌ 환경변수 없음'}
          </p>
        </div>
        <h2>engLib's Tutor Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Email"
            name="T_email"
            type="email"
            onChange={(e) => {
              setT_Email(e.target.value)
            }}
          />
          {/* {T_email} */}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Password"
            name="T_password"
            type="password"
            onChange={(e) => {
              setT_Password(e.target.value)
            }}
          />
        </div>
        {/* {T_password} */}

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
        </button>
      </div>
    </>
  )
}

export default TutorLoginFormNew
