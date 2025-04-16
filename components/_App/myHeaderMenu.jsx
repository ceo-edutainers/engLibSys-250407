// CSS mypage_for_adult.css

import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Link from '@/utils/ActiveLink'
import SweetAlert from 'react-bootstrap-sweetalert'
import Router, { useRouter } from 'next/router'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { QuizContext } from '@/components/MypageGroup/Contexts'
// import MonsterGetTopage from '../readingSelfcourse/MonsterGetTopage'
import MonsterGetTopage from '@/components/readingSelfcourse/MonsterGetTopage'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import RealTime from '@/components/Time/RealTime'
// import MonsterGet from '@/components/myPageGroup/MonsterGet'
// import ViewReadingLevel from '@/components/myPageGroup/ViewReadingLevel'
// import ViewOthersHomework from '@/components/myPageGroup/ViewOthersHomework'
// import FireViewReading from '@/components/readingSelfcourse/FireView'
// import FireViewShadowing from '@/components/shadowingSelfcourse/FireView'

import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import NavbarEnglib from '@/components/_App/NavbarEnglib'
import QrcodeGeneratorForEvent from '@/components/readingSelfcourse/QrcodeGeneratorForEvent'
// import yey from '/images/yey.jpg'
function App({ mst }) {
  const {
    myMbn,
    setMyMbn,
    userName,
    setUserName,
    memberSort,
    // englibLevel,
    // setEnglibLevel,
  } = useContext(QuizContext)

  const [qrLinkUrl, setQrLinkUrl] = useState()

  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  const [isTodayLessonDay, setIsTodayLessonDay] = useState(false)
  const [isTodayLessonTime, setIsTodayLessonTime] = useState(false)
  const [nokoriMin, setNokoriMin] = useState()
  const [isNotReady, setIsNotReady] = useState(false)
  const [isMessageCheck, setIsMessageCheck] = useState(false)
  //振替

  const [viewTutorMessage, setViewTutorMessage] = useState(false)
  const [freeFeeHowto, setFreeFeeHowto] = useState(false)

  const [isTodayHoliday, setIsTodayHoliday] = useState()
  const [todayDate, setTodayDate] = useState()
  const [todayWeekday, setTodayWeekday] = useState()

  const [myRefNum, setMyRefNum] = useState()

  const [isMessageConfirm, setIsMessageConfirm] = useState(false)

  const [ruleURL, setRuleURL] = useState()

  useEffect(() => {
    // alert(mst)
    if (mst == 'PERSONAL') {
      setRuleURL(
        // document/Student-Rule-2024-3-ver4.pdf'
        `https://${PUBLIC_R2_DOMAIN}/document/Student-Rule-2024-3-ver4.pdf`
      )
    } else if (mst == 'COMPANY') {
      setRuleURL(
        // document/Student-Rule-Company-2022-9-ver3.pdf'
        `https://${PUBLIC_R2_DOMAIN}/document/Student-Rule-Company-2022-9-ver3.pdf`
      )
    }
  }, [mst])

  useEffect(() => {
    // if (localStorage.getItem('loginStatus') == 'true') {
    var mbn = localStorage.getItem('MypageMbn')
    var url = DB_CONN_URL + '/member_info_mbn'
    axios
      .post(url, {
        mbn: mbn,
      })
      .then((response) => {
        if (!response.data.status) {
        } else {
          setMyRefNum(response.data.response[0].refNum)
          const thisRfn = response.data.response[0].refNum
          const eID = '9584rrf89'

          var qrUrl =
            DB_CONN_URL + '/event-intro-reg?eID=' + eID + '&rfn=' + thisRfn
          setQrLinkUrl(qrUrl)
        }
      })
    // }
  }, [])

  const [memoInfo, setMemoInfo] = useState([])

  useEffect(() => {
    verbList()
  }, [])

  function verbList() {
    const fetchData2 = async () => {
      try {
        var mbn = localStorage.getItem('MypageMbn')
        var Url = DB_CONN_URL + '/get-memo-for-mom/' + mbn
        const response = await axios.get(Url)
        if (response.data.length > 0) {
          setMemoInfo(response.data.response)
        } else {
          setMemoInfo()
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData2()
  }

  function funMessageConfirm(autoid) {
    const fetchData = async () => {
      try {
        var mbn = localStorage.getItem('MypageMbn')
        var Url = DB_CONN_URL + '/update-confirm-memo-for-mom/' + autoid
        const response = await axios.get(Url)
        if (response.data.status) {
          alert('メッセージの確認情報が先生に送信されました。')
          verbList()
        } else {
          alert('情報がありません。')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  useEffect(() => {
    // if (localStorage.getItem('loginStatus') == 'true') {
    var url = DB_CONN_URL + '/holiday-oshirase-new'

    const fetchData1 = async () => {
      // setError(false)
      // setLoading(true)

      try {
        axios.get(url).then((response) => {
          setTodayDate(response.data.Today)
          if (response.data.status == true) {
            // alert(response.data.response[0].day_of_the_week)
            // alert(response.data.response[0].lessonday_normal)
            setTodayWeekday(response.data.response[0].day_of_the_week)
            setIsTodayHoliday(response.data.response[0].lessonday_normal)
          } else {
            alert(
              'カレンダーの設定に問題があります。管理者へお問合せください。'
            )
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData1()
    // }
  }, [])

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      alert('コピーしました。')
    } catch (err) {
      alert('Failed to copy!')
    }
  }
  //今日がレッスン日なのかをチェック
  const checkIsTodayLessonDay = () => {
    if (localStorage.getItem('loginStatus') == 'true') {
      var mbn = localStorage.getItem('MypageMbn')

      const fetchData2 = async () => {
        try {
          if (localStorage.getItem('memberSort') == 'PERSONAL') {
            var url =
              DB_CONN_URL +
              '/get-hw-show-and-tell-info-first-page-from-lesson-set/'
            var Url = url + mbn + '&' + courseName
          } else {
            var url = DB_CONN_URL + '/get-hw-show-and-tell-info-first-page/'
            var Url = url + mbn
          }

          const response = await axios.get(Url)
          // alert(response.data.status)
          if (response.data.status == false) {
            alert(
              'レッスンが設定されてないか、もしくはキャンセルされたレッスンです。'
            )
          } else {
            var yoyakuDate = response.data[0].yoyakuDate
            var yoyakuTime = response.data[0].yoyakuTime

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

            if (NowRegdate !== yoyakuDate) {
              // alert(
              //   '本日はレッスン日では有りません。' + yoyakuDate + '/' + NowRegdate
              // )
              setIsTodayLessonDay(true)
              return false
            } else {
              //alert('レッスン日です。' + yoyakuDate + '/' + NowRegdate)

              var yoyakuHour = parseInt(yoyakuTime.split(':')[0])

              var yoyakuMin = parseInt(yoyakuTime.split(':')[1])
              // var yoyakuSec = parseInt(yoyakuTime.split(':')[2])
              var totalYoyakuHourToSec = yoyakuHour * 60 * 60
              var totalYoyakuMinToSec = yoyakuMin * 60
              var totalYayakuSec =
                parseInt(totalYoyakuHourToSec) + parseInt(totalYoyakuMinToSec)

              // alert(totalYoyakuHourToSec)
              // alert(totalYoyakuMinToSec)

              var nowHour = parseInt(NowRegtime.split(':')[0])
              var nowMin = parseInt(NowRegtime.split(':')[1])
              var nowSec = parseInt(NowRegtime.split(':')[2])
              var totalNowHourToSec = nowHour * 60 * 60
              var totalNowMinToSec = nowMin * 60
              var totalNowSec =
                parseInt(totalNowHourToSec) +
                parseInt(totalNowMinToSec) +
                parseInt(nowSec)

              //どのくらい残ってるのか
              var diff = totalYayakuSec - totalNowSec

              // var diff_min = parseInt(diff / 60)

              var nokori_min = parseInt(diff / 60)

              if (nokori_min > 60) {
                var nokori_h = parseInt(nokori_min / 60) //残り時間
                var nokori_h_min = parseInt(nokori_h * 60)
                var nokori_m = parseInt(nokori_min - nokori_h_min)
                setNokoriMin(
                  '本日のレッスン時間は' +
                    yoyakuTime +
                    'です。レッスン開始まであと' +
                    nokori_h +
                    '時間' +
                    nokori_m +
                    '分です'
                )
              } else {
                setNokoriMin(
                  '本日のレッスン時間は' +
                    yoyakuTime +
                    'です。レッスン開始まであと' +
                    nokori_min +
                    '分です'
                )
              }

              //10分前
              var tenMin = 10 * 60
              if (diff >= tenMin) {
                setIsTodayLessonTime(true)
                return false
              } else {
                router.replace('/lessonPreSAT') // ここでリダイレクト
                // alert(
                //   'レッスン開始' + totalYayakuSec + '/' + totalNowSec + '/' + diff
                //)
              }
            }
          }
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }

      fetchData2()
    }
  }
  let logOut = () => {
    // //setLoginStatus(false)
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

  function goDownload(url) {
    // alert(url)
    router.replace(url)
  }
  function goHistoryPage(url) {
    router.replace(url)
  }
  function goMytop(url) {
    router.replace(url)
  }

  //Message to Mom의 텍스트박스를 클릭시, 텍스트박스의 높이가 높아지도록 하기 위한 설정(START)
  // const [height, setHeight] = useState('100px') // 초기 높이 설정

  // const handleClick = () => {
  //   setHeight('200px') // 클릭 시 높이 변경
  // }
  //Message to Mom의 텍스트박스를 클릭시, 텍스트박스의 높이가 높아지도록 하기 위한 설정(END)

  //Message to Mom의 텍스트박스를 클릭시, 텍스트박스의 높이가 글자량에 따라서 자동으로 높아지도록 하기 위한 설정(START)
  const [text, setText] = useState('')

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const adjustHeight = (e) => {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  //Message to Mom의 텍스트박스를 클릭시, 텍스트박스의 높이가 글자량에 따라서 자동으로 높아지도록 하기 위한 설정(END)

  return (
    <>
      <div className="AppBig">
        <div
          className="col-lg-12 col-md-12 mt-2 pt-0 pb-0 mb-0"
          style={{ textAlign: 'right' }}
        >
          {mst == 'PERSONAL' && (
            <a
              className="btn btn-warning mr-2 pt-0 pb-0"
              onClick={() => {
                // setProlongLesson(!prolongLesson)
                setFreeFeeHowto(!freeFeeHowto)
              }}
            >
              {!freeFeeHowto
                ? 'お友達紹介キャンペーン'
                : 'お友達紹介キャンペーン(隠す)'}
            </a>
          )}
          {ruleURL && (
            <a
              className="btn btn-info mr-2 pt-0 pb-0"
              href={ruleURL}
              target="_blank"
            >
              生徒ルール
            </a>
          )}
          <a
            className="btn btn-info mr-2 pt-0 pb-0"
            // /document/ORT-HowToUse-2022-9-ver1.pdf"
            href={`https://${PUBLIC_R2_DOMAIN}/document/ORT-HowToUse-2022-9-ver1.pdf`}
            target="_blank"
          >
            ORC使用方法
          </a>
          <a
            className="btn btn-info mr-2 pt-0 pb-0"
            // /document/Payment-2024-2-ver2.pdf"
            href={`https://${PUBLIC_R2_DOMAIN}/document/Payment-2024-2-ver2.pdf`}
            target="_blank"
          >
            お月謝・教材費
          </a>
          <a
            // /calendar/Calendar-2023-4-2024-3-for-student.pdf"
            href={`https://${PUBLIC_R2_DOMAIN}/calendar/Calendar-2023-4-2024-3-for-student.pdf`}
            target="_blank"
          >
            <img src="/images/calendar-icon.png" width="40px" />
          </a>
          &nbsp; &nbsp;
          <a
            // /calendar/Calendar-2024-4-2025-3-for-student.pdf"
            href={`https://${PUBLIC_R2_DOMAIN}/calendar/Calendar-2024-4-2025-3-for-student.pdf`}
            target="_blank"
          >
            カレンダー
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span
            className="mt-0 pt-0 pb-0 mb-0"
            style={{
              // backgroundColor: '#dedede',
              cursor: 'grab',
              color: '#566573',
              fontWeight: 'bold',
              paddingRight: '5%',
              fontSize: '15px',
            }}
            onClick={logOut}
          >
            LOGOUT
          </span>
        </div>
        <div
          className="QuizMpa mt-3 pt-0"
          style={{
            backgroundColor: '#f5deb3',
            border: '1px solid #f5deb3',
            width: '90%',
            margin: '20px',
            padding: '20px',
            display: freeFeeHowto ? 'block' : 'none',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 p-3  ">
                <h2>
                  イングリブの10,000円分お月謝割引クーポンを獲得する方法があります。
                </h2>
                <hr />
                <ul
                  style={{
                    width: '70%',
                    marginLeft: '20%',
                    marginRight: '20%',
                    textAlign: 'left',
                    color: 'black',
                    listStyleType: 'square',
                  }}
                >
                  <li>
                    お友達紹介キャンペーン期間：2022年9月8日〜（定員に達し次第終了）
                  </li>
                  <li>募集人数：制限あり</li>
                  <li>生徒一人当たりの紹介人数：制限なし</li>
                  <li>被紹介者の対象年齢：年長から大人まで</li>
                  <li>
                    友達特典：無料体験レッスン＋イングリブのお月謝お支払いに使用できる10,000円分の割引クーポン＋ママのための英語発音ルールの1時間グループウェビナー2回券
                  </li>
                  <li>
                    生徒特典：イングリブのお月謝お支払いに使用できる10,000円分の割引クーポン(一人紹介あたり)
                  </li>
                  <li>
                    対象外：ご兄弟の場合、お友達紹介キャンペーンの対象外となりますが、その場合「兄弟割引」が適応されます。
                  </li>
                </ul>
                <hr style={{ borderTop: '5px dotted green' }} />
                <h2>Q.どうやったらいい？</h2>
                <h4
                  style={{
                    fontSize: '20px',
                    lineHeight: '1.6',
                  }}
                >
                  A.こちらのQRコードを写真で撮って関心のある方に送って下さい。
                  <br />
                  (QRコードが読み込めない方には、以下のリンクをコピーし、メールなどで送信して下さい。)
                  <br />
                  {qrLinkUrl}
                  <span
                    className="btn btn-info ml-2"
                    onClick={() => copyToClipBoard(qrLinkUrl)}
                  >
                    リンクをコピー
                  </span>
                  <br />
                  <br />
                  {qrLinkUrl && (
                    <QrcodeGeneratorForEvent
                      url={qrLinkUrl}
                      title="友達紹介キャンペーン"
                      size="200"
                    />
                  )}
                  <br />
                  <hr style={{ borderTop: '5px dotted green' }} />
                  このQRコードから無料体験登録をしてお友達が会員になった場合、紹介者はお月謝のお支払いに使用できる10,000円分の電子割引クーポンを獲得します。キャンペーン期間中に、1人の生徒さんにつき何人でも紹介いただけます。例えば、今回のキャンペーン期間中に6人紹介してくださった生徒さんは、60,000円分の割引クーポンを獲得できます。
                  お友達がたくさんいらっしゃる方は、この機会を是非見逃さないでください。
                  当キャンペーンは、定員人数に達した時点で終了となりますので、どうぞご了承ください。
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div
          className="QuizMpa mt-0 pt-0"
          style={{
            backgroundColor: '#ececec',
            border: '1px solid #D5D8DC',
            width: '90%',
            margin: '20px',
            padding: '20px',
          }}
        >
          <div className="container">
            <div className="row">
              <MediaQuery query="(max-width: 992px)">
                <div className="col-lg-12 col-md-12 p-0 mt-2 ">
                  <NavbarEnglib />
                </div>
              </MediaQuery>
              <div
                className="col-lg-12 col-md-12 mb-3"
                style={{ textAlign: 'center' }}
              >
                {/* <MonsterGet /> */}
              </div>
              <MediaQuery query="(min-width: 992px)">
                <div
                  className="col-lg-4 col-md-12 mb-3"
                  style={{
                    textAlign: 'center',
                    border: '1px solid darkgray',
                    borderRadius: '10px',
                    padding: '5px',
                  }}
                >
                  <p className="p-0">THIS WEEK'S RANKING</p>
                  <h1
                    style={{
                      fontWeight: '900',
                      fontSize: '60px',
                      paddingBottom: 0,
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 'bold' }}>
                      機能準備中
                    </span>
                  </h1>

                  <span
                    className="btn btn-warning pt-0 pb-0 mt-0"
                    style={{ fontSize: '12px' }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    もっと見る
                  </span>
                </div>

                <div className="col-lg-4 col-md-12 mb-0 pb-0">
                  <h1
                    style={{
                      fontWeight: '900',
                      fontSize: '50px',
                    }}
                  >
                    MY BEN
                    <p className="mt-0 pt-0" style={{ fontWeight: 'normal' }}>
                      <strong>B</strong>eyond <strong>E</strong>nglish&nbsp;
                      <strong>N</strong>ative
                    </p>
                  </h1>

                  {isTodayHoliday && isTodayHoliday == 'holiday' ? (
                    <>
                      <h2
                        className="pt-2"
                        style={{
                          color: 'red',
                          fontSize: '20px',
                          fontWeight: 'bold',
                        }}
                      >
                        今日はレッスン日ではありません。
                        <br />
                        {todayDate}&nbsp;[{todayWeekday}]
                      </h2>

                      <p style={{ fontSize: '12px', color: 'black' }}>
                        詳しくは
                        <a
                          // /calendar/2022_4_2023_3_1.pdf"
                          href={`https://${PUBLIC_R2_DOMAIN}/calendar/2022_4_2023_3_1.pdf`}
                          target="_blank"
                        >
                          カレンダー
                        </a>
                        をご参考にしてください。
                      </p>
                    </>
                  ) : (
                    <h2
                      className="pt-2"
                      style={{
                        color: 'red',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      {todayDate}&nbsp;[{todayWeekday}]
                    </h2>
                  )}
                  <h5 style={{ fontWeight: 'bold', fontSize: '25px' }}>
                    {/* <RealTime timeZone="JP/Tokyo" /> */}
                    <RealTime timeZone=" Asia/Tokyo" />
                  </h5>
                  <h5 className="mb-0">{userName}&nbsp;&nbsp;</h5>
                  {memberSort == 'COMPANY' && (
                    <>
                      {' '}
                      <br />
                      <span
                        className="btn btn-danger mb-2"
                        style={{
                          height: '50px',
                          border: '1px solid #cc99ff',
                          borderRadius: '10px',
                          fontSize: '15px',
                          fontWeight: 'normal',
                          color: 'white',
                          opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                          // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                        }}
                        onClick={() => {
                          // setIsTodayLessonDay(true)
                          checkIsTodayLessonDay()
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faLaptop}
                          size="1x"
                          color="white"
                        />
                        &nbsp; 今日のレッスン開始
                      </span>
                    </>
                  )}
                </div>
                <div
                  className="col-lg-4 col-md-12 mb-3"
                  style={{
                    textAlign: 'center',
                    border: '1px solid darkgray',
                    borderRadius: '10px',
                    padding: '5px',
                    backgroundColor: 'white',
                  }}
                >
                  <MonsterGetTopage mbn={myMbn} />
                  <p
                    style={{
                      color: 'violet',
                      fontSize: '12px',
                      paddingTop: 0,
                      marginTop: 0,
                    }}
                  >
                    ゲットしたモンスターは色が着きます。
                  </p>
                  <h1
                    style={{
                      fontWeight: '900',
                      fontSize: '60px',
                      paddingBottom: 0,
                    }}
                  >
                    {/* <span style={{ color: 'red' }}>13</span>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>
                    &nbsp;個
                  </span> */}
                    {/* &nbsp;/&nbsp;12
                  <span style={{ fontSize: '15px' }}>人中</span> */}
                  </h1>
                  {/* <span
                  className="btn btn-warning pt-0 pb-0 mt-0"
                  style={{ fontSize: '12px' }}
                  onClick={() => {
                    setIsNotReady(true)
                  }}
                >
                  もっと見る
                </span> */}
                </div>
              </MediaQuery>
              <MediaQuery query="(max-width: 992px)">
                <div className="col-lg-6 col-md-12 ">
                  <h1
                    style={{
                      fontWeight: '900',
                      fontSize: '50px',
                    }}
                  >
                    MY BEN
                  </h1>
                  <h5 className="mb-0">{userName}&nbsp;&nbsp;</h5>
                  {isTodayHoliday && isTodayHoliday == 'holiday' && (
                    <>
                      <h2
                        className="pt-2"
                        style={{
                          color: 'red',
                          fontSize: '20px',
                          fontWeight: 'bold',
                        }}
                      >
                        今日はレッスン日ではありません。
                      </h2>
                      <p style={{ fontSize: '12px', color: 'black' }}>
                        詳しくは
                        <a
                          // /calendar/2022_4_2023_3_1.pdf"
                          href={`https://${PUBLIC_R2_DOMAIN}/calendar/2022_4_2023_3_1.pdf`}
                          target="_blank"
                        >
                          カレンダー
                        </a>
                        をご参考にしてください。
                      </p>
                    </>
                  )}

                  {memberSort == 'COMPANY' && (
                    <>
                      {' '}
                      <br />
                      <span
                        className="btn btn-danger mb-2"
                        style={{
                          height: '50px',
                          border: '1px solid #cc99ff',
                          borderRadius: '10px',
                          fontSize: '15px',
                          fontWeight: 'normal',
                          color: 'white',
                          opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                          // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                        }}
                        onClick={() => {
                          // setIsTodayLessonDay(true)
                          checkIsTodayLessonDay()
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faLaptop}
                          size="1x"
                          color="white"
                        />
                        &nbsp; 今日のレッスン開始
                      </span>
                    </>
                  )}
                </div>
                <div
                  className="col-lg-6 col-md-12 mb-3"
                  style={{
                    textAlign: 'center',
                    border: '1px solid darkgray',
                    borderRadius: '10px',
                    padding: '5px',
                    backgroundColor: 'white',
                  }}
                >
                  <MonsterGetTopage mbn={myMbn} />
                  <p
                    style={{
                      color: 'violet',
                      fontSize: '12px',
                      paddingTop: 0,
                      marginTop: 0,
                    }}
                  >
                    ゲットしたモンスターは色が着きます。
                  </p>
                  <h1
                    style={{
                      fontWeight: '900',
                      fontSize: '60px',
                      paddingBottom: 0,
                    }}
                  >
                    {/* <span style={{ color: 'red' }}>13</span>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>
                    &nbsp;個
                  </span> */}
                    {/* &nbsp;/&nbsp;12
                  <span style={{ fontSize: '15px' }}>人中</span> */}
                  </h1>
                  {/* <span
                  className="btn btn-warning pt-0 pb-0 mt-0"
                  style={{ fontSize: '12px' }}
                  onClick={() => {
                    setIsNotReady(true)
                  }}
                >
                  もっと見る
                </span> */}
                </div>
              </MediaQuery>
            </div>

            <div className="row" style={{ textAlign: 'center' }}>
              <MediaQuery query="(min-width: 992px)">
                <div className="col-lg-12 col-md-12 ">
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      // setIsNotReady(true)
                      goMytop('/mytopGroup')
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      &nbsp;
                    </p>
                    <FontAwesomeIcon icon={faLaptop} size="1x" color="black" />{' '}
                    &nbsp;TOP
                  </button>
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      // setIsNotReady(true)
                      goDownload('/myDownload')
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      単語帳など
                    </p>
                    ダウンロード
                  </button>
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      友達の宿題を
                    </p>
                    見てみる
                  </button>
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',

                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      知らない
                    </p>
                    単語リスト
                  </button>
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',

                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      単語・文法など
                    </p>
                    毎日クイズ
                  </button>
                  {/* <a href="/myGroupHistory"> */}
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',
                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                      // goHistoryPage('/myPersonalHistory')
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      &nbsp;
                    </p>
                    学習歴
                  </button>
                  {/* </a> */}
                  <button
                    style={{
                      backgroundColor: 'white',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #cc99ff',
                      borderRadius: '10px',

                      verticalAlign: '50%',
                      alignItems: 'center',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      color: 'black',
                      opacity: '100%', //今日がレッスン日ではない場合？色を薄くする
                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      // setIsNotReady(true)
                      goHistoryPage('/myGroupHistory')
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      &nbsp;
                    </p>
                    ﾚｯｽﾝ歴
                  </button>
                  <button
                    className="btn btn-light"
                    style={{
                      // backgroundColor: 'orange',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #17a2b8',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      color: 'black',
                      padding: 0,

                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      請求・領収書
                    </p>
                    PAYMENT
                  </button>
                  {/* <Link href="/hurikaeEntry2"> */}
                  <button
                    className="btn btn-light"
                    style={{
                      // backgroundColor: 'orange',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid #17a2b8',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      color: 'black',
                      padding: 0,

                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    <p
                      style={{
                        fontSize: '10px',
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      makeup
                    </p>
                    振替・休み
                  </button>
                  {/* </Link> */}
                  <button
                    className="btn btn-warning"
                    style={{
                      // backgroundColor: 'orange',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid orange',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      color: 'black',
                      padding: 0,

                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setIsNotReady(true)
                    }}
                  >
                    無料英検
                    <br />
                    ﾚﾍﾞﾙ測定
                  </button>
                  {/* <button
                    className="btn btn-danger"
                    style={{
                      // backgroundColor: 'orange',
                      width: '15%',
                      minWidth: '130px',
                      height: '50px',
                      border: '1px solid orange',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginBottom: 0,
                      color: 'white',
                      padding: 0,

                      // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                    }}
                    onClick={() => {
                      setViewTutorMessage(!viewTutorMessage)
                    }}
                  >
                    先生からの
                    <br />
                    メッセージ
                  </button> */}
                </div>
              </MediaQuery>
            </div>

            <div className="row mt-3">
              <div
                className="col-lg-6 col-md-12 mb-2"
                style={{ textAlign: 'center' }}
              >
                {/* <ViewReadingLevel /> */}
              </div>
              <div
                className="col-lg-6 col-md-12"
                style={{ textAlign: 'center' }}
              >
                {/* <ViewOthersHomework /> */}
              </div>
              <div className="col-lg-12 col-md-12 mt-2">
                <span
                  className="btn btn-danger"
                  style={{
                    border: '1px solid orange',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: 0,
                    color: 'white',
                    padding: 5,

                    // disabled: 'disabled', //今日がレッスン日ではない場合？使えないようにする
                  }}
                  onClick={() => {
                    setViewTutorMessage(!viewTutorMessage)
                    verbList()
                  }}
                >
                  {!viewTutorMessage
                    ? ' 先生からのメッセージを見る(最新5件まで)'
                    : ' 先生からのメッセージを隠す'}
                </span>
              </div>
              <div
                className="col-lg-12 col-md-12 mt-2"
                style={{
                  textAlign: 'center',
                  overflow: 'scroll',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  display: viewTutorMessage ? 'block' : 'none',
                }}
              >
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                      >
                        届いた日
                      </th>
                      <th
                        scope="col"
                        style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                      >
                        コース
                      </th>
                      <th
                        scope="col"
                        style={{ width: '10%', backgroundColor: '#DEDEDE' }}
                      >
                        先生名{' '}
                      </th>

                      <th
                        scope="col"
                        style={{ width: '40%', backgroundColor: '#DEDEDE' }}
                      >
                        メッセージ
                      </th>
                      <th
                        scope="col"
                        style={{ width: '30%', backgroundColor: '#DEDEDE' }}
                      >
                        確認後クリック
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {memoInfo?.map((val, key) => {
                      // var qnum = key + 1
                      return (
                        <>
                          <tr>
                            <td>
                              {val.lessonMemoForMom_senddatetime == '' ||
                              val.lessonMemoForMom_senddatetime == null
                                ? val.yoyakuDate
                                : val.lessonMemoForMom_senddatetime}
                            </td>
                            <td>{val.subject}</td>
                            <td>{val.teacher_name}</td>
                            <td>
                              {' '}
                              {/* <div
                                dangerouslySetInnerHTML={{
                                  __html: val.lessonMemoForMom,
                                }}
                              ></div> */}
                              {/* {val.lessonMemoForMom} */}
                              <textarea
                                spellcheck="false"
                                id="story"
                                name="lessonMemoForMom"
                                // rows="20"
                                // cols="33"
                                style={{
                                  fontSize: '.9rem',
                                  // letterSpacing: '1px',
                                  padding: '5px',
                                  width: '100%',
                                  maxWidth: '100%',
                                  lineHeight: '1.2',
                                  borderRadius: '0px',
                                  overflowY: 'hidden',
                                  // border: '1px solid #ccc',
                                  // boxShadow: '1px 1px 1px #999',
                                }}
                                // onClick={handleClick}

                                onChange={handleTextChange}
                                onClick={adjustHeight}
                                value={val.lessonMemoForMom}
                              ></textarea>{' '}
                            </td>
                            <td>
                              {val.chkMemo == 'ok' ? (
                                <span
                                  style={{ color: 'red', fontWeight: 'bold' }}
                                >
                                  確認済
                                </span>
                              ) : (
                                <span
                                  className="btn btn-warning"
                                  onClick={() => {
                                    funMessageConfirm(val.autoid)
                                  }}
                                >
                                  確認したら押す
                                </span>
                              )}
                            </td>
                          </tr>
                        </>
                      )
                    })}
                    <tr>
                      <td colspan="4">
                        {!memoInfo && (
                          <p>先生からのメッセージががありません。</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SweetAlert
        title="今日はレッスン日ではありません。"
        show={isTodayLessonDay}
        onConfirm={() => setIsTodayLessonDay(false)}
        onCancel={() => {
          setIsTodayLessonDay(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>レッスン開始時間の10分前からクリックできます。</p>
      </SweetAlert>
      <SweetAlert
        title="レッスンスタート時間の10分前からアクセスできます。"
        show={isTodayLessonTime}
        onConfirm={() => setIsTodayLessonTime(false)}
        onCancel={() => {
          setIsTodayLessonTime(false)
        }}
        confirmBtnText="OK"
        // cancelBtnText="戻る"
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>{nokoriMin}</p>
      </SweetAlert>
      <SweetAlert
        title="近日中にサービス開始予定です。"
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
    </>
  )
}

export default App
