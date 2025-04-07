//quizapp_big_design.css
import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
import QrcodeGenerator from '@/components/shadowingSelfcourse/QrcodeGenerator'
import { QuizContext } from './Contexts'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import next from 'next'
import Router, { useRouter } from 'next/router'
import ReactAudioPlayer from 'react-audio-player'
import PointBar from '@/components/shadowingSelfcourse/PointBar'
import MonsterGet from '@/components/shadowingSelfcourse/MonsterGet'
import FireView from '@/components/shadowingSelfcourse/FireView'
import StepBarSH from '@/components/shadowingSelfcourse/StepBarSH'

import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage5times from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage5times'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/

import StepTitle from '@/components/shadowingSelfcourse/StepTitle'
import StepImportantWords from '@/components/shadowingSelfcourse/StepImportantWords'
// import StepImportantWords2 from '@/components/shadowingSelfcourse/StepImportantWordsSHstep1'
// import StepGoal from '@/components/shadowingSelfcourse/StepGoal'
// import KizukiPoint from '@/components/shadowingSelfcourse/kizukiPoint'
// import Subpage2 from '@/components/shadowingSelfcourse/Subpage2'

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
  faArrowCircleRight,
  faArrowAltCircleRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
const StepSH1 = () => {
  const DB_CONN_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const router = useRouter() //使い方：router.replace('/')

  //import useWindowDimensionsを使う
  const { height, width } = useWindowDimensions()
  const thisWidth = width - 10 + 'px'
  //console.log('thisWidth:', thisWidth)

  let audioRightAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/dingdongdang.mp3'
  )
  let audioWrongAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/wrong-answer.mp3'
  )
  ////////////////////////////////////////////////////////////////////
  //SETTING START
  ////////////////////////////////////////////////////////////////////
  const [leastRecordCount, setLeaseRecordCount] = useState(1) //最低何回録音すれば次のステップへ行けるのか
  //最低何回録音すれば次のステップへ行けるのか
  // const [goalText, setGoalText] = useState('最低' + leastRecordCount + '回音読')
  const [currentStep, setCurrentStep] = useState('StepSH1') //
  const [pointKeyNum, setPointKeyNum] = useState('SSH-1') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState('最初のシャドーイング')
  const [pageTitleSub, setPageTitleSub] = useState(
    '音声を聴きながら最初のシャドーイングをしよう！'
  )
  const [subpageTitle, setSubpageTitle] = useState('練習の順番')

  const [firstOrder, setFirstOrder] = useState(
    '①最初のシャドーイングの前に音声を1~2回プレイして聴く。'
  )
  const [firstOrder2, setFirstOrder2] = useState('②&nbsp;録音ボタン')
  const [secondOrder, setSecondOrder] = useState(
    'を押して、テキストを見ずに下の音源を聴きながらシャドーイングを録音する'
  )

  const [thirdOrder, setThirdOrder] = useState(
    '③&nbsp;録音した音声を聴いてみる'
  )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    'テキストを見ない状態で初めてシャドーイングしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  )
  // const [kizukiDetail, setKizukiDetail] = useState(
  //   'テキストを見ない状態で初めて聴く音源でシャドーイングしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  // )
  const [stepWords1, setStepWords1] = useState('練習の順番')
  const [stepWords2, setStepWords2] = useState('気をつけよう')
  const [stepWords3, setStepWords3] = useState('気付きポイント')

  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  const [isAudioPlaying, setIsAudioPlaying] = useState(false) //Main Storyの音声がPlayされたらtrueになる。必ず音声を聴きながらやるページで必要

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHWのデータを持ってきて入れる
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)
  const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')

  const {
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    lessonOrder,
    setLessonOrder,
    thisSubject,
    setThisSubject,
    leastRecordCount_ondoku,
    setLeastRecordCount_ondoku,
    leastRecordCount_shadowing,
    setLeastRecordCount_shadowing,
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
    setShadowingLevel,
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

  // const handlePracticeGiveup = () => {
  //   //練習をやめる時
  //   setIsOpenBackMypage(false)

  //   const fetchData5 = async () => {
  //     try {
  //       // const response = await axios.put(
  //       //   DB_CONN_URL + '/leveltest-quiz-cancel/' + mbn + '&' + quizTempId
  //       // )

  //       var stepStatus = 'holding'
  //       var nextStep = ''
  //       hwHistoryUpdate(currentStep, stepStatus, HWID, practiceTempId, nextStep)
  //       // todaysThisStepsPointUpdateGiveup(
  //       //   currentStep,
  //       //   HWID,
  //       //   practiceTempId,
  //       //   stepStatus
  //       // )
  //     } catch (error) {}
  //   }
  //   fetchData5()
  //   // router.replace('/shadowingSelfcourseA') // ここでリダイレクト
  //   router.reload('/shadowingSelfcourse') // ここでリロード
  // }

  // const todaysThisStepsPointUpdateGiveup = (
  //   currentStep,
  //   homework_id,
  //   practiceTempId,
  //   stepStatus
  // ) => {
  //   const fetchData = async () => {
  //     try {
  //       var mbn = localStorage.getItem('MypageMbn')
  //       var url = DB_CONN_URL + '/update-todays-this-stages-point-giveup/'
  //       axios
  //         .get(
  //           url +
  //             mbn +
  //             '&' +
  //             homework_id +
  //             '&' +
  //             practiceTempId +
  //             '&' +
  //             currentStep +
  //             '&' +
  //             stepStatus
  //         )
  //         .then((response) => {
  //           router.reload('/shadowingSelfcourse') // ここでリロード
  //         })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // }
  // const handlePracticeRest = () => {
  //   //練習をやめる時
  //   setIsOpenBackMypage(false)

  //   var nextStep = ''
  //   // alert('in handlePracticeRest')
  //   // alert(stepStatus)
  //   // alert('currentStep')
  //   // alert(currentStep)
  //   // alert('nextStep')
  //   // alert(nextStep)
  //   localStorage.setItem('holdTempIdSH', practiceTempId)
  //   hwHistoryUpdate(currentStep, 'holding', HWID, practiceTempId, nextStep)
  // }
  // const todaysThisStepsPointUpdateGiveup = (
  //   currentStep,
  //   homework_id,
  //   practiceTempId,
  //   stepStatus
  // ) => {
  //   var mbn = localStorage.getItem('MypageMbn')
  //   axios
  //     .put(
  //       DB_CONN_URL + '/update-todays-this-stages-point-giveup/' +
  //         mbn +
  //         '&' +
  //         homework_id +
  //         '&' +
  //         practiceTempId +
  //         '&' +
  //         currentStep +
  //         '&' +
  //         stepStatus
  //     )
  //     .then((response) => {
  //       console.log('homework_id', homework_id)
  //       console.log('practiceTempId', practiceTempId)
  //       console.log('currentStep', currentStep)
  //       console.log('stepStatus', stepStatus)
  //       router.reload('/shadowingSelfcourseA') // ここでリロード
  //     })
  // }

  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    practiceTempId,
    nextStep
  ) => {
    var mbn = localStorage.getItem('MypageMbn')
    var url = DB_CONN_URL + '/update-sys-hw-history/'
    axios

      .put(
        url +
          mbn +
          '&' +
          homework_id +
          '&' +
          practiceTempId +
          '&' +
          currentStep +
          '&' +
          stepStatus +
          '&' +
          thisSubject
      )

      .then((response) => {
        if (stepStatus == 'holding') {
          router.reload('/shadowingSelfcourse') // ここでリロード
        } else if (stepStatus == 'end') {
          const MySwal = withReactContent(Swal)
          Swal.fire({
            // position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            html: '<h1><b>おめでとう！</b></h1><br/><br/><h5>ポイントゲット！</h5>',
            // title: '20ポイントゲット！',
            width: '600px',
            height: '600px',
            opacity: 0,
            padding: '3em',
            border: '1px solid #F1C40F',
            borderRadius: '20px',
            color: '#F1C40F',
            background: '#F1C40F',
            // imageUrl: 'https://unsplash.it/400/200',
            // imageWidth: 400,
            // imageHeight: 200,
            // imageAlt: 'Custom image',
            // background: '#fff url(/images/about-img5.jpg)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/animated-icons/bf6.gif")
              center top
              no-repeat
            `,
          })
          setPageView(nextStep)
        }
      })
  }

  const nextStepCheck = (option, arrayNum) => {
    setIsGoNextPage(true)
  }
  const nextStep = (option, arrayNum) => {
    // if (!isGotPoint || 録音ファイルが0ではない時) {
    if (!isGotPoint) {
      //1分以上録音をするとpointをもらう、pointをもらったときに true, ここではfalseの時に録音をするように
      //StepSH1のFirst録音ポイント:5
      //答えを選んでなかった時
      var step = 'StepSH1'
      var homework_id = HWID
      var url = DB_CONN_URL + '/record-select-step/'
      var Url = url + step + '&' + homework_id + '&' + practiceTempId

      const fetchData = async () => {
        try {
          // const response =
          await axios.get(Url).then((response) => {
            // alert(response.data.status)
            // alert('step:')
            // alert(step)
            // alert('homework_id;')
            // alert(homework_id)
            // alert('length:')
            // alert(response.data.length)
            if (response.data.length >= leastRecordCount) {
              var stepStatus = 'end'
              var nextStep = 'StepSH2'
              hwHistoryUpdate(
                currentStep,
                stepStatus,
                HWID,
                practiceTempId,
                nextStep
              )
            } else {
              //alert('次のステップに行くためには録音をしてください。')
              setIsGoNextPage(false)
              setIsCantGoNextPage(true)
              return false
            }
            practiceStart(nextStep)
            // console.log('thisStep:', thisStep)
          })
        } catch (error) {
          alert('select error!')
        }
      }

      fetchData()
    }
  }

  const practiceStart = (nextStep) => {
    //次のStepSH1のsys_hw_historyテーブルのstepStatusがendになっている場合は、StepSH2にいく。
    //왜냐하면, StepSH1은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
        // alert(nextStep)
        // alert('testend')
        var homework_id = HWID
        var step = nextStep
        var pti = practiceTempId
        var url = DB_CONN_URL + '/reg-sys-hw-history'
        axios
          .post(url, {
            mbn: myMbn,
            homework_id: homework_id,
            step: step,
            practiceTempId: pti,
            thisSubject: thisSubject,
          })
          .then((response) => {
            if (!response.data.status) {
            } else {
              setPageView(nextStep)
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    console.log('StepSH1/myMbn:', myMbn)
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info/'
    var Url = url + mbn

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setHWbookInfo(response.data)
        setAudioDurtaionFromDB(response.data[0].audioDuration)
        setBookTitle(response.data[0].bookTitle)
        setStoryTitle(response.data[0].storyTitle)
        setShadowingLevel(response.data[0].shadowingLevel)
        setStoryNum(response.data[0].storyNum)
        setStoryStartPage(response.data[0].storyStartPage)
        // setHWID(response.data[0].homework_id)

        //console.log('setHWID', HWID)

        //setTotalQuestion(response.data.response.length)
      } catch (error) {
        console.log(error)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (isError) return <h1>Error, try again!!!! </h1>
  if (isLoading) return <h1>Loading Page..........................</h1>

  return (
    // <div>
    <>
      {/* <h1>test:{bookStory}</h1> */}
      <div className="QuizBig mb-0 pb-0" style={{ border: 0 }}>
        <div className="row">
          <div className="col-lg-10 col-md-6">
            <MonsterGet />
          </div>
          <div className="col-lg-2 col-md-6">
            <FireView thisSubject={thisSubject} />
            {/* <p style={{ color: 'black', marginBottom: 0, paddingBottom: 0 }}>
              {thisSubject}
            </p>
            <p style={{ color: 'black', marginTop: 0, paddingTop: 0 }}>
              連続練習日
            </p> */}
          </div>
        </div>
      </div>

      <PointBar
        cStep={pageView}
        pageTitle="SHADOWING"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarSH cStep={pageView} />
      <div className="QuizBigShadowing" style={{ backgroundColor: 'white' }}>
        <div className="container">
          {HWbookInfo.map((val, key) => {
            return (
              <>
                <div className="row align-items-center">
                  <div
                    className="col-lg-8 col-md-6"
                    style={{ textAlign: 'center' }}
                  >
                    <StepTitle
                      pageTitle={pageTitle}
                      pageTitleSub={pageTitleSub}
                    />

                    {/* <img
                      src="/images/homework-openbook.png"
                      style={{
                        height: '70px',
                        width: 'auto',
                        marginRight: '20px',
                      }}
                    /> */}
                    <img
                      src="/images/homework-listening.png"
                      style={{
                        height: '50px',
                        width: 'auto',
                        marginRight: '20px',
                      }}
                    />
                    <img
                      src="/images/homework-recording.png"
                      style={{ height: '50px', width: 'auto' }}
                    />
                  </div>
                  {/* <div
                    className="col-lg-4 col-md-6"
                    style={{ textAlign: 'center' }}
                  >
                    <StepImportantWords2
                      stepWords1={stepWords1}
                      stepWords2={stepWords2}
                      stepWords3={stepWords3}
                    />
                  </div> */}

                  {/* <div className="col-lg-12 col-md-12  ">
                    <KizukiPoint
                      kizukiTitle={kizukiTitle}
                      kizukiDetail={kizukiDetail}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 mb-3 mt-0 ">
                    <Subpage2
                      firstOrder={firstOrder}
                      firstOrder2={firstOrder2}
                      secondOrder={secondOrder}
                      thirdOrder={thirdOrder}
                      fourthOrder={fourthOrder}
                      fifthOrder={fifthOrder}
                      startPageNum={storyStartPage}
                      subpageTitle={subpageTitle}
                    />
                  </div> */}
                </div>

                <center>
                  <div
                    className="row mt-3  mb-3"
                    style={{
                      border: '1px solid #b0c4de',
                      borderRadius: '10px',
                      padding: '10px',
                      width: '100%',
                    }}
                  >
                    <div
                      className="col-lg-7 col-md-12"
                      style={{ textAlign: 'center' }}
                    >
                      <p
                        style={{ textAlign: 'center' }}
                        className="tooltip-big-text tooltip-red"
                        data-balloon-visible
                        aria-label="ストーリーの音源を先にプレイしてからマイクを押してね！"
                        data-balloon-pos="up"
                      ></p>
                      <ReactAudioPlayer
                        src={bookAudioUrl}
                        // autoPlay
                        controls
                        onPlay={() => {
                          // alert('playing')
                          setIsAudioPlaying(true)
                        }}
                        onPause={() => {
                          // alert('paused')
                          setIsAudioPlaying(false)
                        }}
                        style={{
                          backgroundColor: '#b0c4de',
                          padding: '15px',
                          width: '80%',
                          borderRadius: '10px',
                        }}
                      />
                    </div>
                    <div
                      className="col-lg-5 col-md-12 "
                      style={{
                        margin: 'auto',
                        width: '100%',
                        // border: '1px solid violet',
                        // borderRadius: '10px',
                        padding: '10px',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: '600',
                          padding: '10px',
                          color: 'black',
                          fontSize: '20px',
                          borderRadius: '10px',
                          backgroundColor: '#F0E5F7',
                          verticalAlign: 'middle',
                          height: '200px',
                          width: '100%',
                          marginLeft: 0,
                          marginRight: 0,
                        }}
                      >
                        教材の{storyStartPage}ページから
                      </span>
                      <p
                        style={{
                          fontSize: '15px',
                          marginTop: '5px',
                          color: 'darkgray',
                        }}
                      >
                        {storyTitle}
                      </p>
                    </div>
                    <div
                      className="col-lg-12 col-md-12"
                      style={{ textAlign: 'center', color: 'blue' }}
                    >
                      音源は同じスクリプトが5回続けてプレイされます。
                      <br />
                      それを最初から最後まで録音することで、一回の録音課題としてカウントされます。
                    </div>
                  </div>
                </center>
                {/* {Responsive START} */}

                {/* <div className="col-lg-12 col-md-12  ">
                  <StepImportantWords
                    stepWords1={stepWords1}
                    stepWords2={stepWords2}
                    stepWords3={stepWords3}
                  />
                </div> */}

                {/* {Responsive END} */}
                {/* </div> */}
                <VoiceRecorderToS3ForSelfLessonPage5times
                  mbn={myMbn}
                  homework_id={HWID}
                  practiceTempId={practiceTempId}
                  audioDurationFromDB={audioDurtaionFromDB}
                  pointKeyNum={pointKeyNum}
                  pointStep={currentStep}
                  leastRecordCount={leastRecordCount}
                  pageView={pageView}
                />
                <hr />

                {/* {Responsive START2} */}

                {/* {Responsive END2} */}
              </>
            )
          })}
          {/* <SpeechToText mbn={myMbn} /> */}
          {currentStep == 'Step5' ? (
            <>
              <button
                className="btn btn-danger mt-1"
                onClick={() => {
                  finishQuiz(optionChosen, currentStep)
                }}
                id="nextStep"
              >
                Finish Today's Study
              </button>
            </>
          ) : (
            <>
              <div className="row">
                {/* <MediaQuery query="(min-width: 767px)"> */}
                {/* <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '20px' }}
                  >
                    <a
                      onClick={() => {
                        setIsOpenBackMypage(true)
                      }}
                    >
                      <button
                        style={{ width: '200px', fontWeight: 'bold' }}
                        className="btn btn-info mt-0 mb-2"
                        id="nextStep"
                      >
                        一旦休憩する
                      </button>
                    </a>
                  </div>
                </div> */}

                <div className="col-lg-12 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '20px' }}
                  >
                    <button
                      style={{
                        width: '200px',
                        fontWeight: 'bold',
                        backgroundColor: '#333888',
                        border: 0,
                      }}
                      className="btn btn-primary mt-0 mb-2"
                      onClick={() => {
                        nextStepCheck()
                      }}
                      id="nextStep"
                    >
                      次のステップへ
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* })} */}

          <SweetAlert
            title="次のステップに行きますか？"
            show={isGoNextPage}
            onConfirm={() => nextStep()}
            onCancel={() => {
              setIsGoNextPage(false)
            }}
            confirmBtnText="YES"
            cancelBtnText="NO"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '500px' }}
          >
            {/* <p></p> */}
          </SweetAlert>
          <SweetAlert
            title="録音が終わっていません。"
            show={isCantGoNextPage}
            onConfirm={() => setIsCantGoNextPage(false)}
            onCancel={() => {
              setIsCantGoNextPage(false)
            }}
            confirmBtnText="練習を続ける"
            // cancelBtnText="OK"
            showCancel={false}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>
              決まった回数以上の録音が終わってないと次のステップに行けません。
            </p>
          </SweetAlert>
        </div>
      </div>
    </>
  )
}

export default StepSH1
