import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment-timezone'
import 'react-datepicker/dist/react-datepicker.css'
import { formatToTimeZone } from 'date-fns-timezone'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import axios from 'axios'
import { ImportantDevices, Today } from '@material-ui/icons'
import { map } from 'next-pwa/cache'
import { beforeToday } from './dayStyles'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
//import ResidentCountrySelectorAuto from './ResidentCountrySelectorAuto'
function MemberMakeupSchedule() {
  const [scheduleColor, setScheduleColor] = useState('#fff')
  // console.log('scheduleColor:', scheduleColor)
  const [startTime, setStartTime] = useState('12:00')
  const [endTime, setEndTime] = useState('12:30')
  // console.log('startTime:', startTime)
  // console.log('endTime:', endTime)
  const format = 'h:mm a'
  const now = moment().hour(0).minute(0)

  // function endTimeSelector(endTime) {
  //   // endTimeの設定がstartTimeの設定によって自動で変動する START
  //   const defaultEndTime = endTime.split(' ')
  //   let defaultEndTime2 = defaultEndTime[0].split(':')

  //   if (defaultEndTime[1] == 'am') {
  //   } else if (defaultEndTime[1] == 'pm') {
  //     if (defaultEndTime2[0] !== 12) {
  //       defaultEndTime2[0] = parseInt(defaultEndTime2[0]) + 12
  //     }
  //   }
  //   let defaultEndTime3 = moment()
  //     .hour(defaultEndTime2[0])
  //     .minute(defaultEndTime2[1])

  //   return defaultEndTime3
  //   // endTimeの設定がstartTimeの設定によって自動で変動する END
  // }

  const [dailyRepeatType, setDailyRepeatType] = useState('')
  const [weeklyRepeatType, setWeeklyRepeatType] = useState('')
  const [monthlyRepeatRadioType, setMonthlyRepeatRadioType] = useState('') //曜日で設定：yobi,日付で設定:hizuke
  const [monthlyRepeatTypeYobiOrder, setMonthlyRepeatTypeYobiOrder] =
    useState('') //1st, 2nd ~ 4th
  const [monthlyRepeatTypeYobiDay, setMonthlyRepeatTypeYobiDay] = useState('') //mon~sun
  const [monthlyRepeatTypeHizukeDate, setMonthlyRepeatTypeHizukeDate] =
    useState('') //1~31

  function repeatValue(value) {
    if (value == 'monthly') {
      setRepeatType('monthly')
      setScheduleColor('#D9E3F0')
    } else if (value == 'weekly') {
      setRepeatType('weekly')
      setScheduleColor('#697689')
    } else if (value == 'daily') {
      setRepeatType('daily')
      setScheduleColor('#555555')
    } else if (value == 'no') {
      setRepeatType('no')
      setScheduleColor('#ba68c8')
    }
    console.log('repeatValue:', value)
  }

  //how to convert time to users timezone in react
  const dateToTime = (date) =>
    date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    })

  // const TutorDateString = '2021-09-05T10:30:00Z'
  // const MemberDate = new Date()
  // const MemberOffset = new Date().getTimezoneOffset() * 60 * 1000
  // const TutorLocalDate = new Date(TutorDateString)
  // const utcDate = new Date(TutorLocalDate.getTime() + MemberOffset)
  // console.log('*MemberDate: ', MemberDate) //Tue Sep 28 2021 10:27:18 GMT+0900 (Japan Standard Time)
  // console.log('*MemberOffset: ', MemberOffset)
  // console.log('*TutorLocalDate: ', TutorLocalDate) //Sun Sep 05 2021 19:30:00 GMT+0900 (Japan Standard Time)
  // console.log('*utcDate: ', utcDate)
  // console.log(
  //   `${dateToTime(utcDate)} (${dateToTime(TutorLocalDate)} Your Time)`
  // )

  //npm i countries-and-timezones
  //TEST
  //const ct = require('countries-and-timezones')
  // const getTimezone = ct.getTimezone('America/Los_Angeles')
  // console.log('*getTimezone:', getTimezone)

  // console.log('*getAllCountryList: ', getAllCountryList)
  // console.log('*country.timezones: ', country.timezones)

  // const getAllTimezones = ct.getAllTimezones()
  // console.log('*getAlltimezones:', getAllTimezones)

  // const getTimezonesForCountry = ct.getTimezonesForCountry('FR')
  // console.log('*getTimezonesForCountry: ', getTimezonesForCountry)

  // //node js get time in timezone

  // //utc to local time javascript
  // var UTCDate = '6/29/2011 4:52:48 PM'
  // var localDateTest = new Date(UTCDate + ' UTC')
  // console.log('*utc to local time javascript: ', localDateTest)

  // //javascript convert utc to local time
  // var d = new Date(
  //   '2020-04-13T00:00:00.000+08:00'
  // ) /* midnight in China on April 13th */
  // var d2 = new Date() //Japan now
  // var utcToLocalTime = d2.toLocaleString('en-US', {
  //   timeZone: 'Europe/Paris',
  // })
  // console.log('*japan Time: ', d2)
  // console.log('*utcToLocalTime: ', utcToLocalTime)

  //timestamps to timeZone
  // let ts = 1581338765000 //timestamps
  // let nz_date_string = new Date(ts).toLocaleString('en-US', {
  //   timeZone: 'Europe/Paris',
  // })
  // console.log('*timestamps to timezone: ', nz_date_string)
  // var value = Date.parse('2002/01/01 12:34:56')
  // console.log('value: ', value)

  //Get Specific Country datetime
  // create Date object for current location
  var d = new Date()
  // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
  var utcTime = d.getTime() + d.getTimezoneOffset() * 60000
  // time offset for New Zealand is +12
  var timeOffset = 12
  // create new Date object for a different timezone using supplied its GMT offset.
  var NewZealandTime = new Date(utcTime + 3600000 * timeOffset)
  console.log('NewZealandTime:', NewZealandTime)

  //TEST
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() // 0~11まで 0が1月になる
  const yobi = date.getDay() //曜日 0日曜日~6土曜日
  const time = date.getTime()
  const day = date.getDate() //날짜 1~31
  const timezoneOffset = date.getTimezoneOffset()
  // console.log('date:', date)
  // console.log('year:', year)
  // console.log('month:', month)
  // console.log('day:', day)
  // console.log('yobi:', yobi)
  // console.log('time:', time)
  // console.log('timezoneOffset:', timezoneOffset)

  const [countryName, setCountryName] = useState([])

  const [t_email, setT_Email] = useState('cerengurol@hotmail.com')

  const tutorTimezone = () => {
    axios
      .post(DB_CONN_URL + '/select-tutor-timezone', {
        email: t_email,
      })
      .then((response) => {
        //setTutorTimezoneInfo(response.data[0])
        // console.log('TEST:', response.data[0])
        setSelectedTimezoneCity(response.data[0].timeZone)
        setSelectedCountryCode(response.data[0].currentResidentCountry)
      })
  }
  useEffect(() => {
    tutorTimezone()
  }, [])

  const regTrySchedule = () => {
    axios
      .post(DB_CONN_URL + '/reg-try-lesson-schedule', {
        name_eng: '',
      })
      .then((response) => {
        console.log(response.data.message)
      })
  }

  const regTutorSchedule = () => {
    //Time 比較して、endTimeがStartTimeより前にならないようにする
    // formCheckTime(endTime, startTime)
    // function formCheckTime(endTime, startTime) {
    //   if (endTime == startTime) {
    //     alert(
    //       'The end time is same as the start time. Please reset the end time.'
    //     )
    //     return false
    //   }

    //   var startTime_H = startTime.split(':')
    //   var endTime_H = endTime.split(':')

    //   if (startTime_H[0].substr(0, 1) == 0) {
    //     startTime_H[0] == startTime_H[0].substr(1, 1)
    //   }

    //   if (endTime_H[0].substr(0, 1) == 0) {
    //     endTime_H[0] == endTime_H[0].substr(1, 1)
    //   }

    //   if (endTime_H[0] < startTime_H[0]) {
    //     alert(
    //       'The end time is before the start time. Please reset the end time.'
    //     )
    //     return false
    //   }
    //   if (
    //     endTime_H[0] == startTime_H[0] &&
    //     endTime_H[1] == '00' &&
    //     startTime_H[1] == '30'
    //   ) {
    //     alert(
    //       'The end time is before the start time. Please reset the end time.'
    //     )
    //     return false
    //   }
    // }

    // 時間比較
    function endTimeDisabled(optionTime, startTime) {
      // var startTime_H = startTime.split(':')
      // var optionTime_H = optionTime.split(':')

      // if (startTime_H[0].substr(0, 1) == 0) {
      //   startTime_H[0] == startTime_H[0].substr(1, 1)
      // }

      // if (optionTime_H[0].substr(0, 1) == 0) {
      //   optionTime_H[0] == optionTime_H[0].substr(1, 1)
      // }

      // if (
      //   (optionTime_H[0] == startTime_H[0] &&
      //     startTime_H[1] == optionTime_H[1]) ||
      //   optionTime_H[0] < startTime_H[0]
      // ) {
      // }

      return "'disabled'"
    }

    //DateList Date範囲のリスト

    var startDate = startRegDate
    var endDate = endRegDate
    var nextDay = new Date(endDate)
    endDate.setDate(endDate.getDate() + 1)

    var dateList = new Array()
    for (var d2 = startDate; d2 <= endDate; d2.setDate(d2.getDate() + 1)) {
      var formatedDate =
        d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate()
      dateList.push(formatedDate)
    }

    // WHEN optnType == "fixed"の場合、임의의 일주일을 세팅
    const monD = '2021-10-11'
    const tueD = '2021-10-12'
    const wedD = '2021-10-13'
    const thurD = '2021-10-14'
    const friD = '2021-10-15'
    const satD = '2021-10-16'
    const sunD = '2021-10-17'
    if (openType == 'fixed' && repeatType == 'no') {
      dateList = [monD, tueD, wedD, thurD, friD, satD, sunD]
    }
    if (
      openType == 'fixed' &&
      repeatType == 'daily' &&
      dailyRepeatType == 'MON'
    ) {
      dateList = [monD]
    } else if (
      openType == 'fixed' &&
      repeatType == 'daily' &&
      dailyRepeatType == 'TUE'
    ) {
      dateList = [tueD]
    } else if (
      openType == 'fixed' &&
      repeatType == 'daily' &&
      dailyRepeatType == 'WED'
    ) {
      dateList = [wedD]
    } else if (
      openType == 'fixed' &&
      repeatType == 'daily' &&
      dailyRepeatType == 'THUR'
    ) {
      dateList = [thurD]
    } else if (
      openType == 'fixed' &&
      repeatType == 'daily' &&
      dailyRepeatType == 'FRI'
    ) {
      dateList = [friD]
    } else if (
      openType == 'fixed' &&
      repeatType == 'daily' &&
      dailyRepeatType == 'SAT'
    ) {
      dateList = [satD]
    } else if (
      openType == 'fixed' &&
      repeatType == 'daily' &&
      dailyRepeatType == 'SUN'
    ) {
      dateList = [sunD]
    } else if (
      openType == 'fixed' &&
      repeatType == 'daily' &&
      dailyRepeatType == 'weekday'
    ) {
      dateList = [monD, tueD, wedD, thurD, friD]
    }
    //console.log('dateList:', dateList)

    axios
      .post(DB_CONN_URL + '/reg-tutor-schedule', {
        dateList: dateList,
        startRegDate: startRegDate,
        endRegDate: endRegDate,
        startTime: startTime,
        endTime: endTime,
        dateRange: dateRange,
        selectedCountryCode: selectedCountryCode,
        selectedTimezoneCity: selectedTimezoneCity,
        openType: openType,
        repeatType: repeatType,
        dailyRepeatType: dailyRepeatType,
        weeklyRepeatType: weeklyRepeatType,
        monthlyRepeatRadioType: monthlyRepeatRadioType,
        monthlyRepeatTypeYobiDay: monthlyRepeatTypeYobiDay,
        monthlyRepeatTypeYobiOrder: monthlyRepeatTypeYobiOrder,
        monthlyRepeatTypeHizukeDate: monthlyRepeatTypeHizukeDate,
        scheduleColor: scheduleColor,
        //scheduleMemo: scheduleMemo,
      })
      .then((res) => {
        if (res.data.register == 'false') {
          //console.log('response.data.message1:', response.data.message)
          alert(res.data.message)
          return false
        } else if (res.data.register == 'true') {
          //console.log('response.data.message2:', response.data.message)
          alert(res.data.message)
          //window.location.reload()
          return true
        }
      })
  }

  function mySelectTryTime(Year, Month, Day, startHour, startMin, duringMin) {
    //Test
    var Year = '2010'
    var Month = '9'
    var Day = '3'
    var startHour = '17'
    var startMin = '30'
    var duringMin = '60' //体験の時間(分) 30 or 60
  }

  //Timezone Change
  function calcTime(city, offset) {
    var b = new Date() //varchar로 DB에 넣어 되나?

    //console.log('b: ', b) //Tue Sep 28 2021 15:43:03 GMT+0900 (Japan Standard Time)
    //var b = '2021-09-05T10:30:00Z' //
    //var b = '2021-09-05 10:30:00'
    var utc = b.getTime() + b.getTimezoneOffset() * 60000
    console.log('getTimezoneOffset:', b.getTimezoneOffset()) //-540

    var nd = new Date(utc + 3600000 * offset)
    return 'the local time of ' + city + ' is ' + nd.toLocaleString()
  }
  //get specific country time
  console.log(calcTime('UTC-time', '')) //UTC Time
  console.log(calcTime('some country -4', '-4')) //国の名前はどんな形でもいい
  //result--> the local time of argentina is 9/28/2021, 3:25:02 AM
  console.log(calcTime('afganistan -4.5', '-4.5')) //UTC +04:30
  console.log(calcTime('Japan +9', '+9'))

  //自動でsummertimeを知る true = summertime, false=no summeertime period
  moment.tz.setDefault('America/New_York') //set time  CET:paris, America/New_York, Japan/Tokyo
  var summerTime = moment([2022, 6, 12]).isDST()
  var summerTime2 = moment([2022, 7, 14]).isDST()
  console.log('summerTime: ', summerTime) //true or false
  console.log('summerTime2: ', summerTime2) //true or false
  const m = moment()
  var setTimeDate = m.toString()
  console.log('現在Defaultで設定されているTimezoneの時間を確認: ', setTimeDate) //asdf

  var nowdate = new Date()
  const [countryList, setCountryList] = useState([])
  const [cityList, setCityList] = useState([])

  const [selectedCountryCode, setSelectedCountryCode] = useState()
  const [selectedTimezoneCity, setSelectedTimezoneCity] = useState()

  const [startRegDate, setStartRegDate] = useState(new Date())
  const [endRegDate, setEndRegDate] = useState(new Date())

  const [citySelectboxView, setCitySelectboxView] = useState()
  const [timezoneDefaultSet, setTimezoneDefaultSet] = useState('default')

  const [repeatSelect, setRepeatSelect] = useState('monthly')

  const [openType, setOpenType] = useState('fixed')
  // const [openTypeFlexibleValueMakeup, setOpenTypeFlexibleValueMakeup] =
  //   useState('no')
  // const [openTypeFlexibleValueFreetrial, setOpenTypeFlexibleValueFreetrial] =
  //   useState('no')

  const [dateRange, setDateRange] = useState('')
  const [dateRangeMonth, setDateRangeMonth] = useState('')

  //for Search Date button
  const [repeatType, setRepeatType] = useState('no')

  //const [scheduleMemo, setScheduleMemo] = useState()

  console.log('startRegDate: ', startRegDate)
  console.log('endRegDate: ', endRegDate)
  console.log('selectedCountryCode-main: ', selectedCountryCode)
  console.log('selectedTimezoneCity-main: ', selectedTimezoneCity)

  //今日からNヶ月後の日付
  function addnMonth(m) {
    //※このスクリプトは「2019/10/19」に実行してます
    var tmp = new Date()
    var tmp2 = new Date()
    console.log('nMonth-Today:', tmp)
    tmp.setMonth(tmp.getMonth() + parseInt(m)) //3ヶ月後
    tmp2.setMonth(tmp2.getMonth() + parseInt(m)) //3ヶ月後
    // setMonthで、「現在月 = 現在月 + ｎヶ月」を行う
    //なぜかDBに一日多く追加されるので、見せるためのDateをtmpにして、DBに送るデーターをtmp2にする
    tmp2.setDate(tmp2.getDate() - 1)

    setEndRegDate(tmp2)

    console.log('nMonth:', tmp, 'DBへ送る', endRegDate, m)

    return tmp2
  }

  // 時間比較
  function endTimeChecker(startTime, endTime) {
    var startTime_H = startTime.split(':')
    var endTime_H = endTime.split(':')

    //startTime 数字
    if (startTime_H[0].substr(0, 1) == 0) {
      startTime_H[0] == startTime_H[0].substr(1, 1)
    }

    //endTime 数字
    if (endTime_H[0].substr(0, 1) == 0) {
      endTime_H[0] == endTime_H[0].substr(1, 1)
    }

    //比較
    if (endTime_H[0] == startTime_H[0]) {
      if (
        (endTime_H[1] == '00' && startTime_H[1] == '00') ||
        (endTime_H[1] == '00' && startTime_H[1] == '30')
      ) {
        setEndTime(startTime)
        alert('The end time should be after the start time.' + endTime)
      }
    }
    if (endTime_H[0] < startTime_H[0]) {
      setEndTime(startTime)
      alert('The end time should be after the start time.' + endTime)
    }
  }

  function endDateChecker(startDate, endDate) {
    if (startDate > endDate) {
      alert('The end date should be same or after the start time.')
      setEndRegDate(startRegDate)
      return false
    }
  }
  const [tabIndex, setTabIndex] = useState(0)

  function tabIndexOpenType(tabIndex) {
    if (tabIndex == 0) {
      setOpenType('fixed')
      setDateRange('')
    } else if (tabIndex == 1) {
      setOpenType('flexible')
      setDateRange('selfInput')
    }
  }
  useEffect(() => {
    tabIndexOpenType(tabIndex)
  }, [tabIndex])

  const tab1Color = '#E2ecee'
  const tab2Color = '#Ece2ee'

  let tab1FontColor = 'black'
  let tab2FontColor = '#Bbb9bb'

  if (tabIndex == '0') {
    tab1FontColor = 'black'
    tab2FontColor = '#Bbb9bb'
  }
  if (tabIndex == '1') {
    tab1FontColor = '#Bbb9bb'
    tab2FontColor = 'black'
  }

  //My Time
  const FORMAT = 'YYYY-MM-DD HH:mm:ss'

  const myTimezone = selectedTimezoneCity
  const japanTimezone = 'Asia/Tokyo'

  const myResionDate = new Date()

  const myTime = new Date().toLocaleString('en-US', {
    timeZone: myTimezone,
  })
  const japanTime = new Date().toLocaleString('en-US', {
    timeZone: japanTimezone,
  })
  //日本の間の時差
  function getTimezoneOffsetFrom(otherTimezone) {
    if (otherTimezone === void 0) {
      otherTimezone = 'Europe/Amsterdam'
    }
    var date = new Date()
    function objFromStr(str) {
      var array = str.replace(':', ' ').split(' ')
      return {
        day: parseInt(array[0]),
        hour: parseInt(array[1]),
        minute: parseInt(array[2]),
      }
    }
    var str = date.toLocaleString(['nl-NL'], {
      timeZone: otherTimezone,
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    var other = objFromStr(str)
    str = date.toLocaleString(['nl-NL'], {
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    var myLocale = objFromStr(str)
    var amsterdamOffset = other.day * 24 * 60 + other.hour * 60 + other.minute
    var myLocaleOffset =
      myLocale.day * 24 * 60 + myLocale.hour * 60 + myLocale.minute
    return myLocaleOffset - amsterdamOffset + date.getTimezoneOffset()
  }

  //日本より何時間早いのか　ex) -7
  const timeInterval =
    (getTimezoneOffsetFrom(japanTimezone) - getTimezoneOffsetFrom(myTimezone)) /
    60

  return (
    <>
      <Tabs
        defaultIndex={1}
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList
          style={{
            fontSize: '25px',
            fontWeight: '900',
            marginBottom: 0,
            border: '0px',
          }}
        >
          <Tab
            style={{
              backgroundColor: tab1Color,
              marginRight: '10px',
              border: '0px',
              color: tab1FontColor,
            }}
          >
            <input
              className="form-check-input"
              type="radio"
              name="open_type"
              value="fixed"
              onClick={(e) => {
                setOpenType(e.target.value)
                setOpenTypeFlexibleValueMakeup('no')
                setOpenTypeFlexibleValueFreetrial('no')
              }}
              checked={tabIndex == '0' && 'checked'}
              style={{ opacity: 0 }}
            />
            Fixed
          </Tab>
          <Tab
            style={{
              backgroundColor: tab2Color,
              border: '0px',
              color: tab2FontColor,
            }}
          >
            <input
              className="form-check-input"
              type="radio"
              name="open_type"
              value="flexible"
              onClick={(e) => {
                setOpenType(e.target.value)
                //setOpenTypeFlexibleValueFreetrial('freetrial')
                //setOpenTypeFlexibleValueMakeup('makeup')
              }}
              checked={tabIndex == '1' && 'checked'}
              style={{ opacity: 0 }}
            />
            Flexible
          </Tab>
        </TabList>

        <TabPanel>
          <div
            style={{
              backgroundColor: tab1Color,
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '20px',
              paddingBottom: '10px',
            }}
          >
            <form>
              <div
                className="row mb-3"
                style={{
                  alignItems: 'center',
                }}
              >
                <label className="col-sm-3 col-form-label">
                  Timezone&nbsp;
                  <button className="btn-sm btn-info">変更</button>
                </label>
                <div className="col-sm-9">
                  {countryName}&nbsp;<b>[{selectedCountryCode}]</b>{' '}
                  {selectedTimezoneCity}
                  &nbsp;&nbsp;{myTime}
                  <br />
                  Japan: {japanTime}
                  <br />
                  timeInterval:{timeInterval}
                </div>
              </div>
              {/* <div className="row mb-3">
                <label className="col-sm-3 col-form-label">TimeZone</label>
                <div className="col-sm-9">
                  {selectedTimezoneCity}
                  <button
                    className="btn-sm btn-info"
                    style={{ marginLeft: '10px' }}
                  >
                    基本Timezone変更へ
                  </button>
                </div>
              </div> */}
              {/* <hr />
              <div className="row" style={{ alignItems: 'center' }}>
                <label className="col-sm-3 col-form-label">Schedule Type</label>
                <div className="col-sm-9">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="open_type"
                      value="fixed"
                      onClick={(e) => {
                        setOpenType(e.target.value)
                        setOpenTypeFlexibleValueMakeup('no')
                        setOpenTypeFlexibleValueFreetrial('no')
                      }}
                      checked={tabIndex == '0' && 'checked'}
                    />
                    <label
                      className="form-check-label"
                      style={{ paddingRight: '40px' }}
                    >
                      Fixed (Please set over 10 fixed schedule at least.)
                    </label>
                    <p>
                      Your Fixed Schedule Now&nbsp;&nbsp;
                      <span
                        style={{
                          color: 'blue',
                          fontWeight: '900',
                          fontSize: '20px',
                        }}
                      >
                        3
                      </span>
                      (30min*3)
                    </p>
                  </div>
                </div>
              </div> */}
              <hr />
              <div className="row" style={{ alignItems: 'center' }}>
                <label className="col-sm-3 col-form-label">Day Option</label>
                <div className="col-sm-9">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="repeat_type"
                      value="no"
                      onClick={(e) => {
                        repeatValue(e.target.value)
                      }}
                      checked={repeatType == 'no' && 'checked'}
                    />
                    <label
                      className="form-check-label"
                      style={{ paddingRight: '40px' }}
                    >
                      Everyday
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="repeat_type"
                      value="daily"
                      onClick={(e) => {
                        repeatValue(e.target.value)
                      }}
                    />
                    <label
                      className="form-check-label"
                      style={{ paddingRight: '40px' }}
                    >
                      Select Each Day
                    </label>
                  </div>

                  {repeatType == 'no' && <div></div>}
                  {repeatType == 'weekly' && <RegViewWeekly weeklyRepeatType />}
                  {repeatType == 'monthly' && (
                    <RegViewMonthly
                      monthlyRepeatRadioType
                      monthlyRepeatTypeYobiOrder
                      monthlyRepeatTypeYobiDay
                      monthlyRepeatTypeHizukeDate
                    />
                  )}
                  {repeatType == 'daily' && (
                    <div
                      className="col-sm-12"
                      style={{
                        padding: '10px',
                        marginTop: '10px',
                        border: '1px solid #dedede',
                        borderRadius: '5px',
                      }}
                    >
                      {/* <h5 style={{ color: 'red' }}>Daily Repeat Type</h5> */}
                      {/* {dailyRepeatType} */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="weekday"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '40px' }}
                        >
                          Weekday Only(Mon~Fri)
                        </label>
                        <p></p>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="MON"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />

                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Mon
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="TUE"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Tue
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="WED"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Wed
                        </label>

                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="THUR"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />

                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Thur
                        </label>
                        <p></p>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="FRI"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />

                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Fri
                        </label>

                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="SAT"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />

                        <label
                          className="form-check-label"
                          style={{ paddingRight: '40px' }}
                        >
                          Sat
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="SUN"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '40px' }}
                        >
                          Sun
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <hr />

              <div
                className="row pb-0 mb0"
                style={{
                  alignItems: 'center',
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              >
                <label className="col-sm-3 col-form-label">Time Range</label>
                {/* <label>Reset</label>
                <input
                  className="form-check-input"
                  type="radio"
                  name="timeReset"
                  value="timereset"
                  onClick={() => {
                    setStartTime('12:00')
                    setEndTime('12:00')
                  }}
                  style={{ textAlign: 'right' }}
                /> */}
                <div className="col-sm-3">
                  {/* {startTime} */}
                  <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
                    START TIME
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setStartTime(e.target.value)
                      setEndTime(e.target.value)
                    }}
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
                        ampm = ' am'
                      } else {
                        ampm = ' pm'
                      }
                      if (i < 10) {
                        return (
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
                        )
                      } else {
                        return (
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
                        )
                      }
                    })}
                  </select>
                  {/* {startTime}/{endTime} */}
                </div>
                <div
                  className="col-sm-1"
                  style={{ textAlign: 'center', alignItems: 'center' }}
                >
                  〜
                </div>
                <div className="col-sm-3">
                  <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
                    END TIME
                  </label>
                  <select
                    id="endtimeId"
                    className="form-control"
                    onChange={(e) => {
                      setEndTime(e.target.value)
                      endTimeChecker(startTime, e.target.value)
                    }}
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
                        ampm = ' am'
                      } else {
                        ampm = ' pm'
                      }
                      if (i < 10) {
                        return (
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
                        )
                      } else {
                        return (
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
                        )
                      }
                    })}

                    <option value="24:00">24:00 pm</option>
                  </select>
                </div>
              </div>
              <hr style={{ marginTop: 20 }} />

              <div className="row mb-3">
                <label className="col-sm-3 col-form-label"></label>
                <div className="col-sm-9">
                  <button
                    className="btn btn-primary w-100"
                    onClick={regTutorSchedule}
                    style={{ fontSize: 20, fontWeight: 500 }}
                  >
                    Add Fixed Schedule
                  </button>
                </div>
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div
            style={{
              backgroundColor: tab2Color,
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '20px',
              paddingBottom: '10px',
            }}
          >
            <form>
              <div
                className="row mb-3"
                style={{
                  alignItems: 'center',
                }}
              >
                <label className="col-sm-3 col-form-label">
                  Timezone&nbsp;
                  <button className="btn-sm btn-info">変更</button>
                </label>
                <div className="col-sm-9">
                  {countryName}&nbsp;<b>[{selectedCountryCode}]</b>{' '}
                  {selectedTimezoneCity}
                  &nbsp;&nbsp;{myTime}
                </div>
              </div>
              {/* <div className="row mb-3">
                <label className="col-sm-3 col-form-label">TimeZone</label>
                <div className="col-sm-9">
                  {selectedTimezoneCity}
                  <button
                    className="btn-sm btn-info"
                    style={{ marginLeft: '10px' }}
                  >
                    基本Timezone変更へ
                  </button>
                </div>
              </div> */}
              {/* <ResidentCountrySelectorAuto /> */}
              {/* <hr />
              <div className="row" style={{ alignItems: 'center' }}>
                <label className="col-sm-3 col-form-label">Schedule Type</label>
                <div className="col-sm-9">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="open_type"
                      value="flexible"
                      onClick={(e) => {
                        setOpenType(e.target.value)
                        //setOpenTypeFlexibleValueFreetrial('freetrial')
                        //setOpenTypeFlexibleValueMakeup('makeup')
                      }}
                      checked={tabIndex == '1' && 'checked'}
                    />

                    <label
                      className="form-check-label"
                      style={{ paddingRight: '40px' }}
                    >
                      Flexible [{openType}]
                    </label>
                  </div>
                </div>
              </div> */}
              <hr />
              <div className="row" style={{ alignItems: 'center' }}>
                <label className="col-sm-3 col-form-label">Day Option</label>
                <div className="col-sm-9">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="repeat_type"
                      value="no"
                      onClick={(e) => {
                        repeatValue(e.target.value)
                      }}
                      checked={repeatType == 'no' && 'checked'}
                    />
                    <label
                      className="form-check-label"
                      style={{ paddingRight: '40px' }}
                    >
                      Everyday
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="repeat_type"
                      value="daily"
                      onClick={(e) => {
                        repeatValue(e.target.value)
                      }}
                    />
                    <label
                      className="form-check-label"
                      style={{ paddingRight: '40px' }}
                    >
                      Select Each Day
                    </label>
                  </div>

                  {repeatType == 'no' && <div></div>}
                  {repeatType == 'weekly' && <RegViewWeekly weeklyRepeatType />}
                  {repeatType == 'monthly' && (
                    <RegViewMonthly
                      monthlyRepeatRadioType
                      monthlyRepeatTypeYobiOrder
                      monthlyRepeatTypeYobiDay
                      monthlyRepeatTypeHizukeDate
                    />
                  )}
                  {repeatType == 'daily' && (
                    <div
                      className="col-sm-12"
                      style={{
                        padding: '10px',
                        marginTop: '10px',
                        border: '1px solid #dedede',
                        borderRadius: '5px',
                      }}
                    >
                      {/* <h5 style={{ color: 'red' }}>Daily Repeat Type</h5> */}
                      {/* {dailyRepeatType} */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="weekday"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '40px' }}
                        >
                          Weekday Only(Mon~Fri)
                        </label>
                        <p></p>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="MON"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Mon
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="TUE"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Tue
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="WED"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Wed
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="THUR"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Thur
                        </label>
                        <p></p>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="FRI"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />

                        <label
                          className="form-check-label"
                          style={{ paddingRight: '30px' }}
                        >
                          Fri
                        </label>

                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="SAT"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />

                        <label
                          className="form-check-label"
                          style={{ paddingRight: '40px' }}
                        >
                          Sat
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="dailyradio"
                          value="SUN"
                          onClick={(e) => {
                            setDailyRepeatType(e.target.value)
                          }}
                        />
                        <label
                          className="form-check-label"
                          style={{ paddingRight: '40px' }}
                        >
                          Sun
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <hr />

              <div className="row mb-3" style={{ alignItems: 'center' }}>
                <label className="col-sm-3 col-form-label">Date Range</label>
                <div
                  className="col-sm-9"
                  style={{
                    paddingLeft: '35px',
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="dateRange"
                    value="selfInput"
                    onClick={(e) => {
                      setDateRange(e.target.value)
                      setStartRegDate(new Date())
                      setEndRegDate(new Date())
                      setDateRangeMonth()
                    }}
                    checked={dateRange == 'selfInput' && 'checked'}
                  />
                  <label
                    className="form-check-label"
                    style={{ paddingRight: '40px' }}
                  >
                    Date select
                  </label>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dateRange"
                      value="fixed"
                      onClick={(e) => {
                        setDateRange(e.target.value)
                      }}
                      checked={dateRange == 'fixed' && 'checked'}
                    />
                    <select
                      name="dateRangeMonth"
                      onChange={(e) => {
                        setDateRangeMonth(e.target.value)
                        setEndRegDate(addnMonth(e.target.value))
                      }}
                      disabled={dateRange == 'selfInput' && 'disabled'}
                    >
                      <option
                        value="0"
                        select={dateRange == 'selfInput' && 'selected'}
                      >
                        How many months from today?
                      </option>

                      {[...Array(12)].map((i, index) => (
                        <option
                          value={index + 1}
                          selected={dateRangeMonth == index + 1 && 'selected'}
                        >
                          {index + 1}month{index > 0 && 's'} from today
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <hr />
              </div>
              {dateRange == 'selfInput' && (
                <div className="row mb-3" style={{ alignItems: 'center' }}>
                  <label className="col-sm-3 col-form-label"></label>
                  <div className="col-sm-3">
                    <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
                      START DATE
                    </label>
                    <DatePicker
                      className="form-control w-100"
                      portalId="root-portal"
                      selected={startRegDate}
                      onChange={(date) => setStartRegDate(date)}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      maxDate={new Date(moment().add(3, 'months'))} //最大3ヶ月後のスケジュール
                      // filterDate={(date) =>
                      //   date.getDay() != 6 && date.getDay() != 0
                      // } //土日はSelectできないようにする
                    />
                  </div>

                  <div
                    className="col-sm-1"
                    style={{ textAlign: 'center', alignItems: 'center' }}
                  >
                    〜
                  </div>
                  <div className="col-sm-3">
                    <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
                      END DATE
                    </label>
                    <DatePicker
                      className="form-control w-100"
                      portalId="root-portal"
                      selected={endRegDate}
                      onChange={(date) => {
                        setEndRegDate(date)
                        endDateChecker(startRegDate, date)
                      }}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      maxDate={new Date(moment().add(3, 'months'))} //最大3ヶ月後のスケジュール
                      // filterDate={(date) =>
                      //   date.getDay() != 6 && date.getDay() != 0
                      // } //土日はSelectできないようにする
                    />
                  </div>
                </div>
              )}
              <hr style={{ marginTop: 0 }} />
              <div
                className="row pb-0 mb0"
                style={{
                  alignItems: 'center',
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              >
                <label className="col-sm-3 col-form-label">Time Range</label>
                <div className="col-sm-3">
                  {/* {startTime} */}
                  <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
                    START TIME
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setStartTime(e.target.value)
                      setEndTime(e.target.value)
                    }}
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
                        ampm = ' am'
                      } else {
                        ampm = ' pm'
                      }
                      if (i < 10) {
                        return (
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
                        )
                      } else {
                        return (
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
                        )
                      }
                    })}
                  </select>
                  {/* {startTime}/{endTime} */}
                </div>
                <div
                  className="col-sm-1"
                  style={{ textAlign: 'center', alignItems: 'center' }}
                >
                  〜
                </div>
                <div className="col-sm-3">
                  <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
                    END TIME
                  </label>
                  <select
                    id="endtimeId"
                    className="form-control"
                    onChange={(e) => {
                      setEndTime(e.target.value)
                      endTimeChecker(startTime, e.target.value)
                    }}
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
                        ampm = ' am'
                      } else {
                        ampm = ' pm'
                      }
                      if (i < 10) {
                        return (
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
                        )
                      } else {
                        return (
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
                        )
                      }
                    })}

                    <option value="24:00">24:00 pm</option>
                  </select>
                </div>
              </div>
              <hr style={{ marginTop: 20 }} />

              <div className="row mb-3">
                <label className="col-sm-3 col-form-label"></label>
                <div className="col-sm-9">
                  <button
                    className="btn btn-danger w-100"
                    onClick={regTutorSchedule}
                    style={{ fontSize: 20, fontWeight: 500 }}
                  >
                    Add Flexible Schedule
                  </button>
                </div>
              </div>
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </>
  )
}

