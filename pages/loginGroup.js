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

    // alert(email)
    // alert(password)
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
          ログインの前に
          <br />
          以下の内容を必ずご確認してください。
        </h1>
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
      <div className="pt-5">
        <div className="pl-5 pr-5 pt-5 pb-5 max-w-4xl mx-auto bg-white shadow rounded-xl">
          <h1 className="text-2xl font-bold mb-4">
            重要なお知らせ：システム一時停止のお知らせとレッスン参加方法について
          </h1>
          <p className="mb-4">
            平素よりenglibをご利用いただき、誠にありがとうございます。現在、
            <strong>
              englibのサーバーに不正アクセスの痕跡が確認されたため、安全確認のため一時的にシステムを停止
            </strong>
            しております。現在はAmazon側と連携のうえ、復旧作業を進めております。
            ご不便をおかけし、大変申し訳ございませんが、復旧まで今しばらくお待ちいただけますようお願い申し上げます。
          </p>

          <h2 className="text-xl font-semibold mb-2">【レッスンについて】</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>
              レッスンは<strong>通常通り</strong>実施されます。
            </li>
            <li>
              ログイン後、「レッスン参加ボタン」より、いつも通りご参加いただけます。
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">
            【現時点でご利用可能な機能】
          </h2>
          <ul className="list-disc ml-6 mb-4">
            <li>「レッスン参加」ボタンからのレッスン参加</li>
            <li>Reading課題 → 教材閲覧が可能</li>
            <li>Shadowing課題 → 課題ビデオ閲覧が可能</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">
            【現在一時的にご利用いただけない機能】
          </h2>
          <ul className="list-disc ml-6 mb-4">
            <li>
              <strong>録音機能（Reading／Shadowing共通）</strong>
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">
            【Show and Tell コースをご受講中の方】
          </h2>
          <p className="mb-4">
            課題文章はパソコンのテキストエディタ等に保存の上、レッスン前までに以下のメールアドレス宛に送信をお願いいたします：
            <strong>online-help@edutainers.jp</strong>
          </p>

          <h2 className="text-xl font-semibold mb-2">
            【リーディング課題について】
          </h2>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Oxford Reading Tree：専用アプリ「Oxford Reading
              Club」をご利用ください
            </li>
            <li>
              Reading Triumphs（アメリカ教科書）：お手元の紙教材をご使用ください
            </li>
            <li>Blackcatシリーズ：お手元の教材をご使用ください</li>
          </ul>

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
    </div>
  )
}

export default LoginFormNewGroup
