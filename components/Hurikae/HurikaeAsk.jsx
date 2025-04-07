import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import emailjs from 'emailjs-com'

import {
  myfun_weekdayToJapanese,
  myfun_getdayofweek,
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
import Modal from '@/components/modal/ModalHurikaeContractDetails'

const HurikaeAsk = () => {
  //modal
  const [openModal, setOpenModal] = useState(false)

  const [myMbn, setMyMbn] = useState()
  //For sweet alert
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenReg, setIsOpenReg] = useState(false)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)

  //時間追加
  //const [hurikaeList, setHurikaeList] = useState([])
  const [hurikaeList2, setHurikaeList2] = useState([])
  const [thisHolidayCheck, setThisHolidayCheck] = useState()
  const [otherTutorOk, setOtherTutorOk] = useState(false)
  const [lessonTime, setLessonTime] = useState('') //生徒が振替を希望するレッスン長さ(分)-> 30 or 60
  const [myLessonList, setMyLessonList] = useState([])

  const [selectedLesson, setSelectedLesson] = useState(null)
  const [startRegDate, setStartRegDate] = useState(new Date())
  //const [startRegDate, setStartRegDate] = useState('')
  const [startTime, setStartTime] = useState('12:00')
  //const [endTime, setEndTime] = useState('12:30')
  const [holidayDate, setHolidayDate] = useState()
  var startDate = startRegDate

  const date = new Date()

  const [nameEng, setNameEng] = useState()
  const [tbn, setTbn] = useState()

  const [teacherNameEng, setTeacherNameEng] = useState()
  const [course, setCourse] = useState()
  const [courseName, setCourseName] = useState()
  const [courseSubject, setCourseSubject] = useState()
  const [duringTime, setDuringTime] = useState()
  const [absentWeekday, setAbsentWeekday] = useState()
  const [absentDate, setAbsentDate] = useState('')
  const [absentTime, setAbsentTime] = useState()
  const [myTeacherOnly, setMyTeacherOnly] = useState()
  const [currentEightList, setCurrentEightList] = useState('')
  const [lessonDateEight, setLessonDateEight] = useState([])
  const router = useRouter() //使い方：router.replace('/')

  const sendEmailtoStudent = () => {
    var email = localStorage.getItem('email')

    //test//////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    var email = 'minjaekato@gmail.com'

    var templateParams = {
      to_email: email,
      to_name: nameEng,
      reply_to: 'no-reply',
      from_name: 'engLib',
    }
    var YOUR_SERVICE_ID = 'service_nu801ay'
    var YOUR_TEMPLATE_ID = 'template_ne0700c'
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
  const sendEmailtoTutor = (selectedLessonValue) => {
    var mbn = localStorage.getItem('MypageMbn')

    console.log('invalue-for-email', mbn)
    axios
      .get(
        DB_CONN_URL +
          '/get-tutor-info-by-selectedLesson/' +
          mbn +
          '&' +
          selectedLessonValue
      )
      .then((response) => {
        //(error)console.log('dddd-response.data', response[0].data)
        //(error)console.log('dddd-response.data.email', response.data[0].result.email)
        console.log('dddd-response.data.email', response.data.results.email)

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
        var tutor_email = 'ceo@edutainers.jp'

        var templateParams = {
          to_email: tutor_email,
          to_name: tutor_name,
          reply_to: 'no-reply',
          from_name: 'engLib',
          title: '[Urgent] Makeup lesson request from student',
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
      })
  }

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    setMyMbn(mbn)
    getLessonTime()
  }, [])

  //getLessonTime (レッスンの長さ:分を知る)
  function getLessonTime() {
    handleAllHuriAddWaitingDelete()

    var mbn = localStorage.getItem('MypageMbn')

    axios
      .post(DB_CONN_URL + '/list-my-lesson-ok', {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data[0].status) {
          alert('no' + response.data[0].message) //for test
        } else {
          setMyLessonList(response.data)
        }
      })
  }

  function OnClickHurikaeListAdd() {
    if (selectedLesson == null) {
      alert('振替希望のレッスンを先に選択して下さい。')
      return false
    } else if (absentDate == '') {
      alert('休む日を必ず選んでください。')
      return false
    } else {
      var mbn = localStorage.getItem('MypageMbn')
      console.log('startRegdate:', startRegDate)
      var startRegDateModified = myfun_getMyDate(startRegDate)
      //alert(startRegDateModified)
      axios
        .post(DB_CONN_URL + '/reg-hurikae', {
          lesson_set_autoid: selectedLesson,
          mbn: mbn,
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
          hurikae_date: startRegDateModified,
          hurikae_start_time: startTime,
          myRegDate: myfun_myRegDate(),
          myRegTime: myfun_myRegTime(),
          // hurikae_end_time: endTime,
        })
        .then((response) => {
          if (response.status !== 200) {
            console.log('no information', response.data.message)
            alert('no' + response.data.message) //for test
          } else {
            setIsOpen(true)

            funcHurikaeList()
          }
        })
    }
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

  function handleAllHurikaeReg() {
    var mbn = localStorage.getItem('MypageMbn')
    // var otherTutorOkValue = ''
    // if (otherTutorOk == true) {
    //   otherTutorOkValue = 'ok'
    // } else {
    //   otherTutorOkValue = 'no'
    // }
    //selectedLesson => sys_member_lesson_setのautoid
    // alert(mbn)
    // alert(selectedLesson)
    // alert(absentDate)
    axios
      .put(
        DB_CONN_URL +
          '/update-reg-hurikae-status-waiting/' +
          mbn +
          '&' +
          selectedLesson +
          '&' +
          absentDate
        // otherTutorOkValue
      )
      .then((response) => {
        sendEmailtoStudent()
        sendEmailtoTutor(selectedLesson)
        setIsOpenReg(true)
        // ここでリダイレクト
        alert(
          '先生に送信されました。24時間以内に答えが届きます。少々お待ちください。'
        )
        //console.log('response.data:', response.data)
        //console.log('setHurikaeList2:', hurikaeList2)
      })
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

  async function holidayCheck(checkDate) {
    var url = DB_CONN_URL + '/holiday-check/' + checkDate
    const response = await axios.get(url)
    // console.log('$$$$$', response.data.status)
    return response.data.status
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

  function handleOneListDelete(value) {
    var mbn = localStorage.getItem('MypageMbn')
    axios
      .put(DB_CONN_URL + '/all-hurikae-mbn-one-delete/' + mbn + '&' + value)
      .then((response) => {
        if (response.status == 200) {
          // alert('削除しました', value)

          funcHurikaeList(value)
        } else {
          alert('Delete Error', value)
        }
      })
  }

  function handleEnd() {
    setIsOpenReg(false)
    setIsOpenBackMypage(false)
    router.replace('/mypage') // ここでリダイレクト
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
      <div>
        <div className="row p-0 m-0">
          <div
            className="col-sm-12 p-0 mb-3"
            style={{ backgroundColor: 'white' }}
          >
            <ul className="list-group">
              <li className="list-group-item list-group-item-primary text-center">
                {/* {myMbn} */}
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setOpenModal(true)
                  }}
                >
                  ここをクリックして振替・休み関連規約の詳細を必ずご確認ください
                </button>
              </li>
              <li className="list-group-item list-group-item-dark">
                生徒から：1ヶ月１回振替可能、累積無し。
                <br />
                先生から：一人の生徒あたり年６回振替可能,
              </li>
              <li className="list-group-item list-group-item-dark">
                円満な振替調整のために、先生と時間が合わない場合、6ヶ月間使用可能な振替切符として保存されます。
              </li>
              <li className="list-group-item list-group-item-dark">
                24時間以内にスタートするレッスンに対して振替を申し込むことはできません。但し、急な病気などに対しては病院の照明や照明できるものを提出した場合、振替切符として保存できます。
              </li>
              <li className="list-group-item list-group-item-dark">
                無断欠席に関しましては振替できませんのでご注意ください。
              </li>
              <li className="list-group-item list-group-item-dark">
                振替希望日をできるだけ多めに追加して下さい。
                {/* <Link href="/mypage">
                  <a> */}
                <button
                  className="btn btn-secondary pl-1 pr-1 pt-1 pb-1"
                  style={{ fontSize: 20, fontWeight: 500 }}
                  // onClick={handleAllHuriAddWaitingDelete}
                  onClick={() => {
                    setIsOpenBackMypage(true)
                  }}
                >
                  マイページへ戻る
                </button>
                {/* </a>
                </Link> */}
              </li>
            </ul>
          </div>
          <div className="col-sm-12 ml-0 ">
            <p style={{ color: 'red', marginBottom: 0 }}>
              {/* <i className="flaticon-heart"></i> */}
              {/* &nbsp;{myLessonList.length} */}
              &nbsp;振替希望のレッスンをクリック
            </p>
          </div>

          <div className="col-sm-12 ml-0 ">
            {myLessonList.map((val, key) => {
              return (
                <div className="form-group row  mb-0">
                  <div className="form-check">
                    {/* {absentWeekday} */}
                    <input
                      className="form-check-input"
                      type="radio"
                      name="selectlesson"
                      onClick={() => {
                        // setAbsentWeekday(val.weekday)
                        getLessonDate8Times(val.weekday, val.start_time)
                        funcHurikaeList(val.autoid)
                        setSelectedLesson(val.autoid)
                        setNameEng(val.name_eng)
                        setAbsentWeekday(val.weekday)
                        setAbsentTime(val.start_time)
                        setDuringTime(val.duringTime)
                        setCourse(val.course)
                        setCourseName(val.courseName)
                        setCourseSubject(val.subject)
                        setTbn(val.teacher_barcode_num)
                        setTeacherNameEng(val.teacher_name_eng)
                        //getNextDate(val.weekday, val.start_time)
                      }}
                    />
                    <label
                      className="form-check-label mb-2 font-weight-bold h5"
                      for="gridRadios1"
                    >
                      {val.subject}コース:&nbsp;[
                      {myfun_weekdayToJapanese(val.weekday)}]&nbsp;
                      {val.start_time}〜
                    </label>
                  </div>
                </div>
              )
            })}
            <hr />
          </div>
          <div className="col-sm-12 ml-0 mr-2 p-0">
            <p>
              先生とのやりとりは一度だけです。先生と都合が合わない場合、6ヶ月期限の振替チケットとして発行されますので、
              可能な時間帯をできるだけ沢山登録して送信してください。
              <br />
              一度振替設定になっているレッスンは、再度振替依頼はできません。参加できない場合は、マイページからレッスンキャンセルボタンを押してください。
              <br />
              レッスンキャンセルなしでレッスンに現れないことがようにご注意ください。事前連絡なしでレッスンに参加しない場合、先生はレッスン時間の最後までZoomで待機することになりますのでご注意ください。
            </p>
          </div>
          <div className="col-sm-3 ml-0 mr-2 p-0">
            {/* <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
              休む日選択
            </label> */}
            {/* {absentDate} */}

            <select
              className="form-control bg-dark text-white"
              onChange={(e) => {
                setAbsentDate(e.target.value)
              }}
            >
              <option value="">選択して下さい</option>
              {lessonDateEight.map((val, key) => {
                return <option value={val}>{val}</option>
              })}
            </select>
            <label style={{ paddingLeft: '10px', fontWeight: '500' }}>
              休む日(~2ヶ月先)
            </label>
          </div>
          <div className="col-sm-3 p-0  mr-2">
            {/* <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
              希望日
            </label> */}

            <DatePicker
              className="form-control w-100  bg-dark text-white"
              portalId="root-portal"
              selected={startRegDate}
              onChange={(date) => setStartRegDate(date)}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              // minDate={absentDate}
              // maxDate={new Date(moment().add(1, 'months'))} //最大3ヶ月後のスケジュール
              maxDate={new Date(moment().add(5, 'weeks'))} //最大3ヶ月後のスケジュール
              // filterDate={(date) =>
              //   date.getDay() != 6 && date.getDay() != 0
              // } //土日はSelectできないようにする
            />
            <label style={{ paddingLeft: '10px', fontWeight: '500' }}>
              希望日
            </label>
          </div>
          <div className="col-sm-3 ml-0 p-0  mr-2">
            {/* {startTime} */}
            {/* <label style={{ paddingLeft: '10px', fontWeight: '900' }}>
              振替希望時間
            </label> */}

            <select
              className="form-control  bg-dark text-white"
              style={{ width: '100%' }}
              onChange={(e) => {
                setStartTime(e.target.value)
                // setEndTime(e.target.value)
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
                  ampm = ' am〜'
                } else {
                  ampm = ' pm〜'
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
                          startTime == String(i) + ':' + '00' ? 'selected' : ''
                        }
                      >
                        {String(i) + ':' + '00' + ampm}
                      </option>
                      <option
                        value={String(i) + ':' + '30'}
                        selected={
                          startTime == String(i) + ':' + '30' ? 'selected' : ''
                        }
                      >
                        {String(i) + ':' + '30' + ampm}
                      </option>
                    </>
                  )
                }
              })}
            </select>
            <label style={{ paddingLeft: '10px', fontWeight: '500' }}>
              スタート時間
            </label>
          </div>

          <div
            className="col-sm-2 mt-1 ml-0 p-0"
            style={{ textAlign: 'center' }}
          >
            <button
              className="btn btn-danger pt-1 pb-1  mt-0 mb-0"
              onClick={OnClickHurikaeListAdd}
              style={{ fontSize: 20, fontWeight: 500, width: '100%' }}
            >
              追加
            </button>
          </div>

          <div className="col-sm-12 mb-0 mt-0 ml-0 p-0">
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

            <ul className="list-group">
              <li className="list-group-item list-group-item-danger">
                {hurikaeList2.map((val, key) => {
                  return (
                    <div className="mb-1">
                      <b>希望日{key + 1}.</b>&nbsp;{val.hurikae_date}&nbsp;
                      {val.hurikae_start_time}
                      <span
                        className="btn-sm btn-dark ml-2 pt-0 pb-0"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleOneListDelete(val.autoid)
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
            </ul>
          </div>
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
            <button
              className="btn btn-primary mb-2 p-2 h6 text-white font-weight-bold"
              onClick={handleAllHurikaeReg}
              style={{ fontWeight: 500 }}
              disabled={hurikaeList2.length == 0 && 'disabled'}
            >
              先生に送信
            </button>
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
              title="マイページへ戻りますか？"
              show={isOpenBackMypage}
              onConfirm={() => handleEnd()}
              onCancel={() => {
                setIsOpenBackMypage(false)
              }}
              confirmBtnText="戻る"
              cancelBtnText="戻らない"
              showCancel={true}
              reverseButtons={true}
            >
              <p>
                マイページに戻ると追加中の振替希望リストが全てリセットされます。
              </p>
            </SweetAlert>
          </div>
        </div>
      </div>
    </>
  )
}

export default HurikaeAsk
