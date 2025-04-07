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
import moment from 'moment'
import {
  myfun_getLessonPage,
  myfun_getLessonPageMoreDetail,
} from '@/components/FunctionComponent'
import Modal from '@/components/modal/ModalMemberInfo'
import emailjs from 'emailjs-com'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { formatToTimeZone } from 'date-fns-timezone'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import { EXITED } from 'react-transition-group/Transition'
import SweetAlert from 'react-bootstrap-sweetalert'
const Upcoming = () => {
  //get값이 넘어왔을 경우

  const { query } = useRouter()
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const [key, setKey] = useState(0) // 키 상태로 컴포넌트의 리렌더링을 제어
  // 컴포넌트 리로드 함수
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1) // 키 값을 변경하여 컴포넌트 리렌더링
    funcHurikaeLength()
  }
  // const tbn = query.tbn
  const [makeupTitle, setMakeupTitle] = useState()
  //date modify
  const [modifyDateView, setModifyDateView] = useState(false)
  const [modifyAutoid, setModifyAutoid] = useState()

  //tutor modify
  const [modifyTutorView, setModifyTutorView] = useState(false)
  const [modifyTutorAutoid, setModifyTutorAutoid] = useState()
  const [modifyTutorTbn, setModifyTutorTbn] = useState()

  //レッスン日付及び時間変更の場合、臨時的に保存するvalue
  const [changedRegDate, setChangedRegDate] = useState(new Date())
  const [changedRegTime, setChangedRegTime] = useState(moment())
  const [changed_mbn, setChanged_mbn] = useState(null)
  const [changed_tbn, setChanged_tbn] = useState(null)
  const [changed_tname, setChanged_tname] = useState(null)
  const [changed_homework_id, setChanged_homework_id] = useState(null)
  const [changed_yoyakuDate, setChanged_yoyakuDate] = useState(null)
  const [changed_yoyakuTime, setChanged_yoyakuTime] = useState(null)
  const [changed_yoyakuWeekday, setChanged_yoyakuWeekday] = useState(null)
  const [newWeekday, setNewWeekday] = useState(null)
  const [changed_dateTimeChangeMemo, setChanged_dateTimeChangeMemo] =
    useState(null)

  //search
  const [searchYear, setSearchYear] = useState()
  const [searchMonth, setSearchMonth] = useState()
  const [searchDateLessonComa, setSearchDateLessonComa] = useState()

  //shipment
  const [searchYearShipment, setSearchYearShipment] = useState()
  const [searchMonthShipment, setSearchMonthShipment] = useState()
  // const [searchDayShipment, setSearchDayShipment] = useState()
  const [shipmentStatus, setShipmentStatus] = useState('Ordered')
  const [shipmentPayStatus, setShipmentPayStatus] = useState('no pay')
  const [changedStatus, setChangedStatus] = useState(false)
  const [changedPayStatus, setChangedPayStatus] = useState(false)
  const [wantChangedStatus, setWantChangedStatus] = useState(false)
  const [wantChangedPayStatus, setWantChangedPayStatus] = useState(false)
  const [changeAutoid, setChangeAutoid] = useState()
  const [changeStatus, setChangeStatus] = useState()
  const [changePayAutoid, setChangePayAutoid] = useState()
  const [changePayStatus, setChangePayStatus] = useState()

  //for email to student
  const [memberInfo, setMemberInfo] = useState([])
  const [memberMbn, setMemberMbn] = useState()
  const [emailStudent, setEmailStudent] = useState()
  const [studentName, setStudentName] = useState()
  const [zip, setZip] = useState()
  const [pref, setPref] = useState()
  const [city, setCity] = useState()
  const [addr, setAddr] = useState()
  const [phone, setPhone] = useState()
  const [seriesName, setSeriesName] = useState()
  const [readingLevel, setReadingLevel] = useState()
  const [bookTitle, setBookTitle] = useState()
  const [bookPrice, setBookPrice] = useState()
  const [bookCommission, setBookCommission] = useState()

  //modal
  const [openModal, setOpenModal] = useState(false)
  const [mbnModal, setMbnModal] = useState()
  const [todayDate, setTodayDate] = useState(null)

  const [lessonInfo, setLessonInfo] = useState([])

  const [oshiraseInfo, setOshiraseInfo] = useState([])
  // const [lessonHistoryInfo, setLessonHistoryInfo] = useState(null)
  // console.log('query.tbn:', query.tbn)
  // console.log('tbn:', tbn)
  const [thisTbn, setThisTbn] = useState()
  const router = useRouter() //使い方：router.replace('/')
  const handleReload = () => {
    router.reload()
  }
  // let logOutID = () => {
  //   // setT_LoginStatus(false)
  //   localStorage.removeItem('T_token')
  //   localStorage.removeItem('T_loginStatus')
  //   localStorage.removeItem('T_email')
  //   localStorage.removeItem('tbn')
  //   router.push('/t_login')
  // }
  const [myTbn, setMyTbn] = useState()
  const date = new Date()

  useEffect(() => {
    if (router.isReady) {
      // var tbn = query.tbn
      // alert(tbn)
      const tbn = localStorage.getItem('tbn')
      // var tbn = router.query.tbn

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
    funcHurikaeLength()
  }, [])

  function funcHurikaeLength() {
    const tbn = localStorage.getItem('tbn')

    var url = DB_CONN_URL + '/select-hurikae-tbn-waiting-by-group/'
    var Url = url + tbn
    // alert(Url)
    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          if (response.data.status) {
            if (response.data.length > 0) {
              setMakeupTitle(
                'waiting reschedule reply' + ' [' + response.data.length + ']'
              )
            } else {
              setMakeupTitle('No request for rescheduling.')
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

  useEffect(() => {
    // var tbn = query.tbn
    // alert(tbn)
    const tbn = localStorage.getItem('tbn')
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

  //先生のレッスン履歴を見る

  const [lessonHistoryInfo, setLessonHistoryInfo] = useState([])

  const [shipmentInfo, setShipmentInfo] = useState([])

  useEffect(() => {
    // var status = 'Ordered'
    shipmentInfoFunc(shipmentStatus)
  }, [])

  function shipmentInfoReturn() {
    setWantChangedStatus(false)
    setWantChangedPayStatus(false)
    shipmentInfoFunc(shipmentStatus)
  }
  // function shipmentPayInfoReturn() {
  //   setWantChangedPayStatus(false)
  // }

  function shipmentStatusPayChangeFunc() {
    var status = changePayStatus
    var autoid = changePayAutoid
    alert(changePayStatus)
    alert(changePayAutoid)

    var Url =
      DB_CONN_URL + '/shipment-pay-change-status/' + status + '&' + autoid

    // alert(Url)
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        // alert(response.data.status)
        if (response.data.status) {
          setChangedPayStatus(true)
          setWantChangedPayStatus(false)
        } else {
          setWantChangedPayStatus(false)
        }
      } catch (error) {
        alert('error1')
      }
    }
    // howManyLessonComma()
    fetchData()
  }
  //shipment list を見せる
  function shipmentInfoFunc(status) {
    setShipmentStatus(status)
    // setWantChangedStatus(false)
    // alert(status)
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

    var shipmentDateStart = Y + '-' + M + '-' + '01'
    var shipmentDateStop = Y + '-' + M + '-' + '31'

    setSearchYearShipment(Y)
    setSearchMonthShipment(M)
    // setSearchDayShipment(D)
    //今の月の最初の日
    // console.log(shipmentDateStart)
    // console.log(shipmentDateStop)

    var Url = DB_CONN_URL + '/shipment-history/' + status

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        // alert(response.data.status)
        if (response.data.status) {
          if (response.data.length > 0) {
            // alert(response.data.message)
            setShipmentInfo(response.data.response)
          } else {
            // alert(response.data.message)
            setShipmentInfo([])
          }
        }
      } catch (error) {
        alert('error1')
      }
    }
    // howManyLessonComma()
    fetchData()
  }
  //shipment statusを変更
  function shipmentStatusChangeFunc() {
    var status = changeStatus
    var autoid = changeAutoid

    var Url = DB_CONN_URL + '/shipment-change-status/' + status + '&' + autoid

    // alert(Url)
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        // alert(response.data.status)
        if (response.data.status) {
          setChangedStatus(true)
          setWantChangedStatus(false)
          if (status == 'Shipped' || status == 'Reshipped') {
            sendingEmail(status)
          }
        } else {
          setWantChangedStatus(false)
        }
      } catch (error) {
        alert('error-shipment-change-status')
      }
    }
    // howManyLessonComma()
    fetchData()
  }
  function shipmentSearchDateFunc(status) {
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

    var lessonDateStart = Y + '-' + M + '-' + '01'
    var lessonDateStop = Y + '-' + M + '-' + '31'

    setSearchYear(Y)
    setSearchMonth(M)
    //今の月の最初の日
    // console.log(lessonDateStart)
    // console.log(lessonDateStop)
    const tbn = localStorage.getItem('tbn')

    var status = 'homework'

    var Url =
      DB_CONN_URL +
      '/shipment-search-by-datetime/' +
      tbn +
      '&' +
      status +
      '&' +
      lessonDateStart +
      '&' +
      lessonDateStop

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          // alert(response.data.message)
          if (response.data.length > 0) {
            setLessonHistoryInfo(response.data.response)
          } else {
            // alert(response.data.message)
            setLessonHistoryInfo([])
          }
        }
      } catch (error) {
        alert('error')
      }
    }
    howManyLessonComma()
    fetchData()
  }

  function memberInfoFunc(mbn) {
    var Url = DB_CONN_URL + '/member_info_mbn'
    // alert('memberMbn' + memberMbn)

    axios
      .post(Url, {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data.status) {
          // alert(response.data.message) //for test
        } else {
          setMemberInfo(response.data.response)
          setEmailStudent(response.data.response[0].email)
          // if (response.data.response[0].email_urgent1 != '') {
          //   setEmailUrgent(response.data.response[0].email_urgent1)
          // }
          setStudentName(response.data.response[0].name_eng)
          setZip(response.data.response[0].zip)

          setPref(response.data.response[0].pref)
          setCity(response.data.response[0].city)
          setAddr(response.data.response[0].addr)
          setPhone(response.data.response[0].mobilephone)
        }
      })
  }

  function sendingEmail(status) {
    //email to Admin, Admin2(Julia), Student
    var email_admin = 'ceo@edutainers.jp'
    // var email_bcc = 'ramakropolis2012@googlemail.com'
    // var email_admin2 = 'minjaekato@gmail.com'
    var email_student = emailStudent
    var name_eng = studentName
    var zipcode = zip
    var address = pref + city + ', ' + addr
    var tel = phone
    // var book_price = Number(bookPrice)

    const book_price = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(bookPrice)
    // var book_commission = bookCommission
    const book_commission = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(bookCommission)

    var total = parseInt(bookPrice) + parseInt(bookCommission)

    const totalPrice = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(total)

    //Shipped or Reshipped
    var MAIL_TEMPLATE_ID_To_Student = 'template_73wnway'

    //email to student
    var templateParams = {
      to_email: email_student,
      to_student_name: name_eng,
      reply_to: 'no-reply',
      from_name: 'engLib',
      zipcode: zipcode,
      address: address,
      tel: tel,
      seriesName: seriesName,
      readingLevel: readingLevel,
      bookTitle: bookTitle,
      price: book_price,
      commission: book_commission,
      total_price: totalPrice,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = MAIL_TEMPLATE_ID_To_Student
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text, email_student)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )

    //email to Admin
    var templateParams = {
      to_email: email_admin,
      to_student_name: name_eng,
      reply_to: 'no-reply',
      from_name: 'engLib',
      zipcode: zipcode,
      address: address,
      tel: tel,
      seriesName: seriesName,
      readingLevel: readingLevel,
      bookTitle: bookTitle,
      price: book_price,
      commission: book_commission,
      total_price: totalPrice,
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = MAIL_TEMPLATE_ID_To_Student
    var YOUR_USER_ID = 'user_6SxtrwiGOxzL2JpT8S4xM'
    emailjs.init(YOUR_USER_ID)
    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text, email_admin)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
  }

  //this month's lesson historyを defaultで見せる
  useEffect(() => {
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

    var lessonDateStart = Y + '-' + M + '-' + '01'
    var lessonDateStop = Y + '-' + M + '-' + '31'

    setSearchYear(Y)
    setSearchMonth(M)
    //今の月の最初の日
    // console.log(lessonDateStart)
    // console.log(lessonDateStop)
    const tbn = localStorage.getItem('tbn')

    var status = 'homework'

    var Url =
      DB_CONN_URL +
      '/tutor_lesson_history/' +
      tbn +
      '&' +
      status +
      '&' +
      lessonDateStart +
      '&' +
      lessonDateStop

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          // alert(response.data.message)
          if (response.data.length > 0) {
            setLessonHistoryInfo(response.data.response)
          } else {
            // alert(response.data.message)
            setLessonHistoryInfo([])
          }
        }
      } catch (error) {
        alert('error')
      }
    }
    howManyLessonComma()
    fetchData()
  }, [])

  //this month's lesson historyを defaultで見せる
  useEffect(() => {
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

    var lessonDateStart = Y + '-' + M + '-' + '01'
    var lessonDateStop = Y + '-' + M + '-' + '31'

    setSearchYear(Y)
    setSearchMonth(M)
    //今の月の最初の日
    // console.log(lessonDateStart)
    // console.log(lessonDateStop)
    const tbn = localStorage.getItem('tbn')

    var status = 'homework'

    var Url =
      DB_CONN_URL +
      '/tutor_lesson_history/' +
      tbn +
      '&' +
      status +
      '&' +
      lessonDateStart +
      '&' +
      lessonDateStop

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        if (!response.data.status) {
          alert(response.data.message) //for test
        } else {
          // alert(response.data.message)
          if (response.data.length > 0) {
            setLessonHistoryInfo(response.data.response)
          } else {
            // alert(response.data.message)
            setLessonHistoryInfo([])
          }
        }
      } catch (error) {
        alert('error')
      }
    }
    howManyLessonComma()
    fetchData()
  }, [])

  function tutor_lesson_history(lessonYear, lessonMonth) {
    // var tbn = query.tbn
    // alert(tbn)

    var lessonDateStart = lessonYear + '-' + lessonMonth + '-' + '01'
    var lessonDateStop = lessonYear + '-' + lessonMonth + '-' + '31'

    const tbn = localStorage.getItem('tbn')
    // alert('tbn' + tbn)
    var status = 'homework'

    var Url =
      DB_CONN_URL +
      '/tutor_lesson_history/' +
      tbn +
      '&' +
      status +
      '&' +
      lessonDateStart +
      '&' +
      lessonDateStop

    // console.log('Url', Url)
    axios.get(Url).then((response) => {
      //errorの場合

      if (!response.data.status) {
        alert(response.data.message) //for test
      } else {
        if (response.data.length > 0) {
          setLessonHistoryInfo(response.data.response)
        } else {
          // alert(response.data.message)
          setLessonHistoryInfo([])
        }
      }
    })
  }

  function howManyLessonComma() {
    var totalTime = parseInt(0)

    lessonHistoryInfo?.map((val, key) => {
      if (!lessonComa) {
        var lessonComa = parseInt(1)
        console.log('test1', val.duringTime)
      }
      lessonComa = parseInt(lessonComa) + 1
      if (val.duringTime == 50) {
        lessonComa = parseInt(lessonComa) + 2
        console.log('test2', val.duringTime)
      }
      // if (!totalTime) {
      //   var totalTime = parseInt(0)
      // }
      // totalTime = parseInt(totalTime) + parseInt(val.duringTime)

      console.log('lessonComa:', lessonComa)
      console.log('lessonTotalTime:', totalTime)
      setSearchDateLessonComa(lessonComa)
    })
  }

  function getWeekday(date) {
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']
    const dayIndex = date.getDay()
    return weekdays[dayIndex]
  }

  function modifySet(yoyakuDate, yoyakuTime) {
    // setModifyDateView(!modifyDateView)
    // setModifyAutoid(autoid)
    // alert('here')
    // setModifyDateView(!modifyDateView)
    // get weekday
    var changeWeekday = new Date(yoyakuDate)
    changeWeekday = getWeekday(changeWeekday)

    setChanged_yoyakuDate(
      moment(setChangedRegDate(yoyakuDate)).format('YYYY-MM-DD')
    )
    setChanged_yoyakuTime(moment(yoyakuTime).format('HH:mm'))
    setChanged_yoyakuWeekday(changeWeekday)
  }

  //予約日付を変更する
  function changeLessonDate_temp(
    yoyakuDate,
    yoyakuWeekday,
    changeDate,
    dateTimeChangeMemo
  ) {
    // get weekday
    var changeWeekday = new Date(changeDate)
    changeWeekday = getWeekday(changeWeekday)

    setChangedRegDate(changeDate)
    setChanged_yoyakuDate(moment(changeDate).format('YYYY-MM-DD'))
    // setChanged_yoyakuTime(yoyakuTime)

    setChanged_yoyakuWeekday(yoyakuWeekday)
    setChanged_dateTimeChangeMemo(dateTimeChangeMemo)
    setChanged_yoyakuWeekday(changeWeekday)

    console.log('yoyakuDate: ', yoyakuDate)
    console.log('yoyakuWeekday: ', yoyakuWeekday)
    console.log('changeDate: ', changeDate)
    console.log('changeWeekday: ', changeWeekday)
    // console.log(
    //   'changeWeekday: ',
    //   moment(changeWeekday).format('ddd').toUpperCase()
    // )

    console.log('dateTimeChangeMemo: ', dateTimeChangeMemo)
    // console.log('setChangedRegDate: ', changedRegDate)

    // '/change-temporary-lesson-datetime/:mbn&:tbn&:tname&:homework_id&:yoyakuDate&:yoyakuWeekday&:changeDate&:changeWeekday&:newChangeMemo',
  }
  function changeLessonTime_temp(changeTime, dateTimeChangeMemo) {
    setChangedRegTime(changeTime)
    setChanged_yoyakuTime(moment(changeTime).format('HH:mm'))
    setChanged_dateTimeChangeMemo(dateTimeChangeMemo)
    // console.log('changeTime: ', changeTime)
    // console.log('dateTimeChangeMemo: ', dateTimeChangeMemo)
    // console.log('Selected Time:', changeTime && changeTime.format('HH:mm'))
  }
  //For tab end

  function changeLessonDateTime(
    mbn,
    tbn,
    tname,
    homework_id,
    beforeYoyakuDate,
    beforeYoyakuTime,
    beforeYoyakuWeekday,
    dateTimeChangeMemo
  ) {
    if (changed_yoyakuDate == null || changed_yoyakuDate == '') {
      //yoyakuDateが変更されてない場合

      var new_yoyakuDate = moment().format('YYYY-MM-DD')
      // console.log('######11111111####', new_yoyakuDate)
    } else {
      var new_yoyakuDate = changed_yoyakuDate
      // console.log('######222222222####', new_yoyakuDate)
    }
    if (changed_yoyakuTime == null || changed_yoyakuTime == '') {
      //yoyakuTimeが変更されてない場合
      alert('Please select the time you want to change.')
      return false
      // var new_yoyakuTime = moment().format('HH:mm')
    } else {
      var new_yoyakuTime = changed_yoyakuTime
    }

    if (changed_yoyakuWeekday == null) {
      //Dateが変わってない場合
      var new_changeWeekday = new Date()
      new_changeWeekday = getWeekday(new_changeWeekday)
    } else {
      var new_changeWeekday = changed_yoyakuWeekday
    }

    if (changed_dateTimeChangeMemo == '') {
      setChanged_dateTimeChangeMemo('&nbsp;')
    } else {
      var dateTimeChangeMemo = changed_dateTimeChangeMemo
    }

    // console.log('last-mbn', mbn)
    // console.log('last-tbn', tbn)
    // console.log('last-tname', tname)
    // console.log('last-homework_id', homework_id)
    // console.log('last-beforeYoyakuDate', beforeYoyakuDate)
    // console.log('last-beforeYoyakuTime', beforeYoyakuTime)
    // console.log('last-beforeYoyakuWeekday', beforeYoyakuWeekday)
    // console.log('last-new_yoyakuDate', new_yoyakuDate)
    // console.log('last-new_yoyakuTime', new_yoyakuTime)
    // console.log('last-new_changeWeekday', new_changeWeekday)
    // console.log('last-dateTimeChangeMemo', dateTimeChangeMemo)

    var url = DB_CONN_URL + '/change-temporary-lesson-datetime/'

    console.log('1')
    axios
      .put(
        url +
          mbn +
          '&' +
          tbn +
          '&' +
          tname +
          '&' +
          homework_id +
          '&' +
          beforeYoyakuDate +
          '&' +
          beforeYoyakuTime +
          '&' +
          beforeYoyakuWeekday +
          '&' +
          new_yoyakuDate +
          '&' +
          new_yoyakuTime +
          '&' +
          new_changeWeekday
        // +
        // '&' +
        // dateTimeChangeMemo
      )
      .then((response) => {
        console.log('2')
        alert(response.data.message)
        setChangedRegDate(new Date())
        setChangedRegTime(moment())
        setChanged_dateTimeChangeMemo(null)
        setChanged_homework_id(null)
        setChanged_mbn(null)
        setChanged_tbn(null)
        setChanged_tname(null)
        setChanged_yoyakuDate(null)
        setChanged_yoyakuTime(null)
        setChanged_yoyakuWeekday(null)
        handleReload()
      })
  }

  const [tutorInfo, setTutorInfo] = useState([])
  function handleGetTutorList() {
    var tbn = localStorage.getItem('tbn')

    axios
      .post(DB_CONN_URL + '/tutor_all_info_tbn', {
        tbn: tbn,
      })
      .then((response) => {
        //errorの場合
        // if (!response.data.status) {
        //   alert(response.data.message) //for test
        // } else {
        setTutorInfo(response.data)

        console.log('tutorInfo', response.data)
        // }
      })
  }

  function changeTutor(
    mbn,
    tbn,
    tname,
    homework_id,
    beforeYoyakuDate,
    beforeYoyakuTime,
    beforeYoyakuWeekday,
    dateTimeChangeMemo
  ) {
    if (changed_yoyakuDate == null || changed_yoyakuDate == '') {
      //yoyakuDateが変更されてない場合

      var new_yoyakuDate = moment().format('YYYY-MM-DD')
      // console.log('######11111111####', new_yoyakuDate)
    } else {
      var new_yoyakuDate = changed_yoyakuDate
      // console.log('######222222222####', new_yoyakuDate)
    }
    if (changed_yoyakuTime == null || changed_yoyakuTime == '') {
      //yoyakuTimeが変更されてない場合
      alert('Please select the time you want to change.')
      return false
      // var new_yoyakuTime = moment().format('HH:mm')
    } else {
      var new_yoyakuTime = changed_yoyakuTime
    }

    if (changed_yoyakuWeekday == null) {
      //Dateが変わってない場合
      var new_changeWeekday = new Date()
      new_changeWeekday = getWeekday(new_changeWeekday)
    } else {
      var new_changeWeekday = changed_yoyakuWeekday
    }

    if (changed_dateTimeChangeMemo == '') {
      setChanged_dateTimeChangeMemo('&nbsp;')
    } else {
      var dateTimeChangeMemo = changed_dateTimeChangeMemo
    }

    // console.log('last-mbn', mbn)
    // console.log('last-tbn', tbn)
    // console.log('last-tname', tname)
    // console.log('last-homework_id', homework_id)
    // console.log('last-beforeYoyakuDate', beforeYoyakuDate)
    // console.log('last-beforeYoyakuTime', beforeYoyakuTime)
    // console.log('last-beforeYoyakuWeekday', beforeYoyakuWeekday)
    // console.log('last-new_yoyakuDate', new_yoyakuDate)
    // console.log('last-new_yoyakuTime', new_yoyakuTime)
    // console.log('last-new_changeWeekday', new_changeWeekday)
    // console.log('last-dateTimeChangeMemo', dateTimeChangeMemo)

    var url = DB_CONN_URL + '/change-temporary-lesson-datetime/'

    console.log('1')
    axios
      .put(
        url +
          mbn +
          '&' +
          tbn +
          '&' +
          tname +
          '&' +
          homework_id +
          '&' +
          beforeYoyakuDate +
          '&' +
          beforeYoyakuTime +
          '&' +
          beforeYoyakuWeekday +
          '&' +
          new_yoyakuDate +
          '&' +
          new_yoyakuTime +
          '&' +
          new_changeWeekday
        // +
        // '&' +
        // dateTimeChangeMemo
      )
      .then((response) => {
        console.log('2')
        alert(response.data.message)
        setChangedRegDate(new Date())
        setChangedRegTime(moment())
        setChanged_dateTimeChangeMemo(null)
        setChanged_homework_id(null)
        setChanged_mbn(null)
        setChanged_tbn(null)
        setChanged_tname(null)
        setChanged_yoyakuDate(null)
        setChanged_yoyakuTime(null)
        setChanged_yoyakuWeekday(null)
        handleReload()
      })
  }
  return (
    <React.Fragment>
      <NavbarEnglib_Tutor />

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
                    <Tab label="My Lesson" value="1" />
                    {/* <Tab label="Makeup Lesson" value="3" /> */}
                    <Tab
                      label={makeupTitle && makeupTitle}
                      value="3"
                      style={{ color: 'red' }}
                      onClick={reloadComponent}
                    />

                    <Tab label="Lesson History" value="4" />
                    {thisTbn == '220611498262' && (
                      <Tab
                        label="Shipment List"
                        value="5"
                        onClick={(e) => {
                          shipmentInfoFunc('Ordered')
                        }}
                      />
                    )}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 ,mb-2 pl-3">
                      {/* <select
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
                      </select> */}
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2">
                      <input
                        className="form-control-md mb-2"
                        style={{ width: '100%' }}
                        ref={inputRef}
                        type="text"
                        placeholder="Name Search...."
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
                            var st_type = val.showandtell_type
                            // panel/showandtell?m=2022050100009&cN=undefined&tbn=201114875053&homework_id=CourseST_2022050100009_2022061360640
                            var pageName = myfun_getLessonPageMoreDetail(
                              c,
                              cn,
                              st_type
                            )
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

                            var defaultYoyakuTime = moment(
                              val.yoyakuTime,
                              'HH:mm'
                            )
                            var defaultYoyakuDate = moment(
                              val.yoyakuDate,
                              'YYYY-mm-dd'
                            )
                            var login_level =
                              localStorage.getItem('T_login_level')

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
                                  <a
                                    className="btn-sm btn-primary text-white ml-2"
                                    onClick={() => {
                                      setModifyDateView(!modifyDateView)
                                      setModifyAutoid(val.autoid)

                                      // modifySet(val.yoyakuDate, val.yoyakuTime)
                                    }}
                                  >
                                    m
                                  </a>
                                  {(login_level == '1' ||
                                    login_level == '2') && (
                                    <a
                                      className="btn-sm btn-primary text-white ml-2"
                                      onClick={() => {
                                        setModifyTutorView(!modifyTutorView)
                                        setModifyTutorAutoid(val.autoid)
                                        setModifyTutorTbn()
                                        handleGetTutorList()
                                        // modifySet(val.yoyakuDate, val.yoyakuTime)
                                      }}
                                    >
                                      tutor
                                    </a>
                                  )}

                                  {val.autoid == modifyTutorAutoid &&
                                    modifyTutorView == true && (
                                      <>
                                        <hr
                                          style={{
                                            marginTop: 5,
                                            marginBottom: 5,
                                          }}
                                        />
                                        {/* {modifyTutorTbn} */}
                                        <select
                                          onChange={(e) => {
                                            setModifyTutorTbn(e.target.value)
                                          }}
                                        >
                                          <option>Select a tutor</option>
                                          {tutorInfo &&
                                            tutorInfo?.map((val, key) => {
                                              return (
                                                <>
                                                  <option
                                                    value={
                                                      val.teacher_barcode_num
                                                    }
                                                  >
                                                    {val.first_name}&nbsp;
                                                    {val.last_name}
                                                  </option>
                                                </>
                                              )
                                            })}
                                        </select>
                                        <a
                                          className="btn-sm btn-danger text-white"
                                          onClick={() => {
                                            changeLessonDateTime(
                                              val.member_barcode_num,
                                              val.teacher_barcode_num,
                                              val.teacher_name,
                                              val.homework_id,
                                              val.yoyakuDate,
                                              val.yoyakuTime,
                                              val.yoyakuWeekday,
                                              val.dateTimeChangeMemo
                                            )
                                          }}
                                        >
                                          change
                                        </a>
                                      </>
                                    )}
                                  {modifyDateView == true &&
                                  val.autoid == modifyAutoid ? (
                                    <>
                                      <hr
                                        style={{
                                          marginTop: 5,
                                          marginBottom: 5,
                                        }}
                                      />
                                      <DatePicker
                                        className="form-control text-black mb-1"
                                        portalId="root-portal"
                                        // selected={changedRegDate}
                                        dateFormat="yyyy-MM-dd"
                                        selected={
                                          changedRegDate == null ||
                                          changedRegDate == ''
                                            ? new Date(val.yoyakuDate)
                                            : new Date(changedRegDate)
                                        }
                                        onChange={(date) =>
                                          changeLessonDate_temp(
                                            val.yoyakuDate,
                                            val.yoyakuWeekday,
                                            date,
                                            val.dateTimeChangeMemo
                                          )
                                        }
                                        style={{
                                          width: '50px',
                                          height: '30px',
                                        }}
                                        // disabled={
                                        //   val.yoyakuDate == null
                                        //     ? 'disabled'
                                        //     : ''
                                        // }
                                        // minDate={new Date()}
                                        // maxDate={new Date(moment().add(1, 'months'))} //最大3ヶ月後のスケジュール
                                        // maxDate={new Date(moment().add(2, 'weeks'))} //最大2週間後のスケジュール
                                        // maxDate={new Date(moment().add(2, 'day'))} //最大2日後のスケジュール
                                        // maxDate={
                                        //   new Date(
                                        //     moment(val.yoyakuDate).add(
                                        //       1,
                                        //       'months'
                                        //     )
                                        //   )
                                        // }
                                        //最大10日後のスケジュール
                                        // filterDate={(date) =>
                                        //   date.getDay() != 6 && date.getDay() != 0
                                        // } //土日はSelectできないようにする
                                      />
                                      <TimePicker
                                        // value={changedRegTime}
                                        // value={
                                        //   defaultYoyakuTime && defaultYoyakuTime
                                        // }

                                        showSecond={false}
                                        format="HH:mm"
                                        minuteStep={30}
                                        onChange={(value) =>
                                          changeLessonTime_temp(
                                            // val.member_barcode_num,
                                            // val.teacher_barcode_num,
                                            // val.teacher_name,
                                            // val.homework_id,
                                            value,
                                            val.dateTimeChangeMemo
                                          )
                                        }
                                        style={{
                                          backgroundColor: 'white',
                                          color: 'gray',
                                          fontSize: '20px',
                                          width: '60px',
                                          marginRight: '10px',
                                          border: '1px solid gray',
                                          borderRadius: '5px',
                                        }}
                                      />

                                      <a
                                        className="btn-sm btn-danger text-white"
                                        onClick={() => {
                                          changeLessonDateTime(
                                            val.member_barcode_num,
                                            val.teacher_barcode_num,
                                            val.teacher_name,
                                            val.homework_id,
                                            val.yoyakuDate,
                                            val.yoyakuTime,
                                            val.yoyakuWeekday,
                                            val.dateTimeChangeMemo
                                          )
                                        }}
                                      >
                                        change
                                      </a>
                                    </>
                                  ) : (
                                    <></>
                                  )}
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
                  <HurikaeAlertInTutorPage key={key} />
                </TabPanel>
                <TabPanel value="4">
                  <label>Year&nbsp;&nbsp;</label>
                  <select
                    onChange={(e) => {
                      setSearchYear(e.target.value)
                    }}
                  >
                    <option
                      value="2024"
                      selected={searchYear == '2024' && 'selected'}
                    >
                      2024
                    </option>
                    <option
                      value="2025"
                      selected={searchYear == '2025' && 'selected'}
                    >
                      2025
                    </option>
                    <option
                      value="2026"
                      selected={searchYear == '2026' && 'selected'}
                    >
                      2026
                    </option>
                  </select>
                  {/* {searchYear} */}&nbsp;&nbsp;
                  <label>Month&nbsp;&nbsp;</label>
                  <select
                    onChange={(e) => {
                      setSearchMonth(e.target.value)
                    }}
                  >
                    <option
                      value="01"
                      selected={searchMonth == '01' && 'selected'}
                    >
                      Jan
                    </option>
                    <option
                      value="02"
                      selected={searchMonth == '02' && 'selected'}
                    >
                      Feb
                    </option>
                    <option
                      value="03"
                      selected={searchMonth == '03' && 'selected'}
                    >
                      March
                    </option>
                    <option
                      value="04"
                      selected={searchMonth == '04' && 'selected'}
                    >
                      April
                    </option>
                    <option
                      value="05"
                      selected={searchMonth == '05' && 'selected'}
                    >
                      May
                    </option>
                    <option
                      value="06"
                      selected={searchMonth == '06' && 'selected'}
                    >
                      June
                    </option>
                    <option
                      value="07"
                      selected={searchMonth == '07' && 'selected'}
                    >
                      July
                    </option>
                    <option
                      value="08"
                      selected={searchMonth == '08' && 'selected'}
                    >
                      Aug
                    </option>
                    <option
                      value="09"
                      selected={searchMonth == '09' && 'selected'}
                    >
                      Sep
                    </option>
                    <option
                      value="10"
                      selected={searchMonth == '10' && 'selected'}
                    >
                      Oct
                    </option>
                    <option
                      value="11"
                      selected={searchMonth == '11' && 'selected'}
                    >
                      Nov
                    </option>
                    <option
                      value="12"
                      selected={searchMonth == '12' && 'selected'}
                    >
                      Dec
                    </option>
                  </select>{' '}
                  {/* {searchMonth} */}
                  <span
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      tutor_lesson_history(searchYear, searchMonth)
                      howManyLessonComma()
                    }}
                  >
                    Get Data
                  </span>
                  <br />
                  {/* <h6>
                    Lesson data : {searchYear},{searchMonth}
                  </h6> */}
                  <p>
                    Total Class{lessonHistoryInfo.length} &nbsp;&nbsp; 25 min *{' '}
                  </p>
                  <p>Total Coma：{searchDateLessonComa}</p>
                  <table className="table table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Lesson Date</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Run-time(min)</th>
                        <th>
                          Class
                          <p style={{ fontSize: '12px', color: 'yellow' }}>
                            1 Calss = 25 minuts
                          </p>
                        </th>

                        <th>
                          Extend{' '}
                          <p style={{ fontSize: '12px', color: 'yellow' }}>
                            finish time
                          </p>
                        </th>

                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessonHistoryInfo
                        // .filter((val) => {
                        //   //test
                        //   if (searchYear == '' || searchYear == null) {
                        //     var searchYear = '2023'
                        //   }
                        //   if (searchMonth == '' || searchMonth == null) {
                        //     var searchMonth = '01'
                        //   }

                        //   var searchDate = searchYear + '-' + searchMonth

                        //   if (searchYear == '' && searchMonth == '') {
                        //     return val //everything data
                        //   } else if (
                        //     val.yoyakuDate
                        //       .toLowerCase()
                        //       .includes(searchDate.toLowerCase())
                        //   ) {
                        //     return val
                        //   }
                        // })

                        ?.map((val, key) => {
                          var lessonComa
                          if (val.duringTime == '25') {
                            lessonComa = 1
                          } else if (val.duringTime == '50') {
                            lessonComa = 2
                          }

                          return (
                            <>
                              <tr>
                                <td>
                                  {' '}
                                  <span
                                    className="mr-2"
                                    style={{ color: 'red', fontSize: '15px' }}
                                  >
                                    &nbsp;[{val.yoyakuDate}]&nbsp;
                                  </span>
                                  <br />
                                  <span
                                    className="ml-2"
                                    style={{ color: 'blue', fontSize: '12px' }}
                                  >
                                    {val.yoyakuWeekday}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className="mr-2"
                                    style={{
                                      color: 'blue',
                                      fontSize: '15px',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    {val.teacher_name}
                                  </span>
                                  <br />
                                  <span
                                    className="mr-2"
                                    style={{
                                      color: 'green',
                                      fontSize: '15px',
                                    }}
                                  >
                                    [{val.name_eng}]
                                  </span>
                                </td>

                                <td>{val.subject}</td>
                                <td>{val.duringTime}</td>
                                <td>{lessonComa} コマ</td>
                                <td>
                                  {val.extended_min_difference ? (
                                    <>
                                      {val.extended_min_difference} min
                                      <br />
                                      <span
                                        className="ml-2"
                                        style={{
                                          color: 'green',
                                          fontSize: '12px',
                                        }}
                                      >
                                        {val.extended_memo}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span style={{ color: 'gray' }}>N/A</span>
                                    </>
                                  )}
                                </td>
                              </tr>
                            </>
                          )
                        })}
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel value="5">
                  <p>
                    search by status :{' '}
                    <select
                      onChange={(e) => {
                        setShipmentStatus(e.target.value)
                        shipmentInfoFunc(e.target.value)
                      }}
                    >
                      <option
                        value="Ordered"
                        selected={shipmentStatus == 'Ordered' && 'selected'}
                      >
                        Ordered
                      </option>
                      <option
                        value="Seal Issued"
                        selected={shipmentStatus == 'Seal Issued' && 'selected'}
                      >
                        Seal Issued
                      </option>
                      <option
                        value="Shipped"
                        selected={shipmentStatus == 'Shipped' && 'selected'}
                      >
                        Shipped
                      </option>
                      <option
                        value="Arrived"
                        selected={shipmentStatus == 'Arrived' && 'selected'}
                      >
                        Arrived
                      </option>
                      <option
                        value="Returned"
                        selected={shipmentStatus == 'Returned' && 'selected'}
                      >
                        Returned
                      </option>
                      <option
                        value="Reshipped"
                        selected={shipmentStatus == 'Reshipped' && 'selected'}
                      >
                        Reshipped
                      </option>
                    </select>{' '}
                    {/* <span
                      style={{ marginLeft: '200px' }}
                      className="btn btn-danger ml-2 "
                      onClick={handleReload}
                    >
                      Reload Page
                    </span> */}
                  </p>
                  <p>Total: {shipmentInfo.length}&nbsp;[most recent order] </p>
                  <table className="table table table-bordered">
                    <thead className="table-primary">
                      <tr>
                        <th
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }}
                        >
                          listnum
                          <br />
                          [uniquenum]
                        </th>
                        <th
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }}
                        >
                          Current Status
                        </th>
                        <th
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }}
                        >
                          Student
                        </th>
                        <th
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }}
                        >
                          Series
                        </th>
                        <th
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }}
                        >
                          Level
                        </th>
                        <th
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }}
                        >
                          BookTitle
                        </th>

                        <th
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }}
                        >
                          Student Payment
                          <br />
                          <span style={{ color: 'red' }}>don't change</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipmentInfo?.map((val, key) => {
                        var counting = key + 1

                        if (val.bookNum != '') {
                          var fileImgLink =
                            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/bookImg/' +
                            val.seriesName +
                            '/' +
                            val.readingLevel +
                            '_' +
                            val.bookNum +
                            '_Cover.png'
                        } else {
                          var fileImgLink =
                            'https://englib-materials.s3.ap-northeast-1.amazonaws.com/bookImg/' +
                            val.seriesName +
                            '/' +
                            val.readingLevel +
                            '_Cover.png'
                        }

                        return (
                          <>
                            <tr>
                              <td
                                rowSpan="2"
                                style={{
                                  width: '50px',
                                  verticalAlign: 'middle',
                                  textAlign: 'center',
                                  backgroundColor: '#dedede',
                                  borderBottom: 'solid darkgray 10px',
                                }}
                              >
                                <b>{counting}</b>
                                <br />[{val.autoid}]
                              </td>
                              <td style={{ width: '20%' }}>
                                {/* mbn:{val.member_barcode_num} */}
                                <select
                                  onChange={(e) => {
                                    // setShipmentStatus(e.target.value)
                                    // shipmentInfoChange(e.target.value)
                                    setChangeAutoid(val.autoid)
                                    setChangeStatus(e.target.value)
                                    setWantChangedStatus(true)
                                    setBookPrice(val.price)
                                    setBookCommission(val.commission)
                                    setSeriesName(val.seriesName)
                                    setReadingLevel(val.readingLevel)
                                    setBookTitle(val.bookTitle)
                                    memberInfoFunc(val.member_barcode_num)
                                    // sendingEmail(val.value)
                                  }}
                                  style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                    fontSize: '20px',
                                  }}
                                >
                                  <option
                                    value="Ordered"
                                    selected={
                                      shipmentStatus == 'Ordered' && 'selected'
                                    }
                                  >
                                    Ordered
                                  </option>
                                  <option
                                    value="Seal Issued"
                                    selected={
                                      shipmentStatus == 'Seal Issued' &&
                                      'selected'
                                    }
                                  >
                                    Seal Issued
                                  </option>
                                  <option
                                    value="Shipped"
                                    selected={
                                      shipmentStatus == 'Shipped' && 'selected'
                                    }
                                  >
                                    Shipped
                                  </option>
                                  <option
                                    value="Arrived"
                                    selected={
                                      shipmentStatus == 'Arrived' && 'selected'
                                    }
                                  >
                                    Arrived
                                  </option>
                                  <option
                                    value="Returned"
                                    selected={
                                      shipmentStatus == 'Returned' && 'selected'
                                    }
                                  >
                                    Returned
                                  </option>
                                  <option
                                    value="Reshipped"
                                    selected={
                                      shipmentStatus == 'Reshipped' &&
                                      'selected'
                                    }
                                  >
                                    Reshipped
                                  </option>
                                </select>
                                <span style={{ fontSize: '10px' }}>
                                  &nbsp; &larr;change
                                </span>
                                {val.orderedDate != '' && (
                                  <>
                                    <br />
                                    <b>ordered:</b>&nbsp;
                                    {val.orderedDate}
                                  </>
                                )}
                                {val.sealedDate != '' && (
                                  <>
                                    <br />
                                    <b>seal Issued:</b>&nbsp;
                                    {val.sealedDate}
                                  </>
                                )}
                                {val.shippedDate != '' && (
                                  <>
                                    <br />
                                    <b>shipped:</b>&nbsp;
                                    {val.shippedDate}
                                  </>
                                )}
                                {val.arrivedDate != '' && (
                                  <>
                                    <br />
                                    <b>arrived:</b>&nbsp;
                                    {val.arrivedDate}
                                  </>
                                )}
                                {val.returnedDate != '' && (
                                  <>
                                    <br />
                                    <b>returned</b>&nbsp;
                                    {val.returnedDate}
                                  </>
                                )}
                                {val.reshippedDate != '' && (
                                  <>
                                    <br />
                                    <b>reshipped:</b>&nbsp;
                                    {val.reshippedDate}
                                  </>
                                )}
                              </td>

                              <td>{val.name_eng}</td>

                              <td>{val.seriesName}</td>
                              <td>{val.readingLevel}</td>
                              <td>
                                {val.bookTitle}
                                <br />
                                <img
                                  src={fileImgLink}
                                  width="120px"
                                  height="auto"
                                  style={{ border: 'solid black 1px' }}
                                />
                              </td>

                              <td>
                                {/* <span
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'red',
                                      fontSize: '20px',
                                    }}
                                  >
                                    {val.pay_status}
                                  </span> */}
                                {val.price} + {val.commission}
                                <select
                                  onChange={(e) => {
                                    setShipmentPayStatus(e.target.value)
                                    setChangePayAutoid(val.autoid)
                                    setChangePayStatus(e.target.value)
                                    setWantChangedPayStatus(true)
                                  }}
                                  style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                    fontSize: '20px',
                                  }}
                                >
                                  <option
                                    value="not paid"
                                    selected={
                                      val.pay_status == 'not paid' && 'selected'
                                    }
                                  >
                                    not paid
                                  </option>
                                  <option
                                    value="paid"
                                    selected={
                                      val.pay_status == 'paid' && 'selected'
                                    }
                                  >
                                    paid
                                  </option>
                                  <option
                                    value="COMPANY"
                                    selected={
                                      val.pay_status == 'COMPANY' && 'selected'
                                    }
                                  >
                                    COMPANY
                                  </option>
                                </select>{' '}
                                {val.pay_status == 'paid' && (
                                  <>
                                    <br />
                                    {val.paidDate}&nbsp;{val.paidTime}
                                  </>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan="8"
                                style={{
                                  // backgroundColor: '#dedede',
                                  borderBottom: 'solid darkgray 10px',
                                }}
                              >
                                <b>{val.name_eng}</b>
                                <br />
                                {val.zip}
                                &nbsp;&nbsp;
                                {val.pref} {val.city},&nbsp; {val.addr}
                                <br />
                                TEL:{val.phone}
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          {/* //tabend */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Upcoming
