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
const HurikaeAsk = () => {
  //Preloader
  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  const DB_CONN_URL = process.env.DB_CONN_URL

  const [myMbn, setMyMbn] = useState()
  //For sweet alert
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReg, setIsOpenReg] = useState(false)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isAlreadyWaiting, setIsAlreadyWaiting] = useState(false)
  //時間追加
  //const [hurikaeList, setHurikaeList] = useState([])

  const [isReallyLessonCancel, setIsReallyLessonCancel] = useState(false)
  const [alertUrgentFinished2, setAlertUrgentFinished2] = useState(false)
  const [needPreload, setNeedPreload] = useState(false)
  const [nextLessonDate, setNextLessonDate] = useState()
  const [mainSubject, setMainSubject] = useState()
  const [mainCourseName, setMainCourseName] = useState()

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

  const [viewAbsentDate, setViewAbsentDate] = useState(false)

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

      //まずこの曜日と時間帯がこの先生の通常のレッスンの時間帯なのかをチェックする

      var Url = DB_CONN_URL + '/get-member-set-info/' + mbn + '&' + subject
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

  function handleGetTicketDirect(lessonSetAutoid, homework_id) {
    alert(lessonSetAutoid)
    alert(homework_id)
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

  function funkLessonNoFurikaeCancel(select_lesson_autoid) {
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
            sendEmailtoStudentForCancel(mbn, select_lesson_autoid)
          })
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    fetchData()
  }

  const sendEmailtoStudentForCancel = (mbn, lesson_set_autoid) => {
    // var email = localStorage.getItem('email')

    console.log('mbn: ' + mbn)
    console.log('lesson_set_autoid: ' + lesson_set_autoid)

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

        console.log('response.data.message: ' + response.data.message)
        // alert(response.data.response[0].timezoneCity)
        // alert(response.data.response[0].email)

        // console.log('response2' + response.data.response[0].autoid)
        var email = localStorage.getItem('A_email')
        console.log('A_email: ' + email)
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
        var YOUR_TEMPLATE_ID = 'template_p64qu5j'
        var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
        emailjs.init(YOUR_USER_ID)
        emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text)
            sendEmailtoTutorForCancel(
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

  const sendEmailtoTutorForCancel = (
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
    var YOUR_TEMPLATE_ID = 'template_wwm8fsb'
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

  function handleLessonClick(val) {
    setViewAbsentDate(true)
    setSelectedLesson(val.lessonSetAutoid)
    setNameEng(val.name_eng)
    setAbsentWeekday(val.yoyakuWeekday)
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

    // 必要な関数を呼び出し
    thisLessonYoyakuDate(val.course, val.courseName, val.subject)
    funcFurikaeOkCheck(val.courseName, val.course, val.subject)
    funcCheckIsWaiting(val.homework_id, val.lessonSetAutoid)
    getLessonDate8Times(val.yoyakuWeekday, val.yoyakuTime)
    funcHurikaeList(val.lessonSetAutoid, val.homework_id)
  }

  useEffect(() => {
    // 明日の日付をデフォルトに設定
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setStartRegDate(tomorrow)
  }, [])
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
            {' '}
            <h4>振替・時間変更の申込み</h4>
            <p style={{ color: '#696969', marginBottom: 0, fontSize: '15px' }}>
              以下のレッスン一覧から、振替を希望するレッスンをクリックしてください。
              円満な振替調整のため、２４時間以上時間が残っている次のレッスンに対し、振替を申し込むことができます。
              ２４時間以下残っているレッスンをお休みされる場合は、「振替なしで休む」ボタンを押してください。
              <span style={{ color: 'red', marginBottom: 0, fontSize: '15px' }}>
                「このレッスンを振替なしで休む」
              </span>
              ボタンを押すと、レッスンが自動的にキャンセルされます。（ただし、レッスン開始まで24時間以上ある場合に限ります）
            </p>
          </div>

          <div className="col-sm-12 ml-0 ">
            {myLessonList?.map((val, key) => {
              //member_lesson_set & sys_member から持ってくる

              // 各レッスンの時間を計算

              const lessonDateTime = new Date(
                `${val.yoyakuDate}T${val.yoyakuTime}:00+09:00`
              ) // JSTを指定
              const now = new Date()

              // 時間差を計算 (時間単位)
              const diff = parseFloat((lessonDateTime - now) / (1000 * 60 * 60)) // 時間単位で計算

              // レッスン時間が24時間以上残っているかを判定
              const isOver24Hours = diff >= 24

              // 日時をフォーマット
              const formattedDateTime = `${lessonDateTime.getFullYear()}-${String(
                lessonDateTime.getMonth() + 1
              ).padStart(2, '0')}-${String(lessonDateTime.getDate()).padStart(
                2,
                '0'
              )} ${String(lessonDateTime.getHours()).padStart(2, '0')}:${String(
                lessonDateTime.getMinutes()
              ).padStart(2, '0')}`

              return (
                <>
                  <div className="form-group row  mb-0">
                    <div className="form-check">
                      {/* <p>
                        now:{now.toLocaleString()}
                        <br></br>
                        diff:{diff.toFixed(2)}
                        <br />
                        24時間以上残っている？:
                        {isOver24Hours ? 'Yes' : 'No'}
                      </p> */}

                      <input
                        className="form-check-input"
                        type="radio"
                        name="selectlesson"
                        disabled={!isOver24Hours} // 24時間以上残っていない場合は無効化
                        onClick={() => handleLessonClick(val)}
                        // onClick={() => {
                        //   // setAbsentWeekday(val.weekday)
                        //   setViewAbsentDate(true)
                        //   thisLessonYoyakuDate(
                        //     val.course,
                        //     val.courseName,
                        //     val.subject
                        //   )
                        //   funcFurikaeOkCheck(
                        //     val.courseName,
                        //     val.course,
                        //     val.subject
                        //   )

                        //   funcCheckIsWaiting(
                        //     val.homework_id,
                        //     val.lessonSetAutoid
                        //   )
                        //   setIsCourseChanged(true)
                        //   // getLessonDate8Times(val.weekday, val.start_time)
                        //   getLessonDate8Times(val.yoyakuWeekday, val.yoyakuTime)

                        //   funcHurikaeList(val.lessonSetAutoid, val.homework_id)
                        //   setSelectedLesson(val.lessonSetAutoid)
                        //   setNameEng(val.name_eng)
                        //   // setAbsentWeekday(val.weekday)
                        //   setAbsentWeekday(val.yoyakuWeekday)
                        //   // setAbsentTime(val.start_time)
                        //   setAbsentTime(val.yoyakuTime)
                        //   setDuringTime(val.duringTime)
                        //   setCourse(val.course)
                        //   setCourseName(val.courseName)
                        //   setSubject(val.subject)
                        //   setCourseSubject(val.subject)
                        //   setTbn(val.teacher_barcode_num)
                        //   setTeacherNameEng(val.teacher_name)
                        //   setTimezoneCountryCode_member(val.timezoneCountryCode)
                        //   setTimezoneCity_member(val.timezoneCity)
                        //   setTimezoneUTC_member(val.timezoneUTC)
                        //   setTimezoneCountryName_member(val.timezoneCountryName)
                        //   setNow_summer_time_member(val.now_summer_time)

                        //   //getNextDate(val.weekday, val.start_time)
                        // }}
                      />
                      <label
                        className="form-check-label mb-2 font-weight-bold h5"
                        for="gridRadios1"
                      >
                        {val.subject}コース:&nbsp;[
                        {myfun_weekdayToJapanese(val.yoyakuWeekday)}]
                        {val.yoyakuDate}&nbsp;|&nbsp;
                        {val.yoyakuTime}〜 &nbsp;&nbsp; 24時間以上残っている？:{' '}
                        {isOver24Hours ? 'Yes' : 'No'}
                        <span
                          className="btn btn-info"
                          style={{
                            cursor: !isOver24Hours ? 'not-allowed' : 'pointer',
                            opacity: !isOver24Hours ? 0.6 : 1,
                          }}
                          onClick={() => {
                            if (isOver24Hours) {
                              console.log(
                                `Lesson ${index + 1}: Cancel action executed.`
                              )
                            }
                            setViewAbsentDate(true)
                            funkLessonNoFurikaeCancel(val.lessonSetAutoid)
                            // handleGetTicketDirect(
                            //   val.lessonSetAutoid,
                            //   val.homework_id
                            // )
                            setMainSubject(val.subject)
                            setMainCourseName(val.courseName)

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
                            setNow_summer_time_member(val.now_summer_time)
                          }}
                        >
                          {!isOver24Hours
                            ? 'レッスンまで２４時間以上残ってないため、振替申込できません。'
                            : 'このレッスンを振替なしで休む'}
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              )
            })}
            <hr />
          </div>

          {viewAbsentDate && (
            <>
              {' '}
              <div className="col-sm-3 ml-0 mr-2 p-0">
                {/* <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
              休む日選択
            </label> */}
                {/* {absentDate} */}

                {absentDate ? (
                  <>
                    {/* <select
                      className="form-control bg-darkgray text-black"
                      onChange={(e) => {
                        setAbsentDate(e.target.value)
                      }}
                    >
                      <option value={absentDate}>{absentDate}</option>
                    </select> */}
                    <label
                      style={{
                        paddingLeft: '10px',
                        fontWeight: '500',
                        color: 'red',
                      }}
                    >
                      {/* 休む日(~2ヶ月先) */}
                      振替希望のレッスン日
                    </label>
                    <input
                      className="form-control bg-gray text-red"
                      value={absentDate}
                      disabled="disabled"
                    />
                  </>
                ) : (
                  <>
                    <select className="form-control bg-dark text-white"></select>
                    <label
                      style={{
                        paddingLeft: '10px',
                        fontWeight: '500',
                        color: 'red',
                      }}
                    >
                      {/* 休む日(~2ヶ月先) */}
                      上記の振替ご希望のコースを選んでください。
                    </label>
                  </>
                )}
              </div>
              <div className="col-sm-2 p-0  mr-2">
                {/* <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
              希望日
            </label> */}
                <label
                  style={{
                    paddingLeft: '10px',
                    fontWeight: '500',
                    color: 'red',
                  }}
                >
                  振替希望日
                </label>
                <DatePicker
                  className="form-control w-100  bg-dark text-white"
                  portalId="root-portal"
                  // selected={absentDate && startRegDate}
                  // selected={startRegDate || null} // 選択されるまで日付を表示しない
                  selected={startRegDate} // 明日の日付をデフォルト選択
                  onChange={(date) => setStartRegDate(date)}
                  dateFormat="yyyy-MM-dd"
                  // minDate={new Date()} //今日から選べるようにする
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() + 1))
                  } // 明日から選択可能
                  maxDate={
                    new Date(new Date().setDate(new Date().getDate() + 14))
                  } // 今日から14日後まで
                  // minDate={absentDate}
                  // maxDate={new Date(moment().add(1, 'months'))} //最大3ヶ月後のスケジュール
                  // maxDate={new Date(moment().add(2, 'weeks'))} //最大2週間後のスケジュール
                  // maxDate={new Date(moment(absentDate).add(6, 'days'))} //最大10日後のスケジュール
                  // filterDate={(date) =>
                  //   date.getDay() != 6 && date.getDay() != 0
                  // } //土日はSelectできないようにする
                  disabled={selectedLesson == null ? 'disabled' : ''}
                />
              </div>
              <div className="col-sm-2 ml-0 p-0  mr-2">
                {/* {startTime} */}
                {/* <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
              振替希望時間
            </label> */}
                <label
                  style={{
                    paddingLeft: '10px',
                    fontWeight: '500',
                    color: 'red',
                  }}
                >
                  希望時間
                </label>
                <select
                  className="form-control  bg-dark text-white"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setStartTime(e.target.value)
                    fucEndTimeChange(e.target.value)
                    // setEndTime(e.target.value)
                  }}
                  disabled={selectedLesson == null ? 'disabled' : ''}
                >
                  {absentDate && <option>ｽﾀｰﾄ時間</option>}

                  {Array.apply(1, Array(50)).map(function (x, i) {
                    let op1 = '<option value='
                    let sValue = String(i) + '0:00'
                    let op2 = '>'
                    let showValue = String(i) + '0:00'
                    let op3 = '</option>'

                    return op1 + sValue + op2 + showValue + op3
                  })}
                  {Array.apply(1, Array(24)).map(function (x, i) {
                    let ampm = ''
                    if (i < 12) {
                      ampm = ' [午前]〜'
                    } else {
                      ampm = ' [午後]〜'
                    }
                    if (i < 10) {
                      return (
                        <>
                          {absentDate && (
                            <>
                              <option
                                value={'0' + String(i) + ':' + '00'}
                                selected={
                                  startTime == '0' + String(i) + ':' + '00'
                                    ? 'selected'
                                    : ''
                                }
                              >
                                {'0' + String(i) + ':' + '00' + ampm}
                              </option>
                              <option
                                value={'0' + String(i) + ':' + '30'}
                                selected={
                                  startTime == '0' + String(i) + ':' + '30'
                                    ? 'selected'
                                    : ''
                                }
                              >
                                {'0' + String(i) + ':' + '30' + ampm}
                              </option>
                            </>
                          )}
                        </>
                      )
                    } else {
                      return (
                        <>
                          {absentDate && (
                            <>
                              <option
                                value={String(i) + ':' + '00'}
                                selected={
                                  startTime == String(i) + ':' + '00'
                                    ? 'selected'
                                    : ''
                                }
                              >
                                {String(i) + ':' + '00' + ampm}
                              </option>
                              <option
                                value={String(i) + ':' + '30'}
                                selected={
                                  startTime == String(i) + ':' + '30'
                                    ? 'selected'
                                    : ''
                                }
                              >
                                {String(i) + ':' + '30' + ampm}
                              </option>
                            </>
                          )}
                        </>
                      )
                    }
                  })}
                </select>
              </div>
              <div className="col-sm-2 ml-0 p-0  mr-2">
                <>
                  <label
                    style={{
                      paddingLeft: '10px',
                      fontWeight: '500',
                      color: 'red',
                    }}
                  >
                    終わる時間
                  </label>
                  <select
                    className="form-control  bg-dark text-white"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      setEndTime(e.target.value)
                      // setEndTime(e.target.value)
                    }}
                    disabled="disabled"
                    // disabled={selectedLesson == null ? 'disabled' : ''}
                  >
                    {Array.apply(1, Array(50)).map(function (x, i) {
                      let op1 = '<option value='
                      let sValue = String(i) + '0:00'
                      let op2 = '>'
                      let showValue = String(i) + '0:00'
                      let op3 = '</option>'

                      return op1 + sValue + op2 + showValue + op3
                    })}

                    {Array.apply(1, Array(24)).map(function (x, i) {
                      let ampm = ''
                      if (i < 12) {
                        ampm = ' [午前]'
                      } else {
                        ampm = ' [午後]'
                      }
                      if (i < 10) {
                        return (
                          <>
                            {isStartTimeChanged && endTime != '' && (
                              <>
                                <option
                                  value={'0' + String(i) + ':' + '00'}
                                  selected={
                                    endTime == '0' + String(i) + ':' + '00'
                                      ? 'selected'
                                      : ''
                                  }
                                >
                                  {'0' + String(i) + ':' + '00' + ampm}
                                </option>
                                <option
                                  value={'0' + String(i) + ':' + '30'}
                                  selected={
                                    endTime == '0' + String(i) + ':' + '30'
                                      ? 'selected'
                                      : ''
                                  }
                                >
                                  {'0' + String(i) + ':' + '30' + ampm}
                                </option>
                              </>
                            )}
                          </>
                        )
                      } else {
                        return (
                          <>
                            {isStartTimeChanged && endTime != '' && (
                              <>
                                <option
                                  value={String(i) + ':' + '00'}
                                  selected={
                                    endTime == String(i) + ':' + '00'
                                      ? 'selected'
                                      : ''
                                  }
                                >
                                  {String(i) + ':' + '00' + ampm}
                                </option>
                                <option
                                  value={String(i) + ':' + '30'}
                                  selected={
                                    endTime == String(i) + ':' + '30'
                                      ? 'selected'
                                      : ''
                                  }
                                >
                                  {String(i) + ':' + '30' + ampm}
                                </option>
                              </>
                            )}
                          </>
                        )
                      }
                    })}
                  </select>
                </>
              </div>
              <div
                className="col-sm-2 mt-1 ml-0 p-0"
                style={{
                  display: 'flex', // Flexbox 사용
                  flexDirection: 'column', // 필요 시 column 방향 설정
                  justifyContent: 'center', // 세로 중앙 정렬
                  alignItems: 'center', // 가로 중앙 정렬
                  height: '100%', // div의 전체 높이
                  textAlign: 'center',
                }}
              >
                <label>&nbsp;</label>
                <button
                  className="btn btn-danger pt-1 pb-1  mt-0 mb-0"
                  onClick={() => {
                    OnClickHurikaeListAdd()
                  }}
                  style={{ fontSize: 20, fontWeight: 500, width: '100%' }}
                  disabled={
                    absentDate == '' || absentDate == null ? 'disabled' : ''
                  }
                >
                  追加
                </button>
              </div>
              <div className="col-sm-12 mb-0 mt-0 ml-0 p-0">
                {timezoneCity_member && timezoneCity_tutor && (
                  <p>
                    生徒 Timezone：{timezoneCity_member}
                    &nbsp;/&nbsp;先生：
                    {timezoneCity_tutor}
                  </p>
                )}
                <hr />

                {/* <textarea
              className="form-control"
              placeholder="先生に伝えるメッセージがありましたら。"
              style={{ backgroundColor: 'white' }}
            />
            <br /> */}
                {/* <h5 style={{ color: 'red', fontWeight: '900' }}>
              {hurikaeList2.length}
              <span className="h6" style={{ fontWeight: '600' }}>
                件追加
              </span>{' '}
            </h5> */}
                {/* {subject && <h2>{subject}コース</h2>} */}

                <ul className="list-group">
                  <li className="list-group-item list-group-item-danger">
                    {hurikaeList2?.map((val, key) => {
                      const weekday = ['日', '月', '火', '水', '木', '金', '土']

                      const d = new Date(val.hurikae_date)
                      let day = weekday[d.getDay()]
                      return (
                        <div className="mb-1">
                          <b>希望日{key + 1}.</b>&nbsp;{val.hurikae_date}&nbsp;[
                          {day}]&nbsp;&nbsp;{val.hurikae_start_time}〜{' '}
                          {val.hurikae_end_time}
                          <span
                            className="btn-sm btn-dark ml-2 pt-0 pb-0"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              handleOneListDelete(val.autoid, val.homework_id)
                            }}
                          >
                            削除
                          </span>
                        </div>
                      )
                    })}
                    {hurikaeList2.length == 0 &&
                      '振替希望日の登録リストがありません。'}
                  </li>
                  <li style={{ color: 'black' }}>
                    希望日の登録数に制限はありません。
                    <br />
                    一度のやり取りで決まらない場合は、自動で3ヶ月有効のチケットとして保存されますので、
                    希望日をできるだけ多めに登録してください。
                  </li>
                </ul>
              </div>
            </>
          )}
          {/* <div className="col-sm-12 mb-2 mt-1 ml-1">{hurikaeList}</div> */}

          {/* {startTime}/{endTime} */}

          {/* <div className="col-sm-12 mt-3  text-center">
            <input
              className="mr-2"
              type="checkbox"
              style={{ width: '15px', height: '15px' }}
              onClick={() => {
                setOtherTutorOk(!otherTutorOk)
              }}
            />
            <span
              style={{ color: 'red', fontWeight: '600', alignItems: 'center' }}
            >
              {otherTutorOk ? true : false}
              担当先生と時間が合わない場合,他の先生に振替レッスンを受けても構わない
            </span>
          </div> */}
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
              先生に振替依頼メールを送信する
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
              title="レッスンが迫っているため(24時間以内)、振替申込みできません。"
              show={wantToCancel}
              onConfirm={() => funcDoCancel()}
              onCancel={() => {
                setWantToCancel(false)
              }}
              confirmBtnText="振替なしでレッスンを休む"
              cancelBtnText="レッスンを受ける"
              showCancel={true}
              reverseButtons={true}
              style={{ fontSize: '10px', width: '50%', minWidth: '200px' }}
            >
              <p style={{ color: 'red', fontSize: '20px' }}>
                振替なしでレッスンをお休みしますか？
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

export default HurikaeAsk
