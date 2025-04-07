import react, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
// import QrcodeGenerator from '@/components/readingSelfcourse/QrcodeGenerator'
import { QuizContext } from './ContextsA'
import next from 'next'

import PointBar from '@/components/readingSelfcourse/PointBarA'
import MonsterGet from '@/components/readingSelfcourse/MonsterGet'
import FireView from '@/components/readingSelfcourse/FireView'
import StepBarA from '@/components/readingSelfcourse/StepBarA'
import WordListReadingBook from '@/components/readingSelfcourse/WordListReadingBookA' //単語リスト
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import Floater from 'react-floater'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import StepTitle from '@/components/readingSelfcourse/StepTitle'
import StepImportantWords from '@/components/readingSelfcourse/StepImportantWords'
import StepImportantWordstep3 from '@/components/readingSelfcourse/StepImportantWordstep3'
import StepGoal from '@/components/readingSelfcourse/StepGoal'
import KizukiPoint from '@/components/readingSelfcourse/kizukiPoint'
import Subpage from '@/components/readingSelfcourse/Subpage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faPlay,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'

import { Repeat } from '@material-ui/icons'
const Step3 = () => {
  const TOUR_STEPS = [
    {
      target: '.tour-step0',
      content: 'このステップのやり方ツアーを始めますか？',
      title: 'ツアーをはじめる',
      // disableBeacon: true,
    },
    {
      target: '.tour-step1',
      title: '① テキスト用意',
      content: '今回の課題ページを開きます。',
      // disableBeacon: true,
    },

    {
      target: '.tour-step2',
      title: '② 録音ボタンを押す',
      content: '録音ボタンを押し、音読をします。',
    },

    {
      target: '.tour-step3',
      title: '③ ストップボタンを押す',
      content: '音読が終わったらストップボタンを押します。',
      backgroundColor: 'red',
    },
    {
      target: '.tour-step4',
      title: '④ 自分の録音した音声をチェック',
      content: '自分の音声を一度聴いて、できない部分を確認します。',
    },
    {
      target: '.tour-step5',
      title: '⑤ 単語登録ボタンを押す',
      content: '知らない単語があったらクリックして登録します。',
    },
    {
      target: '.tour-step6',
      title: '⑥  課題一セット終了',
      content: '全て終わったら、終了ボタンを押します。',
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
  const [vocaPartView, setVocaPartView] = useState(false)
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
  const [leastRecordCount, setLeaseRecordCount] = useState(
    leastRecordCount_step3
  ) //最低何回録音すれば次のステップへ行けるのか
  const [currentStep, setCurrentStep] = useState('Step3') //
  const [pointKeyNum, setPointKeyNum] = useState('RR-3') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState('音を聴かずに録音する')
  const [pageTitleSub, setPageTitleSub] = useState(
    '自分の力で読めるようになったかチェックしよう！'
  )
  const [subpageTitle, setSubpageTitle] = useState('練習の順番')
  const [firstOrder, setFirstOrder] = useState('①&nbsp;録音ボタン')
  const [firstOrder2, setFirstOrder2] =
    useState('を押して、音読する(音源なしで)')
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;録音した音声を聴いてみる'
  )
  // const [thirdOrder, setThirdOrder] = useState(
  //   '③&nbsp;終わったら次のステップボタンを押す'
  // )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '前のステップで練習した発音を思い出しながら、音源を聴かずに音読します。まだ身についてない発音やイントネーションなどに気づくことができます。'
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
  // const [stepWords1, setStepWords1] = useState('自分の発音を意識')
  // const [stepWords2, setStepWords2] = useState('大きく声を出す')
  // const [stepWords3, setStepWords3] = useState('意味も考えながら音読')
  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  //For sweet alert

  const [showAudio, setShowAudio] = useState(false)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)

  //fire alert
  const [alertClickEndButton, setAlertClickEndButton] = useState(true)
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
    thisSubject,
    setThisSubject,
    lessonOrder,
    setLessonOrder,
    englibLevel,
    setEnglibLevel,
    englibLevelColor,
    setEnglibLevelColor,
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

  const hwHistoryUpdate = (
    currentStep,
    stepStatus,
    homework_id,
    practiceTempId,
    nextStep
  ) => {
    var mbn = localStorage.getItem('MypageMbn')
    const fetchData = async () => {
      // alert('here1')
      // alert(homework_id)
      // alert(practiceTempId)
      // alert(currentStep)
      // alert(stepStatus)
      // alert(thisSubject)
      alert('1')
      try {
        var url = DB_CONN_URL + '/update-sys-hw-history-finished/'
        const response = await axios.get(
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
        alert('2')
        if (!response.data.status) {
          // alert(response.data.message) //for test
        } else {
          if (stepStatus == 'holding') {
            router.reload('/readingSelfcourseZ') // ここでリロード
          } else if (stepStatus == 'end') {
            alert('3')
            alert(response.data.updateFireView)
            alert(response.data.message) //for test
            //alert(stepStatus)
            // alert('differenceDay' + response.data.differenceDay)
            // alert('updateFireView' + response.data.updateFireView)
            // alert(response.data.message) //for test
            if (
              response.data.updateFireView == '7' &&
              response.data.message == 'monster'
            ) {
              const MySwal = withReactContent(Swal)
              Swal.fire({
                // position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                html: '<h1><b>おめでとう！</b></h1><br/><br/><h5>モンスターをゲットしました！</h5>',
                // title: '20ポイントゲット！',
                width: '600px',
                height: '600px',
                opacity: 0,
                padding: '3em',
                border: '1px solid #F1C40F',
                borderRadius: '20px',
                color: '#F1C40F',
                background: '#F44640',
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
            } else {
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
            }
            setPageView(nextStep)
          } else {
            alert('stepStatue error step3z')
          }
        }
      } catch (error) {
        alert('error -update-sys-hw-history-finished')
        alert(error)
      }
    }

    fetchData()
  }

  const nextStepCheck = (option, arrayNum) => {
    setIsGoNextPage(true)
  }

  const nextStep = (option, arrayNum) => {
    // if (!isGotPoint || 録音ファイルが0ではない時) {
    if (!isGotPoint) {
      //1分以上録音をするとpointをもらう、pointをもらったときに true, ここではfalseの時に録音をするように
      //step1のFirst録音ポイント:5
      //答えを選んでなかった時
      var step = 'Step3'
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
            if (response.data.length >= leastRecordCount_step3) {
              var stepStatus = 'end'
              var nextStep = 'finished'
              // var nextStep = 'Step4' //TEST
              practiceStart(nextStep)
            } else {
              //alert('次のステップに行くためには録音をしてください。')
              setIsGoNextPage(false)
              setIsCantGoNextPage(true)
              return false
            }
            hwHistoryUpdate(stepStatus, HWID, practiceTempId, nextStep)
          })
        } catch (error) {
          alert('select error!')
        }
      }

      fetchData()
    }

    const practiceStart = (nextStep) => {
      //次のstep1のsys_hw_historyテーブルのstepStatusがendになっている場合は、step2にいく。
      //왜냐하면, step1은 처음 한번만 하는 step이므로.

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
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('Step3/myMbn:', myMbn)

    // if (courseName == 'CourseA') {
    //   var url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info2/'
    // } else if (courseName == 'CourseA_SC') {
    //   var url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info/'
    // }
    var url = DB_CONN_URL + '/get-hw-and-Reading-Triumphs-info/'
    var Url = url + myMbn

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setHWbookInfo(response.data)
        setAudioDurtaionFromDB(response.data[0].audioDuration)
        // setHWID(response.data[0].homework_id)

        console.log('setHWID', HWID)

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

      {/* <PointBar cStep={pageView} pageTitle="Input-Self-Reading" /> */}
      <PointBar
        cStep={pageView}
        pageTitle="INTENSIVE READING"
        pageSubTitle="精読&nbsp;(細かいところまで丁寧に読むこと)"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarA cStep={pageView} />
      <div className="QuizBig" style={{ backgroundColor: 'white' }}>
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
          {/* <QrcodeGenerator url="https://www.google.com" /> */}
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
                      className="tour-step1"
                      src="/images/homework-openbook.png"
                      style={{
                        height: '50px',
                        width: 'auto',
                        marginRight: '20px',
                      }}
                    />
                    <img
                      src="/images/homework-not-listening.png"
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
                    className="col-lg-4 col-md-6 pt-5"
                    style={{ textAlign: 'center' }}
                  >
                    <StepImportantWordstep3
                      stepWords1={stepWords1}
                      stepWords2={stepWords2}
                      stepWords3={stepWords3}
                    />
                  </div>

                  {/* <div className="col-lg-12 col-md-12">
                    <KizukiPoint
                      kizukiTitle={kizukiTitle}
                      kizukiDetail={kizukiDetail}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 ">
                    <Subpage
                      firstOrder={firstOrder}
                      firstOrder2={firstOrder2}
                      secondOrder={secondOrder}
                      // thirdOrder={thirdOrder}
                      fourthOrder={fourthOrder}
                      fifthOrder={fifthOrder}
                      startPageNum={storyStartPage}
                      subpageTitle={subpageTitle}
                      pageView={pageView}
                    />
                  </div> */}
                </div>
                {/* <div className="col-lg-12 col-md-12  ">
                  <StepImportantWords
                    stepWords1={stepWords1}
                    stepWords2={stepWords2}
                    stepWords3={stepWords3}
                  />
                </div> */}
                {/* {Responsive END2} */}
                <div className="col-lg-12 col-md-12 mb-2">
                  <button
                    className="btn btn-warning font-weight-bold"
                    onClick={() => {
                      setShowAudio(!showAudio)
                    }}
                  >
                    {showAudio ? '音源を隠す' : 'もう一度音源を聴いてみる'}
                  </button>
                </div>

                <div
                  className="col-lg-12 col-md-12"
                  style={{ display: showAudio ? 'block' : 'none' }}
                >
                  <ReactAudioPlayer
                    src={bookAudioUrl}
                    // autoPlay
                    controls
                    onPlay={() => {
                      // alert('playing')
                    }}
                    onPause={() => {
                      // alert('paused')
                    }}
                    style={{
                      backgroundColor: '#b0c4de',
                      padding: '15px',
                      width: '50%',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                <hr />
                {/* <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" /> //for video */}
              </>
            )
          })}
          <span className="tour-step2 tour-step3 tour-step4">
            <VoiceRecorderToS3ForSelfLessonPage
              mbn={myMbn}
              homework_id={HWID}
              practiceTempId={practiceTempId}
              audioDurationFromDB={audioDurtaionFromDB}
              pointKeyNum={pointKeyNum}
              pointStep={currentStep}
              leastRecordCount={leastRecordCount_step3}
            />
          </span>
          <hr />
          {currentStep == 'Step' ? (
            <>
              <button
                className="btn btn-danger mt-3"
                onClick={() => {
                  // finishQuiz(optionChosen, currentStep)
                  nextStepCheck()
                }}
                id="nextStep"
              >
                Finish Study
              </button>
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '15px' }}
                  >
                    <button
                      className="btn btn-secondary tour-step5"
                      style={{
                        width: '100%',
                        fontWeight: 'bold',

                        border: 0,
                      }}
                      onClick={() => {
                        setVocaPartView(!vocaPartView)
                      }}
                    >
                      <ruby>
                        知<rt>し</rt>
                      </ruby>
                      らない
                      <ruby>
                        単語<rt>たんご</rt>
                      </ruby>
                      を
                      <ruby>
                        登録<rt>とうろく</rt>
                      </ruby>
                      する
                      {vocaPartView && (
                        <span
                          style={{
                            backgroundColor: 'white',
                            marginLeft: 10,
                            color: 'black',
                            fontWeight: '900',
                            padding: '3px 5px',
                            border: '1px solid white',
                            borderRadius: '5px',
                          }}
                          onClick={() => {
                            setVocaPartView(!vocaPartView)
                          }}
                        >
                          X
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '20px' }}
                  >
                    <button
                      style={{
                        width: '200px',
                        fontWeight: 'bold',
                      }}
                      className="btn btn-primary mt-0 mb-2 tour-step6"
                      onClick={() => {
                        nextStepCheck()
                      }}
                      id="nextStep"
                    >
                      練習を終了する
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          ){/* })} */}
          <SweetAlert
            title="学習を終了しますか？"
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
            <p>
              １セット
              <ruby>
                終了後<rt>しゅうりょうご</rt>
              </ruby>
              でも
              <ruby>
                同<rt>おな</rt>
              </ruby>
              じ
              <ruby>
                日<rt>ひ</rt>
              </ruby>
              に
              <ruby>
                何回<rt>なんかい</rt>
              </ruby>
              も
              <ruby>
                繰<rt>く</rt>
              </ruby>
              り
              <ruby>
                返<rt>かえ</rt>
              </ruby>
              し
              <ruby>
                学習<rt>がくしゅう</rt>
              </ruby>
              してポイントゲットできます。
            </p>
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
          <SweetAlert
            title="このステップが終わったら必ず終了ボタンを押してください。"
            show={alertClickEndButton}
            onConfirm={() => setAlertClickEndButton(false)}
            onCancel={() => {
              setAlertClickEndButton(false)
            }}
            confirmBtnText="わかりました。"
            // cancelBtnText="OK"
            showCancel={false}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>
              Step3が終わってから、終了ボタンを押さないとファイヤーをゲットできませんので、ご注意ください。
            </p>
          </SweetAlert>
        </div>
      </div>
      {vocaPartView && (
        <div
          className="QuizBig"
          style={{ backgroundColor: 'white', border: '10px solid #ffcc66' }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-12 col-md-12"
                style={{ padding: 0, margin: 0 }}
              >
                <div className="">
                  <WordListReadingBook mbn={myMbn} homework_id={HWID} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Step3
