import React, { useContext, useEffect, useState, useRef } from 'react'
import Link from '@/utils/ActiveLink'
import axios from 'axios'
import { QuizContext } from '@/components/readingSelfcourse/ContextsB'
import CopyrightFooter from '@/components/Copyright/CopyrightFooter'
import SweetAlert from 'react-bootstrap-sweetalert'
import Upload from '@/components/readingSelfcourse/uploadCopyVocaForLesson'
import ViewBookQuestionFile from '@/components/readingSelfcourse/viewBookQuestionFileB'
import QrcodeGenerator from '@/components/readingSelfcourse/QrcodeGenerator'
//import { Questions } from '../../pages/quizhelper/Questions'

import LevelChange from '@/components/readingSelfcourse/LevelChangeB'
import { red } from '@material-ui/core/colors'
import Router, { useRouter } from 'next/router'
const EndScreen = () => {
  const { query } = useRouter()
  const cN = query.cN //courseName
  const cS = query.cS //courseSelf
  const sB = query.sB //subject
  // alert(cS)
  const DB_CONN_URL = process.env.DB_CONN_URL
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
    copyHW,
    setCopyHW,
    qrLinkOtherHW,
    setQrLinkOtherHW,
    qrLinkBookQuestion,
    setQrLinkBookQuestion,
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
    answerFile,
    setAnswerFile,
  } = useContext(QuizContext)
  const [isFileAru, setIsFileAru] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [fileDetail, setFileDetail] = useState('Mindmap')
  const [isFileSelected, setIsFileSenected] = useState(false)
  const [isGoNextStory, setIsGoNextStory] = useState(false)
  const [isGoNextBook, setIsGoNextBook] = useState(false)
  const [isNewHWSET, setIsNewHWSET] = useState(false)
  const [levelChangeView, setLevelChangeView] = useState(false)
  const restartQuiz = () => {
    // setPoint(0)
    // localStorage.removeItem('holdTempId', '')
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
          // console.log('##pointKeyNum', pointKeyNum)
          // console.log('##HWID', HWID)
          // console.log('##currentStep', currentStep)
          // console.log('##practiceTempId', practiceTempId)
        } else {
          //alert(response.data.message)
        }
      })
  }

  useEffect(() => {
    let audioEndAlert = new Audio(
      'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/complete.mp3'
    )
    audioEndAlert.play()
  }, [])

  // useEffect(() => {
  //   function endSoundPlay() {
  //     if (audioOnOff == 'on') {
  //       let audioEndAlert = new Audio(
  //         'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/complete.mp3'
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
  const [isLastStory, setIsLastStory] = useState(false)
  const [isNewLevelBookSET, setIsNewLevelBookSET] = useState(false)
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
    if (cN == 'CourseA') {
      var url = DB_CONN_URL + '/update-reading-triumphs-self-new-hw-test'
    } else if (cN == 'CourseB') {
      var url = DB_CONN_URL + '/update-reading-blackcat-self-new-hw-test'
    } else if (cN == 'CourseZ') {
      var url = DB_CONN_URL + '/update-reading-ORT-self-new-hw-test'
    }

    axios
      .post(url, {
        new_homework_id: new_homework_id,
        mbn: mbn,
        userName: userName,
        homework_id: HWID,
        levelOrder: levelOrder,
        lessonOrder: lessonOrder,
        seriesName: seriesName,
        readingLevel: readingLevel,
        bookTitle: bookTitle,
        bookNum: bookNum,
        storyNum: storyNum,
        courseName: courseName,
      })
      .then((response) => {
        // console.log('2')
        // alert(response.data.status)
        if (response.data.status) {
          // console.log('3')
          // alert(response.data.message + '3')
          // sameCellDelete()
          // samePointCellDelete()
        } else {
          // console.log('4')
          // alert(response.data.message + '4')
        }
      })
    setIsNewHWSET(true)
  }

  function goToTop() {
    setIsNewLevelBookSET(false)
    setIsNewHWSET(false)
    //Router.push('mytopGroup') // ここでリロード
    Router.reload('/readingSelfcourse')
  }

  /////////////////////////////////////////////////////////////////
  //次の課題を設定する
  /////////////////////////////////////////////////////////////////
  const handleNextBookSet = () => {
    //練習をやめる時
    // alert('here')
    setIsGoNextBook(false)
    var mbn = localStorage.getItem('MypageMbn')

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
    if (cN == 'CourseA_SC') {
      var url =
        DB_CONN_URL + '/update-reading-triumphs-self-new-book-same-level'
    } else if (cN == 'CourseB_SC') {
      var url =
        DB_CONN_URL + '/update-reading-blackcat-self-new-book-same-level'
    } else if (cN == 'CourseZ_SC') {
      var url = DB_CONN_URL + '/update-reading-ORT-self-new-book-same-level'
    }

    // console.log('111111')
    axios
      .post(url, {
        new_homework_id: new_homework_id,
        mbn: mbn,
        userName: userName,
        homework_id: HWID,
        levelOrder: levelOrder,
        lessonOrder: lessonOrder,
        seriesName: seriesName,
        readingLevel: readingLevel,
        bookTitle: bookTitle,
        bookNum: bookNum,
        storyNum: storyNum,
        courseName: courseName,
      })
      .then((response) => {
        // console.log('22222')
        // alert(response.data.status)
        if (response.data.status) {
          // alert(response.data.message + '3')
          // console.log('33333', response.data.message)
          // sameCellDelete()
          // samePointCellDelete()
        } else {
          // console.log('444444', response.data.message)
          // sameCellDelete()
          // alert(response.data.message + '4')
        }
      })
    // router.reload('/readingSelfcourse') // ここでリロード
    //console.log('here')
    // router.reload('/mytopGroup') // ここでリロード
    setIsNewLevelBookSET(true)
  }
  /////////////////////////////////////////////////////////////////
  //今の課題が本の最後なのかをチェックする
  /////////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   checkIsLastStory()
  // }, [])
  const checkIsLastStory = () => {
    //練習をやめる時

    // const fetchData = async () => {
    //   try {
    if (cN == 'CourseA') {
      var url = DB_CONN_URL + '/check-is-this-triumphs-book-last-story'
    } else if (cN == 'CourseB') {
      var url = DB_CONN_URL + '/check-is-this-blackcat-book-last-story'
    } else if (cN == 'CourseZ') {
      var url = DB_CONN_URL + '/check-is-this-ORT-book-last-story'
    }

    axios
      .post(url, {
        lessonOrder: lessonOrder,
        readingLevel: readingLevel,
        bookNum: bookNum,
      })
      .then((response) => {
        // alert(response.data.status)
        if (response.data.status) {
          setIsLastStory(true)
        } else {
          setIsLastStory(false)
        }
      })
  }

  //TEST
  // useEffect(() => {
  //   var thisStartDate = new Date('2022-05-25')
  //   var beforeStartDate = new Date('2022-05-23')

  //   //差日を求める（86,400,000ミリ秒＝１日）
  //   var differenceDay = parseInt((thisStartDate - beforeStartDate) / 86400000)
  //   alert(differenceDay)
  // }, [])

  return (
    <>
      {/* <div
        // className="QuizBig mt-5 pt-3 pb-5"
        style={{ backgroundColor: '#ececec', height: 'auto' }}
      > */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 pl-10 pr-10 pt-3">
            <h2
              className="mb-3"
              style={{ fontWeight: '800', color: '#2C3E50' }}
            >
              <ruby>
                精読課題<rt>せいどくかだい</rt>
              </ruby>
              の1セット
              <ruby>
                終了<rt>しゅうりょう</rt>
              </ruby>
            </h2>

            {/* <h5>
              今回の課題習得ポイント<b>{totalLastPoint}</b>point
            </h5>
            <h5>
              今回の課題の目標ポイント<b>{cutlinePointToNextStory}</b>point
            </h5> */}
            <br />
            <h6 style={{ textDecoration: 'blue solid underline' }}>
              <ruby>
                以下<rt>いか</rt>
              </ruby>
              の
              <ruby>
                音声<rt>おんどく</rt>
              </ruby>
              を
              <ruby>
                毎回聴<rt>まいかいき</rt>
              </ruby>
              いてみて、
              <ruby>
                自分<rt>じぶん</rt>
              </ruby>
              の
              <ruby>
                成長<rt>せいちょう</rt>
              </ruby>
              を
              <ruby>
                感<rt>かん</rt>
              </ruby>
              じてください。
            </h6>
          </div>
          <div className="col-lg-12 col-md-12 mt-3">
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
            {/* <div className="col-lg-12 col-md-12 mb-2 ">
              <hr />
              <button
                className="btn btn-info"
                onClick={() => {
                  setLevelChangeView(!levelChangeView)
                }}
              >
              
                <p style={{ color: 'white' }}>
                  簡単すぎ！難しすぎ！
                  <br />
                  レベル調整はここをクリック！
                </p>
              </button>
            </div> */}

            <div style={{ display: levelChangeView ? 'block' : 'none' }}>
              <LevelChange />
            </div>
            <div
              className="col-lg-12 col-md-12 p-3"
              style={{
                border: '5px solid #E59866',
                borderRadius: '10px',
                color: '#2C3E50',
                textAlign: 'left',
              }}
            >
              <center>
                <h1
                  style={{
                    color: 'blue',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    marginBottom: 0,
                  }}
                >
                  {/* 問題課題提出&nbsp;&nbsp;
                  {cS == 'LESSON' && (
                    <p>
                      <ruby>
                        単語帳<rt>たんごちょう</rt>
                      </ruby>
                      、ストーリコピー、
                      <ruby>
                        教材<rt>きょうざい</rt>
                      </ruby>
                      の
                      <ruby>
                        問題<rt>もんだい</rt>
                      </ruby>
                      を
                      <ruby>
                        解<rt>と</rt>
                      </ruby>
                      くなど、
                      <ruby>
                        生徒<rt>せいと</rt>
                      </ruby>
                      それぞれ
                      <ruby>
                        出<rt>だ</rt>
                      </ruby>
                      された
                      <ruby>
                        課題<rt>かだい</rt>
                      </ruby>
                      の
                      <ruby>
                        写<rt>う</rt>
                      </ruby>
                      しをアップロードしてください。
                      <ruby>
                        課題<rt>かだい</rt>
                      </ruby>
                      は
                      <ruby>
                        生徒<rt>せいと</rt>
                      </ruby>
                      のレベルや
                      <ruby>
                        教材<rt>きょうざい</rt>
                      </ruby>
                      によって
                      <ruby>
                        異<rt>こ</rt>
                      </ruby>
                      なりますので、
                      <ruby>
                        先生<rt>せんせい</rt>
                      </ruby>
                      の
                      <ruby>
                        指示通<rt>しじどお</rt>
                      </ruby>
                      りに
                      <ruby>
                        提出<rt>ていしゅつ</rt>
                      </ruby>
                      してください。
                    </p>
                  )} */}
                  {/* <span style={{ fontSize: '15px' }}>
                    <a>問題サンプルを見る</a>
                  </span> */}
                  {cN == 'CourseB' && (
                    <span
                      className="btn btn-warning"
                      style={{
                        fontSize: '20px',
                        color: 'white',
                        marginBottom: '10px',
                      }}
                    >
                      <a href={answerFile} target="_blank">
                        チャプターの問題の解答をダウンロード
                      </a>
                    </span>
                  )}
                  {/* <p>{qrLinkBookQuestion}</p> */}
                </h1>
                {/* <p
                  style={{
                    border: '0.1em solid #b0c4de',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                >
                
                  <QrcodeGenerator
                    url={qrLinkBookQuestion}
                    title="課題アップロード"
                  />
                  <p style={{ color: 'blue', fontSize: '15px' }}>
                    スマホで課題をアップロードのためのQRコードです。
                    <br />
                    (QRコードをスマホで読み込んでください。)
                  </p>
                </p> */}
                {/* <p style={{ color: 'red', fontSize: '15px' }}>
                  {cS == 'SELF' && (
                    <span>
                      課題を提出しなくても次の課題に進むことは可能ですが、
                    </span>
                  )}
                  <br />
                  1枚アップロードで5Pointゲットできますので、
                  課題提出をお勧めします。
                </p> */}
              </center>
              {cN == 'CourseB' && (
                <span>
                  テキストの中の問題(本によってはチャプター毎の終わり、または本の巻末にまとめてあります)は、
                  テキストに直接書いてください。問題を解いた後は、間違えを赤ペンで必ず直し、その写真を撮ってアップロードしてください。
                </span>
              )}

              <Upload
                // mbn={myMbn}
                // homework_id={HWID}
                currentStep="Endscreen"
                stepStatus="BookQuestion"
                pointKeyNum="RR-4"
                homework_id={HWID}
                copyHW={copyHW}

                // practiceTempId={practiceTempId}
                // thisSubject={thisSubject}
              />

              <ViewBookQuestionFile
                currentStep="Endscreen"
                stepStatus="BookQuestion"
              />
            </div>
            <div className="col-lg-12 col-md-12">
              <Link href="mytopGroup">
                <span
                  className="btn btn-primary p-3 m-3 "
                  onClick={restartQuiz}
                  style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    height: '70px',
                  }}
                >
                  MY BEN TOPへ
                </span>
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
      {/* </div> */}
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
      <SweetAlert
        title="同レベルの次の本に進みますか？"
        show={isGoNextBook}
        onConfirm={() => handleNextBookSet()}
        onCancel={() => {
          setIsGoNextBook(false)
        }}
        confirmBtnText="新しい本を設定する"
        cancelBtnText="まだ設定しない"
        showCancel={true}
        reverseButtons={true}
        style={{ width: '600px' }}
      ></SweetAlert>

      <SweetAlert
        title="新しい本が設定されました。"
        show={isNewLevelBookSET}
        onConfirm={() => goToTop()}
        onCancel={() => {
          setIsNewLevelBookSET(false)
        }}
        confirmBtnText="OK"
        cancelBtnText=""
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        <p>
          2~3日前後で本が届きます。本が届くまで本の最初のストーリーが練習アプリで確認できるようになりますので、それを見ながらストーリ１を繰り返し練習してください。
        </p>
      </SweetAlert>
      <SweetAlert
        title="新しい課題が設定されました。"
        show={isNewHWSET}
        onConfirm={() => goToTop()}
        onCancel={() => {
          setIsNewHWSET(false)
        }}
        confirmBtnText="OK"
        cancelBtnText=""
        showCancel={false}
        reverseButtons={true}
        style={{ width: '600px' }}
      >
        {/* <p>このストーリの学習を終わらせて、次のストーリーへ進みますか？</p> */}
      </SweetAlert>
      <CopyrightFooter />
    </>
  )
}

export default EndScreen
