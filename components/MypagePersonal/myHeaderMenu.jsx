// CSS mypage_for_adult.css

import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { QuizContext } from '@/components/MypageGroup/Contexts'
// import MonsterGet from '@/components/myPageGroup/MonsterGet'
// import ViewReadingLevel from '@/components/myPageGroup/ViewReadingLevel'
// import ViewOthersHomework from '@/components/myPageGroup/ViewOthersHomework'
// import FireViewReading from '@/components/readingSelfcourse/FireView'
// import FireViewShadowing from '@/components/shadowingSelfcourse/FireView'

import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faDoorOpen,
  faChartBar,
  faTrash,
  faPenSquare,
  faFileAudio,
  faHeadphones,
  faCubes,
  faLaptop,
  faFile,
} from '@fortawesome/free-solid-svg-icons'

function App() {
  const {
    myMbn,
    setMyMbn,
    userName,
    setUserName,
    // englibLevel,
    // setEnglibLevel,
  } = useContext(QuizContext)
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  const [isTodayLessonDay, setIsTodayLessonDay] = useState(false)
  const [isTodayLessonTime, setIsTodayLessonTime] = useState(false)
  const [nokoriMin, setNokoriMin] = useState()
  const [isNotReady, setIsNotReady] = useState(false)
  //今日がレッスン日なのかをチェック
  const checkIsTodayLessonDay = () => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      const fetchData2 = async () => {
        try {
          var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
          var Url = url + mbn
          const response = await axios.get(Url)

          var yoyakuDate = response.data[0].yoyakuDate
          var yoyakuTime = response.data[0].yoyakuTime

          //regdate & regtime START
          var d = ''
          var d = new Date()
          var Y = d.getFullYear()
          var M = d.getMonth() + 1
          var D = d.getDate()
          var h = d.getHours()
          var m = d.getMinutes()
          var s = d.getSeconds()
          // let ms = myFun_addZero(d.getMilliseconds())

          if (M < 10) {
            M = '0' + M
          }
          if (D < 10) {
            D = '0' + D
          }
          if (h < 10) {
            h = '0' + h
          }
          if (m < 10) {
            m = '0' + m
          }
          if (s < 10) {
            s = '0' + s
          }
          var NowRegdate = Y + '-' + M + '-' + D
          var NowRegtime = h + ':' + m + ':' + s

          if (NowRegdate !== yoyakuDate) {
            // alert(
            //   '本日はレッスン日では有りません。' + yoyakuDate + '/' + NowRegdate
            // )
            setIsTodayLessonDay(true)
            return false
          } else {
            //alert('レッスン日です。' + yoyakuDate + '/' + NowRegdate)

            var yoyakuHour = parseInt(yoyakuTime.split(':')[0])

            var yoyakuMin = parseInt(yoyakuTime.split(':')[1])
            // var yoyakuSec = parseInt(yoyakuTime.split(':')[2])
            var totalYoyakuHourToSec = yoyakuHour * 60 * 60
            var totalYoyakuMinToSec = yoyakuMin * 60
            var totalYayakuSec =
              parseInt(totalYoyakuHourToSec) + parseInt(totalYoyakuMinToSec)

            // alert(totalYoyakuHourToSec)
            // alert(totalYoyakuMinToSec)

            var nowHour = parseInt(NowRegtime.split(':')[0])
            var nowMin = parseInt(NowRegtime.split(':')[1])
            var nowSec = parseInt(NowRegtime.split(':')[2])
            var totalNowHourToSec = nowHour * 60 * 60
            var totalNowMinToSec = nowMin * 60
            var totalNowSec =
              parseInt(totalNowHourToSec) +
              parseInt(totalNowMinToSec) +
              parseInt(nowSec)

            //どのくらい残ってるのか
            var diff = totalYayakuSec - totalNowSec

            // var diff_min = parseInt(diff / 60)

            var nokori_min = parseInt(diff / 60)

            if (nokori_min > 60) {
              var nokori_h = parseInt(nokori_min / 60) //残り時間
              var nokori_h_min = parseInt(nokori_h * 60)
              var nokori_m = parseInt(nokori_min - nokori_h_min)
              setNokoriMin(
                '本日のレッスン時間は' +
                  yoyakuTime +
                  'です。レッスン開始まであと' +
                  nokori_h +
                  '時間' +
                  nokori_m +
                  '分です'
              )
            } else {
              setNokoriMin(
                '本日のレッスン時間は' +
                  yoyakuTime +
                  'です。レッスン開始まであと' +
                  nokori_min +
                  '分です'
              )
            }

            //10分前
            var tenMin = 10 * 60
            if (diff >= tenMin) {
              setIsTodayLessonTime(true)
              return false
            } else {
              router.replace('/lessonPreSAT') // ここでリダイレクト
              // alert(
              //   'レッスン開始' + totalYayakuSec + '/' + totalNowSec + '/' + diff
              // )
            }
          }
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }
  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('userName', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginPersonal')
  }

  return (
    <>
      <div className="AppBig">
        <div
          className="col-lg-12 col-md-12 mt-0 pt-0 pb-0 mb-0"
          style={{ textAlign: 'right' }}
        >
          <span
            className="mt-0 pt-0 pb-0 mb-0"
            style={{
              // backgroundColor: '#dedede',
              cursor: 'grab',
              color: '#566573',
              fontWeight: 'bold',
              paddingRight: '5%',
              fontSize: '17px',
            }}
            onClick={logOut}
          >
            LOGOUT
          </span>
        </div>
        <div
          className="QuizMpa mt-0 pt-0"
          style={{
            backgroundColor: '#ececec',
            border: '1px solid #D5D8DC',
            width: '90%',
            margin: '20px',
            padding: '20px',
          }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-lg-12 col-md-12 mb-3"
                style={{ textAlign: 'center' }}
              >
                {/* <MonsterGet /> */}
              </div>
              <div
                className="col-lg-3 col-md-12 mb-3"
                style={{
                  textAlign: 'center',
                  border: '1px solid darkgray',
                  borderRadius: '10px',
                  padding: '5px',
                }}
              >
                <p className="p-0">
                  THIS WEEK'S RANKING
                  {/* <br />
                  IN YOUR GROUP */}
                </p>
                <h1
                  style={{
                    fontWeight: '900',
                    fontSize: '60px',
                    paddingBottom: 0,
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    機能準備中
                  </span>
                  {/* <span style={{ color: 'red' }}>6</span>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>
                    &nbsp;位
                  </span> */}
                  {/* &nbsp;/&nbsp;1243
                  <span style={{ fontSize: '15px' }}>人中</span> */}
                  {/* <span
                    className="ml-2 p-1 mb-0"
                    style={{
                      backgroundColor: '#27AE60',
                      width: 'auto',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      cursor: 'none',
                      fontSize: '20px',
                      fontWeight: 'normal',
                      color: 'black',
                    }}
                  >
                    <span style={{ fontSize: '10px' }}>total</span>2,300p
                  </span> */}
                </h1>

                <span
                  className="btn btn-warning pt-0 pb-0 mt-0"
                  style={{ fontSize: '12px' }}
                  onClick={() => {
                    setIsNotReady(true)
                  }}
                >
                  もっと見る
                </span>
              </div>

              <div className="col-lg-6 col-md-12">
                <h1
                  style={{
                    fontWeight: '900',
                    fontSize: '50px',
                  }}
                >
                  MY BEN
                </h1>
                <p className="mb-0">{userName}&nbsp;&nbsp;</p>

                <br />

                {/* <div
                  className="col-lg-12 col-md-12 mb-2"
                  style={{ textAlign: 'center' }}
                > */}
                <span
                  className="btn btn-danger mb-2"
                  style={{
                    height: '50px',
                    border: '1px solid #cc99ff',
                    borderRadius: '10px',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: 'white',
                    opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                    // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                  }}
                  onClick={() => {
                    // setIsTodayLessonDay(true)
                    checkIsTodayLessonDay()
                  }}
                >
                  <FontAwesomeIcon icon={faLaptop} size="1x" color="white" />
                  &nbsp; 今日のレッスン開始
                </span>
                {/* </div> */}
              </div>
              <div
                className="col-lg-3 col-md-12 mb-3"
                style={{
                  textAlign: 'center',
                  border: '1px solid darkgray',
                  borderRadius: '10px',
                  padding: '5px',
                }}
              >
                <p className="p-0">
                  MY MONSTERS
                  {/* <br />
                  IN YOUR GROUP */}
                </p>

                <h1
                  style={{
                    fontWeight: '900',
                    fontSize: '60px',
                    paddingBottom: 0,
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    機能準備中
                  </span>
                  {/* <span style={{ color: 'red' }}>13</span>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>
                    &nbsp;個
                  </span> */}
                  {/* &nbsp;/&nbsp;12
                  <span style={{ fontSize: '15px' }}>人中</span> */}
                </h1>
                <span
                  className="btn btn-warning pt-0 pb-0 mt-0"
                  style={{ fontSize: '12px' }}
                  onClick={() => {
                    setIsNotReady(true)
                  }}
                >
                  もっと見る
                </span>
              </div>
            </div>

            <div className="row mt-3">
              <div
                className="col-lg-2 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <a href="/mybenPersonal">
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '85%',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'right',
                      fontSize: '20px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                  >
                    <FontAwesomeIcon icon={faLaptop} size="1x" color="black" />{' '}
                    &nbsp;TOP
                  </button>
                </a>
              </div>
              <div
                className="col-lg-2 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <button
                  style={{
                    backgroundColor: 'white',
                    width: '85%',
                    height: '50px',
                    border: '1px solid #cc99ff',
                    borderRadius: '10px',
                    verticalAlign: '50%',
                    alignItems: 'center',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: 'black',
                    opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                    // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                  }}
                  onClick={() => {
                    setIsNotReady(true)
                  }}
                >
                  My Monsters
                </button>
              </div>
              <div
                className="col-lg-2 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <button
                  style={{
                    backgroundColor: 'white',
                    width: '85%',
                    height: '50px',
                    border: '1px solid #cc99ff',
                    borderRadius: '10px',

                    verticalAlign: '50%',
                    alignItems: 'center',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: 'black',
                    opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                    // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                  }}
                  onClick={() => {
                    setIsNotReady(true)
                  }}
                >
                  My Vocab
                </button>
              </div>
              <div
                className="col-lg-2 col-md-12"
                style={{ textAlign: 'center' }}
              >
                {/* <a href="/myGroupHistory"> */}
                <button
                  style={{
                    backgroundColor: 'white',
                    width: '85%',
                    height: '50px',
                    border: '1px solid #cc99ff',
                    borderRadius: '10px',
                    verticalAlign: '50%',
                    alignItems: 'center',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: 'black',
                    opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                    // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                  }}
                  onClick={() => {
                    setIsNotReady(true)
                  }}
                >
                  学習歴
                </button>
                {/* </a> */}
              </div>
              <div
                className="col-lg-2 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <a href="/myGroupHistory">
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '85%',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',

                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '20px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    // onClick={() => {
                    //   setIsNotReady(true)
                    // }}
                  >
                    ﾚｯｽﾝ歴
                  </button>
                </a>
              </div>
              <div
                className="col-lg-2 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <button
                  className="btn btn-warning"
                  style={{
                    // backgroundColor: 'orange',
                    width: '85%',
                    height: '50px',
                    border: '1px solid orange',
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
                  無料英検ﾚﾍﾞﾙ測定
                </button>
              </div>
              <div
                className="col-lg-2 col-md-12"
                style={{ textAlign: 'center' }}
              >
                <button
                  className="btn btn-info"
                  style={{
                    // backgroundColor: 'orange',
                    width: '85%',
                    height: '50px',
                    border: '1px solid orange',
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
                  マイ情報
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div
                className="col-lg-6 col-md-12 mb-2"
                style={{ textAlign: 'center' }}
              >
                {/* <ViewReadingLevel /> */}
              </div>
              <div
                className="col-lg-6 col-md-12"
                style={{ textAlign: 'center' }}
              >
                {/* <ViewOthersHomework /> */}
              </div>

              {/* <div
                className="col-lg-12 col-md-12 mt-2 pl-5"
                style={{ textAlign: 'left' }}
              >
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  AIからのお知らせ
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <SweetAlert
        title="今日はレッスン日ではありません。"
        show={isTodayLessonDay}
        onConfirm={() => setIsTodayLessonDay(false)}
        onCancel={() => {
          setIsTodayLessonDay(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>レッスン開始時間の10分前からクリックできます。</p>
      </SweetAlert>
      <SweetAlert
        title="レッスンスタート時間の10分前からアクセスできます。"
        show={isTodayLessonTime}
        onConfirm={() => setIsTodayLessonTime(false)}
        onCancel={() => {
          setIsTodayLessonTime(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>{nokoriMin}</p>
      </SweetAlert>
      <SweetAlert
        title="サービス準備中です。"
        show={isNotReady}
        onConfirm={() => setIsNotReady(false)}
        onCancel={() => {
          setIsNotReady(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>近日中にサービス開始予定です。</p>
      </SweetAlert>
    </>
  )
}

export default App
