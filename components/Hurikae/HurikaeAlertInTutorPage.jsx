// CSS mypage_for_adult.css
import react, { useState, useContext, useEffect } from 'react'
import emailjs from 'emailjs-com'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'

function hurikaeAlertInTutorPage() {
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

  const [needPreload, setNeedPreload] = useState(false)

  const [absentWeekday, setAbsentWeekday] = useState()
  const [absentDate, setAbsentDate] = useState()
  const [absentTime, setAbsentTime] = useState()
  const [classLink, setClassLink] = useState()

  const [courseName, setCourseName] = useState()
  const [course, setCourse] = useState()
  const [mainSubject, setMainSubject] = useState()
  const [nextLessonDate, setNextLessonDate] = useState()

  const [hurikaeAru, setHurikaeAru] = useState(false)
  const [hurikaeLength, setHurikaeLength] = useState()
  const [hurikaeList, setHurikaeList] = useState([])
  const [makeupTitle, setMakeupTitle] = useState()
  // const [showReallySetHurikae, setShowReallySetHurikae] = useState(false)

  const [myTbn, setMyTbn] = useState()
  //get값이 넘어왔을 경우
  const router = useRouter()
  const { query } = useRouter()
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  // useEffect(() => {
  //   NextLessonDateForTicket()
  // }, [selectedMbn])

  function NextLessonDateForTicket(autoid, mbn, subject) {
    alert('1')
    var Url = DB_CONN_URL + '/NEXT-LESSON-DATE-FOR-HURIKAE-SET'

    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            autoid: autoid,
            mbn: mbn,
            mainSubject: subject,
          })
          .then((response) => {
            // var nextLessonDate = response.data.nextLessonDate
            // alert('message nextlesson date:' + response.data.message)
            // alert('mbn', response.data.mbn)
            // alert('subject', response.data.subject)
            // alert('autoid', response.data.autoid)

            alert('message:' + response.data.message)
            alert('weekday:' + response.data.weekday)
            alert('orig_yoyaku_date:' + response.data.orig_yoyaku_date)
            alert('yoyaku_date:' + response.data.yoyaku_date)
            alert('diffTime:' + response.data.diffTime)
            alert('diffDays:' + response.data.diffDays)
            alert('targetDate:' + response.data.targetDate)
            alert('targetdate:' + response.data.targetdate)
            alert('nextLessonDate:' + response.data.nextLessonDate)
            return false
            setNextLessonDate(response.data.nextLessonDate)
          })
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
    fetchData()
  }

  function funcMakeupToTicket() {
    //changeState=ticket

    setIsReallyTicketSetHurikae(false)
    setNeedPreload(true)

    var Url = DB_CONN_URL + '/update-reg-hurikae-status-tutor-change-ticket'

    alert(selectedHomeworkId)
    alert(selectedMbn)
    alert(selectedLessonSetAutoid)
    alert(absentWeekday)
    alert(nextLessonDate) //undefined
    alert(absentTime)
    alert(mainSubject)
    alert(course)
    alert(courseName)
    return false
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
            course: course,
            courseName: courseName,
          })
          .then((response) => {
            // setAbsentDate(absentDate)
            // setAbsentTime(absentTime)
            // setSelectedHurikaeDate(hurikae_date)
            // setSelectedHurikaTime(hurikae_start_time)
            alert('message' + response.data.message)
            alert('NowRegdate:' + response.data.NowRegdate)
            alert('originalClassLink:' + response.data.originalClassLink)
            alert('lesson_set_autoid:' + response.data.lesson_set_autoid)
            alert('homework_id:' + response.data.homework_id)
            alert('mbn:' + response.data.mbn)

            sendEmailtoStudentForTicket(selectedMbn, selectedLessonSetAutoid)
            funcHurikaeList()
          })
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchData()
  }

  useEffect(() => {
    if (router.isReady) {
      funcHurikaeList()
    }
  }, [router.isReady])

  function funcHurikaeList() {
    setAlertHurikaeFinished(false)
    setAlertHurikaeFinished2(false)
    // if (localStorage.getItem('loginStatus') == 'true') {
    if (router.isReady) {
      const tbn = localStorage.getItem('tbn')

      var url = DB_CONN_URL + '/select-hurikae-tbn-waiting-by-group/'
      var Url = url + tbn
    }

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

  const sendEmailtoStudentForTicket = (mbn, lesson_set_autoid) => {
    // var email = localStorage.getItem('email')

    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    var Url = DB_CONN_URL + '/member_info_mbn_get/'
    axios.get(Url + mbn + '&' + lesson_set_autoid).then((response) => {
      // alert(mbn)

      // alert(response.data.message)
      // alert(response.data.response[0].autoid)

      // console.log('response2' + response.data.response[0].autoid)
      var email = response.data.response[0].email
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

      // console.log('response2' + response.data.response[0].autoid)
      var email = response.data.response[0].email
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
  return (
    <>
      <></>
      {hurikaeList?.map((val, key) => {
        return (
          <>
            <div
              className="col-lg-12 col-md-6 pr-4"
              style={{ textAlign: 'left' }}
            >
              {val.status == 'waiting' && (
                <span className="btn btn-danger mr-2">{val.status}</span>
              )}
              <b>STUDENT NAME:</b> {val.name_eng}
              &nbsp;|&nbsp;
              <b>COURSE:&nbsp;</b>
              {val.courseSubject}&nbsp;&nbsp; [Lesson Date:
              {val.absent_date}&nbsp;|&nbsp;{val.absent_time}] &nbsp;
              {/* <b>{val.name_eng}</b>&nbsp; */}
              <br />
            </div>

            <div className="row">
              {/* <div
                            className="col-lg-1 col-md-6 pr-4"
                            style={{ textAlign: 'left' }}
                          ></div> */}
              <div
                className="col-lg-12 col-md-6 pr-4 mb-3 pl-5"
                style={{ textAlign: 'left' }}
              >
                <div className="mb-3 pt-3 ">
                  {/* lesson_set_autoid:{val.lesson_set_autoid}
                              <br /> */}
                  mainCourse:{val.course}
                  <br />
                  mainCourseName{val.courseName}
                  <br />
                  <input
                    type="radio"
                    name="hurikaedate"
                    value="ticket"
                    onClick={() => {
                      setIsReallyTicketSetHurikae(true)
                      NextLessonDateForTicket(
                        val.lesson_set_autoid,
                        val.member_barcode_num,
                        val.courseSubject
                      )
                      // funcMakeupToTicket(
                      //
                      // )

                      setSelectedLessonSetAutoid(val.lesson_set_autoid)
                      setSelectedHurikaeDate(val.hurikae_date)
                      setSelectedHurikaTime(val.hurikae_start_time)
                      setSelectedHomeworkId(val.homework_id)
                      setSelectedMbn(val.member_barcode_num)
                      setAbsentDate(val.absent_date)
                      setAbsentTime(val.absent_time)
                      setAbsentWeekday(val.absent_weekday)
                      setMainSubject(val.courseSubject)
                      setCourse(val.course)
                      setCourseName(val.courseName)
                    }}
                  />
                  &nbsp;
                  <span style={{ color: 'red' }}>
                    I cannot accommodate all of the following requested dates,
                    so I will save it as a lesson ticket that the student can
                    use within the next 3 months.
                    (以下の全ての希望日に対応できないため、3ヶ月有効なチケットに保存してあげる。)
                  </span>
                </div>
                {hurikaeWaitingDetail?.map((val2, key2) => {
                  if (val.lesson_set_autoid == val2.lesson_set_autoid) {
                    var agree = 'ok'
                  } else {
                    var agree = ''
                  }
                  const weekday = [
                    'SUN',
                    'MON',
                    'TUE',
                    'WED',
                    'THUR',
                    'FRI',
                    'SAT',
                  ]

                  const d = new Date(val2.hurikae_date)
                  let day = weekday[d.getDay()]
                  return (
                    <>
                      {agree == 'ok' && (
                        <>
                          <div className="pt-0 pb-0 mt-0 mb-3">
                            <input
                              type="radio"
                              name="hurikaedate"
                              onClick={() => {
                                setIsReallySetHurikae(true)

                                // handleHurikaeSelect(
                                //   val2.lesson_set_autoid,
                                //   val2.absent_date,
                                //   val2.absent_time,
                                //   val2.hurikae_date,
                                //   val2.hurikae_start_time,
                                //   val2.homework_id
                                // )
                                setAbsentDate(val2.absent_date)
                                setAbsentTime(val2.absent_time)

                                setSelectedLessonSetAutoid(
                                  val2.lesson_set_autoid
                                )
                                setSelectedHurikaeDate(val2.hurikae_date)
                                setSelectedHurikaTime(val2.hurikae_start_time)
                                setSelectedHomeworkId(val2.homework_id)
                                setSelectedMbn(val2.member_barcode_num)
                              }}
                            />
                            &nbsp;
                            <span>
                              {val2.hurikae_date}&nbsp;[{day}]&nbsp; |&nbsp;
                              {val2.hurikae_start_time} 〜{' '}
                              {val2.hurikae_end_time}
                            </span>
                          </div>
                        </>
                      )}
                    </>
                  )
                })}
                <hr />
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
          </>
        )
      })}
    </>
  )
}

export default hurikaeAlertInTutorPage
