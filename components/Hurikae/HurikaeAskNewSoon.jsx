import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import emailjs from 'emailjs-com'

import {
  myfun_weekdayToJapanese,
  myfun_getdayofweek,
  myfun_getdayofweekEng,
  myfun_myRegDate,
  myfun_myRegTime,
  myfun_getMyDate,
} from '@/components/FunctionComponent'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment-timezone'
import 'react-datepicker/dist/react-datepicker.css'
import { formatToTimeZone } from 'date-fns-timezone'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import Preloader from '@/components/Preloader/Preloader'
const HurikaeAskNewSoon = () => {
  //Preloader
  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [myMbn, setMyMbn] = useState()

  const [timePassedLesson, setTimePassedLesson] = useState(false)

  const [needPreload, setNeedPreload] = useState(false)
  //For sweet alert
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReg, setIsOpenReg] = useState(false)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isAlreadyWaiting, setIsAlreadyWaiting] = useState(false)

  const [isReallyLessonCancel, setIsReallyLessonCancel] = useState(false)
  const [alertUrgentFinished2, setAlertUrgentFinished2] = useState(false)
  //時間追加
  //const [hurikaeList, setHurikaeList] = useState([])

  const [wantToCancel, setWantToCancel] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [isNotCancelled, setIsNotCancelled] = useState(false)
  const [isPassedDate, setIsPassedDate] = useState(false)

  const [hurikaeList2, setHurikaeList2] = useState([])
  const [thisHolidayCheck, setThisHolidayCheck] = useState()
  const [otherTutorOk, setOtherTutorOk] = useState(false)
  const [lessonTime, setLessonTime] = useState('') //生徒が振替を希望するレッスン長さ(分)-> 30 or 60
  const [myLessonList, setMyLessonList] = useState([])
  const [myLessonList2, setMyLessonList2] = useState([])

  const [selectedLesson, setSelectedLesson] = useState()
  const [startRegDate, setStartRegDate] = useState(new Date())
  //const [startRegDate, setStartRegDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [holidayDate, setHolidayDate] = useState()
  var startDate = startRegDate

  const date = new Date()

  const [timezoneCountryCode_member, setTimezoneCountryCode_member] = useState()
  const [timezoneCity_member, setTimezoneCity_member] = useState()
  const [now_summer_time_member, setNow_summer_time_member] = useState()
  const [timezoneUTC_member, setTimezoneUTC_member] = useState()
  const [timezoneCountryName_member, setTimezoneCountryName_member] = useState()

  const [timezoneCountryCode_tutor, setTimezoneCountryCode_tutor] = useState()
  const [timezoneCity_tutor, setTimezoneCity_tutor] = useState()
  const [now_summer_time_tutor, setNow_summer_time_tutor] = useState()
  const [timezoneUTC_tutor, setTimezoneUTC_tutor] = useState()
  const [timezoneCountryName_tutor, setTimezoneCountryName_tutor] = useState()

  const [nameEng, setNameEng] = useState()
  const [tbn, setTbn] = useState()

  const [teacherNameEng, setTeacherNameEng] = useState()
  const [course, setCourse] = useState()
  const [courseName, setCourseName] = useState()
  const [subject, setSubject] = useState()
  const [courseSubject, setCourseSubject] = useState()
  const [duringTime, setDuringTime] = useState()
  const [absentWeekday, setAbsentWeekday] = useState()
  const [absentDate, setAbsentDate] = useState('')
  const [homeworkId, setHomeworkId] = useState('')

  const [absentTime, setAbsentTime] = useState()
  const [myTeacherOnly, setMyTeacherOnly] = useState()
  const [currentEightList, setCurrentEightList] = useState('')
  const [lessonDateEight, setLessonDateEight] = useState([])
  // const [lessonDateEight2, setLessonDateEight2] = useState()

  const [mainCourseName, setMainCourseName] = useState()
  const [mainSubject, setMainSubject] = useState()
  const [nextLessonDate, setNextLessonDate] = useState()

  const router = useRouter() //使い方：router.replace('/')

  function gotoTop() {
    router.replace('/mytopGroup') // ここでリダイレクト
  }

  useEffect(() => {
    //emailがない場合、ログアウトさせる。
    var email = localStorage.getItem('email')
    if (email == '') {
      alert(
        'セッションが切れましたので、もう一度ログインしてからやり直してください。'
      )
      logOut()
    }
  }, [])

  let logOut = () => {
    // setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('MypageMbn', '')
    localStorage.removeItem('userName', '')
    localStorage.removeItem('cbn', '')
    localStorage.removeItem('bbn', '')
    localStorage.removeItem('memberSort', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
  }

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    setMyMbn(mbn)
    getLessonTime()
  }, [])

  //getLessonTime (レッスンの長さ:分を知る)
  function getLessonTime() {
    // handleAllHuriAddWaitingDelete()

    var mbn = localStorage.getItem('MypageMbn')

    axios
      .post(DB_CONN_URL + '/list-my-lesson-ok-less-24', {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data.status) {
          // alert('no' + response.data.message) //for test
        } else {
          setMyLessonList(response.data.response)
        }
      })
  }

  function getTutorTimezone(homework_id, tbn, cn) {
    // handleAllHuriAddWaitingDelete()

    var mbn = localStorage.getItem('MypageMbn')
    // alert(mbn)
    // alert(homework_id)
    // alert(tbn)
    // alert(cn)
    axios
      .post(DB_CONN_URL + '/tutor-timezone-for-hurikae', {
        mbn: mbn,
        tbn: tbn,
        courseName: cn,
        homework_id: homework_id,
      })
      .then((response) => {
        // alert(response.data.message)
        if (response.data.length) {
          setTimezoneCountryCode_tutor(
            response.data.response[0].timezoneCountryCode
          )
          setTimezoneCity_tutor(response.data.response[0].timezoneCity)
          setTimezoneUTC_tutor(response.data.response[0].timezoneUTC)
          setTimezoneCountryName_tutor(
            response.data.response[0].timezoneCountryName
          )
          setNow_summer_time_tutor(response.data.response[0].now_summer_time)

          // alert('timezoneCity: ' + response.data.response[0].timezoneCity)
          // alert('timezoneUTC: ' + response.data.response[0].timezoneUTC)
          // alert('timezoneUTC: ' + response.data.response[0].timezoneCountryName)
          // alert('now_summer_time: ' + response.data.response[0].now_summer_time)
        } else {
          alert('no1:' + response.data.message) //for test
        }
      })
  }

  const [isCourseChanged, setIsCourseChanged] = useState(false)

  function funcHurikaeList(selectedLesson, homework_id) {
    setHurikaeList2([])

    var mbn = localStorage.getItem('MypageMbn')

    axios
      .get(
        DB_CONN_URL +
          '/list-hurikae-mbn-add/' +
          mbn +
          '&' +
          selectedLesson +
          '&' +
          homework_id
      )
      .then((response) => {
        if (response.data.message == 'no data') {
        } else {
          setHurikaeList2(response.data.response)
        }
      })
  }

  function goToMyTop() {
    router.replace('/mytopGroup') // ここでリダイレクト
  }

  function nowTime(yoyakuTime) {
    var d = ''
    d = new Date()
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
    var NowRegtime = h + ':' + m

    //レッスンスタート時間が過ぎている場合
    if (yoyakuTime < NowRegtime) {
      alert(
        'レッスンのスタート時間がすでに過ぎているため、直前休みを設定することができません。'
      )
      setTimePassedLesson(true)
      return false
    }
  }

  useEffect(() => {
    NextLessonDate()
  }, [mainSubject])

  function NextLessonDate() {
    var mbn = localStorage.getItem('MypageMbn')

    var Url = DB_CONN_URL + '/NEXT-LESSON-DATE-FOR-EVERYWEEK'

    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            mbn: mbn,
            mainSubject: mainSubject,
          })
          .then((response) => {
            // var nextLessonDate = response.data.nextLessonDate
            // alert(response.data.message)
            setNextLessonDate(response.data.nextLessonDate)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function funkLessonUrgentCancel() {
    //changeState=ticket

    var mbn = localStorage.getItem('MypageMbn')
    setIsReallyLessonCancel(false)
    setNeedPreload(true)

    // alert('homeworkId' + homeworkId)
    // alert('mbn' + mbn)
    // alert('selectedLesson' + selectedLesson)
    // alert('absentWeekday' + absentWeekday)
    // alert('nextLessonDate' + nextLessonDate)
    // alert('absentTime' + absentTime)
    // alert('mainSubject' + mainSubject)
    // alert('mainCourseName' + mainCourseName)

    const fetchData = async () => {
      try {
        axios
          .post(DB_CONN_URL + '/update-reg-urgent-cancel', {
            homework_id: homeworkId,
            mbn: mbn,
            lesson_set_autoid: selectedLesson, //homework tableのautoid
            changeState: 'urgent cancel',
            nextLessonWeekday: absentWeekday,
            nextLessonDate: nextLessonDate,
            nextLessonTime: absentTime,
            subject: mainSubject,
            mainCourseName: mainCourseName,
          })
          .then((response) => {
            // setAbsentDate(absentDate)
            // setAbsentTime(absentTime)
            // setSelectedHurikaeDate(hurikae_date)
            // setSelectedHurikaTime(hurikae_start_time)
            // alert('message' + response.data.message)
            sendEmailtoStudentForUrgentCancel(mbn, selectedLesson)
          })
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchData()
  }

  const sendEmailtoStudentForUrgentCancel = (mbn, lesson_set_autoid) => {
    // var email = localStorage.getItem('email')

    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    axios
      .get(
        DB_CONN_URL +
          '/member_and_tutor_info_get/' +
          mbn +
          '&' +
          lesson_set_autoid
      )
      .then((response) => {
        // alert(mbn)

        // alert(response.data.message)
        // alert(response.data.response[0].timezoneCity)
        // alert(response.data.response[0].email)

        // console.log('response2' + response.data.response[0].autoid)
        var email = localStorage.getItem('email')
        // var email = response.data.response[0].email_urgent1
        var name = response.data.response[0].name_eng
        var course = response.data.response[0].course
        var courseName = response.data.response[0].courseName
        // setMainCourseName(response.data.response[0].courseName)
        // setMainSubject(response.data.response[0].subject)
        var courseSubject = response.data.response[0].subject
        var absentWeekday = response.data.response[0].yoyakuWeekday
        var absentDate = response.data.response[0].yoyakuDate
        var absentTime = response.data.response[0].yoyakuTime
        var duringTime = response.data.response[0].duringTime
        var teacherNameEng = response.data.response[0].teacher_name
        var member_timeZone = localStorage.getItem('timezoneCity')
        var tutor_email = response.data.response[0].email //tutor_email
        var tutor_timeZone = response.data.response[0].timezoneCity

        //3か月後
        var dt = new Date(absentDate)
        var tvd = dt.setMonth(dt.getMonth() + 3)
        var tvd2 = new Date(tvd)
        var year = tvd2.getFullYear()
        var month = tvd2.getMonth()
        var day = tvd2.getDate()
        var ticketValidDate = year + '-' + month + '-' + day

        // alert(absentDate)
        // alert(ticketValidDate)

        var templateParams = {
          to_email: email,
          to_name: name,
          reply_to: 'no-reply',
          from_name: 'engLib',
          course: course,
          courseName: courseName,
          courseSubject: courseSubject,
          absentWeekday: absentWeekday,
          absentDate: absentDate,
          absentTime: absentTime,
          duringTime: duringTime,
          ticketValidDate: ticketValidDate,
          teacherNameEng: teacherNameEng,
          member_timeZone: member_timeZone,
        }
        var YOUR_SERVICE_ID = 'service_nu801ay'
        var YOUR_TEMPLATE_ID = 'template_k8yvyud'
        var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
        emailjs.init(YOUR_USER_ID)
        emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text)
            sendEmailtoTutorUrgentCancel(
              name,
              course,
              courseName,
              courseSubject,
              absentWeekday,
              absentDate,
              absentTime,
              duringTime,
              teacherNameEng,
              member_timeZone,
              tutor_email,
              tutor_timeZone
            )
          },
          function (error) {
            console.log('FAILED...', error)
          }
        )
      })
  }

  const sendEmailtoTutorUrgentCancel = (
    name,
    course,
    courseName,
    courseSubject,
    absentWeekday,
    absentDate,
    absentTime,
    duringTime,
    teacherNameEng,
    member_timeZone,
    tutor_email,
    tutor_timeZone
  ) => {
    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    // var tutor_email = 'ceo@edutainers.jp'//for test

    var templateParams = {
      to_email: tutor_email,
      to_name: teacherNameEng,
      reply_to: 'no-reply',
      from_name: 'engLib',
      nameEng: name,
      course: course,
      courseName: courseName,
      courseSubject: courseSubject,
      absentWeekday: absentWeekday,
      absentTime: absentTime,
      absentDate: absentDate,
      duringTime: duringTime,
      tutor_timeZone: tutor_timeZone,
      member_timeZone: member_timeZone,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_htt0dwl'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text)
        setIsReallyLessonCancel(false)
        setNeedPreload(false)
        setAlertUrgentFinished2(true)
        // alert('success!!')
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
  }

  return (
    <>
      <div>
        {needPreload && <Preloader />}
        <div className="row p-0 m-0">
          <div
            className="col-sm-12 ml-0 mb-4"
            style={{
              border: '1px solid #cc99ff',
              borderRadius: '10px',
              padding: 10,
            }}
          >
            <h4>直前キャンセル</h4>
            <p style={{ color: '#696969', marginBottom: 0, fontSize: '15px' }}>
              本日行われるレッスンに対して直前キャンセルをすることが可能です。
              <span style={{ color: 'red', marginBottom: 0, fontSize: '15px' }}>
                緊急の場合、BENのトップページの「振替・休み履歴」から一週間以内に本日付の領収書などをアップすると、本日から3ヶ月間有効な振替チケットが発行されます。発行までは平均的に1日〜5日くらいかかります。
              </span>
            </p>
          </div>

          <div className="col-sm-12 ml-0 ">
            {!myLessonList && (
              <h6 style={{ fontWeight: 'bold', color: 'red' }}>
                直前キャンセル可能なレッスンがありません。
              </h6>
            )}
            {myLessonList?.map((val, key) => {
              return (
                <>
                  <h6>
                    {' '}
                    以下のレッスンリストから休みを希望するレッスンをクリックしてください。
                  </h6>
                  <div className="form-group row  mb-0">
                    <div className="form-check">
                      {/* {absentWeekday} */}
                      <br />
                      <input
                        className="form-check-input"
                        type="radio"
                        name="selectlesson"
                        onClick={() => {
                          nowTime(val.yoyakuTime)

                          setMainSubject(val.subject)
                          setMainCourseName(val.courseName)
                          setIsCourseChanged(true)
                          // getLessonDate8Times(val.weekday, val.start_time)
                          // getLessonDate8Times(val.yoyakuWeekday, val.yoyakuTime)

                          funcHurikaeList(val.lessonSetAutoid, val.homework_id)
                          setSelectedLesson(val.lessonSetAutoid)
                          setNameEng(val.name_eng)
                          // setAbsentWeekday(val.weekday)
                          setHomeworkId(val.homework_id)
                          setAbsentWeekday(val.yoyakuWeekday)
                          setAbsentDate(val.yoyakuDate)
                          // setAbsentTime(val.start_time)

                          setAbsentTime(val.yoyakuTime)
                          setDuringTime(val.duringTime)
                          setCourse(val.course)
                          setCourseName(val.courseName)
                          setSubject(val.subject)
                          setCourseSubject(val.subject)
                          setTbn(val.teacher_barcode_num)
                          setTeacherNameEng(val.teacher_name)
                          setTimezoneCountryCode_member(val.timezoneCountryCode)
                          setTimezoneCity_member(val.timezoneCity)
                          setTimezoneUTC_member(val.timezoneUTC)
                          setTimezoneCountryName_member(val.timezoneCountryName)
                          setNow_summer_time_member(val.now_summer_time)

                          //getNextDate(val.weekday, val.start_time)
                        }}
                      />
                      <label
                        className="form-check-label mb-2 font-weight-bold h5"
                        for="gridRadios1"
                      >
                        {val.subject}コース:&nbsp;[
                        {myfun_weekdayToJapanese(val.yoyakuWeekday)}]
                        {val.yoyakuDate}&nbsp;|&nbsp;
                        {val.yoyakuTime}〜 &nbsp;&nbsp;
                      </label>
                    </div>
                  </div>
                </>
              )
            })}
            <hr />
          </div>

          <div className="col-sm-12 mt-3 p-0 text-center ">
            {/* {courseName}/{course} /{subject} */}
            {myLessonList && timePassedLesson == false && (
              <button
                className="btn btn-danger mb-2 p-2 h6 text-white font-weight-bold"
                onClick={() => {
                  // handleAllHurikaeReg(homeworkId)
                  funkLessonUrgentCancel()
                }}
                style={{ fontWeight: 500 }}
                disabled={hurikaeList2.length == 0 && 'disabled'}
              >
                先生に本日の休みを知らせる
              </button>
            )}
          </div>
          <div
            className="col-lg-12 col-md-12  p-0 mt-5"
            style={{
              textAlign: 'center',
            }}
          >
            <span
              className="btn btn-info mr-3 "
              style={{
                borderRadius: '10px',
                margin: 0,
                paddingLeft: 5,
                paddingRight: 5,

                fontSize: '20px',
                fontWeight: 'normal',
                color: 'white',
              }}
              onClick={() => {
                gotoTop()
              }}
            >
              BEN TOPへ戻る
            </span>
          </div>

          <div className="col-sm-12 mt-3 mb-0 text-center">
            <SweetAlert
              title="このレッスンをキャンセルしますか？"
              show={isReallyLessonCancel}
              onConfirm={() =>
                // funcSetHurikae()
                funkLessonUrgentCancel()
              }
              onCancel={() => {
                setIsReallyLessonCancel(false)
                // funcHurikaeList()
              }}
              confirmBtnText="OK"
              cancelBtnText="No"
              showCancel={true}
              reverseButtons={true}
              style={{ width: '600px' }}
            ></SweetAlert>

            <SweetAlert
              title="レッスンがキャンセルされました。"
              show={alertUrgentFinished2}
              onConfirm={() => {
                setAlertUrgentFinished2(false)
                setNeedPreload(false)
                router.push('/mytopGroup')
              }}
              // onCancel={() => {

              // }}
              confirmBtnText="YES"
              // cancelBtnText="No"
              showCancel={false}
              reverseButtons={true}
              style={{ width: '600px' }}
            ></SweetAlert>
          </div>
        </div>
      </div>
    </>
  )
}

export default HurikaeAskNewSoon
