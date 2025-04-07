// CSS mypage_for_adult.css

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { QuizContext } from '@/components/MypageGroup/Contexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import MyHeaderMenu from '@/components/MypageGroup/myHeaderMenu' //Original
import MyHeaderMenu from '@/components/MypageGroup/myHeaderMenu-testing' //テスト用
import NavbarEnglib from '@/components/MypageGroup/NavbarEnglib'
import FireViewReading from '@/components/readingSelfcourse/FireView'
import FireViewShadowing from '@/components/shadowingSelfcourse/FireView'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import { faHandPointer, faDesktop } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import Preloader from '@/components/Preloader/Preloader'
import TimeZoneDisplay from '@/components/TimeZone/TimeZoneDisplay'

// export const config = {
//   unstable_runtimeJS: false,
// }

function App() {
  //Preloader
  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [myMbn, setMyMbn] = useState('')
  const router = useRouter() //使い方：router.replace('/')

  const [needPreload, setNeedPreload] = useState(false)

  const [isTodayLessonDay, setIsTodayLessonDay] = useState(false)
  const [isTodayLessonTime, setIsTodayLessonTime] = useState(false)
  const [nokoriMin, setNokoriMin] = useState()

  const [howManyCourse, setHowManyCourse] = useState()

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [myCourseList, setMyCourseList] = useState([])
  const [practiceTempId, setPracticeTempId] = useState('')
  const [userName, setUserName] = useState('')
  const [memberSort, setMemberSort] = useState('')

  //画面が更新されて日時を入れる
  // const [refreshDateTime, setRefreshDateTime] = useState()

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentDateTime(new Date())
  //   }, 1000)

  //   return () => clearInterval(timer)
  // }, [])

  // const DateTime = () => {
  //   const [currentDateTime, setCurrentDateTime] = useState(new Date());

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setCurrentDateTime(new Date());
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, []);

  //   return (
  //     <div>
  //       <p>{currentDateTime.toLocaleDateString()}</p>
  //       <p>{currentDateTime.toLocaleTimeString()}</p>
  //     </div>
  //   );
  // };

  useEffect(() => {}, [])

  useEffect(() => {
    if (
      localStorage.getItem('loginStatus') !== 'true' ||
      !localStorage.getItem('loginStatus')
    ) {
      router.push('/loginGroup') // ここでリダイレクト
      return
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
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
    }
  }, [])

  //今日がレッスン日なのかをチェック
  const checkIsTodayLessonDay = (
    courseName,
    subject,
    yoyakuWeekday,
    thisYoyakuDate
  ) => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      const fetchData2 = async () => {
        try {
          // var url = DB_CONN_URL + '/get-hw-first-page-for-lesson-start/'
          var url = DB_CONN_URL + '/get-hw-first-page-for-lesson-start-multi/'
          var Url =
            url +
            mbn +
            '&' +
            courseName +
            '&' +
            yoyakuWeekday +
            '&' +
            thisYoyakuDate
          // alert(Url)
          const response = await axios.get(Url)

          // alert(response.data.length)
          //Error Code: undefinedは課題が設定されてないこと。
          //Error Code: ２以上の数字は課題が重複に設定されていること

          if (response.data.length <= 0) {
            alert(
              '課題設定に問題があります。管理者にお問合せしてください。/ERROR CODE:' +
                response.data.length
            )
          } else {
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
              //   '本日はレッスン日では有りません。' +
              //     yoyakuDate +
              //     '/' +
              //     NowRegdate
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
                if (courseName == 'CourseST') {
                  var preUrl = '/lessonPreSAT'
                  router.replace(preUrl) // ここでリダイレクト
                } else if (
                  courseName == 'CourseA' ||
                  courseName == 'CourseB' ||
                  courseName == 'CourseZ'
                ) {
                  var preUrl = '/lessonPreREADING?courseName=' + courseName
                  router.replace(preUrl)
                } else if (
                  courseName == 'CourseGR' ||
                  courseName == 'CourseSE' ||
                  courseName == 'CourseVR'
                ) {
                  var preUrl = '/lessonPreSUPPORT?courseName=' + courseName
                  router.replace(preUrl)
                } else if (
                  courseName == 'CourseEK' ||
                  courseName == 'CourseIEL' ||
                  courseName == 'CourseTFL' ||
                  courseName == 'CourseTOE' ||
                  courseName == 'CourseSAT' ||
                  courseName == 'CourseSSAT'
                ) {
                  var preUrl = '/lessonPreTEST?courseName=' + courseName
                  router.replace(preUrl)
                }
                // alert(courseName)
                // alert(
                //   'レッスン開始' + totalYayakuSec + '/' + totalNowSec + '/' + diff
                // )
              }
            }
          }
        } catch (error) {
          alert('error1' + error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }

  //今日がレッスン日なのかをチェック
  const checkIsTodayLessonDay_forOtherRegion = (
    courseName,
    subject,
    yoyakuWeekday,
    thisYoyakuDate
  ) => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      const fetchData2 = async () => {
        try {
          // var url = DB_CONN_URL + '/get-hw-first-page-for-lesson-start/'
          var url = DB_CONN_URL + '/get-hw-first-page-for-lesson-start-multi/'
          var Url =
            url +
            mbn +
            '&' +
            courseName +
            '&' +
            yoyakuWeekday +
            '&' +
            thisYoyakuDate
          // alert(Url)
          const response = await axios.get(Url)

          // alert(response.data.length)
          //Error Code: undefinedは課題が設定されてないこと。
          //Error Code: ２以上の数字は課題が重複に設定されていること

          if (response.data.length <= 0) {
            alert(
              '課題設定に問題があります。管理者にお問合せしてください。/ERROR CODE:' +
                response.data.length
            )
          } else {
            var yoyakuDate = response.data[0].yoyakuDate
            var yoyakuTime = response.data[0].yoyakuTime

            //yoyakuDate、yoyakuTimeを使用者のパソコンのUTCに合わせて変更する。

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
              //   '本日はレッスン日では有りません。' +
              //     yoyakuDate +
              //     '/' +
              //     NowRegdate
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
                if (courseName == 'CourseST') {
                  var preUrl = '/lessonPreSAT'
                  router.replace(preUrl) // ここでリダイレクト
                } else if (
                  courseName == 'CourseA' ||
                  courseName == 'CourseB' ||
                  courseName == 'CourseZ'
                ) {
                  var preUrl = '/lessonPreREADING?courseName=' + courseName
                  router.replace(preUrl)
                } else if (
                  courseName == 'CourseGR' ||
                  courseName == 'CourseSE' ||
                  courseName == 'CourseVR'
                ) {
                  var preUrl = '/lessonPreSUPPORT?courseName=' + courseName
                  router.replace(preUrl)
                } else if (
                  courseName == 'CourseEK' ||
                  courseName == 'CourseIEL' ||
                  courseName == 'CourseTFL' ||
                  courseName == 'CourseTOE' ||
                  courseName == 'CourseSAT' ||
                  courseName == 'CourseSSAT'
                ) {
                  var preUrl = '/lessonPreTEST?courseName=' + courseName
                  router.replace(preUrl)
                }
                // alert(courseName)
                // alert(
                //   'レッスン開始' + totalYayakuSec + '/' + totalNowSec + '/' + diff
                // )
              }
            }
          }
        } catch (error) {
          alert('error1' + error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }
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

  // const [isLoading, setLoading] = useState(false)
  // const [isError, setError] = useState(false)
  useEffect(() => {
    // if (localStorage.getItem('loginStatus') == 'true') {
    var mbn = localStorage.getItem('MypageMbn')
    setMyMbn(mbn)
    var url = DB_CONN_URL + '/get-all-list-sys_member_lesson_set_BtoB-Test/'
    // var url = DB_CONN_URL + '/get-all-list-sys_member_lesson_set/'
    var Url = url + mbn

    const fetchData1 = async () => {
      // setError(false)
      // setLoading(true)
      try {
        axios.get(Url).then((response) => {
          if (response.data.status == false) {
            alert('db select failed')
          } else {
            //alert(response.data.message)
            setUserName(response.data.response[0].name_eng)
            setMemberSort(response.data.response[0].sort)
            // alert(response.data.response[0].englibLevel)

            setMyCourseList(response.data.response)
            console.log('myCourseList', myCourseList)
            setHowManyCourse(response.data.response.length)
          }
        })
      } catch (error) {
        console.log(error)
        // setError(true)
      }
      // setLoading(false)
    }

    fetchData1()

    // }
  }, [])

  function goPractice(url) {
    router.replace(url)
  }
  // if (isError) return <h1>Error, try again!!!! </h1>
  // if (isLoading) return <h1>Loading Page..........................</h1>
  return (
    <>
      {!myCourseList && <Preloader />}

      <div className="AppBig">
        <QuizContext.Provider
          value={{
            myMbn,
            setMyMbn,
            userName,
            setUserName,
          }}
        >
          {myCourseList ? (
            <>
              <MyHeaderMenu memberSort={memberSort} mst={memberSort} />
            </>
          ) : (
            <h1>Now Loading .....</h1>
          )}

          {myCourseList && (
            <div
              className="QuizMpa mt-0"
              // style={{ backgroundColor: 'white', border: '10px solid #EBEDEF' }}
              style={{
                backgroundColor: 'white',
                border: '10px solid #EBEDEF',
                width: '90%',
                margin: '20px',
              }}
            >
              <div className="row mt-5" style={{ textAlign: 'center' }}>
                <center>
                  {myCourseList.map((val, key) => {
                    //Reading Course For Lesson
                    if (
                      val.courseName == 'CourseA' ||
                      val.courseName == 'CourseB' ||
                      val.courseName == 'CourseZ'
                    ) {
                      var cS = 'LESSON'
                      var practiceLink =
                        '/readingSelfcourse?cN=' +
                        val.courseName +
                        '&cS=LESSON&sB=' +
                        val.subject
                    }
                    //Reading Course For Self
                    if (
                      val.courseName == 'CourseA_SC' ||
                      val.courseName == 'CourseB_SC' ||
                      val.courseName == 'CourseZ_SC'
                    ) {
                      var cS = 'SELF'
                      var practiceLink =
                        '/readingSelfcourseB?cN=' +
                        val.courseName +
                        '&cS=' +
                        cS +
                        '&sB=' +
                        val.subject
                    }
                    //Shadowing
                    //shadowingSelfcourse?cN=CourseSD_SC&cS=LESSON&sB=SELF SHADOWING

                    if (val.courseName == 'CourseSD') {
                      var cS = 'LESSON'

                      if (val.material_sort == 'VIDEO') {
                        var goPage = 'shadowingcourseVideo'
                      } else {
                        var goPage = 'shadowingSelfcourse'
                      }

                      var practiceLink =
                        goPage +
                        '?cN=' +
                        val.courseName +
                        '&cS=' +
                        cS +
                        '&sB=' +
                        val.subject
                    }

                    if (val.courseName == 'Course1MIN') {
                      var cS = 'LESSON'

                      var goPage = 'oneMinuteSpeaking'

                      var practiceLink =
                        goPage +
                        '?cN=' +
                        val.courseName +
                        '&cS=' +
                        cS +
                        '&sB=' +
                        val.subject
                    }

                    if (val.courseName == 'CourseDI') {
                      var cS = 'LESSON'

                      if (val.duringTime == '25') {
                        var goPage = 'shadowingcourseVideo'
                        var goPage = 'discussionCourse'
                      } else if (val.duringTime == '50') {
                        var goPage = 'discussionCourse'
                      }

                      var practiceLink =
                        goPage +
                        '?cN=' +
                        val.courseName +
                        '&cS=' +
                        cS +
                        '&sB=' +
                        val.subject
                    }
                    if (val.courseName == 'CourseSD_SC') {
                      var cS = 'SELF'
                      if (val.material_sort == 'VIDEO') {
                        var goPage = 'shadowingcourseVideo'
                      } else {
                        var goPage = 'shadowingSelfcourse'
                      }
                      var practiceLink =
                        goPage +
                        '?cN=' +
                        val.courseName +
                        '&cS=' +
                        cS +
                        '&sB=' +
                        val.subject
                    }

                    if (val.courseName == 'CourseST') {
                      var practiceLink = '/outputShowAndTellCourse'
                    }

                    if (
                      val.courseName == 'CourseGR' ||
                      val.courseName == 'CourseSE' ||
                      val.courseName == 'CourseEK'
                    ) {
                      var cS = 'LESSON'
                      var practiceLink =
                        '/supportCourse?cN=' +
                        val.courseName +
                        '&cS=' +
                        cS +
                        '&sB=' +
                        val.subject
                    }
                    var hurikaeUrl = '/hurikaeEntry2?cn=' + val.courseName
                    return (
                      <>
                        {/* <div className="col-lg-12 col-md-12 mt-5"> */}
                        {/* <Link href="/readingSelfcourse"> */}

                        <button
                          className="banner-content"
                          style={{
                            // backgroundColor: '#EBF5FB',
                            backgroundColor: '#FBF8EE',
                            height: 'auto',
                            border: '5px solid #2C3E50',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            alignItems: 'center',
                            padding: 0,
                          }}
                          // onClick={() => {
                          //   setIsNotReady(true)
                          // }}
                        >
                          <div className="single-courses-box">
                            <div className="courses-image ">
                              <div
                                // className="price shadow"
                                style={{
                                  display: 'inline-block',
                                  // backgroundColor: '#fe4a55',
                                  color: '#ffffff',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '50%',
                                  position: 'absolute',
                                  right: '10px',
                                  bottom: '-29.5px',
                                  textAlign: 'center',
                                  lineHeight: '67px',
                                  fontSize: '24px',
                                  fontWeight: 800,
                                }}
                              >
                                {(val.courseName == 'CourseA' ||
                                  val.courseName == 'CourseA_SC' ||
                                  val.courseName == 'CourseB' ||
                                  val.courseName == 'CourseB_SC' ||
                                  val.courseName == 'CourseZ' ||
                                  val.courseName == 'CourseZ_SC' ||
                                  val.courseName == 'CourseSD' ||
                                  val.courseName == 'CourseSD_SC') && (
                                  <>
                                    <FireViewReading
                                      thisSubject={val.subject}
                                    />
                                    {/* セルフ学習 */}
                                  </>
                                )}{' '}
                              </div>
                            </div>
                          </div>
                          <h5
                            style={{
                              color: '#808B96',
                              fontWeight: '900',
                              fontSize: '15px',
                            }}
                          >
                            {/* INPUT PROGRAM */}
                            {val.course}
                          </h5>

                          <h5
                            style={{
                              color: 'black',
                              fontWeight: '900',
                            }}
                          >
                            {(val.courseName == 'CourseA' ||
                              val.courseName == 'CourseA_SC' ||
                              val.courseName == 'CourseB' ||
                              val.courseName == 'CourseB_SC' ||
                              val.courseName == 'CourseZ' ||
                              val.courseName == 'CourseZ_SC') &&
                              'INTENSIVE READING'}
                            {val.courseName == 'CourseEK' && 'EIKEN COURSE'}
                            {val.courseName == 'CourseGR' && 'GRAMMAR'}
                            {val.courseName == 'CourseSE' && 'SCHOOL SUPPORT'}
                            {(val.courseName == 'CourseSD' ||
                              val.courseName == 'CourseSD_SC') &&
                              'SHADOWING & DICTATION'}
                            {val.courseName == 'CourseST' && 'SHOW AND TELL'}
                            {val.courseName == 'CourseDI' && 'DISCUSSION'}
                            {val.courseName == 'CourseDB' && 'DEBATING'}
                            {val.courseName == 'Course1MIN' && '1-MIN SPEAKING'}
                          </h5>
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                              fontWeight: 'normal',
                            }}
                          >
                            {(val.courseName == 'CourseA' ||
                              val.courseName == 'CourseA_SC' ||
                              val.courseName == 'CourseB' ||
                              val.courseName == 'CourseB_SC' ||
                              val.courseName == 'CourseZ' ||
                              val.courseName == 'CourseZ_SC') &&
                              '精読プログラム'}

                            {val.courseName == 'CourseGR' && 'GRAMMAR'}
                            {val.courseName == 'CourseSE' && 'SCHOOL SUPPORT'}
                            {(val.courseName == 'CourseSD' ||
                              val.courseName == 'CourseSD_SC') &&
                              'シャドーイング＆ディクテーション'}
                            {val.courseName == 'CourseEK' && 'EIKEN COURSE'}
                            {val.courseName == 'CourseST' && 'ショー&テル'}
                            {val.courseName == 'CourseDI' && 'ディスカッション'}
                            {val.courseName == 'CourseDB' && 'ディベーティング'}
                            {val.courseName == 'Course1MIN' &&
                              'スピーキング訓練'}
                          </p>
                          {val.courseName == 'CourseSD' ||
                          val.courseName == 'CourseSD_SC' ? (
                            <img
                              src="images/icon-a-shadowing.png"
                              style={{ width: '45%' }}
                            />
                          ) : (
                            <img
                              src="images/icon-a-reading.png"
                              style={{ width: '45%' }}
                            />
                          )}

                          <br />
                          <h6 style={{ color: '#666666', marginTop: '10px' }}>
                            PRACTICE FOR LESSON
                          </h6>

                          {val.courseName !== 'CourseSD' &&
                          val.courseName !== 'CourseSD_SC' ? (
                            <>
                              <div
                                style={{
                                  paddingLeft: '10%',
                                  paddingRight: '10%',
                                }}
                              >
                                <h6
                                  style={{
                                    color: 'black',
                                    marginTop: '10px',
                                    fontWeight: 'bold',
                                    backgroundColor: 'coral',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                  }}
                                >
                                  NEXT LESSON <br />
                                  {val.yoyakuDate}&nbsp;{val.yoyakuWeekday}
                                  &nbsp;
                                  {val.yoyakuTime}〜
                                </h6>
                              </div>
                              {localStorage.getItem('wantAdjustTimezone') ==
                                'yes' && (
                                <div>
                                  <h6
                                    style={{
                                      color: 'black',
                                      marginTop: '10px',
                                      fontWeight: 'bold',
                                      // backgroundColor: 'coral',
                                      paddingTop: '5px',
                                      paddingBottom: '5px',
                                    }}
                                  >
                                    <TimeZoneDisplay
                                      lDate={val.yoyakuDate}
                                      lTime={val.yoyakuTime}
                                    />
                                  </h6>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div
                                style={{
                                  paddingLeft: '10%',
                                  paddingRight: '10%',
                                }}
                              >
                                <h6
                                  style={{
                                    color: '#FBF8EE',
                                    marginTop: '10px',
                                    fontWeight: 'bold',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    backgroundColor: '#FBF8EE',
                                  }}
                                >
                                  NEXT LESSON <br />
                                  {val.yoyakuDate}&nbsp;{val.yoyakuWeekday}
                                  &nbsp;
                                  {val.yoyakuTime}〜
                                </h6>
                              </div>
                            </>
                          )}
                          {val.courseName == 'CourseSD' ||
                          val.courseName == 'CourseSD_SC' ||
                          val.courseName == 'CourseA_SC' ||
                          val.courseName == 'CourseB_SC' ||
                          val.courseName == 'CourseZ_SC' ? (
                            <div
                              className="row m-0"
                              style={{
                                paddingTop: '25px',
                                paddingBottom: '8px',
                              }}
                            >
                              <div className="col-lg-12 col-md-12 m-0 p-0  mb-1">
                                <span
                                  className="btn btn-outline-danger m-0 pt-3"
                                  style={{
                                    width: '200px',
                                    height: '55px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                  }}
                                  onClick={() => {
                                    // setIsTodayLessonDay(true)
                                    goPractice(practiceLink)
                                  }}
                                >
                                  毎日の練習と課題アップ
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div
                                className="col-lg-12 col-md-12"
                                style={{
                                  width: '100%',
                                  paddingTop: '25px',
                                  paddingBottom: '13px',
                                  textAlign: 'center',
                                }}
                              >
                                <center>
                                  <span
                                    className="btn btn-outline-danger  p-1 mr-1"
                                    style={{
                                      width: '100px',
                                      maxWidth: '110px',
                                      fontSize: '15px',
                                      fontWeight: 'bold',
                                    }}
                                    onClick={() => {
                                      // setIsTodayLessonDay(true)
                                      goPractice(practiceLink)
                                    }}
                                  >
                                    毎日の練習 <br />
                                    課題アップ
                                  </span>

                                  {localStorage.getItem('wantAdjustTimezone') ==
                                  'yes' ? (
                                    <span
                                      className="btn btn-outline-success  p-1 "
                                      style={{
                                        width: '100px',
                                        maxWidth: '100px',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                      }}
                                      onClick={() => {
                                        // setIsTodayLessonDay(true)

                                        checkIsTodayLessonDay_forOtherRegion(
                                          val.courseName,
                                          val.subject,
                                          val.yoyakuWeekday,
                                          val.yoyakuDate
                                        )
                                      }}
                                    >
                                      レッスン
                                      <br />
                                      スタートd
                                    </span>
                                  ) : (
                                    <span
                                      className="btn btn-outline-success  p-1 "
                                      style={{
                                        width: '100px',
                                        maxWidth: '100px',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                      }}
                                      onClick={() => {
                                        // setIsTodayLessonDay(true)

                                        checkIsTodayLessonDay(
                                          val.courseName,
                                          val.subject,
                                          val.yoyakuWeekday,
                                          val.yoyakuDate
                                        )
                                      }}
                                    >
                                      レッスン
                                      <br />
                                      スタート
                                    </span>
                                  )}
                                  {/* <div className="col-lg-12 col-md-12 m-0 p-0">
                                    <Link href="/hurikaeEntry2">
                                      <button
                                        className="btn btn-info m-0 p-1"
                                        style={{
                                          width: '95%',
                                          fontSize: '15px',
                                        }}
                                      >
                                        振替休み
                                        <br />
                                        設定
                                      </button>
                                    </Link>
                                  </div> */}
                                </center>
                                {/* </div> */}
                                {/* <div className="col-lg-1 col-md-12 m-0 p-0  mb-1"></div> */}
                              </div>

                              {/* </div> */}
                            </>
                          )}
                        </button>
                        {/* </div> */}

                        {/* {howManyCourse == 2 && (
                        <>
                          <div className="col-lg-4 col-md-12"></div>
                        </>
                      )} */}
                      </>
                    )
                  })}
                </center>{' '}
              </div>
            </div>
          )}

          {memberSort == 'PERSONAL' && (
            <div
              className="QuizMpa mt-0 mb-5"
              style={{
                backgroundColor: 'white',
                border: '10px solid #EBEDEF',
                width: '90%',
                margin: '20px',
              }}
            >
              <>
                <div className="col-lg-12 col-md-12 mt-0">
                  <p
                    style={{
                      color: 'red',
                      fontWeight: '500',
                      fontSize: '16px',
                    }}
                  >
                    現在テストバージョンで運営されます。テストバージョンのため、エラーが出る場合もありますので、
                    <br />
                    エラーになった場合はこちらのメールの方にご報告お願いします。
                    <a href="mailto:online-help@edutainers.jp">
                      online-help@edutainers.jp
                    </a>
                  </p>
                </div>
              </>
            </div>
          )}
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
            <p>近日中にサービス開始予定です。</p>
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
        </QuizContext.Provider>
        <CopyrightFooter />
      </div>
    </>
  )
}

export default App
