//quizapp_big_design.css
import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
import QrcodeGenerator from '@/components/shadowingSelfcourseVideo/QrcodeGenerator'
import { QuizContext } from './Contexts'
import ReactPlayer from 'react-player/youtube'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import next from 'next'
import Router, { useRouter } from 'next/router'
import ReactAudioPlayer from 'react-audio-player'
import PointBar from '@/components/shadowingSelfcourseVideo/PointBar'
import MonsterGet from '@/components/shadowingSelfcourse/MonsterGet'
import FireView from '@/components/shadowingSelfcourse/FireView'
import StepBarSH from '@/components/shadowingSelfcourse/StepBarSH'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import Floater from 'react-floater'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import fireRed from './img/fire.png'
import fireGray from './img/fire-gray.png'
import { Repeat } from '@material-ui/icons'

import StepTitle from '@/components/shadowingSelfcourse/StepTitle'
import StepImportantWordsSHstep1 from '@/components/shadowingSelfcourse/StepImportantWordsSHstep1'
// import StepGoal from '@/components/shadowingSelfcourse/StepGoal'
// import KizukiPoint from '@/components/shadowingSelfcourse/kizukiPoint'
// import Subpage from '@/components/shadowingSelfcourse/Subpage'

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
import YoutubeScriptTimeInsertForStudentStep1 from '@/components/Youtube/YoutubeScriptTimeInsertForStudentStep1'
const StepSH1 = () => {
  const TOUR_STEPS = [
    {
      target: '.tour-step0',
      content: 'このステップのやり方ツアーを始めますか？',
      title: 'ツアーをはじめる',
      // disableBeacon: true,
    },
    {
      target: '.tour-step1',
      title: '① 音源を聴く',
      content: 'まず音源を１〜2回繰り返し聴きます。',
      // disableBeacon: true,
    },
    {
      target: '.tour-step2',
      title: '② 音源をプレイ',
      content: '音源を聴いた後、もう一度音源をプレイします。',
    },
    {
      target: '.tour-step3',
      title: '③ 録音ボタンを押す',
      content: '録音ボタンを押して、最初のシャドーイングを録音します。',
    },
    {
      target: '.tour-step4',
      title: '④ ストップボタンを押す',
      content: '録音が終わったらストップボタンを押します。',
      backgroundColor: 'red',
    },
    {
      target: '.tour-step5',
      title: '⑤ 自分の録音をチェック',
      content: '自分の音声を一度聴いて、できない部分を確認します。',
    },
    {
      target: '.tour-step6',
      title: '⑥ 次のステップへ',
      content: '全て終わったら次のステップに行きます。',
    },
  ]
  // Define our state
  const INITIAL_STATE = {
    key: new Date(),
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS,
  }

  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'START':
        return { ...state, run: true }
      case 'RESET':
        return { ...state, stepIndex: 0 }
      case 'STOP':
        return { ...state, run: false }
      case 'NEXT_OR_PREV':
        return { ...state, ...action.payload }
      case 'RESTART':
        return {
          ...state,
          stepIndex: 0,
          run: true,
          loading: false,
          key: new Date(),
        }
      default:
        return state
    }
  }
  // Define the Tour component
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE)
  useEffect(() => {
    if (!localStorage.getItem('tour')) {
      dispatch({ type: 'START' })
    }
  }, [])
  const callback = (data) => {
    const { action, index, type, status } = data
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: 'STOP' })
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: 'NEXT_OR_PREV',
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      })
    }
  }
  const startTour = () => {
    dispatch({ type: 'RESTART' })
  }
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
  const [pageTitle, setPageTitle] = useState(
    '<ruby>最初<rt>さいしょ</rt></ruby>のシャドーイング'
  )
  const [pageTitleSub, setPageTitleSub] = useState(
    '<ruby>音源<rt>おんげん</rt></ruby>を<ruby>聴<rt>き</rt></ruby>きながら<ruby>最初<rt>さいしょ</rt></ruby>のシャドーイングをしよう！'
  )

  const [stepWords1, setStepWords1] = useState(
    '<ruby>練習<rt>れんしゅう</rt></ruby>の<ruby>順番<rt>じゅんばん</rt></ruby>'
  )
  const [stepWords2, setStepWords2] = useState(
    '<ruby>気<rt>き</rt></ruby>をつけよう'
  )
  const [stepWords3, setStepWords3] = useState(
    '<ruby>気付<rt>きづ</rt></ruby>きポイント'
  )

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
  const [playbackRate, setPlaybackRate] = useState(1)
  //for Loop Button
  const [playLoop, setPlayLoop] = useState(true)
  const {
    qrLinkVideoDiscussion,
    setQrLinkVideoDiscussion,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    youtubeID,
    setYoutubeID,
    dictationMin,
    setDictationMin,
    shadowingSpeed,
    setShadowingSpeed,
    dictationHow,
    setDictationHow,
    lessonOrder,
    setLessonOrder,
    thisSubject,
    setThisSubject,
    leastRecordCount_ondoku,
    setLeastRecordCount_ondoku,
    leastRecordCount_shadowing,
    setLeastRecordCount_shadowing,
    bookImgUrl,
    setBookImgUrl,
    shadowingLevel,
    setShadowingLevel,
    storyTitle,
    setStoryTitle,
    storyStartPage,
    setStoryStartPage,
    dictationStart,
    setDictationStart,
    movieNum,
    setMovieNum,
    youtubeURL,
    setYoutubeURL,
    shadowingTitle,
    setShadowingTitle,
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
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-video/'
    var Url = url + mbn

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setHWbookInfo(response.data)
        // setAudioDurtaionFromDB(response.data[0].audioDuration)
        // setBookTitle(response.data[0].bookTitle)
        // setStoryTitle(response.data[0].storyTitle)
        // setShadowingLevel(response.data[0].shadowingLevel)
        // setStoryNum(response.data[0].storyNum)
        // setStoryStartPage(response.data[0].storyStartPage)
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
      <div className="col-lg-1 col-md-6">
        <span className="tour-step0"></span>

        <button
          className="btn btn-primary"
          onClick={startTour}
          style={{
            width: '30px',
            height: '150px',
            paddingRight: 30,
            position: 'fixed',
            right: '0',
            top: '0',
            zIndex: 500,
            opacity: '0.7',
            // bottom: '500px',
            transition: '1s',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-lr',
              fontSize: '15px',
              letterSpacing: '3px',

              // , textOrientation: 'upright'
            }}
          >
            やり方ツアー
            {/* Start&nbsp;&nbsp;&nbsp;Tour */}
          </span>
        </button>
      </div>
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
        pageSubTitle="シャドーイング"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarSH cStep={pageView} />
      <div
        className="QuizBigShadowingVideo"
        style={{ backgroundColor: 'white' }}
      >
        <div className="container">
          <Joyride
            {...tourState}
            callback={callback}
            showSkipButton={true}
            scrollToFirstStep={true}
            showProgress={true}
            spotlightClicks={true}
            styles={{
              tooltipContainer: {
                textAlign: 'left',
              },
              buttonClose: {
                display: 'none',
              },
              buttonBack: {
                marginRight: 10,
              },
              buttonNext: {
                backgroundColor: 'green',
              },
              buttonSkip: {
                color: 'red',
                textAlign: 'center',
                border: '1px solid red',
                borderRadius: '5px',
                width: '150px',
              },
              options: {
                primaryColor: '#000',
                textColor: '#004a14',
                width: 500,
                zIndex: 1000,
              },
              title: {
                textAlign: 'center',
                color: 'red',
              },
            }}
            locale={{
              last: 'ツアー終了',
              skip: 'ツアーをやめる',
              next: '次へ',
              back: '前に戻る',
            }}
          />
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

                    <img
                      src="/images/tv.png"
                      style={{
                        height: '50px',
                        width: 'auto',
                        marginRight: '20px',
                      }}
                    />
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
                  <div
                    className="col-lg-4 col-md-6"
                    style={{ textAlign: 'center' }}
                  >
                    <StepImportantWordsSHstep1
                      stepWords1={stepWords1}
                      stepWords2={stepWords2}
                      stepWords3={stepWords3}
                    />
                  </div>
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
                      className="col-lg-12 col-md-12"
                      style={{ textAlign: 'center' }}
                    >
                      <YoutubeScriptTimeInsertForStudentStep1
                        yID={youtubeID}
                        homework_id={HWID}
                        mbn={myMbn}
                        shadowingSpeed={shadowingSpeed}
                        dictationStart={dictationStart}
                        dictationMin={dictationMin}
                        dictationHow={dictationHow}
                      />
                      {/* <ReactPlayer
                        url={youtubeURL}
                        // playing={playStatus}

                        controls={true}
                        playbackRate={playbackRate}
                        loop={playLoop}
                        width="100%"
                        style={{ marginBottom: '10px' }}
                        onReady={() => {
                          console.log('onReady')
                        }}
                        onStart={() => {
                          console.log('onStart')
                        }}
                        onPause={() => {
                          console.log('onPause')
                        }}
                        onEnded={() => {
                          console.log('onEnded')
                        }}
                        onError={() => {
                          console.log('onError')
                        }}
                      /> */}
                      <p
                        style={{
                          fontSize: '15px',
                          marginTop: '5px',
                          color: 'darkgray',
                        }}
                      >
                        {shadowingTitle}
                      </p>
                    </div>

                    <div
                      className="col-lg-12 col-md-12"
                      style={{ textAlign: 'center', color: 'blue' }}
                    >
                      {/* ここにスピード調整を入れる */}
                    </div>
                  </div>
                </center>

                <VoiceRecorderToS3ForSelfLessonPage
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
              </>
            )
          })}

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
