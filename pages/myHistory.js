// CSS mypage_for_adult.css

import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { QuizContext } from '@/components/readingSelfcourse/Contexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

// ['menu', 'playing', 'finished']

function App() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [isTodayLessonDay, setIsTodayLessonDay] = useState(false)
  const [isTodayLessonTime, setIsTodayLessonTime] = useState(false)

  const [myCourseList, setMyCourseList] = useState([])
  // const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  // const [eikenLevel, setEikenLevel] = useState('')
  const [userName, setUserName] = useState('')
  const [nokoriMin, setNokoriMin] = useState()
  //今日がレッスン日なのかをチェック
  const checkIsTodayLessonDay = () => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)

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

  useEffect(() => {
    // ブラウザバックを禁止する
    const fetchData = async () => {
      try {
        history.pushState(null, null, location.href)
        window.addEventListener('popstate', (e) => {
          setIsOpenBackMypage(true)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return false
  }, [])

  useEffect(() => {
    if (
      localStorage.getItem('loginStatus') !== 'true' ||
      !localStorage.getItem('loginStatus')
    ) {
      alert('先にログインしてください。')
      router.push('/loginGroup/')
    }
  }, [G_loginStatus])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      const fetchData1 = async () => {
        try {
          if (practiceTempId == '') {
            //practiceTempIdはこのページをリロードしたら新しくなる。

            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
            console.log('practiceTempId-ない時:', practiceTempId)
          } else {
            console.log('practiceTempId-ある時:', practiceTempId)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData1()
    }
  }, [])

  const [loginStatus, setLoginStatus] = useState(false) //login時
  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('name_eng', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
  }
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
      setMyMbn(mbn)
      var url = DB_CONN_URL + '/get-all-list-sys_member_lesson_set_BtoB/'
      var Url = url + mbn

      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            if (response.data.status == false) {
              alert('db select failed')
            } else {
              //メンバーデーターが登録されてない時に以下のようにエラーを出して、ログアウトされる
              // alert(response.data.status)
              if (response.data.length) {
                alert(response.data.message)
                // alert(response.data.mbn)
                localStorage.removeItem('token', '')
                localStorage.removeItem('loginStatus', '')
                localStorage.removeItem('email', '')
                localStorage.removeItem('mbn', '')
                router.replace('/loginGroup') // ここでリダイレクト
                // return false
              } else {
                // alert(response.data.message)
                setUserName(response.data.response[0].name_eng)
                setMyCourseList(response.data.response)
                console.log('myCourseList', myCourseList)
              }
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchData1()
    }
  }, [])

  return (
    <div className="AppBig">
      <QuizContext.Provider
        value={{
          myMbn,
          setMyMbn,
          // HWID,
          // setHWID,
          // bookCoverImgUrl,
          // setBookCoverImgUrl,
          // bookImgUrl,
          // setBookImgUrl,
          // bookAudioUrl,
          // setBookAudioUrl,
          // seriesName,
          // setSeriesName,
          // bookStory,
          // setBookStory,
          // readingLevel,
          // setReadingLevel,
          // bookTitle,
          // setBookTitle,
          // bookNum,
          // setBookNum,
          // storyNum,
          // setStoryNum,
          // storyTitle,
          // setStoryTitle,
          // practiceTempId,
          // setPracticeTempId,
          // audioOnOff,
          // setAudioOnOff,
          // course,
          // setCourse,
          // courseName,
          // setCourseName,
          // pageView,
          // setPageView,

          // courseLevel,
          // setCourseLevel,
          // textbook,
          // setTextbook,
          // eikenLevel,
          // setEikenLevel,
          userName,
          setUserName,
          // point,
          // setPoint,
          // totalQuestion,
          // setTotalQuestion,
        }}
      >
        {/* <MonsterGet /> */}
        {/* <p> {practiceTempId}</p> */}
        <div className="row pt-3">
          <div className="col-lg-12 col-md-12 mt-2">
            <h1
              style={{
                fontWeight: '900',
                fontSize: '30px',
                marginBottom: 0,
                paddingBottom: 0,
              }}
            >
              MY BEN
            </h1>
            <h6>
              {userName}&nbsp;&nbsp;
              <span
                style={{
                  textAlign: 'center',
                  backgroundColor: '#dedede',
                  cursor: 'grab',
                  color: '#566573',
                  padding: '0px 5px',
                  fontWeight: 'bold',
                  width: '100%',
                }}
                onClick={logOut}
              >
                LOGOUT
              </span>
            </h6>
          </div>
        </div>
        <div
          className="QuizMpa p-0"
          style={{ backgroundColor: 'white', border: '0px' }}
        >
          <div
            className="col-lg-12 col-md-12  p-0"
            style={{
              textAlign: 'center',
            }}
          >
            <button
              className="btn btn-info"
              style={{
                // backgroundColor: '#F7DC6F',
                width: '99%',
                height: '50px',
                // border: '1px solid #cc99ff',
                borderRadius: '10px',
                margin: 0,
                padding: 0,
                // marginLeft: '10px',

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
              <FontAwesomeIcon icon={faLaptop} size="1x" color="black" />
              レッスン開始
            </button>
          </div>
        </div>
        <div
          className="QuizMpa mb-3 p-0 mt-1"
          style={{ backgroundColor: '#dedede', border: '0px solid #dedede' }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-lg-4 col-md-12 mt-1"
                style={{ textAlign: 'center' }}
              >
                <button
                  style={{
                    backgroundColor: '#ececec',
                    width: '85%',
                    height: '50px',
                    border: '1px solid #cc99ff',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    verticalAlign: '50%',
                    alignItems: 'right',
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
                  <FontAwesomeIcon icon={faLaptop} size="1x" color="black" />
                  &nbsp;
                </button>
              </div>

              <div
                className="col-lg-4 col-md-12 mt-1"
                style={{ textAlign: 'center' }}
              >
                <button
                  style={{
                    backgroundColor: '#ececec',
                    width: '85%',
                    height: '50px',
                    border: '1px solid #cc99ff',
                    borderRadius: '10px',
                    marginBottom: '10px',
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
                  <FontAwesomeIcon icon={faCubes} size="1x" color="black" />
                  &nbsp;
                </button>
              </div>

              <div
                className="col-lg-4 col-md-12 mt-1"
                style={{ textAlign: 'center' }}
              >
                <button
                  style={{
                    backgroundColor: '#ececec',
                    width: '85%',
                    height: '50px',
                    border: '1px solid #cc99ff',
                    borderRadius: '10px',
                    marginBottom: '10px',
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
                  <FontAwesomeIcon icon={faCubes} size="1x" color="black" />
                  &nbsp; My History
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="QuizMpa mt-0"
          style={{ backgroundColor: 'white', border: '10px solid #EBEDEF' }}
        >
          <div className="row">
            <div
              className="col-lg-12 col-md-12 mt-3 mb-3"
              style={{
                width: '100%',
                textAlign: 'center',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
              <p
                style={{
                  backgroundColor: '#F7DC6F',
                  width: '100%',
                  border: '1px solid #cc99ff',
                  borderRadius: '10px',
                  margin: '0px',
                  padding: '10px',

                  fontSize: '20px',
                  fontWeight: 'normal',
                  color: 'black',
                  textAling: 'center',
                }}
              >
                あなたが参加しているプログラム{' '}
              </p>
              <p style={{ color: '#212F3D', fontSize: '15px' }}>
                毎日の課題をスタートするためには、以下のプログラムをそれぞれクリックしてください。
              </p>
            </div>
            {myCourseList.map((val, key) => {
              return (
                <>
                  {val.courseName == 'CourseA_SC' && (
                    <div className="col-lg-6 col-md-12">
                      {/* <Link href="/readingSelfcourseA"> */}
                      <button
                        className="banner-content"
                        style={{
                          backgroundColor: '#EBF5FB',
                          height: '320px',
                          // width: '90%',
                          border: '1px solid #2C3E50',
                          borderRadius: '10px',
                          marginBottom: '10px',
                          // verticalAlign: '50%',
                          alignItems: 'center',
                          padding: 0,
                        }}
                      >
                        <h5
                          style={{
                            color: '#808B96',
                            fontWeight: '900',
                            fontSize: '15px',
                          }}
                        >
                          INPUT PROGRAM
                        </h5>
                        <h5
                          style={{
                            color: 'black',
                            fontWeight: '900',
                          }}
                        >
                          INTENSIVE READING
                        </h5>
                        <p
                          style={{
                            color: '#666666',
                            fontSize: '12px',
                            fontWeight: 'normal',
                          }}
                        >
                          　精読プログラム
                        </p>
                        <img
                          src="images/icon-a-reading.png"
                          style={{ width: '50%' }}
                        />
                        <h6 style={{ color: '#666666', marginTop: '10px' }}>
                          SELF STUDY
                        </h6>
                        <button
                          className="btn btn-secondary"
                          style={{ width: '40%' }}
                        >
                          セルフ学習
                        </button>{' '}
                        <button
                          className="btn btn-danger"
                          style={{ width: '40%' }}
                        >
                          毎日練習
                        </button>
                      </button>
                      {/* </Link> */}
                    </div>
                  )}
                  {val.courseName == 'CourseB_SC' /*readingSelfCourse*/ && (
                    <div className="col-lg-6 col-md-12 mt-2">
                      {/* <Link href="/readingSelfcourseB"> */}
                      <button
                        className="banner-content"
                        style={{
                          backgroundColor: '#EBF5FB',
                          height: '320px',
                          // width: '90%',
                          border: '5px solid #2C3E50',
                          borderRadius: '10px',
                          marginBottom: '10px',
                          // verticalAlign: '50%',
                          alignItems: 'center',
                          padding: 0,
                        }}
                      >
                        <h5
                          style={{
                            color: '#808B96',
                            fontWeight: '900',
                            fontSize: '15px',
                          }}
                        >
                          INPUT PROGRAM
                        </h5>
                        <h5
                          style={{
                            color: 'black',
                            fontWeight: '900',
                          }}
                        >
                          INTENSIVE READING
                        </h5>
                        <p
                          style={{
                            color: '#666666',
                            fontSize: '12px',
                            fontWeight: 'normal',
                          }}
                        >
                          　精読プログラム
                        </p>
                        <img
                          src="images/icon-a-reading.png"
                          style={{ width: '50%' }}
                        />
                        <h6 style={{ color: '#666666', marginTop: '10px' }}>
                          SELF STUDY
                        </h6>
                        <button
                          className="btn btn-secondary"
                          style={{ width: '40%' }}
                        >
                          セルフ学習
                        </button>{' '}
                        <button
                          className="btn btn-danger"
                          style={{ width: '40%' }}
                        >
                          毎日練習
                        </button>
                      </button>
                      {/* </Link> */}
                    </div>
                  )}
                  {val.courseName == 'CourseZ_SC' && (
                    <div className="col-lg-6 col-md-12 mt-2">
                      {/* <Link href="/readingSelfcourseZ"> */}
                      <button
                        className="banner-content"
                        style={{
                          backgroundColor: '#EBF5FB',
                          height: '320px',
                          // width: '90%',
                          border: '5px solid #2C3E50',
                          borderRadius: '10px',
                          marginBottom: '10px',
                          // verticalAlign: '50%',
                          alignItems: 'center',
                          padding: 0,
                        }}
                      >
                        <h5
                          style={{
                            color: '#808B96',
                            fontWeight: '900',
                            fontSize: '15px',
                          }}
                        >
                          INPUT PROGRAM
                        </h5>
                        <h5
                          style={{
                            color: 'black',
                            fontWeight: '900',
                          }}
                        >
                          INTENSIVE READING
                        </h5>
                        <p
                          style={{
                            color: '#666666',
                            fontSize: '12px',
                            fontWeight: 'normal',
                          }}
                        >
                          　精読プログラム
                        </p>
                        <img
                          src="images/icon-a-reading.png"
                          style={{ width: '50%' }}
                        />
                        <h6 style={{ color: '#666666', marginTop: '10px' }}>
                          SELF STUDY
                        </h6>
                        <button
                          className="btn btn-secondary"
                          style={{ width: '40%' }}
                        >
                          セルフ学習
                        </button>{' '}
                        <button
                          className="btn btn-danger"
                          style={{ width: '40%' }}
                        >
                          毎日練習
                        </button>
                      </button>
                      {/* </Link> */}
                    </div>
                  )}
                  {val.courseName == 'CourseSD_SC' && (
                    /*shadowingSelfCourse*/
                    <div className="col-lg-6 col-md-12 mt-2">
                      {/* <Link href="/shadowingSelfcourse"> */}
                      <button
                        className="banner-content"
                        style={{
                          backgroundColor: '#EBF5FB',
                          height: '320px',
                          // width: '90%',
                          border: '5px solid #2C3E50',
                          borderRadius: '10px',
                          marginBottom: '10px',
                          // verticalAlign: '50%',
                          alignItems: 'center',
                          padding: 0,
                        }}
                      >
                        <h5
                          style={{
                            color: '#808B96',
                            fontWeight: '900',
                            fontSize: '15px',
                          }}
                        >
                          INPUT PROGRAM
                        </h5>
                        <h5
                          style={{
                            color: 'black',
                            fontWeight: '900',
                          }}
                        >
                          SHADOWING & DICTATION
                        </h5>
                        <p
                          style={{
                            color: '#666666',
                            fontSize: '12px',
                            fontWeight: 'normal',
                          }}
                        >
                          シャドーイング&ディクテーション
                        </p>
                        <img
                          src="images/icon-a-shadowing.png"
                          style={{ width: '50%' }}
                        />
                        <h6 style={{ color: '#666666', marginTop: '10px' }}>
                          SELF STUDY
                        </h6>
                        <button
                          className="btn btn-secondary"
                          style={{ width: '40%' }}
                        >
                          セルフ学習
                        </button>{' '}
                        <button
                          className="btn btn-danger"
                          style={{ width: '40%' }}
                        >
                          毎日練習
                        </button>
                      </button>
                      {/* </Link> */}
                    </div>
                  )}
                  {val.courseName == 'CourseA' && <p>readingCourseA</p>}
                  {val.courseName == 'CourseB' && <p>readingCourseB</p>}
                  {val.courseName == 'CourseZ' && <p>readingCourseZ</p>}
                  {val.courseName == 'CourseSD' && (
                    <p>shadowingDictationCourse</p>
                  )}
                  {val.courseName == 'CourseST' && (
                    <div className="col-lg-6 col-md-12 mt-2">
                      <Link href="/outputShowAndTellCourse">
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#FDEDEC',
                            height: '320px',
                            // width: '90%',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            // verticalAlign: '50%',
                            alignItems: 'center',
                            padding: 0,
                          }}
                        >
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            OUTPUT PROGRAM
                          </h5>
                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            SHOW AND TELL
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            ショー&テル
                          </p>
                          <img
                            src="images/icon-a-showandtell.png"
                            style={{ width: '50%' }}
                          />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            50-MIN LESSON PER WEEK
                          </h6>
                          <span
                            className="btn btn-primary"
                            style={{ width: '40%' }}
                          >
                            レッスン有
                          </span>{' '}
                          <button
                            className="btn btn-danger"
                            style={{ width: '40%' }}
                          >
                            毎日練習
                          </button>
                        </button>
                      </Link>
                    </div>
                  )}
                  {val.courseName == 'CourseDI' && (
                    <div className="col-lg-6 col-md-12 mt-2">
                      <Link href="/outputShowAndTellCourse">
                        <button
                          className="banner-content"
                          style={{
                            backgroundColor: '#FDEDEC',
                            height: '320px',
                            // width: '90%',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            // verticalAlign: '50%',
                            alignItems: 'center',
                            padding: 0,
                          }}
                        >
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            OUTPUT PROGRAM
                          </h5>
                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            DISCUSSION
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            ディスカッション
                          </p>
                          <img
                            src="images/icon-a-discussion.png"
                            style={{ width: '50%' }}
                          />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            50-MIN LESSON PER WEEK
                          </h6>
                          <span
                            className="btn btn-primary"
                            style={{ width: '40%' }}
                          >
                            レッスン有
                          </span>{' '}
                          <button
                            className="btn btn-danger"
                            style={{ width: '40%' }}
                          >
                            毎日練習
                          </button>
                        </button>
                      </Link>
                    </div>
                  )}
                  {val.courseName == 'CourseGR' && <p>grammarCourse</p>}
                  {val.courseName == 'CourseMR' && <p>mouthWritingCourse</p>}
                </>
              )
            })}
          </div>
          <SweetAlert
            title="前のページに戻ることはできません。"
            show={isOpenBackMypage}
            onConfirm={() => setIsOpenBackMypage(false)}
            confirmBtnText="戻らない"
            cancelBtnText=""
            showCancel={false}
            reverseButtons={true}
            style={{ width: '600px' }}
          >
            <p>
              前のページに戻るとこのステップのポイントは無効になりますので、ご注意ください。
            </p>
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
            <p>5月末にサービス開始予定です。</p>
          </SweetAlert>
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
        </div>
      </QuizContext.Provider>
      <CopyrightFooter />
    </div>
  )
}

export default App
