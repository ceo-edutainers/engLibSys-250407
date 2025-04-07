import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import { QuizContext } from './ContextsA'
import Router from 'next/router'
import QrcodeGenerator from '@/components/readingSelfcourse/QrcodeGenerator'
import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import SweetAlert from 'react-bootstrap-sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons'

const PointBar = ({ cStep, pageTitle, bcolor }) => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const [thisBgColor, setThisBgColor] = useState(bcolor)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)

  // const [isGoNextPage, setIsGoNextPage] = useState(false)
  // const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  // const [currentStep, setCurrentStep] = useState('Step1') //
  // const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  // const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  // const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  // const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  // const [pointKeyNum, setPointKeyNum] = useState('RR-1') //DBのsys_point_set テーブルの pointKeyNum
  // const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる

  // const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)

  // const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')
  const [totalPoint, setTotalPoint] = useState()
  const [todaysPoint, setTodaysPoint] = useState()
  const [HWtotalPoint, setHWtotalPoint] = useState()
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    englibLevelColor,
    setEnglibLevelColor,
    thisSubject,
    setThisSubject,
    leastRecordCount_step2,
    setLeastRecordCount_step2,
    leastRecordCount_step3,
    setLeastRecordCount_step3,
    bookCoverImgUrl,
    setBookCoverImgUrl,
    bookImgUrl,
    setBookImgUrl,
    bookAudioUrl,
    setBookAudioUrl,
    seriesName,
    setSeriesName,
    bookStory,
    setBookStory,
    shadowingLevel,
    setshadowingLevel,
    bookTitle,
    setBookTitle,
    storyStartPage,
    setStoryStartPage,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    storyTitle,
    setStoryTitle,
    practiceTempId,
    setPracticeTempId,
    audioOnOff,
    setAudioOnOff,
    course,
    setCourse,
    courseName,
    setCourseName,
    pageView,
    setPageView,
    courseLevel,
    setCourseLevel,
    textbook,
    setTextbook,
    eikenLevel,
    setEikenLevel,
    userName,
    setUserName,
    point,
    setPoint,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)

  useEffect(() => {
    // ブラウザバックを禁止する
    const fetchData = async () => {
      try {
        history.pushState(null, null, location.href)
        window.addEventListener('popstate', (e) => {
          setIsOpenBackMypage(true)
          // alert(
          //   'ブラウザバックはできません。練習をやめる時はページの下にある練習を止めるボタンを押してください。'
          // )
          // history.go(1)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return false
  }, [])

  const [loginStatus, setLoginStatus] = useState(false) //login時
  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('name_eng', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginGroup')
  }

  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    //console.log('step2/myMbn:', myMbn)

    var Url = DB_CONN_URL + '/get-member-point-history/' + mbn + '&' + HWID

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        //alert(response.data.totalPoint)

        setTotalPoint(response.data.totalPoint)
        setTodaysPoint(response.data.todaysPoint)
        setHWtotalPoint(response.data.HWtotalPoint)
        console.log('totalPoint', totalPoint)
        console.log('todaysPoint', todaysPoint)
        console.log('HWtotalPoint', HWtotalPoint)
        // setHWbookInfo(response.data)
        // setAudioDurtaionFromDB(response.data[0].audioDuration)
        // setHWID(response.data[0].homework_id)
      } catch (error) {
        console.log(error)
        alert(error)
        // setError(true)
      }

      // setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <div
        className="QuizBig mb-0 mt-1"
        style={{ backgroundColor: '#AB7BE6', border: 0, color: 'white' }}
      >
        <MediaQuery query="(min-width: 767px)">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-4 col-md-12"
                style={{
                  textAlign: 'left',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="banner-content">
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                      fontSize: '21px',
                    }}
                  >
                    <font color="white">
                      <b>
                        {pageTitle == 'Input-Self-Shadowing' && 'SHADOWING'}
                        {pageTitle == 'Input-Self-Reading' &&
                          'INTENSIVE READING'}
                      </b>
                    </font>
                    <font color="white" style={{ fontSize: '25px' }}>
                      <b> {pageTitle == 'SHOW AND TELL' && 'SHOW AND TELL'}</b>
                    </font>
                    {/* &nbsp;|&nbsp; {cStep} */}
                    {/* <span style={{ fontSize: '30px' }}>{currentStep}</span> */}
                    {/* {cStep == 'Step1' && <p style={{ fontSize: 15 }}></p>} */}
                  </span>
                  {/* <h6
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    {userName}
                  </h6> */}
                </div>
              </div>
              <div
                className="col-lg-4 col-md-12 p-0"
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {pageView ? (
                  <div className="banner-content">
                    <img
                      src={bookCoverImgUrl}
                      width="50px"
                      className="mr-2"
                      style={{ border: '1px solid white' }}
                    />
                    <img
                      src={bookImgUrl}
                      width="50px"
                      style={{ border: '1px solid white' }}
                    />
                  </div>
                ) : (
                  <>
                    <QrcodeGenerator url="https://www.google.com" />
                    <span
                      style={{ textAlign: 'center', cursor: 'grab' }}
                      className="p-5 mt-1"
                      onClick={logOut}
                    >
                      logout
                    </span>
                  </>
                )}
              </div>
              <div
                className="col-lg-4 col-md-12  "
                style={{
                  textAlign: 'right',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="banner-content">
                  <h3
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    <span
                      style={{ color: 'yellow', fontSize: '30px' }}
                      aria-label="今日のポイント"
                      data-balloon-pos="left"
                      data-balloon-length="medium"
                    >
                      {!todaysPoint || todaysPoint == 0 ? '0' : todaysPoint}
                    </span>
                    /
                    <span
                      aria-label="今回の課題のトータルポイント"
                      data-balloon-pos="right"
                      data-balloon-length="medium"
                    >
                      {!HWtotalPoint || HWtotalPoint == 0 ? '0' : HWtotalPoint}p
                    </span>
                  </h3>
                  <p
                    aria-label="今までのトータルポイント"
                    data-balloon-pos="right"
                    data-balloon-length="medium"
                    style={{ color: 'black' }}
                  >
                    {!totalPoint || totalPoint == 0 ? '0' : totalPoint}p
                  </p>
                  {/* <h6
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    Group Ranking:
                    <span style={{ color: 'yellow', fontSize: '20px' }}>9</span>
                    /20
                  </h6> */}
                </div>
              </div>
              {pageView && (
                <div
                  className="col-lg-12 col-md-12  "
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p style={{ color: 'white', fontSize: '12px' }}>
                    {bookTitle}
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    {storyTitle} &nbsp;&nbsp;|&nbsp;&nbsp;
                    {/* {shadowingLevel}test &nbsp;&nbsp;|&nbsp;&nbsp; */}
                    {storyNum}&nbsp;&nbsp;|&nbsp;&nbsp;
                    {storyStartPage}
                    &nbsp;page~
                  </p>
                </div>
              )}
            </div>
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          {' '}
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-4 col-md-12"
                style={{
                  textAlign: 'left',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="banner-content">
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    <font color="yellow">
                      <b>{pageTitle}</b>
                    </font>
                    {/* &nbsp;|&nbsp; {cStep} */}
                    {/* <span style={{ fontSize: '30px' }}>{currentStep}</span> */}
                    {/* {cStep == 'Step1' && <p style={{ fontSize: 15 }}></p>} */}
                  </span>
                  <h6
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    {userName}
                  </h6>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-12 p-0"
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {pageView ? (
                  <div className="banner-content">
                    <img
                      src={bookCoverImgUrl}
                      width="50px"
                      className="mr-2"
                      style={{ border: '1px solid white' }}
                    />
                    <img
                      src={bookImgUrl}
                      width="50px"
                      style={{ border: '1px solid white' }}
                    />
                  </div>
                ) : (
                  <>
                    <QrcodeGenerator url="https://www.google.com" />
                    <span
                      style={{ textAlign: 'center', cursor: 'grab' }}
                      className="p-5 mt-1"
                      onClick={logOut}
                    >
                      logout
                    </span>
                  </>
                )}
              </div>
              <div
                className="col-lg-4 col-md-12  "
                style={{
                  textAlign: 'right',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="banner-content">
                  <h6
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    <span style={{ color: 'yellow', fontSize: '20px' }}>
                      {!todaysPoint || todaysPoint == 0 ? '0' : todaysPoint}
                    </span>
                    /{!totalPoint || totalPoint == 0 ? '0' : totalPoint}p
                    <p
                      aria-label="今回の課題のトータルポイント"
                      data-balloon-pos="right"
                      data-balloon-length="medium"
                    >
                      total:
                      {!HWtotalPoint || HWtotalPoint == 0 ? '0' : HWtotalPoint}p
                    </p>
                  </h6>
                </div>
              </div>
              {pageView && (
                <div
                  className="col-lg-12 col-md-12  "
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p style={{ color: 'white', fontSize: '12px' }}>
                    {bookTitle}
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    {storyTitle}
                    <br />
                    {shadowingLevel}&nbsp;&nbsp;|&nbsp;&nbsp;
                    {storyNum}&nbsp;&nbsp;|&nbsp;&nbsp;
                    {storyStartPage}
                    &nbsp;page~
                  </p>
                </div>
              )}
            </div>
          </div>
        </MediaQuery>

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
      </div>
    </>
  )
}

export default PointBar
