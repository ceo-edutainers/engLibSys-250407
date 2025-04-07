// CSS mypage_for_adult.css

import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyHeaderMenu from '@/components/MypageGroup/myHeaderMenu'
import { QuizContext } from '@/components/MypageGroup/Contexts'
import CalendarStudyHistory from '@/components/MypageGroup/CalendarStudyHistory'
import CalendarStudyHistory2 from '@/components/MypageGroup/CalendarStudyHistory2'
import CalendarTest from '@/components/MypageGroup/CalendarTest'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faDoorOpen,
  faChartBar,
  faTrash,
  faPenSquare,
  faFileAudio,
  faHeadphones,
  faCubes,
  faLaptop,
  faFile,
} from '@fortawesome/free-solid-svg-icons'

// ['menu', 'playing', 'finished']

function App() {
  const { myMbn, setMyMbn, userName, setUserName } = useContext(QuizContext)
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [G_loginStatus, setG_LoginStatus] = useState(false) //login時
  const router = useRouter() //使い方：router.replace('/')
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isNotReady, setIsNotReady] = useState(false)
  const [myHistoryList, setMyHistoryList] = useState([])
  const [myPointList, setMyPointList] = useState([])
  const [monsterList, setMonsterList] = useState([])
  // const [HWID, setHWID] = useState('') //homework_idを入れる
  const [practiceTempId, setPracticeTempId] = useState('')
  // const [eikenLevel, setEikenLevel] = useState('')

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    var subject = 'READING'

    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-member-history/'
        var Url = url + mbn + '&' + subject
        // alert(mbn)
        const response = await axios.get(Url)
        // alert(response.data.message)
        if (response.data.length > 0) {
          setMyHistoryList(response.data)
        } else {
        }

        console.log(response.data)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData2()
  }, [])

  //Point
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    var subject = 'READING'

    const fetchData2 = async () => {
      try {
        var url = DB_CONN_URL + '/get-hw-member-point-history/'
        var Url = url + mbn
        // alert(mbn)
        const response = await axios.get(Url)
        // alert('point' + response.data.message)
        if (response.data.length > 0) {
          setMyPointList(response.data)
        } else {
        }

        console.log('response.data', response.data)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData2()
  }, [])

  //Monster
  useEffect(() => {
    if (router.isReady) {
      var mbn = router.query.mbn
      var url = DB_CONN_URL + '/get-member-monster-history-detail-daily/'
      var Url = url + mbn
      // alert(Url)
      const fetchData = async () => {
        try {
          const response = await axios.get(Url)
          if (response.data.length) {
            // alert(response.data.length)
            setMonsterInfo(response.data.response)

            // console.log('info:', response.data.response)
          } else {
            // setPointInfo()
          }
        } catch (error) {
          alert(error)
        }
      }
      fetchData()
    }
  }, [router.isReady])

  useEffect(() => {
    // ブラウザバックを禁止する
    const fetchData = async () => {
      try {
        history.pushState(null, null, location.href)
        window.addEventListener('popstate', (e) => {
          setIsOpenBackMypage(true)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return false
  }, [])

  useEffect(() => {
    if (
      localStorage.getItem('loginStatus') !== 'true' ||
      !localStorage.getItem('loginStatus')
    ) {
      alert('先にログインしてください。')
      router.push('/loginGroup/')
    }
  }, [G_loginStatus])

  useEffect(() => {
    if (localStorage.getItem('loginStatus') == 'true') {
      const fetchData1 = async () => {
        try {
          if (practiceTempId == '') {
            //practiceTempIdはこのページをリロードしたら新しくなる。

            var tempid = Math.floor(Math.random() * 999999999999999)
            setPracticeTempId(tempid)
            console.log('practiceTempId-ない時:', practiceTempId)
          } else {
            console.log('practiceTempId-ある時:', practiceTempId)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData1()
    }
  }, [])

  const [loginStatus, setLoginStatus] = useState(false) //login時
  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('MypageMbn', '')
    localStorage.removeItem('name_eng', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
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
          <div
            className="col-lg-12 col-md-12 mt-3 mb-3"
            style={{
              width: '100%',
              textAlign: 'center',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <p
              style={{
                backgroundColor: '#F7DC6F',
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
              <ruby>
                学習歴<rt>かくしゅうれき</rt>
              </ruby>
              <p> My Study History </p>
              <p>{userName}</p>
            </p>

            {/* <p style={{ color: '#212F3D', fontSize: '15px' }}>
              終了したレッスンのリストです。閲覧ボタンを押すと、添削ドキュメントが見れます。
            </p> */}
          </div>
          {/* <div className="col-lg-12 col-md-12 mt-3 mb-3">
            <CalendarStudyHistory />
          </div> */}
          <CalendarTest />
          <CalendarStudyHistory2 />

          <div className="col-lg-12 col-md-12 mt-3 mb-3">
            {myPointList &&
              myPointList.map((val, key) => {
                return (
                  <>
                    <p>
                      {' '}
                      {val.grouping_column}&nbsp;|&nbsp;{val.homework_id}
                      &nbsp;|&nbsp;
                      {val.totalPoint}
                      &nbsp;|&nbsp;
                    </p>
                  </>
                )
              })}
          </div>
          <div className="col-lg-12 col-md-12 mt-3 mb-3">
            <table className="table">
              <thead>
                <tr>
                  <th>課題番号</th>
                  <th>レッスン日</th>
                  <th>Step</th>
                  <th>スタート</th>
                  <th>終了</th>
                  <th>ポイント</th>
                  <th>ファイヤー</th>

                  {/* <th>添削ファイル</th> */}
                </tr>
              </thead>
              {myHistoryList &&
                myHistoryList.map((val, key) => {
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>{val.homework_id}</td>
                          <td>{val.yoyakuDate}</td>
                          <td>{val.step}</td>
                          <td>
                            {val.startDate}&nbsp;{val.startTime}
                          </td>
                          <td>
                            {val.endDate}&nbsp;{val.endTime}
                          </td>
                          <td>
                            {' '}
                            {myPointList &&
                              myPointList.map((val1, key2) => {
                                if (
                                  val.startDate == val1.grouping_column &&
                                  // val.step == val1.pointStep &&
                                  val.homework_id == val1.homework_id
                                ) {
                                  if (val1.totalPoint > 0) {
                                    var totalPoint = val1.totalPoint
                                  }
                                }
                                return <>{totalPoint}</>
                              })}
                          </td>
                          <td>{val.fireView}</td>

                          {/* <td>
                            <a href={val.google_doc_link} target="_blank">
                              <span className="btn btn-danger">添削閲覧</span>
                            </a>
                          </td> */}
                        </tr>
                      </tbody>
                    </>
                  )
                })}
              {!myHistoryList && <p>履歴がありません。</p>}
            </table>
          </div>
        </div>
        <SweetAlert
          title="前のページに戻ることはできません。"
          show={isOpenBackMypage}
          onConfirm={() => setIsOpenBackMypage(false)}
          confirmBtnText="戻らない"
          cancelBtnText=""
          showCancel={false}
          reverseButtons={true}
          style={{ width: '600px' }}
        >
          <p>
            前のページに戻るとこのステップのポイントは無効になりますので、ご注意ください。
          </p>
        </SweetAlert>
        <SweetAlert
          title="サービス準備中です。"
          show={isNotReady}
          onConfirm={() => setIsNotReady(false)}
          onCancel={() => {
            setIsNotReady(false)
          }}
          confirmBtnText="OK"
          // cancelBtnText="戻る"
          showCancel={false}
          reverseButtons={true}
          style={{ width: '600px' }}
        >
          <p>近日中にサービス開始予定です。</p>
        </SweetAlert>
      </div>

      <CopyrightFooter />
    </div>
  )
}

export default App
