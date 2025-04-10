import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'

const LoginFormNewGroup = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  useEffect(() => {
    console.log('DB_CONN_URL', DB_CONN_URL)
    console.log('✅ API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL)
  }, [])

  const [email, setEmail] = useState('') //login入力時

  const [password, setPassword] = useState('') //login入力時
  const [loginStatus, setLoginStatus] = useState(false) //login時

  const router = useRouter() //使い方：router.replace('/')

  const submitlogin = () => {
    var url = DB_CONN_URL + '/loginBtoB'
    console.log('TEST-Request URL:', url) // 요청 URL을 로그에 출력
    axios
      .post(url, {
        email: email,
        password: password,
      })

      .then((response) => {
        if (!response.data.auth) {
          console.log('TEST-err-response in LoginFormNEw', response)
          alert(response.data.message)
        } else {
          alert(response.data.message)
          //console.log('submit-login-ok-response in LoginFormNEw', response.data)
          setLoginStatus(true)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('loginStatus', true)
          localStorage.setItem('email', response.data.response[0].email)
          localStorage.setItem('userName', response.data.response[0].name_eng)
          localStorage.setItem('memberSort', response.data.response[0].sort)
          localStorage.setItem(
            'memberTimezone',
            response.data.response[0].timezoneCity
          )
          localStorage.setItem(
            'timezoneUTC',
            response.data.response[0].timezoneUTC
          )
          localStorage.setItem(
            'wantAdjustTimezone',
            response.data.response[0].want_adjust_timezone
          )
          localStorage.setItem(
            'MypageMbn',
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
        console.log('TEST-Response:', response) // 응답 데이터 로그
      })
  }

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == true) {
      Router.push('/mytopGroup')
    }
  }, [loginStatus])

  return (
    <div className="container">
      <div className="pl-5 pr-5 pt-5 pb-5 max-w-4xl mx-auto bg-white shadow rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          重要なお知らせ：システム復旧に関するおしらせ
          <br />
          <h2>以下の内容を必ずご確認してください。</h2>
        </h1>
      </div>

      <div className="pt-5">
        <div className="pl-5 pr-5 pt-5 pb-5 max-w-4xl mx-auto bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-2">
            【現時点でご利用可能な機能】
          </h2>
          <ul className="list-disc ml-6 mb-4">
            <li>リーディング：全ての機能をご利用いただけます。</li>
            <li>シャドーイング： 全ての機能をご利用いただけます。</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">
            【Show and Tell コースをご受講中の方】
          </h2>
          <li>
            Show and Tell → 本日(4/10)中に復旧作業が完了される予定です。Show and
            Tellに参加中の生徒さんには改めてご連絡いたします。
          </li>
          <p className="mb-4">
            課題文章はパソコンのテキストエディタ等に保存の上、レッスン前までに以下のメールアドレス宛に送信をお願いいたします：
            <strong>online-help@edutainers.jp</strong>
          </p>

          <h2 className="text-xl font-semibold mb-2">
            【Monsterの付与について】
          </h2>
          <p className="mb-4">
            システム復旧後、対象の生徒様にMonster（ポイント）を正しく付与させていただきます。
          </p>

          <p className="mt-6">
            皆様にはご不便をおかけし誠に申し訳ございません。安全を最優先に対応を進めてまいりますので、
            引き続きどうぞよろしくお願いいたします。
          </p>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>englibサポートチーム</strong>
            </p>
            <p>📧：online-help@edutainers.jp</p>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12 col-md-12  text-center">
          <h2 style={{ fontWeight: 'bold' }}>Login</h2>
        </div>
        <div className="col-lg-3 col-md-12"></div>
        <div className="col-lg-6 col-md-12">
          <div className="login-form">
            {/* <h3>loginstatus:{loginStatus}</h3> */}

            <div className="form-group">
              <label>&nbsp;Username</label>
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
          <div className="col-lg-12 col-md-12 text-center mt-5">
            <h2 style={{ fontWeight: 'bold', fontSize: '15px' }}>
              BEN by engLib
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginFormNewGroup
