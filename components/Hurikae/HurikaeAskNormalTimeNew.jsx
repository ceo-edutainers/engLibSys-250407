import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import emailjs from 'emailjs-com'
import TextareaAutosize from 'react-textarea-autosize'
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

const HurikaeAskNormalTimeNew = () => {
  const [myMbn, setMyMbn] = useState()
  //For sweet alert
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReg, setIsOpenReg] = useState(false)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isAlreadyWaiting, setIsAlreadyWaiting] = useState(false)
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

  const sendEmailtoStudent = () => {
    var email = localStorage.getItem('email')

    // alert(email)

    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    // var email = 'minjaekato@gmail.com'//TEST
    var absentWeekdayJpn = myfun_getdayofweek(absentDate)

    var templateParams = {
      to_email: email,
      to_name: nameEng,
      reply_to: 'no-reply',
      from_name: 'engLib',
      course: course,
      courseName: courseName,
      courseSubject: courseSubject,
      absentWeekday: absentWeekdayJpn,
      absentDate: absentDate,
      absentTime: absentTime,
      duringTime: duringTime,
      teacherNameEng: teacherNameEng,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_ne0700c'
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log(
          'SUCCESS STUDENT MAIL!',
          response.status,
          response.text,
          email
        )
      },
      function (error) {
        console.log('FAILED...STUDENT MAIL', error)
      }
    )
  }
  const sendEmailtoTutor = (homework_id) => {
    var mbn = localStorage.getItem('MypageMbn')
    // alert('selectedLessonValue' + selectedLessonValue)
    // console.log('invalue-for-email', mbn)
    axios
      .get(
        DB_CONN_URL +
          '/get-tutor-info-by-selectedLesson/' +
          mbn +
          '&' +
          homework_id
      )
      .then((response) => {
        //(error)console.log('dddd-response.data', response[0].data)
        //(error)console.log('dddd-response.data.email', response.data[0].result.email)
        // console.log('dddd-response.data.email', response.data.results.email)

        var tutor_email = response.data.results.email
        var tutor_first_name = response.data.results.first_name
        var tutor_middle_name = response.data.results.middle_name
        var tutor_last_name = response.data.results.last_name
        if (response.data.results.tutor_middle_name != '') {
          var tutor_name =
            tutor_first_name + ' ' + tutor_middle_name + ' ' + tutor_last_name
        } else {
          var tutor_name = tutor_first_name + ' ' + tutor_last_name
        }

        //test//////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        // var tutor_email = 'ceo@edutainers.jp'//for test
        var tutor_email = tutor_email

        var templateParams = {
          to_email: tutor_email,
          to_name: tutor_name,
          reply_to: 'no-reply',
          from_name: 'engLib',
          title: '[Urgent] Makeup lesson request from student',
          nameEng: nameEng,
          course: course,
          courseName: courseName,
          courseSubject: courseSubject,
          absentWeekday: absentWeekday,
          absentTime: absentTime,
          absentDate: absentDate,
          duringTime: duringTime,
        }
        var YOUR_SERVICE_ID = 'service_nu801ay'
        var YOUR_TEMPLATE_ID = 'template_nz9wpty'
        var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
        emailjs.init(YOUR_USER_ID)
        emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
          function (response) {
            console.log('SUCCESS TUTOR MAIL!', response.status, response.text)
          },
          function (error) {
            console.log('FAILED...TUTOR MAIL', error)
          }
        )
      })
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
      .post(DB_CONN_URL + '/list-my-lesson-ok', {
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
  function OnClickHurikaeListAdd() {
    // alert(startTime)
    // alert(endTime)
    // alert(selectedLesson)

    if (selectedLesson == null) {
      alert('振替希望のレッスンを先に選択して下さい。')
      return false
    }
    if (absentDate == '') {
      alert('休む日を必ず選んでください。')
      return false
    }
    if (startTime == '' || endTime == '') {
      alert('スタートと終わる時間を選んでください。')
      return false
    } else {
      var mbn = localStorage.getItem('MypageMbn')
      console.log('startRegdate:', startRegDate)
      var startRegDateModified = myfun_getMyDate(startRegDate)

      var hurikaeWeekday = myfun_getdayofweekEng(startRegDateModified)

      //alert(startRegDateModified)
      // alert(selectedLesson)
      // alert(homeworkId)
      // alert(nameEng)
      // alert(tbn)
      // alert(teacherNameEng)
      // alert(course)
      // alert(courseName)
      // alert(courseSubject)
      // alert(duringTime)
      // alert(absentWeekday)
      // alert(absentDate)
      // alert(absentTime)
      // alert(startRegDateModified)
      // alert(startTime)
      // alert(endTime)

      // alert('timezoneCountryCode_member:' + timezoneCountryCode_member)
      // alert('timezoneCity_member:' + timezoneCity_member)
      // alert('timezoneCountryName_member:' + timezoneCountryName_member)
      // alert('timezoneUTC_member:' + timezoneUTC_member)
      // alert('now_summer_time_member:' + now_summer_time_member) //undefined

      // alert('timezoneCountryCode_tutor:' + timezoneCountryCode_tutor)
      // alert('timezoneCity_tutor:' + timezoneCity_tutor)
      // alert('timezoneCountryName_tutor:' + timezoneCountryName_tutor)
      // alert('timezoneUTC_tutor:' + timezoneUTC_tutor)
      // alert('now_summer_time_tutor:' + now_summer_time_tutor) //undefined
      axios
        .post(DB_CONN_URL + '/reg-hurikae', {
          lesson_set_autoid: selectedLesson,
          mbn: mbn,
          homework_id: homeworkId,
          name_eng: nameEng,
          tbn: tbn, //担当先生
          teacher_name_eng: teacherNameEng,
          course: course,
          courseName: courseName,
          courseSubject: courseSubject,
          during_time: duringTime, //30 or 60min
          absent_weekday: absentWeekday,
          absent_date: absentDate,
          absent_time: absentTime,
          hurikaeWeekday: hurikaeWeekday,
          hurikae_date: startRegDateModified,
          hurikae_start_time: startTime,
          hurikae_end_time: endTime,
          myRegDate: myfun_myRegDate(),
          myRegTime: myfun_myRegTime(),
          timezoneCountryCode_member: timezoneCountryCode_member,
          timezoneCity_member: timezoneCity_member,
          timezoneCountryName_member: timezoneCountryName_member,
          timezoneUTC_member: timezoneUTC_member,
          now_summer_time_member: now_summer_time_member,
          timezoneCountryCode_tutor: timezoneCountryCode_tutor,
          timezoneCity_tutor: timezoneCity_tutor,
          timezoneCountryName_tutor: timezoneCountryName_tutor,
          timezoneUTC_tutor: timezoneUTC_tutor,
          now_summer_time_tutor: now_summer_time_tutor,
          // hurikae_end_time: endTime,
        })
        .then((response) => {
          //すでに登録されている振替希望日がある場合
          // alert('message :' + response.data.message)
          if (response.data.message == 'alreday registered datetime') {
            alert(
              'すでに追加した情報と同じです。違う曜日や時間にしてください。'
            )
          } else {
            if (response.status !== 200) {
              console.log('no information', response.data.message)
              alert('no' + response.data.message) //for test
            } else {
              setIsOpen(true)
              funcHurikaeList(selectedLesson, homeworkId)
            }
          }
        })
    }
    setIsStartTimeChanged(false) //startTimeがクリックされた事実をリセットする
    setStartTime() //追加後にはendTimeをリセットする
    setEndTime() //追加後にはendTimeをリセットする
  }

  const [isCourseChanged, setIsCourseChanged] = useState(false)
  // useEffect(() => {
  //   funcHurikaeList()
  //   // setIsCourseChanged(false)
  // }, [isCourseChanged])
  function funcHurikaeList(selectedLesson, homework_id) {
    // alert('selectedLesson: ' + selectedLesson)
    setHurikaeList2([])
    // setIsCourseChanged(true)
    var mbn = localStorage.getItem('MypageMbn')
    // alert(isCourseChanged)
    // alert(selectedLesson)
    // alert(homework_id)
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
        // alert('message1' + response.data.message)
        // alert('here')
        if (response.data.message == 'no data') {
        } else {
          setHurikaeList2(response.data.response)
          // alert(response.data.response)
          // setIsCourseChanged(false)
        }

        // console.log('response.data:', response.data.response)
        // console.log('setHurikaeList2:', hurikaeList2)
      })
  }

  function handleAllHurikaeReg(homework_id) {
    funcFurikaeOkCheck(courseName, course, subject)

    // alert('function handleAllHurikaeReg 内')
    // alert(homework_id)
    var mbn = localStorage.getItem('MypageMbn')

    axios
      .post(DB_CONN_URL + '/update-reg-hurikae-status-waiting', {
        lesson_set_autoid: selectedLesson,
        mbn: mbn,
        absentDate: absentDate,
        absentTime: absentTime,
        selectedLesson: selectedLesson,
      })
      .then((response) => {
        // alert(response.data.message)
        sendEmailtoStudent(selectedLesson)
        sendEmailtoTutor(homework_id)
        // sendEmailtoTutor(selectedLesson)
        setIsOpenReg(true)
        setAbsentDate()
      })
  }

  function funcCheckIsWaiting(homeworkid, lessonSetAutoid) {
    var mbn = localStorage.getItem('MypageMbn')

    axios
      .post(DB_CONN_URL + '/check-reg-hurikae-is-waiting', {
        lesson_set_autoid: lessonSetAutoid,
        mbn: mbn,
        homework_id: homeworkid,
      })
      .then((response) => {
        // alert(response.data.message)
        if (response.data.status == false) {
          setIsAlreadyWaiting(true)
          setAbsentDate()
        }
      })
  }

  function getNextDate(weekday, start_time) {
    // alert(weekday)
    // alert(start_time)
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

  // function holidayCheck(checkDate) {
  //   //この日付が休みなのかを確認する

  //   var url = DB_CONN_URL + '/holiday-check/' + checkDate

  //   return axios.get(url).then((response) => response.data.status)

  //   // const response = await axios
  //   //   .get(DB_CONN_URL + '/holiday-check/' + checkDate)
  //   // .then((response) => {
  //   //   // console.log('checkDate', checkDate, response.data.status)
  //   //   // var holidayStatus = response.data.status
  //   //   // setThisHolidayCheck(response.data.status)
  //   // })
  //   // return response.data
  // }
  async function holidayCheck(checkDate) {
    var url = DB_CONN_URL + '/holiday-check/' + checkDate
    const response = await axios.get(url)

    // console.log('$$$$$', response.data.status)
    return response.data.status
  }

  function getLessonDate8Times(weekday, start_time) {
    var nextDate = getNextDate(weekday, start_time)
    console.log('weekday', weekday)
    console.log('start_time', start_time)

    console.log('nextDate', nextDate)
    var arr = []

    for (let i = 1; i < 2; i++) {
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

  function handleAllHuriAddWaitingDelete() {
    var mbn = localStorage.getItem('MypageMbn')
    axios
      .put(DB_CONN_URL + '/all-hurikae-mbn-add-delete/' + mbn)
      .then((response) => {
        //alert('マイページへ戻ります。')
        //console.log('response.data:', response.data)
        //console.log('setHurikaeList2:', hurikaeList2)
      })
  }

  function handleOneListDelete(value, homework_id) {
    var mbn = localStorage.getItem('MypageMbn')
    axios
      .put(DB_CONN_URL + '/all-hurikae-mbn-one-delete/' + mbn + '&' + value)
      .then((response) => {
        if (response.status == 200) {
          // alert('削除しました', value)
          funcHurikaeList(selectedLesson, homework_id)
        } else {
          alert('Delete Error', value)
        }
      })
  }

  function handleEnd() {
    setIsOpenReg(false)
    setIsOpenBackMypage(false)
    router.replace('/mytopGroup') // ここでリダイレクト
  }

  function thisLessonYoyakuDate(thisCourse, thisCourseName, thisSubject) {
    // handleAllHuriAddWaitingDelete()
    if (thisSubject == 'READING') {
      var thisSubjectJp = 'リーディング'
    } else if (thisSubject == 'GRAMMAR') {
      var thisSubjectJp = '文法'
    } else if (thisSubject == 'EIKEN') {
      var thisSubjectJp = '英検'
    } else if (thisSubject == 'SCHOOL SUPPORT') {
      var thisSubjectJp = '学校サポート'
    } else if (thisSubject == 'SHOW AND TELL') {
      var thisSubjectJp = 'SHOW AND TELL'
    } else if (thisSubject == 'DISCUSSION') {
      var thisSubjectJp = 'ディスカッション'
    } else if (thisSubject == 'DEBATING') {
      var thisSubjectJp = 'ディベーティング'
    }
    if (thisSubjectJp !== '') {
      // alert(thisSubjectJp + 'コースを選びました。')
    } else {
      // alert(thisSubject + 'コースを選びました。')
    }
    var mbn = localStorage.getItem('MypageMbn')

    const fetchData1 = async () => {
      try {
        axios
          .post(DB_CONN_URL + '/this-lesson-yoyaku-date', {
            mbn: mbn,
            course: thisCourse,
            courseName: thisCourseName,
            subject: thisSubject,
          })
          .then((response) => {
            if (response.data.length > 0) {
              // alert('here1')
              // alert(response.data.length)
              // alert(response.data.message)
              // alert(response.data.status)
              // alert('here')
              // setMyLessonList2(response.data.response)
              // alert(response.data.response[0].yoyakuDate)
              // setLessonDateEight2(response.data.response[0].yoyakuDate)

              setAbsentDate(response.data.response[0].yoyakuDate)
              setHomeworkId(response.data.response[0].homework_id)
              setTbn(response.data.response[0].teacher_barcode_num)
              setCourseName(response.data.response[0].courseName)
              setSubject(response.data.response[0].subject)
              getTutorTimezone(
                response.data.response[0].homework_id,
                response.data.response[0].teacher_barcode_num,
                response.data.response[0].courseName
              )

              console.log('setMyLessonList3', response.data.response)
            } else {
              alert('no' + response.data.message) //for test
            }
          })
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData1()
  }

  const [hurikaeOK, setHurikaeOK] = useState('true')
  const [yoyakuDate, setYoyakuDate] = useState()
  const [yoyakuTime, setYoyakuTime] = useState()
  function funcFurikaeOkCheck(thisCourseName, thisCourse, thisSubject) {
    if (router.isReady) {
      var mbn = localStorage.getItem('MypageMbn')

      var Url =
        DB_CONN_URL +
        '/check-next-lesson-date-time/' +
        mbn +
        '&' +
        thisCourseName +
        '&' +
        thisCourse +
        '&' +
        thisSubject
      // alert(Url)
      axios.get(Url).then((response) => {
        setYoyakuDate(response.data[0].yoyakuDate)
        setYoyakuTime(response.data[0].yoyakuTime)
        setNameEng(response.data[0].name_eng)
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

        // 今回のデーターのstartDateを知る
        var yoyakuD = response.data[0].yoyakuDate
        var yoyakuT = response.data[0].yoyakuTime

        //比較する日付オブジェクトを２つ定義する
        var nowDate = new Date(NowRegdate)
        var lessonDate = new Date(yoyakuD)

        //TEST
        // yoyakuD = '2022-10-28'
        // yoyakuT = '21:22'
        // lessonDate = new Date(testDate)

        var dateNow = NowRegdate + 'T' + NowRegtime
        var dateYoyaku = yoyakuD + 'T' + yoyakuT + ':00'
        console.log('dateNow', dateNow)
        console.log('dateYoyaku', dateYoyaku)
        const date1 = new Date(dateNow)
        const date2 = new Date(dateYoyaku)
        // console.log('date2 - date1', date2 - date1)
        var hoursDifference = (date2 - date1) / (1000 * 60 * 60)
        hoursDifference = hoursDifference.toFixed(1) //小数点1
        // console.log('hoursDifference', hoursDifference)

        if (hoursDifference < 24.0) {
          // 振替設定不可 (24時間以下残ってる)

          if (hoursDifference <= 0) {
            setHurikaeOK(false)
            // alert(
            //   'すぎたレッスンですので、振替できません。先生が次の課題を設定するまで少しお時間かかる場合があります。少々お待ちください。'
            // )
            setIsPassedDate(true)
            setAbsentDate()
            return false
          } else {
            setHurikaeOK(false)
            // alert(
            //   'レッスン時間が' +
            //     hoursDifference +
            //     '時間しか残ってないため振替設定できません。'
            // )
            setWantToCancel(true)
            setAbsentDate()
            return false
          }
        } else {
          setHurikaeOK(true)
        }
      })
    }
  }

  const [isStartTimeChanged, setIsStartTimeChanged] = useState(false)

  function fucEndTimeChange(sTime) {
    // alert(duringTime)
    var timeArray = sTime.split(':')
    var endTime = timeArray[0]
    var endMin = timeArray[1]

    if (duringTime == 25) {
      if (endMin == '30') {
        endMin = '00'
        if (endTime < 9) {
          var nextTime = parseInt(endTime) + 1
          endTime = '0' + nextTime
        } else if (endTime == 9) {
          endTime = '10'
        } else {
          endTime = parseInt(endTime) + 1
        }
      } else {
        endMin = '30'
      }
      var setEndT = endTime + ':' + endMin
    } else if (duringTime == 50) {
      //  if (endMin == '30') {
      //    endMin = '00'
      //    endTime = endTime + 1
      //  } else {
      //    endMin = '30'
      //  }
      if (endTime < 9) {
        var nextTime = parseInt(endTime) + 1
        endTime = '0' + nextTime
      } else if (endTime == 9) {
        endTime = '10'
      } else {
        endTime = parseInt(endTime) + 1
      }
      var setEndT = endTime + ':' + endMin
    }

    // alert(setEndT)
    setIsStartTimeChanged(true)
    setEndTime(setEndT)
  }

  function funcDoCancel() {
    setWantToCancel(false)

    var mbn = localStorage.getItem('MypageMbn')
    var homework_id = homeworkId

    var Url =
      DB_CONN_URL +
      '/update-lesson-cancel/' +
      mbn +
      '&' +
      homework_id +
      '&' +
      selectedLesson

    // alert(Url)

    axios.get(Url).then((response) => {
      alert(response.data.message)
      alert(response.data.shadowing_autoid)
      alert(response.data.shadowing_hw_id)
      return false

      // sendCancelEmailtoStudent()
      // sendCancelEmailtoTutor()
    })

    // setIsCancelled(true)

    // router.replace('/mytopGroup') // ここでリダイレクト
    // alert('cancelled')
  }

  function goToMyTop() {
    router.replace('/mytopGroup') // ここでリダイレクト
  }

  return (
    <>
      <div>
        <div className="row p-0 m-0">
          <div
            className="col-sm-12 ml-0 mb-4"
            style={{
              border: '1px solid #cc99ff',
              borderRadius: '10px',
              padding: 10,
            }}
          >
            <h4>通常レッスンスケジュールの変更</h4>
            <p style={{ color: '#696969' }}>
              振替は次のレッスンに対してのみ申し込むことができます。
              振替ご希望のレッスンをクリックしてください。振替日がまだ決まってない場合は、キャンセルするレッスン日から3ヶ月有効な振替チケットとして保存してください。
            </p>
          </div>

          <div className="col-sm-12 mb-0 mt-0 ml-0 p-0">
            <div
              className="col-lg-12 ml-0 mb-2"
              style={{
                textAlign: 'left',
                color: 'blue',
                fontWeight: 'bold',
              }}
            >
              ご希望のレッスンを選択
            </div>
            <div
              className="col-lg-12 ml-0 mb-2"
              style={{
                textAlign: 'left',
                color: 'black',
                paddingLeft: '10%',
              }}
            >
              <div className="col-sm-12 ml-0 ">
                {myLessonList?.map((val, key) => {
                  //member_lesson_set & sys_member から持ってくる
                  return (
                    <>
                      <div className="form-group row  mb-0">
                        <div className="form-check">
                          {/* {absentWeekday} */}
                          <input
                            className="form-check-input"
                            type="radio"
                            name="selectlesson"
                            onClick={() => {
                              // setAbsentWeekday(val.weekday)
                              // thisLessonYoyakuDate(
                              //   val.course,
                              //   val.courseName,
                              //   val.subject
                              // )
                              // funcFurikaeOkCheck(
                              //   val.courseName,
                              //   val.course,
                              //   val.subject
                              // )

                              // funcCheckIsWaiting(
                              //   val.homework_id,
                              //   val.lessonSetAutoid
                              // )
                              setIsCourseChanged(true)
                              // getLessonDate8Times(val.weekday, val.start_time)
                              // getLessonDate8Times(
                              //   val.yoyakuWeekday,
                              //   val.yoyakuTime
                              // )

                              // funcHurikaeList(
                              //   val.lessonSetAutoid,
                              //   val.homework_id
                              // )
                              setSelectedLesson(val.lessonSetAutoid)
                              setNameEng(val.name_eng)
                              // setAbsentWeekday(val.weekday)
                              setAbsentWeekday(val.yoyakuWeekday)
                              // setAbsentTime(val.start_time)
                              setAbsentTime(val.yoyakuTime)
                              setDuringTime(val.duringTime)
                              setCourse(val.course)
                              setCourseName(val.courseName)
                              setSubject(val.subject)
                              setCourseSubject(val.subject)
                              setTbn(val.teacher_barcode_num)
                              setTeacherNameEng(val.teacher_name)
                              setTimezoneCountryCode_member(
                                val.timezoneCountryCode
                              )
                              setTimezoneCity_member(val.timezoneCity)
                              setTimezoneUTC_member(val.timezoneUTC)
                              setTimezoneCountryName_member(
                                val.timezoneCountryName
                              )
                              // setNow_summer_time_member(val.now_summer_time)
                            }}
                          />
                          <label
                            className="form-check-label mb-2 font-weight-bold h6"
                            for="gridRadios1"
                          >
                            {val.subject}コース:&nbsp;[
                            {myfun_weekdayToJapanese(val.yoyakuWeekday)}]
                            {val.yoyakuDate}&nbsp;|&nbsp;
                            {val.yoyakuTime}〜 &nbsp;&nbsp; 担当先生：
                            {val.teacher_name}
                          </label>
                          {/* <br />
                    selectedCourse:{val.lessonSetAutoid}
                    <br />
                    absentWeekday:{val.weekday}/absentTime:{val.start_time}
                    /yoyakuDate:{val.yoyakuDate} */}
                        </div>
                      </div>
                    </>
                  )
                })}
                <hr />
              </div>
            </div>
            <div
              className="col-lg-12 ml-0 mb-2"
              style={{
                textAlign: 'left',
                color: 'blue',
                fontWeight: 'bold',
              }}
            >
              先生変更の有無
            </div>
            <div
              className="col-lg-12 mb-2"
              style={{
                textAlign: 'left',
                color: 'black',
                paddingLeft: '10%',
              }}
            >
              <div className="row">
                <div
                  className="col-lg-4 ml-0 mb-2"
                  style={{
                    textAlign: 'left',
                    color: 'black',
                  }}
                >
                  <input
                    className="form-check-input mr-5"
                    type="radio"
                    name="changeTutor"
                    value="ok"
                    onClick={() => {
                      setChangeTutor('tutor-change-no')
                    }}
                  />
                  <label className="form-check-label h6" for="gridRadios1">
                    担当先生の変更を希望しない
                  </label>
                </div>
                <div
                  className="col-lg-4 ml-0 mb-2"
                  style={{
                    textAlign: 'left',
                    color: 'black',
                  }}
                >
                  <input
                    className="form-check-input mr-5"
                    type="radio"
                    name="changeTutor"
                    onClick={() => {
                      setChangeTutor('tutor-change-ok')
                    }}
                  />
                  <label className="form-check-label  h6" for="gridRadios1">
                    担当先生の変更を希望する
                  </label>
                </div>
                <div
                  className="col-lg-4 ml-0 mb-2"
                  style={{
                    textAlign: 'left',
                    color: 'black',
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="changeTutor"
                    onClick={() => {
                      setChangeTutor('whatever')
                    }}
                  />
                  <label className="form-check-label h6" for="gridRadios1">
                    どちらでも良い
                  </label>
                </div>
                <p style={{ color: 'red', fontSize: '12px' }}>
                  先生希望に関しましては、ご希望に備えない場合もありますので、ご了承ください。
                </p>
              </div>
            </div>
            <div
              className="col-lg-12 ml-0 "
              style={{
                textAlign: 'left',
                color: 'blue',
                fontWeight: 'bold',
              }}
            >
              希望曜日と時間帯
              <TextareaAutosize
                className="tour-step2 tour-step5 mb-3"
                aria-label="minimum height"
                minRows={5}
                onChange={(e) => {
                  setlessonMemoOnlyTeacher(e.target.value)
                }}
                type="text"
                style={{ width: '100%', verticalAlign: 'middle' }}
                placeholder="変更を希望する日付と時間帯をできるだけ多めに入力してください。"
              />
            </div>{' '}
            <div
              className="col-lg-12 ml-0 "
              style={{
                textAlign: 'left',
                color: 'blue',
                fontWeight: 'bold',
              }}
            >
              スケジュール変更の理由(先生変更を希望する場合その理由も含む)
              <TextareaAutosize
                className="tour-step2 tour-step5 mb-3"
                aria-label="minimum height"
                minRows={5}
                onChange={(e) => {
                  setlessonMemoOnlyTeacher(e.target.value)
                }}
                type="text"
                style={{ width: '100%', verticalAlign: 'middle' }}
                placeholder="スケジュールを変更する理由を入力してください。"
              />
            </div>
          </div>

          <div className="col-sm-12 mt-3 p-0 text-center ">
            {/* {courseName}/{course} /{subject} */}
            <button
              className="btn btn-danger mb-2 p-2 h6 text-white font-weight-bold"
              onClick={() => {
                handleAllHurikaeReg(homeworkId)
              }}
              style={{ fontWeight: 500 }}
              disabled={hurikaeList2.length == 0 && 'disabled'}
            >
              上記の内容で送信する
            </button>
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
            {/* <SweetAlert
              success
              //custom //custom or success or warning or input//
              //customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
              //showCancel
              //style={{ backgroundColor: 'white', color: 'white' }}
              show={isOpen} //Notice how we bind the show property to our component state
              confirmBtnText="OK"
              confirmBtnBsStyle={'danger'}
              //cancelBtnText="No"
              confirmBtnBsStyle="primary"
              //title="Are you sure?"
              title={
                <span>
                  リストに追加しました。<small></small>!
                </span>
              }
              onConfirm={() => setIsOpen(false)}
              // onCancel={() => {
              //   console.log('bye')
              //   setIsOpen(false) // Don't forget to close the modal
              // }}

              // focusCancelBtn
            >
              希望日はできるだけ多めに設定して下さい。
            </SweetAlert> */}
            <SweetAlert
              show={isOpen}
              confirmBtnText="OK"
              confirmBtnBsStyle={'danger'}
              //cancelBtnText="No"
              // confirmBtnBsStyle="primary"
              title="追加しました！"
              onConfirm={() => setIsOpen(false)}
              //onCancel={this.onCancel}
            />
            <SweetAlert
              success
              //custom //custom or success or warning or input//
              //customIcon="https://raw.githubusercontent.com/djorg83/react-bootstrap-sweetalert/master/demo/assets/thumbs-up.jpg"
              //showCancel
              //style={{ backgroundColor: 'white', color: 'white' }}
              show={isOpenReg} //Notice how we bind the show property to our component state
              confirmBtnText="OK"
              confirmBtnBsStyle={'danger'}
              //cancelBtnText="No"
              // confirmBtnBsStyle="primary"
              //title="Are you sure?"
              title={
                <span>
                  先生に送信されました。
                  <small></small>!
                </span>
              }
              onConfirm={() => handleEnd()}

              // onCancel={() => {
              //   console.log('bye')
              //   setIsOpen(false) // Don't forget to close the modal
              // }}

              // focusCancelBtn
            >
              24時間以内に答えが届きます。少々お待ちください。
            </SweetAlert>
            <SweetAlert
              title="次のレッスンが迫っているため(24時間以内)、振替申込みできません。振替なしでレッスンをキャンセルしますか？"
              show={wantToCancel}
              onConfirm={() => funcDoCancel()}
              onCancel={() => {
                setWantToCancel(false)
              }}
              confirmBtnText="振替なしで休む"
              cancelBtnText="振替設定をやめて、そのままレッスンを受ける"
              showCancel={true}
              reverseButtons={true}
              style={{ fontSize: '10px', width: '50%', minWidth: '200px' }}
            >
              <p>
                キャンセルするを押すと次のレッスンはキャンセルになります。しないを押すと、レッスンを変更せずに参加することになります。
              </p>
              <hr />
              <p style={{ color: 'red' }}>
                キャンセルをしても、次のレッスンまで同じ内容の課題を進められます。次のレッスンが終わるまで課題変更はできませんので、ご注意ください。
              </p>
            </SweetAlert>
            <SweetAlert
              title="レッスンがキャンセルされました。"
              show={isCancelled}
              onConfirm={() => goToMyTop()}
              onCancel={() => {
                setIsCancelled(false)
              }}
              confirmBtnText="わかりました。"
              // cancelBtnText="しない"
              showCancel={false}
              reverseButtons={true}
              style={{ fontSize: '12px', width: '40%', minWidth: '200px' }}
            >
              <p style={{ color: 'red' }}>
                次のレッスンまで課題を毎日進んでください。
              </p>
            </SweetAlert>
            <SweetAlert
              title="過ぎたレッスンです。新しい課題が設定されてないため、振替設定できません。"
              show={isPassedDate}
              onConfirm={() => goToMyTop()}
              onCancel={() => {
                setIsPassedDate(false)
              }}
              confirmBtnText="わかりました。"
              // cancelBtnText="しない"
              showCancel={false}
              reverseButtons={true}
              style={{ fontSize: '12px', width: '50%', minWidth: '200px' }}
            >
              <p style={{ color: 'black' }}>
                先生が次の課題を設定するまで少しお時間かかる場合があります。少々お待ちください。
              </p>
              <p style={{ color: 'red' }}>
                レッスン後5時間が過ぎても新しい課題が設定されない場合は、イングリブの窓口までお問い合わせください。online-help@edutainers.jp
              </p>
            </SweetAlert>
            <SweetAlert
              title="すでに振替申し込みをしているレッスンです。"
              show={isAlreadyWaiting}
              onConfirm={() => goToMyTop()}
              onCancel={() => {}}
              confirmBtnText="わかりました。"
              // cancelBtnText="しない"
              showCancel={false}
              reverseButtons={true}
              style={{ fontSize: '12px', width: '50%', minWidth: '200px' }}
            >
              <p style={{ color: 'red' }}>
                振替申し込み後、通常は24時間以内に先生から連絡が届きますので、少々お待ちください。先生の方で対応できない場合は、3ヶ月有効なチケットとして保存されます。
                申し込み後24時間以上時間が経っても振替申し込み結果メールが届かない場合は、イングリブの窓口までお問い合わせください。online-help@edutainers.jp
              </p>
            </SweetAlert>
          </div>
        </div>
      </div>
    </>
  )
}

export default HurikaeAskNormalTimeNew
