import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import NavbarEnglib_Tutor from '@/components/_App/NavbarEnglib_Tutor'

import HurikaeAlertInTutorPage from '@/components/Hurikae/HurikaeAlertInTutorPage'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import {
  myfun_getLessonPage,
  myfun_getdayofweekEng,
  myfun_getdayofweek,
} from '@/components/FunctionComponent'
import Modal from '@/components/modal/ModalMemberInfo'
import SweetAlert from 'react-bootstrap-sweetalert'
import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons'
import emailjs from 'emailjs-com'
import { SettingsBackupRestore } from '@material-ui/icons'
import Preloader from '@/components/Preloader/Preloader'
const Upcoming = () => {
  //get값이 넘어왔을 경우
  const router = useRouter()
  const { query } = useRouter()
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  //Preloader
  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  // const tbn = query.tbn
  const [isReallySetHurikae, setIsReallySetHurikae] = useState(false)
  const [isReallyTicketSetHurikae, setIsReallyTicketSetHurikae] =
    useState(false)
  const [isSentEmailToStudent, setIsSentEmailToStudent] = useState(false)
  const [alertHurikaeFinished, setAlertHurikaeFinished] = useState(false)
  const [alertHurikaeFinished2, setAlertHurikaeFinished2] = useState(false)
  const [selectedLessonSetAutoid, setSelectedLessonSetAutoid] = useState()
  const [selectedHurikaeDate, setSelectedHurikaeDate] = useState()
  const [selectedHurikaTime, setSelectedHurikaTime] = useState()
  const [selectedHomeworkId, setSelectedHomeworkId] = useState()
  const [selectedMbn, setSelectedMbn] = useState()
  // const [showReallySetHurikae, setShowReallySetHurikae] = useState(false)

  const [absentWeekday, setAbsentWeekday] = useState()
  const [absentDate, setAbsentDate] = useState()
  const [absentTime, setAbsentTime] = useState()
  const [classLink, setClassLink] = useState()
  const [myMbn, setMyMbn] = useState()
  //modal
  const [openModal, setOpenModal] = useState(false)
  const [mbnModal, setMbnModal] = useState()
  const [todayDate, setTodayDate] = useState(null)

  const [lessonInfo, setLessonInfo] = useState([])

  const [oshiraseInfo, setOshiraseInfo] = useState([])

  const [needPreload, setNeedPreload] = useState(false)

  const [mainCourseName, setMainCourseName] = useState()
  const [mainSubject, setMainSubject] = useState()
  const [nextLessonDate, setNextLessonDate] = useState()
  // const [lessonHistoryInfo, setLessonHistoryInfo] = useState(null)
  // console.log('query.tbn:', query.tbn)
  // console.log('tbn:', tbn)

  const [myTbn, setMyTbn] = useState()

  useEffect(() => {
    if (router.isReady) {
      // var tbn = query.tbn
      // alert(tbn)
      // const tbn = localStorage.getItem('tbn')
      var tbn = router.query.tbn

      // alert('tbn' + tbn)
      var status = 'homework'
      var Url =
        DB_CONN_URL + '/tutor_upcoming_lesson_info/' + tbn + '&' + status

      axios.get(Url).then((response) => {
        //errorの場合
        // alert('length' + response.data.length)
        if (!response.data.status) {
          // alert(response.data.message) //for test
        } else {
          if (response.data.length > 0) {
            setLessonInfo(response.data.response)
          } else {
            alert(response.data.message)
            setLessonInfo([])
          }
        }
      })
    }
  }, [router.isReady])

  useEffect(() => {
    // var tbn = query.tbn
    // alert(tbn)

    // alert('tbn' + tbn)
    var toWho = 'tutor'
    var status = 'ing'
    var Url = DB_CONN_URL + '/englib_oshirase/' + toWho + '&' + status

    axios.get(Url).then((response) => {
      //errorの場合

      if (!response.data.status) {
        // alert(response.data.message) //for test
      } else {
        // alert(response.data.length)
        if (response.data.length > 0) {
          setOshiraseInfo(response.data.response)
        }
      }
    })
  }, [])

  useEffect(() => {
    getToday()
  }, [])

  const getToday = () => {
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

    setTodayDate(NowRegdate)
  }
  //For tab start
  const [value, setValue] = React.useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [clearBtn, setClearBtn] = useState('')
  const inputRef = useRef()
  const handleClear = () => {
    setSearchTermWeekday('')
    setSearchTermName('')
    setClearBtn('clear')
    inputRef.current.value = ''
  }

  //for filtering
  const [searchTermWeekday, setSearchTermWeekday] = useState('')
  const [searchTermName, setSearchTermName] = useState('')

  const [hurikaeAru, setHurikaeAru] = useState(false)
  const [hurikaeLength, setHurikaeLength] = useState()
  const [hurikaeList, setHurikaeList] = useState([])
  const [makeupTitle, setMakeupTitle] = useState()

  useEffect(() => {
    if (router.isReady) {
      // console.log('router.query', router.query)
      setMyTbn(router.query.tbn)
      var tbn = router.query.tbn
      funcHurikaeList(tbn)
    }
  }, [router.isReady])

  function funcHurikaeList() {
    setAlertHurikaeFinished(false)
    setAlertHurikaeFinished2(false)
    // if (localStorage.getItem('loginStatus') == 'true') {
    if (router.isReady) {
      // console.log('router.query', router.query)

      var tbn = router.query.tbn
    }

    var url = DB_CONN_URL + '/select-hurikae-tbn-waiting-by-group/'
    var Url = url + tbn
    // alert(Url)
    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          if (response.data.status) {
            if (response.data.length > 0) {
              // alert('1')
              setHurikaeAru(true)
              setHurikaeLength(response.data.length)
              setHurikaeList(response.data.response)

              setMakeupTitle(
                'Makeup Lesson waiting [' + response.data.length + ']'
              )
            } else {
              // alert('2')

              setHurikaeAru(false)
              setMakeupTitle('Makeup Lesson waiting [0]')
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
    // }
  }

  const [hurikaeWaitingDetail, setHurikaeWaitingDetail] = useState([])
  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      const tbn = localStorage.getItem('tbn')
      var url = DB_CONN_URL + '/select-hurikae-tbn-waiting/'
      var Url = url + tbn

      const fetchData1 = async () => {
        try {
          axios.get(Url).then((response) => {
            // alert(response.data.message)
            // alert(response.data.length)
            if (response.data.status) {
              if (response.data.length) {
                // alert(response.data.message)

                setHurikaeWaitingDetail(response.data.response)
                console.log('setHurikaeWaitingDetail', response.data.response)
              } else {
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

  function funcSetHurikae() {
    // alert(selectedLessonSetAutoid)
    // alert(selectedHurikaeDate)
    // alert(selectedHurikaTime)
    // alert(selectedHomeworkId)
    // alert(selectedMbn)

    var Url = DB_CONN_URL + '/update-reg-hurikae-status-tutor-change'
    axios
      .post(Url, {
        mbn: selectedMbn,
        hurikae_date: selectedHurikaeDate,
        hurikae_start_time: selectedHurikaTime,
        homework_id: selectedHomeworkId,
      })
      .then((response) => {
        if (response.data.status) {
          setIsSentEmailToStudent(true)
        }
      })
    //
  }

  function handleHurikaeSelect(
    lesson_set_autoid,
    absentDate,
    absentTime,
    hurikae_date,
    hurikae_start_time,
    homework_id
  ) {
    setIsReallySetHurikae(false)
    setNeedPreload(true)

    var mbn = localStorage.getItem('MypageMbn')
    var hurikae_weekday = myfun_getdayofweekEng(hurikae_date)
    // alert(hurikae_weekday)
    var Url = DB_CONN_URL + '/update-reg-hurikae-status-selected'
    axios
      .post(Url, {
        selectedLesson: lesson_set_autoid,
        mbn: mbn,
        absentDate: absentDate,
        absentTime: absentTime,
        hurikae_weekday: hurikae_weekday,
        hurikae_date: hurikae_date,
        hurikae_start_time: hurikae_start_time,
      })
      .then((response) => {
        // alert(response.data.message)
        sendEmailtoStudent(
          mbn,
          lesson_set_autoid,
          hurikae_date,
          hurikae_start_time
        )

        setAbsentDate(absentDate)
        setAbsentTime(absentTime)
        setSelectedHurikaeDate(hurikae_date)
        setSelectedHurikaTime(hurikae_start_time)
      })
  }

  useEffect(() => {
    NextLessonDateForTicket()
  }, [selectedMbn])

  function NextLessonDateForTicket() {
    var Url = DB_CONN_URL + '/NEXT-LESSON-DATE-FOR-EVERYWEEK'

    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            mbn: selectedMbn,
            mainSubject: mainSubject,
          })
          .then((response) => {
            // var nextLessonDate = response.data.nextLessonDate
            setNextLessonDate(response.data.nextLessonDate)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  function funcMakeupToTicket() {
    //changeState=ticket

    setIsReallyTicketSetHurikae(false)
    setNeedPreload(true)

    //changeState : ticket
    // alert('selectedMbn' + selectedMbn)

    // alert('selectedHomeworkId' + selectedHomeworkId)
    // alert('selectedLessonSetAutoid' + selectedLessonSetAutoid)

    // alert(absentDate)
    // alert(absentTime)
    // alert(nextLessonDate)
    // alert(mainSubject)
    // alert(mainCourseName)
    // alert(absentWeekday)

    // var absent_Weekday = myfun_getdayofweekEng(absentDate)
    var Url = DB_CONN_URL + '/update-reg-hurikae-status-tutor-change-ticket'

    alert(nextLessonDate)
    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            homework_id: selectedHomeworkId,
            mbn: selectedMbn,
            lesson_set_autoid: selectedLessonSetAutoid, //homework tableのautoid
            changeState: 'ticket',
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
            sendEmailtoStudentForTicket(selectedMbn, selectedLessonSetAutoid)
          })
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchData()
  }

  const sendEmailtoStudentForTicket = (mbn, lesson_set_autoid) => {
    // var email = localStorage.getItem('email')

    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    var Url = DB_CONN_URL + '/member_info_mbn_get/'
    axios.get(Url + mbn + '&' + lesson_set_autoid).then((response) => {
      // alert(mbn)

      // alert(response.data.message)
      // alert(response.data.response[0].autoid)
      // alert(response.data.response[0].email_urgent1)

      // console.log('response2' + response.data.response[0].autoid)
      var email = response.data.response[0].email_urgent1
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
      var member_timeZone = response.data.response[0].timezoneCity

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
      var YOUR_TEMPLATE_ID = 'template_118svzn'
      var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
      emailjs.init(YOUR_USER_ID)
      emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
          sendEmailtoTutorForTicket(
            mbn,
            name,
            course,
            courseName,
            courseSubject,
            absentWeekday,
            absentDate,
            absentTime,
            duringTime,
            lesson_set_autoid,
            teacherNameEng,
            member_timeZone
          )
        },
        function (error) {
          console.log('FAILED...', error)
        }
      )
    })
  }

  const sendEmailtoTutorForTicket = (
    mbn,
    name,
    course,
    courseName,
    courseSubject,
    absentWeekday,
    absentDate,
    absentTime,
    duringTime,
    lesson_set_autoid,
    teacherNameEng,
    member_timeZone
  ) => {
    var tutor_email = localStorage.getItem('T_email')
    var tutor_timeZone = localStorage.getItem('T_timezone')

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
    var YOUR_TEMPLATE_ID = 'template_q6qte5m2'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text)
        setIsReallySetHurikae(false)
        setNeedPreload(false)
        setAlertHurikaeFinished2(true)
        // alert('success!!')
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
    // })
  }
  const sendEmailtoStudent = (
    mbn,
    lesson_set_autoid,
    hurikae_date,
    hurikae_start_time
  ) => {
    // var email = localStorage.getItem('email')

    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    var Url = DB_CONN_URL + '/member_info_mbn_get/'
    axios.get(Url + mbn + '&' + lesson_set_autoid).then((response) => {
      // alert(mbn)
      // alert(response.data.message)
      // alert(response.data.length)
      // alert(response.data.response[0].autoid)
      // alert(response.data.response[0].email_urgent1)

      // console.log('response2' + response.data.response[0].autoid)
      var email = response.data.response[0].email_urgent1
      var name = response.data.response[0].name_eng
      var course = response.data.response[0].course
      var courseName = response.data.response[0].courseName
      // setMainCourseName(response.data.response[0].courseName)
      // setMainSubject(response.data.response[0].subject)
      var courseSubject = response.data.response[0].subject
      var absentWeekday = response.data.response[0].yoyakuWeekday
      var absentDate = response.data.response[0].yoyakuDate
      var absentTime = response.data.response[0].yoyakuTime
      // var hurikaeDate=response.data.response[0].
      // var hurikaeStartTime=response.data.response[0].
      var duringTime = response.data.response[0].duringTime
      var teacherNameEng = response.data.response[0].teacher_name
      var member_timeZone = response.data.response[0].timezoneCity
      // alert('email-urgent1' + email)
      // alert('name' + name)
      var hurikaeWeekday = myfun_getdayofweek(hurikae_date)

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
        hurikaeWeekday: hurikaeWeekday,
        hurikaeDate: hurikae_date,
        hurikaeStartTime: hurikae_start_time,
        teacherNameEng: teacherNameEng,
        member_timeZone: member_timeZone,
      }
      var YOUR_SERVICE_ID = 'service_nu801ay'
      var YOUR_TEMPLATE_ID = 'template_jv5v4d6'
      var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
      emailjs.init(YOUR_USER_ID)
      emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
          sendEmailtoTutor(
            mbn,
            name,
            course,
            courseName,
            courseSubject,
            absentWeekday,
            absentDate,
            absentTime,
            duringTime,
            lesson_set_autoid,
            hurikae_date,
            hurikae_start_time,
            teacherNameEng,
            member_timeZone
          )
        },
        function (error) {
          console.log('FAILED...', error)
        }
      )
    })
  }
  const sendEmailtoTutor = (
    mbn,
    name,
    course,
    courseName,
    courseSubject,
    absentWeekday,
    absentDate,
    absentTime,
    duringTime,
    lesson_set_autoid,
    hurikae_date,
    hurikae_start_time,
    teacherNameEng,
    member_timeZone
  ) => {
    var tutor_email = localStorage.getItem('T_email')
    var tutor_timeZone = localStorage.getItem('T_timezone')

    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    // var tutor_email = 'ceo@edutainers.jp'//for test

    var hurikaeWeekday = myfun_getdayofweekEng(hurikae_date)

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
      hurikaeWeekday: hurikaeWeekday,
      hurikaeDate: hurikae_date,
      hurikaeStartTime: hurikae_start_time,
      absentDate: absentDate,
      duringTime: duringTime,
      tutor_timeZone: tutor_timeZone,
      member_timeZone: member_timeZone,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_6z6so4r'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text)
        setIsReallySetHurikae(false)
        setNeedPreload(false)
        setAlertHurikaeFinished(true)
        // alert('success!!')
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
    // })
  }

  //For tab end
  return (
    <React.Fragment>
      <NavbarEnglib_Tutor />
      {needPreload && <Preloader />}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 p-2 text-center">
            {oshiraseInfo?.map((val, key) => {
              return (
                <>
                  <span
                    style={{
                      color: 'blue',
                      fontSize: '15px',
                      fontWeight: 'bold',
                    }}
                  >
                    [{val.regdate}]
                  </span>
                  &nbsp;
                  <span style={{ color: 'red', fontSize: '15px' }}>
                    &nbsp;[{val.title_jp}]&nbsp;{val.detail_jp}
                  </span>
                  <br />
                </>
              )
            })}
            <hr />
          </div>

          <div className="col-lg-12 col-md-6">
            {/* modal start */}
            {openModal && (
              <Modal
                closeModal={setOpenModal}
                mbn={mbnModal}
                // tbn={localStorage.getItem('tbn')}
                // email={localStorage.getItem('email')}
                // T_email={localStorage.getItem('T_email')}
              />
            )}
            {/* modal end */}
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="My Lesson " value="1" />
                    <Tab
                      label={makeupTitle && makeupTitle}
                      value="3"
                      style={{ color: 'red' }}
                    />
                    <Tab label="Payment History" value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 ,mb-2 pl-3">
                      <select
                        onChange={(e) => {
                          setSearchTermWeekday(e.target.value)
                          setClearBtn('')
                        }}
                        className="form-control-sm "
                        style={{ width: '100%' }}
                      >
                        <option
                          value=""
                          selected={clearBtn == 'clear' && 'selected'}
                        >
                          All Day
                        </option>

                        <option value="MON">MON</option>
                        <option value="TUE">TUE</option>
                        <option value="WED">WED</option>
                        <option value="THUR">THUR</option>
                        <option value="FRI">FRI</option>
                        <option value="SAT">SAT</option>
                        <option value="SUN">SUN</option>
                      </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                      <input
                        className="form-control-md mb-2"
                        style={{ width: '100%' }}
                        ref={inputRef}
                        type="text"
                        placeholder="Name Search..."
                        onChange={(e) => {
                          setClearBtn('')
                          setSearchTermName(e.target.value)
                        }}
                      />
                    </div>
                    <div className="col-lg-4 col-md-6 mb-2">
                      <span
                        className="btn-sm btn-secondary mr-2 "
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleClear()
                        }}
                      >
                        Reset(All Data)
                      </span>
                      <span
                        className="btn-sm btn-primary "
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          getToday()
                        }}
                      >
                        Today
                      </span>
                    </div>

                    <div
                      className="col-lg-2 col-md-6 pr-4"
                      style={{ textAlign: 'right' }}
                    >
                      <b>Total：{lessonInfo.length}</b>
                    </div>
                  </div>

                  <table className="table table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Lesson Page</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>
                          Make-up
                          <br />
                          (original date)
                        </th>
                        <th>Weekday</th>
                        <th>Date</th>

                        <th>Make-up</th>

                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessonInfo &&
                        lessonInfo
                          .filter((val) => {
                            // For One item search
                            // if (searchTermName == '') {
                            //   return val //everything data
                            // } else if (
                            //   val.name_eng
                            //     .toLowerCase()
                            //     .includes(searchTermName.toLowerCase())
                            // ) {
                            //   return val
                            // }

                            //For Two Item search

                            if (
                              searchTermName == '' &&
                              searchTermWeekday == ''
                            ) {
                              return val //everything data
                            } else if (
                              searchTermWeekday == '' &&
                              val.name_eng
                                .toLowerCase()
                                .includes(searchTermName.toLowerCase())
                            ) {
                              return val
                            } else if (
                              searchTermName == '' &&
                              val.yoyakuWeekday.includes(searchTermWeekday)
                            ) {
                              return val
                            } else if (
                              val.name_eng
                                .toLowerCase()
                                .includes(searchTermName.toLowerCase()) &&
                              val.yoyakuWeekday.includes(searchTermWeekday)
                            ) {
                              return val
                            }
                          })
                          .map((val, key) => {
                            var c = val.course
                            var cn = val.courseName
                            // panel/showandtell?m=2022050100009&cN=undefined&tbn=201114875053&homework_id=CourseST_2022050100009_2022061360640
                            var pageName = myfun_getLessonPage(c, cn)
                            // console.log('c', c)
                            // console.log('cn', cn)
                            var pageUrl =
                              '/tutor/panel/' +
                              pageName +
                              '?m=' +
                              val.member_barcode_num +
                              '&cN=' +
                              val.courseName +
                              '&course=' +
                              val.course +
                              '&sB=' +
                              val.subject +
                              '&subJ=' +
                              val.subject +
                              '&tbn=' +
                              val.teacher_barcode_num +
                              '&homework_id=' +
                              val.homework_id

                            var beforeFurikae_original_date_weekday =
                              myfun_getdayofweekEng(
                                val.beforeFurikae_original_date
                              )

                            return (
                              <tr key={key}>
                                {/* <td>
                                  <a
                                    className="btn-sm btn-info text-white pl-3 pr-3"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                      setOpenModal(true)
                                      setMbnModal(val.member_barcode_num)
                                    }}
                                  >
                                    {key + 1}
                                  </a>
                                </td> */}
                                <td>
                                  <Link href={pageUrl}>
                                    <a
                                      className="btn btn-secondary text-white"
                                      onClick={() => {}}
                                      target="_blank"
                                    >
                                      Lesson Page
                                    </a>
                                  </Link>
                                </td>
                                <td>{val.name_eng}</td>
                                <td>
                                  {val.subject}
                                  <br />
                                  {val.seriesName}
                                </td>
                                <td>
                                  {val.makeupStatus == 'confirmed' && (
                                    <>
                                      <span style={{ color: 'red' }}>
                                        makeup lesson
                                        <br />
                                        振替レッスン{' '}
                                      </span>
                                      <br />
                                      <span
                                        style={{
                                          color: 'gray',
                                          fontSize: '10px',
                                        }}
                                      >
                                        Original Lesson Time
                                        <br />
                                        {val.beforeFurikae_original_date}&nbsp;[
                                        {beforeFurikae_original_date_weekday}]
                                        &nbsp;&nbsp;
                                        {val.beforeFurikae_original_time}
                                      </span>
                                    </>
                                  )}
                                </td>
                                <td>
                                  {val.yoyakuWeekday}
                                  {val.yoyakuDate == todayDate && (
                                    <p
                                      style={{ color: 'red', fontSize: '15px' }}
                                    >
                                      TODAY
                                    </p>
                                  )}
                                </td>
                                <td>
                                  {val.yoyakuDate}
                                  <br />
                                  {val.yoyakuTime}
                                </td>

                                <td>
                                  {/* <Link href="/tutor/hurikaeT"> */}
                                  {/* <button
                                    className="btn-sm btn-primary"
                                    onClick={() => {
                                      // setOpenModal(true)
                                      // setMbnModal(val.member_barcode_num)
                                    }}
                                  >
                                    Makeup(振替)
                                  </button> */}
                                  <a
                                    className="btn-sm btn-primary text-white"
                                    onClick={() => {
                                      alert('準備中')
                                    }}
                                  >
                                    Makeup
                                  </a>
                                  {/* </Link> */}
                                </td>

                                <td>{val.duringTime}min</td>
                              </tr>
                            )
                          })}
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">
                  <hurikaeAlertInTutorPage />
                </TabPanel>
                <TabPanel value="4">Item Four</TabPanel>
              </TabContext>
            </Box>
          </div>
          {/* //tabend */}
        </div>
      </div>

      <SweetAlert
        title="Do you set up this datetime for make-up lesson?"
        show={isReallySetHurikae}
        onConfirm={() =>
          // funcSetHurikae()
          handleHurikaeSelect(
            selectedLessonSetAutoid,
            absentDate,
            absentTime,
            selectedHurikaeDate,
            selectedHurikaTime,
            selectedHomeworkId
          )
        }
        onCancel={() => {
          setIsReallySetHurikae(false)
          funcHurikaeList()
        }}
        confirmBtnText="OK"
        cancelBtnText="No"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        {/* <p>
          Makaup Date: {hurikae_date} | {hurikae_start_time}
        </p> */}
      </SweetAlert>

      <SweetAlert
        title="Do you issue a ticket for your student?"
        show={isReallyTicketSetHurikae}
        onConfirm={() =>
          // funcSetHurikae()
          funcMakeupToTicket()
        }
        onCancel={() => {
          setIsReallyTicketSetHurikae(false)
          funcHurikaeList()
        }}
        confirmBtnText="OK"
        cancelBtnText="No"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        {/* <p>
          Makaup Date: {hurikae_date} | {hurikae_start_time}
        </p> */}
      </SweetAlert>
      <SweetAlert
        title="A Make-up lesson has been set!"
        show={alertHurikaeFinished}
        onConfirm={() => {
          setAlertHurikaeFinished(false)
          setNeedPreload(false)
          router.push('/tutor/upcoming?tbn=' + myTbn)
        }}
        // onCancel={() => {

        // }}
        confirmBtnText="YES"
        // cancelBtnText="No"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>振替設定が終わりました。</p>
      </SweetAlert>

      <SweetAlert
        title="A ticket issued for your student successfully!"
        show={alertHurikaeFinished2}
        onConfirm={() => {
          setAlertHurikaeFinished2(false)
          setNeedPreload(false)
          router.push('/tutor/upcoming?tbn=' + myTbn)
        }}
        // onCancel={() => {

        // }}
        confirmBtnText="YES"
        // cancelBtnText="No"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>振替設定が終わりました。</p>
      </SweetAlert>

      <SweetAlert
        title="Sent Email to Student Successfully!"
        show={isSentEmailToStudent}
        onConfirm={() => setIsSentEmailToStudent(false)}
        onCancel={() => {
          setIsSentEmailToStudent(false)
        }}
        confirmBtnText="OK"
        cancelBtnText="No"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        {/* <p>
          Makaup Date: {hurikae_date} | {hurikae_start_time}
        </p> */}
      </SweetAlert>
    </React.Fragment>
  )
}

export default Upcoming
