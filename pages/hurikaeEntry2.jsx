// CSS mypage_for_adult.css
import react, { useState, useContext, useEffect } from 'react'
import emailjs from 'emailjs-com'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import GoogleDoc from '@/components/GoogleDoc/GoogleDoc'
import { useRouter } from 'next/router' // //get값이 넘어왔을 경우
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyHeaderMenu from '@/components/MypageGroup/myHeaderMenu'
import TextareaAutosize from 'react-textarea-autosize'
import HurikaeAskNew from '@/components/Hurikae/HurikaeAskNew'
import HurikaeAskNewSoon from '@/components/Hurikae/HurikaeAskNewSoon'
import HurikaeUploadReceit from '@/components/Hurikae/HurikaeUploadReceit'

import HurikaeAskNormalTimeNew from '@/components/Hurikae/HurikaeAskNormalTimeNew'
import { QuizContext } from '@/components/MypageGroup/Contexts'
import {
  myfun_weekdayToJapanese,
  myfun_getdayofweek,
  myfun_myRegDate,
  myfun_myRegTime,
  myfun_getMyDate,
} from '@/components/FunctionComponent'
import Modal from '@/components/modal/ModalHurikaeContractDetails'
// ['menu', 'playing', 'finished']

function lessonPre() {
  const [courseName, setCourseName] = useState()
  const router = useRouter() //使い方：router.replace('/')
  const { query } = useRouter()

  useEffect(() => {
    if (router.isReady) {
      setCourseName(router.query.cn)
      // alert(router.query.cn)
      console.log('###cn', router.query.cn)
    }
  }, [router.isReady])

  // const [memberSort, setMemberSort] = useState('')

  //modal
  const [openModal, setOpenModal] = useState(false)

  const [hurikaeOK, setHurikaeOK] = useState('true')
  const [yoyakuDate, setYoyakuDate] = useState()
  const [yoyakuTime, setYoyakuTime] = useState()
  const [lessonSubject, setLessonSubject] = useState()
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [viewNoHurikae, setViewNoHurikae] = useState(false)
  const [viewYasumiSoon, setViewYasumiSoon] = useState(false)
  const [viewHurikae, setViewHurikae] = useState(false)
  const [viewHurikaeHistory, setViewHurikaeHistory] = useState(false)
  const { myMbn, setMyMbn, userName, setUserName } = useContext(QuizContext)
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [isTodayLessonDay, setIsTodayLessonDay] = useState(false)
  const [isTodayLessonTime, setIsTodayLessonTime] = useState(false)

  const [myCourseList, setMyCourseList] = useState([])
  const [nameEng, setNameEng] = useState()

  const [myLessonList, setMyLessonList] = useState([])

  const [tbn, setTbn] = useState()
  const [teacherNameEng, setTeacherNameEng] = useState()
  const [teacherEmail, setTeacherEmail] = useState()

  const [course, setCourse] = useState()

  const [courseSubject, setCourseSubject] = useState()
  const [duringTime, setDuringTime] = useState()
  const [absentWeekday, setAbsentWeekday] = useState()
  const [absentDate, setAbsentDate] = useState('')
  const [absentTime, setAbsentTime] = useState()
  const [myTeacherOnly, setMyTeacherOnly] = useState()
  const [currentEightList, setCurrentEightList] = useState('')
  const [lessonDateEight, setLessonDateEight] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [startRegDate, setStartRegDate] = useState(new Date())
  const [startTime, setStartTime] = useState('12:00')

  const [hurikaeList2, setHurikaeList2] = useState([])
  const [thisHolidayCheck, setThisHolidayCheck] = useState()
  const [otherTutorOk, setOtherTutorOk] = useState(false)
  const [lessonTime, setLessonTime] = useState('') //生徒が振替を希望するレッスン長さ(分)-> 30 or 60

  const [changeTutor, setChangeTutor] = useState()

  const [refreshKey, setRefreshKey] = useState(0) // リフレッシュ用のキー

  //cancelと同時に、次の課題を設定する(今の課題の日付を次のレッスン日に変更する+ homework_idは同じくする)
  //cancel履歴を別のテーブルに入れる。
  const setCancel = () => {
    var mbn = localStorage.getItem('MypageMbn')
    var cn = router.query.cn

    var Url = DB_CONN_URL + '/update-lesson-cancel/' + mbn + '&' + cn

    axios.get(Url).then((response) => {
      sendEmailtoStudent()
      sendEmailtoTutor()
    })
  }
  const sendEmailtoStudent = () => {
    var email = localStorage.getItem('email')
    var nameEng = localStorage.getItem('userName')
    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    var email = 'minjaekato@gmail.com'

    var templateParams = {
      to_email: email,
      to_name: nameEng,
      reply_to: 'no-reply',
      from_name: 'engLib',
      yoyakuDate: yoyakuDate,
      yoyakuTime: yoyakuTime,
      lessonSubject: lessonSubject,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_jv5v4d6'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
  }

  const sendEmailtoTutor = () => {
    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    setTeacherEmail('ceo@edutainers.jp')
    // alert(teacherEmail)
    // alert(teacherNameEng)

    var nameEng = localStorage.getItem('userName') //student's name

    var templateParams = {
      to_email: teacherEmail,
      to_name: teacherNameEng,
      to_student_name: nameEng,
      reply_to: 'no-reply',
      from_name: 'engLib',
      yoyakuDate: yoyakuDate,
      yoyakuTime: yoyakuTime,
      lessonSubject: lessonSubject,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_nz9wpty'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
  }

  //今日がレッスン日なのかをチェック
  // useEffect(() => {
  //   if (localStorage.getItem('loginStatus') == 'true') {
  //     var mbn = localStorage.getItem('MypageMbn')

  //     const fetchData2 = async () => {
  //       try {
  //         var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
  //         var Url = url + mbn
  //         const response = await axios.get(Url)

  //         var yoyakuDate = response.data[0].yoyakuDate
  //         var yoyakuTime = response.data[0].yoyakuTime

  //         //regdate & regtime START
  //         var d = ''
  //         var d = new Date()
  //         var Y = d.getFullYear()
  //         var M = d.getMonth() + 1
  //         var D = d.getDate()
  //         var h = d.getHours()
  //         var m = d.getMinutes()
  //         var s = d.getSeconds()
  //         // let ms = myFun_addZero(d.getMilliseconds())

  //         if (M < 10) {
  //           M = '0' + M
  //         }
  //         if (D < 10) {
  //           D = '0' + D
  //         }
  //         if (h < 10) {
  //           h = '0' + h
  //         }
  //         if (m < 10) {
  //           m = '0' + m
  //         }
  //         if (s < 10) {
  //           s = '0' + s
  //         }
  //         var NowRegdate = Y + '-' + M + '-' + D
  //         var NowRegtime = h + ':' + m + ':' + s

  //         if (NowRegdate !== yoyakuDate) {
  //           // alert(
  //           //   '本日はレッスン日では有りません。' + yoyakuDate + '/' + NowRegdate
  //           // )
  //           //setIsTodayLessonDay(true)
  //           alert(
  //             'レッスン日ではないため、アクセスできません。過去の添削ドキュメントはマイページのレッスン歴からアクセスできます。'
  //           )

  //           redirectToTop()
  //           return false
  //         } else {
  //           // alert(response.data[0].name_eng)
  //           // alert(response.data[0].lessonStatus)
  //           setGoogleDocLink(response.data[0].google_doc_link)
  //           setClassLink(response.data[0].classLink)
  //         }
  //       } catch (error) {
  //         alert(error)
  //         console.log(error)
  //       }
  //     }

  //     fetchData2()
  //   }
  // }, [])

  const redirectToTop = () => {
    router.replace('/mytopGroup')
    return false
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

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')
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

  function furikae() {}

  useEffect(() => {
    getLessonTime()
  }, [])

  //getLessonTime (レッスンの長さ:分を知る)
  function getLessonTime() {
    // handleAllHuriAddWaitingDelete()

    var mbn = localStorage.getItem('MypageMbn')

    const fetchData1 = async () => {
      // alert(mbn)
      try {
        axios
          .post(DB_CONN_URL + '/list-my-lesson-ok', {
            mbn: mbn,
          })
          .then((response) => {
            // alert(response.data.length)
            // alert('status' + response.data.message)
            // alert(response.data.message)
            if (response.data.length > 0) {
              // alert('here')
              setMyLessonList(response.data.response)
              setNameEng(response.data.response[0].name_eng)

              console.log('setMyLessonList3', response.data.response)
            } else {
              alert('no2' + response.data.message) //for test
            }
          })
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData1()
  }

  function getLessonDate8Times(weekday, start_time) {
    var nextDate = getNextDate(weekday, start_time)

    var arr = []
    for (let i = 1; i < 5; i++) {
      //とりあえず、休みの日でも全部リストを出す。あとで休みはリストから選択できないようにする
      var j = i * 7
      // var huriDateList = nextDate

      var huriDateList = new Date(
        nextDate.getFullYear(),
        nextDate.getMonth(),
        nextDate.getDate() + j
      )

      var getY = huriDateList.getFullYear()
      var getM = huriDateList.getMonth() + 1
      var getD = huriDateList.getDate()
      if (getM < 10) {
        var getM = '0' + getM
      }
      if (getD < 10) {
        var getD = '0' + getD
      }

      var huriDateList2 = getY + '-' + getM + '-' + getD

      console.log(i, '))', huriDateList2)

      var huriDateList3 = `${huriDateList2}`

      //休みをチェック：現在エラー中
      // holidayCheck(huriDateList3).then((response) => {
      //   console.log('1111', response)
      //   var status = response
      //   console.log('status:', huriDateList3, status)
      //   console.log('%%%%', huriDateList3)
      //   if (status == true) {
      //   } else {
      //     arr.push(huriDateList3)
      //   }
      //   setLessonDateEight(arr)
      // })
      arr.push(huriDateList3)
      setLessonDateEight(arr)
    }
    // return true
  }

  function getNextDate(weekday, start_time) {
    var dayName = weekday

    console.log('weekday', dayName)
    console.log('absentTime', absentTime)
    // The current day
    var date = new Date()
    var now = date.getDay()

    // Days of the week
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']
    // The index for the day you want
    var day = days.indexOf(dayName) //MONの場合: day=1になる
    //console.log('day:', day)

    // Find the difference between the current day and the one you want
    var diff = day - now // 今日とdayが同じ曜日だったら：0
    diff = diff < 1 ? 7 + diff : diff //マイナスの場合の対策
    console.log('diff:', diff)

    // Get the timestamp for the desired day
    var nextDayTimestamp = date.getTime() + 1000 * 60 * 60 * 24 * diff
    console.log('nextDayTimestamp:', nextDayTimestamp)
    // Get the next day
    var nextDate = new Date(nextDayTimestamp)
    console.log('nextDate:', nextDate)
    var newNextYear = nextDate.getFullYear()
    var newNextMonth = nextDate.getMonth()
    var newNextDay = nextDate.getDate()

    var newStartTime = start_time.split(':')
    var newStartTime_h = newStartTime[0]
    var newStartTime_m = newStartTime[1]
    var newStartTime_s = '00'
    nextDate = new Date(
      newNextYear,
      newNextMonth,
      newNextDay,
      newStartTime_h,
      newStartTime_m,
      newStartTime_s
    )

    //今の時間と２４時間以内の場合はnextDateに一週間(7日)を足す(Addする)
    //まず、元々のレッスン時間を nextDateに反映させる
    //console.log('newNextDate', nextDate)
    var today = new Date()
    var seconds = (nextDate.getTime() - today.getTime()) / 1000 / 60
    if (seconds < 1440) {
      //1440分、つまり24時間より少なく時間が残っている場合
      nextDate = new Date(
        nextDate.getFullYear(),
        nextDate.getMonth(),
        nextDate.getDate() + 7
      )
    }

    console.log('newNextDate', nextDate)
    console.log('seconds', seconds)
    console.log('nextDate:', nextDate)
    return nextDate
  }

  function funcHurikaeList() {
    var mbn = localStorage.getItem('MypageMbn')

    axios
      .get(DB_CONN_URL + '/list-hurikae-mbn-add/' + mbn + '&' + selectedLesson)
      .then((response) => {
        setHurikaeList2(response.data)

        console.log('response.data:', response.data)
        console.log('setHurikaeList2:', hurikaeList2)
      })
  }

  function gotoTop() {
    router.replace('/mytopGroup') // ここでリダイレクト
  }

  return (
    <>
      {openModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 99,
          }}
        >
          <Modal closeModal={setOpenModal} />
        </div>
      )}
      <div className="AppBig">
        {/* <MyHeaderMenu memberSort={memberSort} mst={memberSort} /> */}

        {hurikaeOK ? (
          <div
            className="QuizMpa pb-5"
            style={{ backgroundColor: 'white', border: '0px' }}
          >
            {' '}
            {nameEng ? (
              <>
                <div className="row pt-3">
                  <div className="col-lg-12 col-md-12 mt-3 mb-3">
                    <span
                      style={{
                        fontSize: '20px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                    >
                      {nameEng}
                    </span>
                    <br />
                    <span
                      className="btn btn-secondary ml-3"
                      style={{
                        // height: '50px',
                        borderRadius: '10px',
                        margin: 0,
                        padding: 5,
                        fontSize: '15px',
                        fontWeight: 'normal',
                        color: 'white',
                        // width: '30%',
                      }}
                      onClick={() => {
                        gotoTop()
                      }}
                    >
                      TOPへ戻る
                    </span>
                    <span
                      className="btn btn-info ml-3"
                      style={{
                        // height: '50px',
                        borderRadius: '10px',
                        margin: 0,
                        padding: 5,
                        fontSize: '15px',
                        fontWeight: 'normal',
                        color: 'white',
                        // width: '30%',
                      }}
                      onClick={() => {
                        setViewHurikaeHistory(!viewHurikaeHistory)
                        setViewHurikae(false)
                        setViewNoHurikae(false)
                        setViewYasumiSoon(false)
                      }}
                    >
                      領収書アップロード
                    </span>
                    <span
                      className="btn btn-danger ml-3"
                      style={{
                        // height: '50px',
                        borderRadius: '10px',
                        margin: 0,
                        padding: 5,
                        fontSize: '15px',
                        fontWeight: 'normal',
                        color: 'white',
                        // width: '30%',
                      }}
                      onClick={() => {
                        setOpenModal(true)
                      }}
                    >
                      振替規約を読む
                    </span>

                    <hr />
                  </div>
                </div>
                <div
                  className="col-lg-12 col-md-12  p-0"
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <span
                    className="btn btn-primary mr-3"
                    style={{
                      // height: '50px',
                      borderRadius: '10px',
                      margin: 0,
                      padding: 10,
                      fontSize: '20px',
                      fontWeight: 'normal',
                      color: 'white',
                      // width: '30%',
                    }}
                    onClick={() => {
                      setViewHurikae(!viewHurikae)
                      setViewNoHurikae(false)
                      setViewYasumiSoon(false)
                      setViewHurikaeHistory(false)
                      setRefreshKey((prevKey) => prevKey + 1)
                    }}
                  >
                    振替[時間変更を含む]
                  </span>

                  <span
                    className="btn btn-danger mr-3"
                    style={{
                      // height: '50px',
                      borderRadius: '10px',
                      margin: 0,
                      padding: 10,
                      fontSize: '20px',
                      fontWeight: 'normal',
                      color: 'white',
                      // width: '30%',
                    }}
                    onClick={() => {
                      setViewHurikae(false)
                      setViewYasumiSoon(!viewYasumiSoon)
                      setViewNoHurikae(false)
                      setViewHurikaeHistory(false)
                    }}
                  >
                    直前キャンセル
                  </span>
                  <span
                    className="btn btn-warning mr-3"
                    style={{
                      // height: '50px',
                      borderRadius: '10px',
                      margin: 0,
                      padding: 10,
                      fontSize: '20px',
                      fontWeight: 'normal',
                      color: 'black',
                    }}
                    onClick={() => {
                      setViewHurikae(false)
                      setViewYasumiSoon(false)
                      setViewNoHurikae(!viewNoHurikae)
                      setViewHurikaeHistory(false)
                    }}
                  >
                    通常時間の変更を申込む
                  </span>
                </div>
              </>
            ) : (
              <p>ページロード中です。しばらくお待ちください。</p>
            )}
            <div
              className="col-lg-12 col-md-12  p-0 mt-5"
              style={{
                textAlign: 'center',
                display: viewHurikaeHistory ? 'block' : 'none',
              }}
            >
              <HurikaeUploadReceit />
            </div>
            <div
              className="col-lg-12 col-md-12  p-0 mt-5"
              style={{
                textAlign: 'center',
                display: viewHurikae ? 'block' : 'none',
              }}
            >
              <HurikaeAskNew key={refreshKey} />
            </div>
            <div
              className="col-lg-12 col-md-12  p-0 mt-5"
              style={{
                textAlign: 'center',
                display: viewYasumiSoon ? 'block' : 'none',
              }}
            >
              <HurikaeAskNewSoon />
            </div>
            <div
              className="mt-5"
              style={{
                width: '100%',
                display: viewNoHurikae ? 'block' : 'none',
              }}
            >
              <HurikaeAskNormalTimeNew />
            </div>
          </div>
        ) : (
          <div className="col-lg-12 mt-5 mb-5 p-0">
            <h2>レッスン日</h2>
            <h4>
              {yoyakuDate}/{yoyakuTime}
            </h4>
            <h5>
              24時間以内にスタートするレッスンに対して振替を申し込むことはできません。
              <br />
              但し、急な病気などに対しては病院の照明や照明できるものを提出した場合、マイページで一週間以内に証明書添付すると振替切符として保存できます。
              <br />
              以下のボタンを押して、レッスンに参加できないことを先生にお知らせください。
            </h5>
            <span
              className="btn btn-danger mt-3 mr-2"
              onClick={() => {
                setCancel()
              }}
            >
              レッスンのキャンセルを先生に知らせる
            </span>{' '}
            <Link href="/mytopGroup">
              <span className="btn btn-info mt-3">マイページへ戻る</span>
            </Link>
          </div>
        )}

        <CopyrightFooter />
      </div>
      <SweetAlert
        title="レッスン日ではないため、アクセスできません。"
        show={isTodayLessonDay}
        onConfirm={() => setIsTodayLessonDay(false)}
        // onCancel={() => {
        //   setIsTodayLessonDay(false)
        // }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p></p>
      </SweetAlert>
    </>
  )
}

export default lessonPre
