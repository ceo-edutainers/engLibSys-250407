import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import moment from 'moment'
import Router, { useRouter } from 'next/router'

const ModalChangeLessonSchedule = ({ closeModal, hw_id, mbn, login_level }) => {
  const [memberInfo, setMemberInfo] = useState([])
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
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const router = useRouter() //使い方：router.replace('/')
  const handleReload = () => {
    router.reload()
  }

  useEffect(() => {
    axios
      .post(DB_CONN_URL + '/this-lesson-yoyaku-date-by-hwid', {
        mbn: mbn,
        hw_id: hw_id,
      })
      .then((response) => {
        if (!response.data.status) {
          alert(response.data.message)
        } else {
          setMemberInfo(response.data.response[0])
          setChangedRegTime(
            moment(response.data.response[0].yoyakuTime, 'HH:mm')
          )
        }
      })
  }, [mbn, hw_id])

  function changeLessonDate_temp(
    yoyakuDate,
    yoyakuWeekday,
    changeDate,
    dateTimeChangeMemo
  ) {
    var changeWeekday = new Date(changeDate)
    changeWeekday = getWeekday(changeWeekday)

    setChangedRegDate(changeDate)
    setChanged_yoyakuDate(moment(changeDate).format('YYYY-MM-DD'))
    setChanged_yoyakuWeekday(yoyakuWeekday)
    setChanged_dateTimeChangeMemo(dateTimeChangeMemo)
    setChanged_yoyakuWeekday(changeWeekday)
  }

  function changeLessonTime_temp(changeTime, dateTimeChangeMemo) {
    setChangedRegTime(changeTime)
    setChanged_yoyakuTime(moment(changeTime).format('HH:mm'))
    setChanged_dateTimeChangeMemo(dateTimeChangeMemo)
  }
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
    } else {
      var new_yoyakuDate = changed_yoyakuDate
    }

    if (changed_yoyakuTime == null || changed_yoyakuTime == '') {
      //yoyakuTimeが変更されてない場合
      var new_yoyakuTime = memberInfo.yoyakuTime
        ? moment(memberInfo.yoyakuTime, 'HH:mm').format('HH:mm')
        : moment().format('HH:mm')
    } else {
      var new_yoyakuTime = moment(changed_yoyakuTime, 'HH:mm').format('HH:mm')
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

    var url = DB_CONN_URL + '/change-temporary-lesson-datetime/'

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
      )
      .then((response) => {
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

  function getWeekday(date) {
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']
    const dayIndex = date.getDay()
    return weekdays[dayIndex]
  }

  const [tutorInfo, setTutorInfo] = useState([])
  function handleGetTutorList() {
    var tbn = localStorage.getItem('tbn')

    axios
      .post(DB_CONN_URL + '/tutor_all_info_tbn', {
        tbn: tbn,
      })
      .then((response) => {
        setTutorInfo(response.data)
      })
  }

  return (
    <div className="modalBackgroundHalf">
      <div className="modalContainerHalf">
        <div className="title-align-left">
          <h5>
            <b>{memberInfo.name_eng}</b>
          </h5>
          <h6>
            <b>Lesson Schedule:&nbsp;</b>
            {memberInfo.yoyakuDate}[{memberInfo.yoyakuWeekday}]&nbsp;
            {memberInfo.yoyakuTime}&nbsp;[{memberInfo.duringTime}-min]
          </h6>
        </div>
        <div className="body">
          <hr style={{ marginTop: 5, marginBottom: 5 }} />
          <div style={{ position: 'relative', zIndex: 9999 }}>
            <DatePicker
              className="text-black mb-1"
              dateFormat="yyyy-MM-dd"
              selected={
                changedRegDate == null || changedRegDate == ''
                  ? new Date(memberInfo.yoyakuDate)
                  : new Date(changedRegDate)
              }
              onChange={(date) =>
                changeLessonDate_temp(
                  memberInfo.yoyakuDate,
                  memberInfo.yoyakuWeekday,
                  date,
                  memberInfo.dateTimeChangeMemo
                )
              }
              style={{
                width: '150px',
                height: '30px',
                zIndex: 1000,
              }}
            />
            <TimePicker
              className="ml-2"
              showSecond={false}
              format="HH:mm"
              minuteStep={30}
              defaultValue={moment(memberInfo.yoyakuTime, 'HH:mm')}
              value={changedRegTime || moment(memberInfo.yoyakuTime, 'HH:mm')}
              onChange={(value) => {
                if (value) {
                  changeLessonTime_temp(value, memberInfo.dateTimeChangeMemo)
                }
              }}
              style={{
                backgroundColor: 'white',
                color: 'gray',
                fontSize: '20px',
                width: '60px',
                marginRight: '10px',
                border: '1px solid gray',
                borderRadius: '5px',
              }}
            />{' '}
            <button
              style={{ width: '80px' }}
              type="button"
              className="btn-sm btn-info text-white"
              onClick={() => {
                changeLessonDateTime(
                  memberInfo.member_barcode_num,
                  memberInfo.teacher_barcode_num,
                  memberInfo.teacher_name,
                  memberInfo.homework_id,
                  memberInfo.yoyakuDate,
                  memberInfo.yoyakuTime,
                  memberInfo.yoyakuWeekday,
                  memberInfo.dateTimeChangeMemo
                )
              }}
            >
              change
            </button>
          </div>
        </div>
        {/* <div className="body" style={{ textAlign: 'center' }}>
          <p>スケジュールを変更してください。</p>
        </div> */}
        <div className="footer">
          <button
            onClick={() => closeModal(false)}
            id="cancelBtn"
            style={{ width: '100px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalChangeLessonSchedule
