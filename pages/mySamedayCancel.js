// CSS mypage_for_adult.css

import react, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'

import MyHeaderMenu from '@/components/MypageGroup/myHeaderMenu'
import Swal from 'sweetalert2'

// ['menu', 'playing', 'finished']

function App() {
  const DB_CONN_URL = process.env.DB_CONN_URL

  const [classAutoid, setClassAutoid] = useState()
  const [reason, setReason] = useState()
  const [selectedSubject, setSelectedSubject] = useState()
  const [selectedWeekday, setSelectedWeekday] = useState()
  const [nextLessonDate, setNextLessonDate] = useState()
  const [illCancel, setIllCancel] = useState(false)

  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const router = useRouter() //使い方：router.replace('/')
  // const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [isAcceptCancel, setIsAcceptCancel] = useState(false)
  const [isAlreadyCanceled, SetAlreadyCanceled] = useState(false)

  const [myLessonInfo, setMyLessonInfo] = useState([])
  const [username, setUsername] = useState()
  const [myLessonCount, setMyLessonCount] = useState(0)
  //この生徒さんの本日のレッスンを調べる。
  const showAlert = () => {
    Swal.fire({
      title: '当日キャンセルを受け付けました。',
      text: '当日キャンセルされたレッスンは戻すことはできませんので、ご注意ください。',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        // 사용자가 'OK'를 클릭했을 때 실행할 함수
        // alert('1')
        // router.push('/mySamedayCancel')

        // router.replace('/mySamedayCancel')
        router.replace('/mytopGroup')
      }
    })
  }

  useEffect(() => {
    getTodaysLesson()
  }, [])

  const getTodaysLesson = () => {
    var mbn = localStorage.getItem('MypageMbn')

    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/get-todays-lesson/'
        var Url = url + mbn

        const response = await axios.get(Url)
        // alert(response.data.message)

        if (response.data.length > 0) {
          setMyLessonCount(response.data.length)
          setMyLessonInfo(response.data)
          setUsername(response.data[0].name_eng)
          setNextLessonDate() //1回目以上キャンセルをした時リロードされた時のためにリセットさせる。
        } else {
        }
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData()
  }

  useEffect(() => {
    if (
      localStorage.getItem('loginStatus') !== 'true' ||
      !localStorage.getItem('loginStatus')
    ) {
      alert('先にログインしてください。')
      router.push('/loginGroup/')
    }
  }, [G_loginStatus])

  // useEffect(() => {
  //   NextLessonDateFunc(selectedWeekday, selectedSubject)
  // }, [selectedWeekday, selectedSubject])

  function NextLessonDateFunc(selectedWeekday, selectedSubject) {
    var mbn = localStorage.getItem('MypageMbn')
    var Url = DB_CONN_URL + '/NEXT-LESSON-DATE-FOR-CANCELLED-LESSON'

    const fetchData = async () => {
      try {
        axios
          .post(Url, {
            mbn: mbn,
            mainSubject: selectedSubject,
            weekday: selectedWeekday,
          })
          .then((response) => {
            // alert(response.data.nextLessonDate)
            //var nextLessonDate = response.data.nextLessonDate
            setNextLessonDate(response.data.nextLessonDate)
          })
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
    fetchData()
  }

  const handleSubmit = async () => {
    setIsNotReady(false)

    var mbn = localStorage.getItem('MypageMbn')

    var url = DB_CONN_URL + '/reg-todays-lesson-cancel'

    const fetchData = async () => {
      if (reason == '' || reason == null) {
        alert('詳細な理由をご記入ください。')
        return false
      }

      try {
        axios
          .post(url, {
            mbn: mbn,
            autoid: classAutoid,
            reason: reason,
            nextLessonDate: nextLessonDate,
            illCancel: illCancel,
          })
          .then((response) => {
            if (!response.data.status) {
              //status==false
              if (response.data.message == 'already accepted lesson') {
                SetAlreadyCanceled(true)
                getTodaysLesson()
                return false
              }
            } else {
              //trueの場合

              // setIsAcceptCancel(true)
              setReason()
              setIllCancel(false)
              setClassAutoid()
              showAlert()
            }
            getTodaysLesson()
          })
      } catch (error) {
        alert(error)
      }
    }

    fetchData()
  }

  return (
    <div className="AppBig">
      {/* <MonsterGet /> */}
      {/* <p> {practiceTempId}</p> */}

      <MyHeaderMenu />
      <div
        className="QuizMpa"
        style={{
          backgroundColor: 'white',
          border: '10px solid #EBEDEF',
          width: '90%',
          margin: '20px',
        }}
      >
        <div className="row">
          <center>
            <div
              className="col-lg-6 col-md-6 mt-3 mb-3"
              style={{
                width: '100%',
                textAlign: 'center',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
              <p
                style={{
                  backgroundColor: '#F69D83',
                  width: '100%',
                  border: '1px solid #dedede',
                  borderRadius: '10px',
                  margin: '0px',
                  padding: '10px',
                  fontSize: '20px',
                  fontWeight: 'normal',
                  color: 'black',
                  textAling: 'center',
                }}
              >
                当日レッスンのキャンセルフォーム
                <br />
                {username}
              </p>
            </div>
            <div
              className="col-lg-8 col-md-8 mt-3 mb-3"
              style={{
                width: '100%',
                textAlign: 'left',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
              <p style={{ marginTop: '10px', color: 'red' }}>
                <b>【注意①】</b>
                レッスン当日のキャンセルについては、メールでの受付ができません。必ず以下のフォームから送信してください。
                <br />
                <b>【注意②】</b>当日キャンセルは基本振替対象にはなりません。
                <br />
                <b>【注意③】</b>
                Wi-Fiやパソコンの不具合などの技術的な問題でレッスンに参加できない場合は、直接お電話いただくようお願いします。TEL:050-3553-1440
                <br />
                <b>【注意④】</b>
                レッスンスタート時間の10分前まで当日キャンセルの申込が可能です。当日キャンセル申込なしで、レッスンに現れない場合は、no-show扱いとなりますので、先生からレッスン参加お願いのメールが送信される場合があります。
              </p>

              {/* <p style={{ color: '#212F3D', fontSize: '15px' }}>
              終了したレッスンのリストです。閲覧ボタンを押すと、添削ドキュメントが見れます。
            </p> */}
            </div>
            {myLessonCount > 0 ? (
              <>
                {' '}
                <div className="col-lg-12 col-md-12 mt-3 mb-3">
                  <div className="col-lg-6 col-md-6 mt-3 mb-3 ">
                    <div className="form-group color-black">
                      <select
                        className="form-control"
                        onChange={(e) => {
                          const { autoid, subject, weekday } = JSON.parse(
                            e.target.value
                          )
                          setClassAutoid(autoid)
                          setSelectedSubject(subject)
                          setSelectedWeekday(weekday)
                          NextLessonDateFunc(weekday, subject)
                        }}
                      >
                        <option value="" selected>
                          {' '}
                          当日キャンセルするレッスンをお選びください。
                        </option>
                        {myLessonInfo?.map((val, key) => {
                          // var qnum = key + 1
                          return (
                            <>
                              <option
                                value={JSON.stringify({
                                  autoid: val.autoid,
                                  subject: val.subject,
                                  weekday: val.origYoyakuWeekday,
                                })}
                              >
                                クラス名：{val.subject} / 生徒名：
                                {val.name_eng} / 予約日時：
                                {val.yoyakuDate}:{val.yoyakuTime} / 担当講師：
                                {val.teacher_name}.T
                              </option>
                            </>
                          )
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="キャンセル理由(必ず詳細な理由をご記入ください)"
                        onChange={(e) => {
                          setReason(e.target.value)
                        }}
                      ></textarea>
                    </div>
                    <hr />
                    <p style={{ margin: 0, color: '#2A2A2A' }}>
                      [振替例外]
                      本人または同居家族が急病になり、且つ生徒さんがレッスンに参加できない状況になった場合、医療機関からの領収書などの証明書を提出した場合のみ振替対象になります。
                    </p>
                    <div
                      className="form-group"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                      }}
                    >
                      <input
                        id="ill-cancel-checkbox"
                        className="form-control"
                        type="checkbox"
                        checked={illCancel}
                        onChange={() => {
                          setIllCancel(!illCancel)
                        }}
                        style={{
                          width: '20px',
                          height: '20px',
                          verticalAlign: 'middle',
                          marginRight: '10px',
                        }}
                      />
                      <label
                        htmlFor="ill-cancel-checkbox"
                        style={{ margin: 0, color: '#2A2A2A' }}
                      >
                        [振替希望] 例外な理由で当日キャンセルをする
                      </label>
                    </div>
                    <hr />
                    <div
                      className="form-group"
                      style={{ display: 'flex', alignItems: 'left' }}
                    >
                      <input
                        type="file"
                        size="lg"
                        style={{
                          width: '50%',
                          marginRight: '20px',
                          color: '#2A2A2A',
                          border: '1px solid #2A2A2A',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      />
                      <label
                        style={{
                          margin: 0,
                          color: '#2A2A2A',
                          textAlign: 'left',
                        }}
                      >
                        病院の領収書(本日付)など、ファイルをアップロードしてください。当時から三日以内にアップロード可能です。
                      </label>
                      <hr />
                    </div>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={() => {
                        // setIsNotReady(true)
                      }}
                      // disabled={disabled}
                    >
                      通常のキャンセルはこちらから
                    </button>{' '}
                    <button
                      className="btn btn-danger"
                      type="submit"
                      onClick={() => {
                        setIsNotReady(true)
                      }}
                      // disabled={disabled}
                    >
                      上記の内容で当日キャンセルをする
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {' '}
                <div className="col-lg-12 col-md-12 mt-3 mb-3">
                  <h5>
                    本日のレッスンはありません。
                    <br />
                    管理者へお問い合わせください。online-help@edutainers.jp
                  </h5>
                </div>
              </>
            )}
          </center>
        </div>

        <SweetAlert
          title="当日のキャンセルをしますか？"
          show={isNotReady}
          onConfirm={() => handleSubmit()}
          onCancel={() => {
            setIsNotReady(false)
          }}
          confirmBtnText="はい、キャンセルします。"
          cancelBtnText="戻る"
          showCancel={true}
          reverseButtons={false}
          style={{ width: '600px' }}
        >
          <p>キャンセル後にはレッスン参加はできませんので、ご注意ください。</p>
        </SweetAlert>

        <SweetAlert
          title="当日キャンセルを受け付けました。"
          show={isAcceptCancel}
          onConfirm={() => setIsAcceptCancel(false)}
          // onCancel={() => {
          //   setIsAcceptCancel(false)
          // }}
          confirmBtnText="閉じる"
          // cancelBtnText="戻る"
          showCancel={false}
          reverseButtons={false}
          style={{ width: '600px' }}
        >
          <p>キャンセル後にはレッスン参加はできませんので、ご注意ください。</p>
        </SweetAlert>
        <SweetAlert
          title="既に当日キャンセル処理されたレッスンです。"
          show={isAlreadyCanceled}
          onConfirm={() => SetAlreadyCanceled(false)}
          // onCancel={() => {
          //   setIsAcceptCancel(false)
          // }}
          confirmBtnText="閉じる"
          // cancelBtnText="戻る"
          showCancel={false}
          reverseButtons={false}
          style={{ width: '600px' }}
        ></SweetAlert>
      </div>

      <CopyrightFooter />
    </div>
  )
}

export default App
