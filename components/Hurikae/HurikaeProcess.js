import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  myfun_weekdayToJapanese,
  myfun_getdayofweek,
  myfun_myRegDate,
  myfun_myRegTime,
} from '@/components/FunctionComponent'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment-timezone'
import 'react-datepicker/dist/react-datepicker.css'
import { formatToTimeZone } from 'date-fns-timezone'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import { red } from '@material-ui/core/colors'
import { AddAlertRounded, EcoSharp } from '@material-ui/icons'
import SweetAlert from 'react-bootstrap-sweetalert'
import Modal from '@/components/modal/ModalHurikaeWaitingInfo'

const HurikaeProcess = () => {
  //modal
  const [openModal, setOpenModal] = useState(false)
  const [mbnModal, setMbnModal] = useState()
  const [course, setCourse] = useState()
  const [courseSubject, setCourseSubject] = useState()
  const [courseName, setCourseName] = useState()
  const [absent_weekday, setAbsent_weekday] = useState()
  const [absent_date, setAbsent_date] = useState()
  const [absent_time, setAbsent_time] = useState()

  const [myHurikaeWaitingList, setMyHurikaeWaitingList] = useState([])
  const [selectedLesson, setSelectedLesson] = useState()

  useEffect(() => {
    hurikaeWaitingList()
  }, [])

  function hurikaeWaitingList() {
    var mbn = localStorage.getItem('MypageMbn')
    axios
      .get(DB_CONN_URL + '/select-hurikae-mbn-waiting/' + mbn)
      .then((response) => {
        setMyHurikaeWaitingList(response.data)

        //console.log('response.data:', response.data)
      })
  }

  // function hurikaeWaitingDetails(value) {
  //   var mbn = localStorage.getItem('MypageMbn')

  //   axios
  //     .get(
  //       DB_CONN_URL + '/select-hurikae-mbn-selectedLesson/' +
  //         mbn +
  //         '&' +
  //         value
  //     )
  //     .then((response) => {
  //       console.log('response.data:', response.data)
  //       var arr = []
  //       arr = response.data
  //       //setHurikaeDetail(response.data)
  //     })
  // }

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
          <Modal
            closeModal={setOpenModal}
            mbn={mbnModal}
            selectedLesson={selectedLesson}
            course={course}
            courseSubject={courseSubject}
            courseName={courseName}
            absent_weekday={absent_weekday}
            absent_date={absent_date}
            absent_time={absent_time}

            // tbn={localStorage.getItem('tbn')}
            // email={localStorage.getItem('email')}
            // T_email={localStorage.getItem('T_email')}
          />
        </div>
      )}

      <div>
        <div className="container p-0m-0">
          <div className="row p-0 m-0">
            <div
              className="col-sm-12 p-4 mb-3"
              style={{ backgroundColor: 'white' }}
            >
              <p style={{ alignItems: 'center', fontWeight: '600' }}>
                担当先生の空きスケジュールと合わない場合、以下の方から振替依頼を先生に送りましょう！先生からOKメッセージが来たら振替できます。
                先生からできないメッセージが来たら6ヶ月間有効のレッスン切符としてキープできます。
              </p>
            </div>
            <div className="col-sm-12 ml-0 ">
              <b>
                <p style={{ color: 'red', marginBottom: 0 }}>
                  {/* <i className="flaticon-heart"></i> */}
                  {/* &nbsp;{myLessonList.length} */}
                  &nbsp;先生の返事待ちリスト
                  {myHurikaeWaitingList.length == 0 && 'がありません。'}
                </p>
              </b>
            </div>

            <div className="col-sm-12 ml-2 ">
              {myHurikaeWaitingList.map((val, key) => {
                return (
                  <div className="mb-2">
                    <label className="form-check-label" for="gridRadios1">
                      <b>
                        {key + 1}. {val.courseSubject}[{val.courseName}
                        ]&nbsp;コース
                      </b>
                      :&nbsp;[
                      {myfun_weekdayToJapanese(val.absent_weekday)}]&nbsp;
                      休む日：{val.absent_date}&nbsp;{val.absent_time}
                      <button
                        className="btn-sm btn-info ml-2"
                        onClick={() => {
                          setSelectedLesson(val.lesson_set_autoid)
                          setOpenModal(true)
                          setMbnModal(val.member_barcode_num)
                          setCourseSubject(val.Course)
                          setCourseSubject(val.courseSubject)
                          setCourseName(val.courseName)
                          setAbsent_weekday(val.absent_weekday)
                          setAbsent_date(val.absent_date)
                          setAbsent_time(val.absent_time)
                        }}
                      >
                        詳細
                      </button>
                    </label>

                    {/* <button
                      className="btn-sm btn-danger"
                      style={{ height: '30px' }}
                      onClick={() => {
                        setSelectedLesson(val.lesson_set_autoid)
                      }}
                    >
                      キャンセル
                    </button> */}
                  </div>
                )
              })}
              <hr />
            </div>
          </div>
        </div>

        <div className="col-sm-12 mt-3 mb-2 text-center">
          <Link href="/mypage">
            <a>
              <button
                className="btn btn-info"
                style={{ fontSize: 20, fontWeight: 500 }}
              >
                マイページへ戻る
              </button>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HurikaeProcess