// function RegViewDaily() {
//   const [dailyRepeatType, setDailyRepeatType] = useState('')

//   return (
//     <>
//       <div
//         className="col-sm-12"
//         style={{
//           padding: '20px',
//           marginTop: '10px',
//           border: '1px solid #dedede',
//           borderRadius: '5px',
//         }}
//       >
//         {/* <h5 style={{ color: 'red' }}>Daily Repeat Type</h5> */}
//         {/* {dailyRepeatType} */}
//         <div className="form-check">
//           <input
//             className="form-check-input"
//             type="radio"
//             name="dailyradio"
//             value="weekday"
//             onClick={(e) => {
//               setDailyRepeatType(e.target.value)
//             }}
//           />
//           <label className="form-check-label" style={{ paddingRight: '40px' }}>
//             Weekday Only(Mon~Fri)
//           </label>
//           <p></p>
//           <input
//             className="form-check-input"
//             type="radio"
//             name="dailyradio"
//             value="mon"
//             onClick={(e) => {
//               setDailyRepeatType(e.target.value)
//             }}
//           />
//           <label className="form-check-label" style={{ paddingRight: '30px' }}>
//             Mon
//           </label>
//           <input
//             className="form-check-input"
//             type="radio"
//             name="dailyradio"
//             value="tue"
//             onClick={(e) => {
//               setDailyRepeatType(e.target.value)
//             }}
//           />
//           <label className="form-check-label" style={{ paddingRight: '30px' }}>
//             Tue
//           </label>
//           <input
//             className="form-check-input"
//             type="radio"
//             name="dailyradio"
//             value="wed"
//             onClick={(e) => {
//               setDailyRepeatType(e.target.value)
//             }}
//           />
//           <label className="form-check-label" style={{ paddingRight: '30px' }}>
//             Wed
//           </label>
//           <input
//             className="form-check-input"
//             type="radio"
//             name="dailyradio"
//             value="thur"
//             onClick={(e) => {
//               setDailyRepeatType(e.target.value)
//             }}
//           />
//           <label className="form-check-label" style={{ paddingRight: '30px' }}>
//             Thur
//           </label>
//           <p></p>
//           <input
//             className="form-check-input"
//             type="radio"
//             name="dailyradio"
//             value="fri"
//             onClick={(e) => {
//               setDailyRepeatType(e.target.value)
//             }}
//           />

//           <label className="form-check-label" style={{ paddingRight: '30px' }}>
//             Fri
//           </label>

//           <input
//             className="form-check-input"
//             type="radio"
//             name="dailyradio"
//             value="sat"
//             onClick={(e) => {
//               setDailyRepeatType(e.target.value)
//             }}
//           />

//           <label className="form-check-label" style={{ paddingRight: '40px' }}>
//             Sat
//           </label>
//           <input
//             className="form-check-input"
//             type="radio"
//             name="dailyradio"
//             value="SUN"
//             onClick={(e) => {
//               setDailyRepeatType(e.target.value)
//             }}
//           />
//           <label className="form-check-label" style={{ paddingRight: '40px' }}>
//             Sun
//           </label>
//         </div>
//       </div>
//     </>
//   )
// }

export default MemberMakeupSchedule
