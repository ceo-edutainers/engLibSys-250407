import React, { useContext, useEffect, useState, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import { QuizContext } from '@/components/readingSelfcourse/ContextsB'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import SweetAlert from 'react-bootstrap-sweetalert'
import Upload from '@/components/readingSelfcourse/uploadBookQuestion'
//import { Questions } from '../../pages/quizhelper/Questions'
import ViewBookQuestionFile from '@/components/readingSelfcourse/viewBookQuestionFileB'
import { red } from '@material-ui/core/colors'
import Router, { useRouter } from 'next/router'
const EndScreen = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')
  //////////////////////////////////////////////
  //BASIC SETTING NEED START
  //////////////////////////////////////////////
  //この学習では120ポイント以上をゲットすると次のstoryへ行ける
  const [cutlinePointToNextStory, setCutlinePointToNextStory] = useState(20)
  const [pointDifference, setPointDifference] = useState()
  ///BASIC SETTING NEED END/////////////////////
  const fileInput = useRef()
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
    levelOrder,
    setLevelOrder,
    readingLevel,
    setReadingLevel,
    bookTitle,
    setBookTitle,
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
  const [isFileAru, setIsFileAru] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [fileDetail, setFileDetail] = useState('Mindmap')
  const [isFileSelected, setIsFileSenected] = useState(false)
  const [answerFile, setAnswerFile] = useState('')
  const [isGoNextStory, setIsGoNextStory] = useState(false)

  const restartQuiz = () => {
    // setPoint(0)
    localStorage.removeItem('holdTempId', '')
    var tempid = Math.floor(Math.random() * 999999999999999)
    setPracticeTempId(tempid)
    setPageView('menu')
  }

  const insertPointToDB = () => {
    var mbn = localStorage.getItem('MypageMbn')
    var pointStep = currentStep

    var url = DB_CONN_URL + '/sys-point-member-history-insert'
    axios
      .post(url, {
        mbn: mbn,
        homework_id: HWID,
        pointKeyNum: pointKeyNum,
        pointStep: pointStep,
        practiceTempId: practiceTempId,
      })
      .then((response) => {
        if (!response.data.status) {
          // alert(response.data.message) //for test
          //alert('ポイントゲット!!!')

          console.log('##pointKeyNum', pointKeyNum)
          console.log('##HWID', HWID)
          console.log('##currentStep', currentStep)
          console.log('##practiceTempId', practiceTempId)
        } else {
          //alert(response.data.message)
        }
      })
  }
  const PUBLIC_R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
  useEffect(() => {
    let audioEndAlert = new Audio(
      `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
    )
    audioEndAlert.play()
  }, [])

  // useEffect(() => {
  //   function endSoundPlay() {
  //     if (audioOnOff == 'on') {
  //       let audioEndAlert = new Audio(
  //         `https://${PUBLIC_R2_DOMAIN}/sound-effect/complete.mp3`
  //       )
  //       audioEndAlert.play()
  //     }
  //   }
  // }, [])

  const [HWPointInfo, setHWPointInfo] = useState([])
  const [totalLastPoint, setTotalLastPoint] = useState()
  const [firstLastRecording, setFirstLastRecording] = useState([])
  const [firstRecordFile, setFirstRecordFile] = useState()
  const [lastRecordFile, setLastRecordFile] = useState()
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる

  // const setTotalPoint = () => {
  //   var tp = HWPointInfo.reduce(
  //     (a, v) => (a = parseInt(a) + parseInt(v.getPoint)),
  //     0
  //   )
  //   alert(tp)
  //   //この学習でもらった全てのポイント
  //   setTotalLastPoint(tp)
  // }
  useEffect(() => {
    getYourTotalPoint()
  }, [])
  const getYourTotalPoint = () => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH3/myMbn:', myMbn)

    var url = DB_CONN_URL + '/get-this-hw-point-info/'
    var Url = url + myMbn + '&' + HWID

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        // alert(response.data[0].totalPoint)
        setTotalLastPoint(response.data[0].totalPoint)
        //setTotalQuestion(response.data.response.length)

        var tp = response.data[0].totalPoint
        // alert(cutlinePointToNextStory)
        var diffpoint = parseInt(cutlinePointToNextStory - tp)
        // alert(diffpoint)
        setPointDifference(diffpoint)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  useEffect(() => {
    getYourAudioFirstAndLastForReading()
  }, [])
  const getYourAudioFirstAndLastForReading = () => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH3/myMbn:', myMbn)
    var homework_id = HWID
    var url = DB_CONN_URL + '/record-select-first-and-last-for-reading/'
    var Url = url + homework_id

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        var awsUrl =
          'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
          response.data[0].filaname

        setFirstLastRecording(response.data)
        setFirstRecordFile(awsUrl + response.data[0].filename)
        setLastRecordFile(awsUrl + response.data[1].filename)
        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }
  /////////////////////////////////////////////////////////////////
  //次の課題を設定する
  /////////////////////////////////////////////////////////////////
  const handleNextHwSet = () => {
    //練習をやめる時
    setIsGoNextStory(false)
    var mbn = localStorage.getItem('MypageMbn')

    // alert('userName' + userName)
    // alert('mbn' + mbn)
    // alert('HWID' + HWID)
    // alert('levelOrder' + levelOrder)
    // alert('lessonOrder' + lessonOrder)
    // alert('seriesName' + seriesName)
    // alert('readingLevel' + readingLevel)
    // alert('bookTitle' + bookTitle)
    // alert('bookNum' + bookNum)
    // alert('storyNum' + storyNum)
    // alert('courseName' + courseName)
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
    var randNum = Math.floor(Math.random() * 99999)
    // alert('randNum' + randNum)
    var today = Y + M + D + randNum
    var new_homework_id = courseName + '_' + mbn + '_' + today

    // const fetchData = async () => {
    //   try {
    var url = DB_CONN_URL + '/update-reading-blackcat-self-new-hw'
    // alert('koko1')
    axios
      .post(url, {
        new_homework_id: new_homework_id,
        mbn: mbn,
        userName: userName,
        homework_id: HWID,
        // levelOrder: levelOrder,
        lessonOrder: lessonOrder,
        seriesName: seriesName,
        readingLevel: readingLevel,
        bookTitle: bookTitle,
        bookNum: bookNum,
        storyNum: storyNum,
        courseName: courseName,
      })
      .then((response) => {
        console.log('2')
        // alert(response.data.status)
        if (response.data.status) {
          console.log('3')
          // alert(response.data.message + '3')
          // sameCellDelete()
          // samePointCellDelete()
        } else {
          console.log('4')
          // alert(response.data.message + '4')
        }
      })
    // } catch (error) {
    //   alert(response.data.message + '5')
    //   console.log('5')
    // }
    // }
    // fetchData()
    router.reload('/readingSelfcourseB') // ここでリロード
  }
  return (
    <>
      <div
        className="QuizBig mt-5 pt-5 pb-5"
        style={{ backgroundColor: '#dedede', height: 'auto' }}
      >
        {/* {' '}
        <p>
          {' '}
          userName:{userName}
          <br /> mbn: {myMbn} <br />
          HWID: {HWID} <br /> levelOrder: {levelOrder}
          <br /> lessonOrder: {lessonOrder} <br /> seriesName
          {seriesName} <br /> readingLevel: {readingLevel}
          <br /> bookTitle: {bookTitle} <br /> bookNum
          {bookNum}
          <br />
          storyNum: {storyNum} <br /> courseName
          {courseName}
        </p> */}
        <div className="row">
          <div className="col-lg-12 col-md-12  ">
            <h1
              className="mb-3"
              style={{ fontWeight: '800', color: '#2C3E50' }}
            >
              終&nbsp;了
            </h1>

            <h5>
              今回の課題習得ポイント<b>{totalLastPoint}</b>point
            </h5>
            <h5>
              今回の課題の目標ポイント<b>{cutlinePointToNextStory}</b>point
            </h5>
            <br />
            <h6 style={{ textDecoration: 'blue solid underline' }}>
              以下の音声を毎回聴いてみて、自分の成長を感じてください。
            </h6>
            {firstLastRecording.map((val, key) => {
              var diff = totalLastPoint - cutlinePointToNextStory

              var audioFile =
                'https://englib.s3.ap-northeast-1.amazonaws.com/uploadrecording/' +
                val.filename
              return (
                <>
                  <h6>
                    {key == 0 ? '最初の録音音声' : '最後の録音音声'}
                    <audio
                      src={audioFile}
                      controls="controls"
                      style={{
                        alignItems: 'center',
                        height: '25px',
                        paddingTop: '10px',
                        width: '40%',
                        textAlign: 'center',
                      }}
                    />
                  </h6>
                </>
              )
            })}

            <div
              className="col-lg-12 col-md-12 p-3 m-3"
              style={{
                border: '5px solid #E59866',
                borderRadius: '10px',
                color: '#2C3E50',
                textAlign: 'left',
              }}
            >
              <b>注意事項：</b>
              巻末問題の課題はどのタイミングでもアップロードすることができますが、ステップ１から３までのリーディングの課題目標ポイント合計が
              {cutlinePointToNextStory}ポイントに
              達成していない場合、次のストーリーに行けません。
              <Upload
                // mbn={myMbn}
                // homework_id={HWID}
                currentStep="Endscreen"
                stepStatus="BookQuestion"
                pointKeyNum="RR-4"
                homework_id={HWID}

                // practiceTempId={practiceTempId}
                // thisSubject={thisSubject}
              />
              <b>注意事項：</b>
              巻末問題の課題はどのタイミングでもアップロードすることができますが、ステップ１から３までのリーディングの課題目標ポイント合計が
              {cutlinePointToNextStory}ポイントに
              達成していない場合、次のストーリーに行けません。
            </div>
            <ViewBookQuestionFile
              currentStep="Endscreen"
              stepStatus="BookQuestion"
            />
            <div className="col-lg-12 col-md-12 ">
              {totalLastPoint >= cutlinePointToNextStory ? (
                <div className="col-lg-12 col-md-12 ">
                  <hr />
                  <p
                    style={{
                      color: '#2C3E50',
                      fontWeight: '500',
                      fontSize: '17px',
                      textDecoration: 'red wavy underline',
                    }}
                  >
                    この学習の目標ポイント({cutlinePointToNextStory}point
                    )を達成しました。
                    <br /> 今回の学習で習得したポイントは {totalLastPoint}
                    ポイントです。
                    <br />
                    {/* 次のストーリーをスタートしますか？ */}
                    次の課題を設定しますか？
                  </p>
                  <button
                    className="btn btn-danger pt-3 pb-3 pl-5 pr-5 "
                    onClick={() => {
                      setIsGoNextStory(true)
                    }}
                    style={{ width: 'auto', fontSize: '30px' }}
                  >
                    次の課題を設定する。
                  </button>
                </div>
              ) : (
                <div className="col-lg-12 col-md-12 mt-3 mb-3">
                  {/* TESTーBCAT:
                  <button
                    className="btn btn-danger pt-3 pb-3 pl-5 pr-5 "
                    onClick={() => {
                      setIsGoNextStory(true)
                    }}
                    style={{ width: 'auto', fontSize: '30px' }}
                  >
                    次の課題を設定する。
                  </button> */}
                  <p
                    style={{
                      color: 'black',
                      fontWeight: '500',
                      fontSize: '17px',
                      textDecoration: 'green wavy underline',
                    }}
                  >
                    目標ポイントにまだ到達してません。
                    <br />
                    次の課題に進むための目標まであと
                    <span
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '30px',
                      }}
                    >
                      {pointDifference}
                    </span>
                    ポイント必要です。
                    <br /> もう少し頑張ってください！
                  </p>
                </div>
              )}
              {/* <hr style={{ border: '0.01em solid white' }} /> */}
              <Link href="readingSelfcourseB">
                <button
                  className="btn btn-primary p-3 m-3 "
                  onClick={restartQuiz}
                  style={{ fontSize: '25px', fontWeight: 'bold' }}
                >
                  練習を再スタート
                </button>
              </Link>

              <Link href="mytopGroup">
                <button
                  className="btn btn-primary p-3 m-3 "
                  onClick={restartQuiz}
                  style={{ fontSize: '25px', fontWeight: 'bold' }}
                >
                  マイページへ戻る
                </button>
              </Link>

              {/* <Link href="shadowingSelfcourse">
                <button
                  className="btn btn-primary p-3 m-3 "
                  onClick={restartQuiz}
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  続けてシャドーイングの練習をする
                </button>
              </Link> */}

              {/* <Link href="mypage">
                <button>このレベルは簡単すぎ</button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <SweetAlert
        title="この学習の目標ポイントを超えました。"
        show={isGoNextStory}
        onConfirm={() => handleNextHwSet()}
        onCancel={() => {
          setIsGoNextStory(false)
        }}
        confirmBtnText="次のストーリーへ進む"
        cancelBtnText="まだ進まない"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>このストーリの学習を終わらせて、次のストーリーへ進みますか？</p>
      </SweetAlert>
      <CopyrightFooter />
    </>
  )
}

export default EndScreen
