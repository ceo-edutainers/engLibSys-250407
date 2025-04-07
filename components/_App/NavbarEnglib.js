import React, { useEffect, useState } from 'react'
import Link from '@/utils/ActiveLink'
import { handleLogout } from '@/utils/auth'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import cookie from 'js-cookie'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

import SearchForm from './SearchForm'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'

const NavbarEnglib = () => {
  // const NavbarEnglib = ({ user, loginStatus }) => {
  // //login status 確認
  // const [loginStatus, setLoginStatus] = useState('')

  const [loginStatus, setLoginStatus] = useState(false) //login時
  const [mbn, setMbn] = useState('')
  const [email, setEmail] = useState('')

  // console.log('loginStatusNavBarChek: ', loginStatus)

  useEffect(() => {
    var loginS = localStorage.getItem('loginStatus')

    if (loginS == null) {
      localStorage.setItem('loginStatus', false)

      setLoginStatus(false)
      // console.log('test1: ', loginStatus)
    }
    if (loginS == 'true') {
      setLoginStatus(true)
      // console.log('test2: ', loginStatus)
    }

    if (loginS == 'false') {
      setLoginStatus(false)
      // console.log('test3: ', loginStatus)
    }
  })

  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    setEmail('')
    console.log('bar reload', loginStatus)
    Router.push('/')
  }

  const [menu, setMenu] = React.useState(true)

  const toggleNavbar = () => {
    setMenu(!menu)
  }

  React.useEffect(() => {
    let elementId = document.getElementById('navbar')
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        elementId.classList.add('is-sticky')
      } else {
        elementId.classList.remove('is-sticky')
      }
    })
    window.scrollTo(0, 0)
  })

  // const isAdmin = user && user.role === 'admin'
  // const isTeacher = user && user.role === 'teacher'

  const classOne = menu
    ? 'collapse navbar-collapse'
    : 'collapse navbar-collapse show'
  const classTwo = menu
    ? 'navbar-toggler navbar-toggler-right collapsed'
    : 'navbar-toggler navbar-toggler-right'

  return (
    <React.Fragment>
      <div
        id="navbar"
        className="navbar-area pt-1 pb-1"
        style={{ border: '1px solid darkgray', borderRadius: '10px' }}
      >
        <div className="edemy-nav">
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg navbar-light">
              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{
                  backgroundColor: '#ececec',
                  marginRight: 0,
                  marginLeft: 0,
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              >
                <center>
                  <span className="icon-bar top-bar"></span>
                  <span className="icon-bar middle-bar"> </span>
                  <span className="icon-bar bottom-bar"></span>
                </center>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <div className="col-lg-12 col-md-12 ">
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      // setIsNotReady(true)
                      goMytop('/mytopGroup')
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      &nbsp;
                    </p>
                    <FontAwesomeIcon icon={faLaptop} size="1x" color="black" />{' '}
                    &nbsp;TOP
                  </button>
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      // setIsNotReady(true)
                      goDownload('/myDownload')
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      単語帳など
                    </p>
                    ダウンロード
                  </button>
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      友達の宿題を
                    </p>
                    見てみる
                  </button>
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',

                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      知らない
                    </p>
                    単語リスト
                  </button>
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',

                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      単語・文法など
                    </p>
                    毎日クイズ
                  </button>
                  {/* <a href="/myGroupHistory"> */}
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      &nbsp;
                    </p>
                    学習歴
                  </button>
                  {/* </a> */}
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',

                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      // setIsNotReady(true)
                      goHistoryPage('/myGroupHistory')
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      &nbsp;
                    </p>
                    ﾚｯｽﾝ歴
                  </button>
                  <button
                    className="btn btn-light"
                    style={{
                      // backgroundColor: 'orange',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #17a2b8',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      color: 'black',
                      padding: 0,

                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      請求・領収書
                    </p>
                    PAYMENT
                  </button>
                  <button
                    className="btn btn-light"
                    style={{
                      // backgroundColor: 'orange',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #17a2b8',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      color: 'black',
                      padding: 0,

                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      makeup
                    </p>
                    振替休み
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="mt-1 p-2"
          style={{ backgroundColor: '#eb595b', textAlign: 'center' }}
        >
          <h7 style={{ color: 'white' }}>
            オフラインそれ以上のオンライン英感プログラム、ただ今100人追加募集中。今なら入会金1.1万円が無料です。
            <br />
            英語はじめての生徒さんも英語圏の留学を目指す生徒さんも誰でも参加できます！まずは無料体験申込から！
          </h7>
        </div> */}
      </div>
    </React.Fragment>
  )
}

export default NavbarEnglib
