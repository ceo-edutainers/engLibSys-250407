import React, { useContext, useEffect, useState, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'

const App = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL

  const [isDel, setIsDel] = useState(false)
  const [trialAutoid, setTrialAutoid] = useState()

  // const trialStatusList = [
  //   '[auto]trial-reg: studentが体験を申込んだ時/[mailto:student/admin]',
  //   'sent-first-email: englibが最初のメールを送る時[体験Scheduleお願い]', //リンクから体験のスケジュールをいくつか選ぶようにする。
  //   'no-first-try-schedule-email-returned: 3日たっても、メールに返事がない時',
  //   're-first-try-schedule-email: 再度first emailを送る',

  //   '[auto]returned-first-try-schedule: trial-studentがスケジュールを選んだ時に自動で変更される/体験スケジュールのメールもくる/adminにもメールが来る',

  //   '[auto]trial-lesson-scheduled: 先生がスケジュールを選んだ時/[mailto:student/admin/tutor]にスケジュール確定のメールが行く',

  //   'trial-lesson-finished-student-will-not-join: 体験が終わって、studentが入会をしないと話をした時',
  //   'trial-lesson-finished-waiting-student-feedback-will-contact-later: 体験が終わって、入会をすぐ決められない時',
  //   'trial-lesson-finished-will-join:trialレッスンが終了し、入会を決めたstudentへ次のステップの案内メールを送る/',

  //   '[auto]returned-enterace-document: studentが入会フォームを記入した時/[mailto:student:お月謝、教材案内]',
  //   'waiting-tutors-ok:適切なtutorへお知らせメールをする [mailto:tutor:studentが提案したscheduleを送る]',
  //   'adjusting-tutor-re-schedule: 先生がスケジュールが合わなくて、再調整している時',
  //   'class-scheduled: 先生がOKをして、スケジュールを確定したら',

  //   'setting-to-lesson: レッスンを設定している時/[mailto:student]/[mailto:tutor]',
  //   'completed: 全ての設定が終わった時: [mailto:student]/[mailto:tutor]',
  // ]

  const trialStatusList = [
    'completed',
    'trial-reg',
    'sent-first-email',
    'no-first-email-returned',
    'trial-lesson-scheduled',
    'trial-lesson-finished',
    'no-lesson-feedback',
    'will-not-join',
    'will-join',
    'class-scheduled',
    'setting-to-lesson',
  ]

  const [dataInfo, setDataInfo] = useState([])
  const [dataInfoLength, setDataInfoLength] = useState()

  useEffect(() => {
    trialApply()
  }, [])

  function trialApply() {
    var status = 'trial-reg'
    var Url = DB_CONN_URL + '/check-trial-apply/' + status

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setDataInfo(response.data)
        setDataInfoLength(response.data.length)
        // setAudioDurtaionFromDB(response.data[0].audioDuration)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  //update trial info
  const handleStatusChange = async (status, autoid) => {
    var Url = DB_CONN_URL + '/update-trial-status/' + status + '&' + autoid

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setDataInfo(response.data.message)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  //delete trial info
  const handleStatusDel = async () => {
    const autoid = trialAutoid

    var Url = DB_CONN_URL + '/del-trial-status/' + autoid

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setTrialAutoid('')
        setIsDel(false)
        trialApply()
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }
  return (
    <>
      <div className="col-lg-12 col-md-12">
        Not-Completed {dataInfo.length}人<br />
        {dataInfo.map((val) => {
          if (val.gender == 'female') {
            var gender = '女'
          } else {
            var gender = '男'
          }
          return (
            <>
              <b>{val.apply_date}&nbsp;</b>
              <select>
                <option selected>Statusを選ぶ</option>
                {trialStatusList.map((statusList) => {
                  return (
                    <option
                      value={statusList}
                      selected={statusList == val.status && 'selected'}
                    >
                      {statusList}
                    </option>
                  )
                })}
              </select>
              {/* <b style={{ color: 'red', marginLeft: '10px' }}>[{val.status}]</b> */}
              &nbsp;{val.name_eng}&nbsp;|&nbsp;
              {gender}&nbsp;|&nbsp;
              {val.grade}&nbsp;|&nbsp;
              {val.mobilephone}&nbsp;|&nbsp;
              {val.pref}
              {val.city}
              <span className="btn-sm btn-danger p-2 mr-2 ml-2 ">
                <a
                  href={`mailto:${val.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  email
                </a>
              </span>
              <span
                className="btn-sm btn-primary p-2 mr-2 ml-2 "
                type="submit"
                onClick={() => {
                  setTrialAutoid(val.autoid)
                  setIsDel(true)
                }}
              >
                DEL{trialAutoid}
              </span>
              <hr />
            </>
          )
        })}
      </div>
      <SweetAlert
        title="削除しますか？"
        show={isDel}
        onConfirm={() => handleStatusDel()}
        onCancel={() => {
          setIsDel(false)
        }}
        confirmBtnText="DEL"
        // cancelBtnText="NO"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '500px' }}
      ></SweetAlert>
    </>
  )
}

export default App
