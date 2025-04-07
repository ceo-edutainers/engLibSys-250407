import React, { useState, useEffect } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import Router, { useRouter } from 'next/router'

function TutorTop() {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  const [tutorInfo, setTutorInfo] = useState([])
  const [loginStatus, setLoginStatus] = useState()
  // const timeConverter = (thisDate, thisTime) => {
  //   var T_timezone = localStorage.getItem('T_timezone')
  //   var T_countryCode = localStorage.getItem('T_countryCode')
  //   var T_now_summer_time = localStorage.getItem('T_now_summer_time')

  //   var thisTimeStamp = thisDate + 'T' + thisTime + ':00.000+08:00'
  //   console.log('thisTimeStamp', thisTimeStamp)
  //   var d = new Date(
  //     thisTimeStamp
  //     // '2020-04-13T00:00:00.000+08:00'
  //   ) /* midnight in China on April 13th */
  //   // d.toLocaleString('en-US', { timeZone: T_timezone })
  //   var tutorLessonTime = d.toLocaleString(T_countryCode, {
  //     timeZone: T_timezone,
  //   })
  //   return tutorLessonTime
  // }

  // function changeDatetimeByTimezone(datetime) {
  //   var T_timezone = localStorage.getItem('T_timezone')
  //   const parsedDateAsUtc = moment
  //     .utc()
  //     .startOf('day')
  //     .add(datetime.substring(0, 2), 'hours')
  //     .add(datetime.substring(3, 5), 'minutes')
  //   return parsedDateAsUtc.clone().tz(T_timezone).format('hh:mm')
  // }
  //
  useEffect(() => {
    var loginS = localStorage.getItem('T_loginStatus')

    if (loginS == null) {
      localStorage.setItem('T_loginStatus', false)

      setLoginStatus(false)
      // console.log('test1: ', loginStatus)
    }
    if (loginS == 'true') {
      setLoginStatus(true)
      // console.log('test2: ', loginStatus)
    }

    if (loginS == 'false') {
      setLoginStatus(false)
      // console.log('test3: ', loginStatus)
    }
  })
  useEffect(() => {
    var tbn = localStorage.getItem('tbn')

    if (loginStatus == 'true') {
      axios
        .post(DB_CONN_URL + '/tutor_info_tbn', {
          tbn: tbn,
        })
        .then((response) => {
          //errorの場合
          if (!response.data.status) {
            alert(response.data.message) //for test
          } else {
            setTutorInfo(response.data.response[0])

            //console.log('tbn', response.data.response[0].teacher_barcode_num)
          }
        })
    }
  }, [])

  const [lessonInfoST, setLessonInfoST] = useState([])
  // const [userName, setUserName] = useState()
  useEffect(() => {
    var tbn = localStorage.getItem('tbn')

    var url = DB_CONN_URL + '/get-sys_member_lesson_set_BtoB-for-tutor/'
    var Url = url + tbn

    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          if (!response.data.status) {
          } else {
            setLessonInfoST(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
    // }
  }, [])

  const [lessonInfoDI, setLessonInfoDI] = useState([])
  // const [userName, setUserName] = useState()
  useEffect(() => {
    var tbn = localStorage.getItem('tbn')

    var url =
      DB_CONN_URL + '/get-sys_member_lesson_set_BtoB-for-tutor-discussion/'
    var Url = url + tbn

    const fetchData1 = async () => {
      try {
        axios.get(Url).then((response) => {
          if (!response.data.status) {
          } else {
            setLessonInfoDI(response.data.response)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
    // }
  }, [])

  let logOut = () => {
    // setT_LoginStatus(false)
    localStorage.removeItem('T_token')
    localStorage.removeItem('T_loginStatus')
    localStorage.removeItem('T_email')
    localStorage.removeItem('tbn')
    router.push('/t_login')
  }

  return (
    <React.Fragment>
      <div className="col-lg-12 col-md-12 mt-2" style={{ textAlign: 'left' }}>
        {!loginStatus}
        <Link href="/t_login">
          <a className="btn btn-primary" onClick={logOut}>
            LOGOUT
          </a>
        </Link>
      </div>
      <div className="container">
        <div className="row pt-3">
          {lessonInfoST.map((val, key) => {
            var lessonPageLink =
              '/tutor/panel/showandtell?m=' +
              val.member_barcode_num +
              '&cN=' +
              val.courseName +
              '&course=' +
              val.course +
              '&sB=' +
              val.subject +
              '&tbn=' +
              val.teacher_barcode_num +
              '&homework_id=' +
              val.homework_id

            return (
              <>
                <div
                  className="col-lg-5 col-md-12  p-5 m-3"
                  style={{
                    border: '1px solid #dedede',
                    borderRadius: '10px',

                    textAlign: 'center',
                  }}
                >
                  <h2>{val.subject}</h2>
                  <h3 style={{ color: 'darkGreen' }}>{val.name_eng}</h3>

                  <p> {val.teacher_name}</p>
                  <p>
                    Lesson Date:{val.yoyakuDate}/{val.yoyakuTime}
                  </p>
                  {/* {localStorage.getItem('T_timezone') != 'Asia/Tokyo' && (
                    <>
                      <h6>{localStorage.getItem('T_timezone')}:</h6>
                      <h5 style={{ color: 'red' }}>
                        {timeConverter(val.yoyakuDate, val.yoyakuTime)}
                      </h5>
                    </>
                  )} */}

                  {/* <p>{val.homework_id}</p> */}

                  <a href={lessonPageLink}>
                    <button className="btn btn-danger">Lesson Page</button>
                  </a>
                  <div
                    className="mt-2"
                    style={{
                      // border: '1px solid #dedede',
                      // borderRadius: '10px',

                      cursor: 'pointer',
                    }}
                  >
                    <a href={val.classLink} target="_blank">
                      <img
                        src="https://images-na.ssl-images-amazon.com/images/I/31X9eeywR3L.jpg"
                        style={{ width: '50px', height: 'auto' }}
                      />
                    </a>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <div className="row pt-3">
          {lessonInfoDI.map((val, key) => {
            var lessonPageLink =
              '/tutor/panel/discussion?m=' +
              val.member_barcode_num +
              '&cN=' +
              val.CourseName +
              '&tbn=' +
              val.teacher_barcode_num +
              '&homework_id=' +
              val.homework_id

            return (
              <>
                <div
                  className="col-lg-5 col-md-12  p-5 m-3"
                  style={{
                    border: '1px solid #dedede',
                    borderRadius: '10px',

                    textAlign: 'center',
                  }}
                >
                  <h2>{val.subject}</h2>
                  <h3 style={{ color: 'darkGreen' }}>{val.name_eng}</h3>

                  <p> {val.teacher_name}</p>
                  <p>
                    Lesson Date:{val.yoyakuDate}/{val.yoyakuTime}
                  </p>
                  {/* {localStorage.getItem('T_timezone') != 'Asia/Tokyo' && (
                    <>
                      <h6>{localStorage.getItem('T_timezone')}:</h6>
                      <h5 style={{ color: 'red' }}>
                        {timeConverter(val.yoyakuDate, val.yoyakuTime)}
                      </h5>
                    </>
                  )} */}

                  {/* <p>{val.homework_id}</p> */}

                  <a href={lessonPageLink}>
                    <button className="btn btn-secondary">Lesson Page</button>
                  </a>
                  <div
                    className="mt-2"
                    style={{
                      // border: '1px solid #dedede',
                      // borderRadius: '10px',

                      cursor: 'pointer',
                    }}
                  >
                    <a href={val.classLink} target="_blank">
                      <img
                        src="https://images-na.ssl-images-amazon.com/images/I/31X9eeywR3L.jpg"
                        style={{ width: '50px', height: 'auto' }}
                      />
                    </a>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>

      {/* <YouMightLikeTheCourses /> */}
    </React.Fragment>
  )
}

export default TutorTop
