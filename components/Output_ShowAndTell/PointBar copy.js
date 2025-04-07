import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import { QuizContext } from './Contexts'
import Router from 'next/router'
import QrcodeGenerator from '@/components/readingSelfcourse/QrcodeGenerator'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
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

const PointBar = ({ cStep, pageTitle, bcolor, pointKeyNum }) => {
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
  const [pointInfo, setPointInfo] = useState([])
  const [thisStepPoint, setThisStepPoint] = useState()
  const [thisStepPointMulti, setThisStepPointMulti] = useState('')

  const [pointNoMulti, setPointNoMulti] = useState(
    'このステップでゲットできるポイントです。次のステップに行く時にポイントが加算されます(同じ課題で一回のみ)'
  )

  const [pointNoMulti2, setPointNoMulti2] = useState(
    'このステップでゲットできるポイントです。次のステップに行く時にポイントが加算されます(200単語以上書いた場合1回のみ)'
  )

  const [pointMulti, setPointMulti] = useState(
    'このステップでゲットできるポイントです。次のステップに行く時にポイントが加算されます(毎回)'
  )
  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    yoyakuDate,
    setYoyakuDate,
    yoyakuTime,
    setYoyakuTime,
    thisSubject,
    setThisSubject,
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
    userName,
    setUserName,
    point,
    setPoint,
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
    // alert(pointKeyNum)
    var Url = DB_CONN_URL + '/get-point-set-info/' + pointKeyNum

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        //alert(response.data.message)
        //alert(response.data.length)
        //setHWbookInfo(response.data)
        setPointInfo(response.data)
        setThisStepPoint(response.data[0].getPoint)
        setThisStepPointMulti(response.data[0].multiplePointAdd)
        //alert(pointInfo)
        console.log('pointInfo', pointInfo)
        console.log('thisStepPoint', thisStepPoint)
        console.log('thisStepPointMulti', thisStepPointMulti)
      } catch (error) {
        console.log(error)
        alert(error)
      }

      // setLoading(false)
    }

    fetchData()
  }, [])

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

        if (cStep == 'Step2OST') {
          setPointNoMulti(pointNoMulti2)
        }
        // console.log('totalPoint', totalPoint)
        // console.log('todaysPoint', todaysPoint)
        // console.log('HWtotalPoint', HWtotalPoint)
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
        className="QuizBigShowandtell mb-0 mt-1"
        style={{ backgroundColor: '#dedede', border: 0, color: 'black' }}
      >
        {/* <MediaQuery query="(min-width: 767px)"> */}
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-5 col-md-12"
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
                    color: 'black',
                    fontSize: '30px',
                  }}
                >
                  <font color="black">
                    <b>
                      {pageTitle}
                      {/* {pageTitle == 'Input-Self-Shadowing' && 'SHADOWING'}
                        {pageTitle == 'Input-Self-Reading' && 'READING'} */}
                    </b>
                  </font>
                  {/* &nbsp;|&nbsp; {cStep} */}
                  {/* <span style={{ fontSize: '30px' }}>{currentStep}</span> */}
                  {/* {cStep == 'Step1' && <p style={{ fontSize: 15 }}></p>} */}
                </span>
                {/* <h6
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    {userName}
                  </h6> */}
              </div>
            </div>
            <div
              className="col-lg-2 col-md-12 p-0"
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src="images/logo-tomei.png" style={{ width: '50%' }} />
            </div>

            <div
              className="col-lg-4 col-md-12  "
              style={{
                textAlign: 'right',
              }}
            >
              <div className="banner-content">
                <h4
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  <span
                    style={{ color: '#2C3E50' }}
                    aria-label="全てのコースからゲットした今日のポイント"
                    data-balloon-pos="left"
                    data-balloon-length="medium"
                  >
                    Today:{!todaysPoint ? 0 : todaysPoint}point
                  </span>
                </h4>
                <span
                  aria-label="全てのコースからゲットした今までのトータルポイント"
                  data-balloon-pos="right"
                  data-balloon-length="medium"
                  style={{ color: 'black' }}
                >
                  Total:
                  {!totalPoint ? 0 : totalPoint}point
                </span>
              </div>
            </div>
            <div
              className="col-lg-1 col-md-12 mr-0 pr-0"
              style={{
                textAlign: 'right',
              }}
            >
              {pointInfo.map((val, key) => {
                return (
                  <>
                    <div className="single-courses-item-box  mr-0 pr-0">
                      {val.multiplePointAdd == '' ? (
                        <div
                          className="courses-image mt-3  mr-0 pr-0"
                          aria-label={pointMulti}
                          data-balloon-pos="right"
                          data-balloon-length="medium"
                        >
                          <div className="price shadow  mr-0 pr-0">
                            <p
                              style={{
                                fontSize: '10px',
                                color: 'white',
                                paddingTop: '5px',
                                paddingBottom: 0,
                                marginBottom: 0,
                                lineHeight: 2.5,
                                marginTop: 0,
                              }}
                            >
                              獲得可能
                            </p>
                            {thisStepPoint}p
                          </div>
                        </div>
                      ) : (
                        <div
                          className="courses-image mt-3  mr-0 pr-0"
                          aria-label={pointNoMulti}
                          data-balloon-pos="right"
                          data-balloon-length="medium"
                        >
                          <div
                            className="price shadow  mr-0 pr-0"
                            style={{ lineHeight: 1 }}
                          >
                            <p
                              style={{
                                fontSize: '10px',
                                color: 'white',
                                paddingTop: '5px',
                                paddingBottom: 0,
                                marginBottom: 0,
                                lineHeight: 2.5,
                                marginTop: 0,
                              }}
                            >
                              獲得可能
                            </p>
                            {thisStepPoint}p
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        {/* </MediaQuery> */}
        {/* <MediaQuery query="(max-width: 767px)">
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
                      color: 'black',
                    }}
                  >
                    <font color="black">{pageTitle}</font>
                  </span>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-12 p-0"
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></div>
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
                      color: 'black',
                    }}
                  >
                    <span style={{ color: 'red', fontSize: '20px' }}>
                      {todaysPoint}
                    </span>
                    /{totalPoint}&nbsp;point
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </MediaQuery> */}
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
