//quizapp_big_design.css
import react, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
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
import PointBar from '@/components/shadowingSelfcourseVideo/PointBar'
import MonsterGet from '@/components/shadowingSelfcourse/MonsterGet'
import FireView from '@/components/shadowingSelfcourse/FireView'
import StepBarSH from '@/components/shadowingSelfcourse/StepBarSH'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import Floater from 'react-floater'
import WordListShadowingBook from '@/components/shadowingSelfcourse/WordListShadowingBook' //単語リスト

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
// import StepImportantWords from '@/components/shadowingSelfcourse/StepImportantWords'
import StepImportantWords2 from '@/components/shadowingSelfcourse/StepImportantWordsSHstep1'
import YoutubeScriptTimeInsertForStudentStep3 from '@/components/Youtube/YoutubeScriptTimeInsertForStudentStep3'

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
const StepSH4 = () => {
  const TOUR_STEPS = [
    {
      target: '.tour-step0',
      content: 'このステップのやり方ツアーを始めますか？',
      title: 'ツアーをはじめる',
      // disableBeacon: true,
    },

    {
      target: '.tour-step1',
      title: '① 音源をプレイ',
      content: '',
    },
    {
      target: '.tour-step2',
      title: '② 録音ボタンを押す',
      content: '録音ボタンを押して、最初のシャドーイングを録音します。',
    },
    {
      target: '.tour-step3',
      title: '③ ストップボタンを押す',
      content: '録音が終わったらストップボタンを押します。',
      backgroundColor: 'red',
    },
    {
      target: '.tour-step4',
      title: '④ 自分の録音をチェック',
      content: '自分の音声を一度聴いて、できない部分を確認します。',
    },

    {
      target: '.tour-step5',
      title: '⑤ 次のステップへ',
      content: '自信がつくまで繰り返し、練習が終わったら終了ボタンを押します。',
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

  const DB_CONN_URL = process.env.DB_CONN_URL
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
    leastRecordCount_shadowing
  ) //最低何回録音すれば次のステップへ行けるのか
  //最低何回録音すれば次のステップへ行けるのか
  // const [goalText, setGoalText] = useState('最低' + leastRecordCount + '回音読')
  const [currentStep, setCurrentStep] = useState('StepSH4') //
  const [pointKeyNum, setPointKeyNum] = useState('SSH-2') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState('自信がつくまでシャドーイング')
  const [pageTitleSub, setPageTitleSub] = useState(
    '口が疲れるまでシャドーイングの練習をしよう！'
  )
  const [subpageTitle, setSubpageTitle] = useState('練習の順番')

  const [firstOrder, setFirstOrder] = useState('①&nbsp;録音ボタン')
  const [firstOrder2, setFirstOrder2] = useState(
    'を押して、音声を聴きながらシャドーイングを録音する'
  )
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
    '何度も繰り返し同じ音源でシャドーイング練習をすることで、聞き取れなかった単語も段々と聞き取れるようになります。また、音源のマネを続けることで、発音やイントネーションが改善します'
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

  const [movieInfo, setMovieInfo] = useState()
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

  //無限ループしない方法２
  const hoge = useMemo(() => {
    return {}
  }, [])

  // useEffect(() => {
  //   var url = DB_CONN_URL + '/get-hw-and-Shadowing-movie-script/'
  //   var Url = url + movieNum + '&' + youtubeURL

  //   const fetchData = async () => {
  //     try {
  //       alert('1')
  //       const response = await axios.get(Url)

  //       alert(response.data.message)

  //       setMovieInfo(response.data)
  //       console.log('###response.data', response.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }, [hoge])

  useEffect(() => {
    const fetchData = async () => {
      var mbn = localStorage.getItem('MypageMbn')
      // console.log('*****currentStep', currentStep)
      // console.log('*****pointKeyNum', pointKeyNum)
      try {
        var url = DB_CONN_URL + '/get-hw-and-Shadowing-movie-script'
        axios
          .post(url, {
            movieNum: movieNum,
            youtubeURL: youtubeURL,
          })
          .then((response) => {
            setMovieInfo(response.data)
          })
      } catch (error) {}
    }
    fetchData()
  }, [hoge])
  const handlePracticeRest = () => {
    //練習をやめる時
    setIsOpenBackMypage(false)

    var nextStep = ''
    // alert('in handlePracticeRest')
    // alert(stepStatus)
    // alert('currentStep')
    // alert(currentStep)
    // alert('nextStep')
    // alert(nextStep)
    localStorage.setItem('holdTempIdSH', practiceTempId)
    hwHistoryUpdate(currentStep, 'holding', HWID, practiceTempId, nextStep)
  }

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
              url("/images/animated-icons/giphy2.gif")
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
      var step = 'StepSH4'
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
            if (response.data.length >= leastRecordCount_ondoku) {
              var stepStatus = 'end'
              var nextStep = 'finished'
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
          })
        } catch (error) {
          alert('select error!')
        }
      }

      fetchData()
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
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH3/myMbn:', myMbn)
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-video/'
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

      {/* <PointBar cStep={pageView} pageTitle="READ ALOUD" /> */}
      <PointBar
        cStep={pageView}
        pageTitle="READ ALOUD"
        pageSubTitle="大きい声で音読"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarSH cStep={pageView} />
      <div className="QuizBigShadowing" style={{ backgroundColor: 'white' }}>
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
                      src="/images/homework-openbook.png"
                      style={{
                        height: '70px',
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
                    <StepImportantWords2
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
                      <YoutubeScriptTimeInsertForStudentStep3
                        yID={youtubeID}
                        homework_id={HWID}
                        mbn={myMbn}
                        shadowingSpeed={shadowingSpeed}
                        dictationStart={dictationStart}
                        dictationMin={dictationMin}
                        dictationHow={dictationHow}
                      />

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

                {/* <div className="col-lg-12 col-md-12  ">
                  <StepImportantWords
                    stepWords1={stepWords1}
                    stepWords2={stepWords2}
                    stepWords3={stepWords3}
                  />
                </div> */}
                {/* {Responsive END2} */}
                {/* <div className="col-lg-12 col-md-12 mb-2">
                  <button
                    className="btn btn-warning font-weight-bold"
                    onClick={() => {
                      setShowAudio(!showAudio)
                    }}
                  >
                    {showAudio
                      ? 'Audioを隠す'
                      : 'まだ音に自信がないため一度音声を聴いてから録音する'}
                  </button>
                </div> */}
              </>
            )
          })}
          <VoiceRecorderToS3ForSelfLessonPage
            mbn={myMbn}
            homework_id={HWID}
            practiceTempId={practiceTempId}
            audioDurationFromDB={audioDurtaionFromDB}
            pointKeyNum={pointKeyNum}
            pointStep={currentStep}
            leastRecordCount={leastRecordCount_ondoku}
            pageView={pageView}
          />
          <hr />
          {/* <div
            className="col-lg-12 col-md-12 mb-5 p-5 ml-1 mr-2"
            style={{
              textAlign: 'left',
              border: '1px solid #dedede',
              borderRadius: '10px',
            }}
          >
            {movieInfo &&
              movieInfo.map((val, key) => {
                return (
                  <>
                    <span
                      style={{ fontSize: '30px' }}
                      dangerouslySetInnerHTML={{ __html: val.script }}
                    ></span>

                    <br />
                  </>
                )
              })}
          </div> */}
          {currentStep == 'Step5' ? (
            <>
              <button
                className="btn btn-danger mt-3"
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

                <div className="col-lg-6 col-md-12">
                  <div
                    className="banner-content"
                    style={{ paddingTop: '15px' }}
                  >
                    <button
                      className="btn btn-secondary"
                      style={{
                        width: '100%',
                        fontWeight: 'bold',

                        border: 0,
                      }}
                      onClick={() => {
                        setVocaPartView(!vocaPartView)
                      }}
                    >
                      知らない単語を登録する
                      {vocaPartView && (
                        <span
                          style={{
                            backgroundColor: 'white',
                            marginLeft: 10,
                            color: 'black',
                            fontWeight: '900',
                            padding: '5px',
                            border: '1px solid yellow',
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

                {/* <div className="col-lg-4 col-md-12">
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

                <div className="col-lg-6 col-md-12">
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
                      練習を終了する
                    </button>
                  </div>
                </div>
                {/* </MediaQuery> */}
                {/* <MediaQuery query="(max-width: 767px)">
                  <div className="col-lg-6 col-md-12 mt-5">
                    <div
                      className="banner-content"
                      style={{ paddingTop: '0px' }}
                    >
                      <a
                        onClick={() => {
                          setIsOpenBackMypage(true)
                        }}
                      >
                        <button
                          style={{
                            width: '200px',
                            fontWeight: 'bold',
                          }}
                          className="btn btn-info mt-0 mb-2"
                          id="nextStep"
                        >
                          一旦休憩する
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="banner-content">
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
                </MediaQuery> */}
              </div>
            </>
          )}
          {/* })} */}
          <SweetAlert
            title="一旦休憩しますか？"
            show={isOpenBackMypage}
            onConfirm={() => handlePracticeRest()}
            onCancel={() => {
              setIsOpenBackMypage(false)
            }}
            confirmBtnText="休憩する"
            cancelBtnText="戻る"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px' }}
          >
            {/* <p>
             
            </p> */}
          </SweetAlert>
          {/* <SweetAlert
            title="今日の練習を本当にやめますか？"
            show={isOpenBackMypage}
            onConfirm={() => handlePracticeGiveup()}
            onCancel={() => {
              setIsOpenBackMypage(false)
            }}
            confirmBtnText="一旦休憩する"
            cancelBtnText="やめずに練習をする"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px' }}
          >
            <p>
              次のステップに行く前に途中でやめると、このステップでゲットしたポイントは消えてしまいます。
            </p>
          </SweetAlert> */}
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
      {vocaPartView && (
        <div
          className="QuizBig"
          style={{ backgroundColor: 'white', border: '10px solid #D7CCC8' }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-12 col-md-12"
                style={{ padding: 0, margin: 0 }}
              >
                <div className="">
                  <WordListShadowingVideo mbn={myMbn} homework_id={HWID} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StepSH4
