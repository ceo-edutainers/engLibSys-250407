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
// import QrcodeGenerator from '@/components/shadowingSelfcourse/QrcodeGenerator'
import { QuizContext } from './Contexts'
import next from 'next'
import Swal from 'sweetalert2'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import Floater from 'react-floater'
import withReactContent from 'sweetalert2-react-content'
import PointBar from '@/components/shadowingSelfcourse/PointBar'
import MonsterGet from '@/components/shadowingSelfcourse/MonsterGet'
import FireView from '@/components/shadowingSelfcourse/FireView'
import StepBarSH from '@/components/shadowingSelfcourse/StepBarSH'
import WordListShadowingBook from '@/components/shadowingSelfcourse/WordListShadowingBook' //単語リスト
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'
//import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage5Times from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage5times'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import StepTitle from '@/components/shadowingSelfcourse/StepTitle'
import StepImportantWordsSHstep3 from '@/components/shadowingSelfcourse/StepImportantWordsSHstep3'
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
  faPlay,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'

import { Repeat, Speed } from '@material-ui/icons'
const StepSH3 = () => {
  const TOUR_STEPS = [
    {
      target: '.tour-step0',
      content: 'このステップのやり方ツアーを始めますか？',
      title: 'ツアーをはじめる',
      // disableBeacon: true,
    },
    {
      target: '.tour-step1',
      title: '① スクリプトを用意する',
      content:
        '手元に本がある方は指定されたページへ行く。教材の指定がない方は以下にスクリプトが見えます。',
      // disableBeacon: true,
    },
    {
      target: '.tour-step2',
      title: '② 音源をプレイ',
      content: '',
    },
    {
      target: '.tour-step3',
      title: '③ 録音ボタンを押す',
      content:
        '音源のプレイと同時に録音ボタンを押して、最初のシャドーイングを録音します。',
    },
    {
      target: '.tour-step4',
      title: '④ ストップボタンを押す',
      content: '録音が終わったらストップボタンを押します。',
      backgroundColor: 'red',
    },
    {
      target: '.tour-step5',
      title: '⑤ 自分の録音を聴く',
      content: '自分の録音した音源を聴いてみます。',
      backgroundColor: 'red',
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
  const [playStatus, setPlayStatus] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1) //audio speed

  const [leastRecordCount, setLeaseRecordCount] = useState(
    leastRecordCount_ondoku
  ) //最低何回録音すれば次のステップへ行けるのか
  const [currentStep, setCurrentStep] = useState('StepSH3') //
  const [pointKeyNum, setPointKeyNum] = useState('SSH-3') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState(
    '<ruby>音源<rt>おんげん</rt></ruby>を<ruby>聴<rt>き</rt></ruby>きながら<ruby>音読<rt>おんどく</rt></ruby>する。'
  )
  const [pageTitleSub, setPageTitleSub] = useState(
    'テキストを<ruby>見<rt>み</rt></ruby>ながら、<ruby>音源<rt>おんげん</rt></ruby>を<ruby>聴<rt>き</rt></ruby>きながら<ruby>音読<rt>おんどく</rt></ruby>する'
  )
  const [subpageTitle, setSubpageTitle] = useState('練習の順番')
  // const [firstOrder, setFirstOrder] = useState(
  //   '①&nbsp;この段階では音読をします。教材のスクリプトの最後まで、音を聴きながらボタンを押して音読を録音する'
  // )
  // const [secondOrder, setSecondOrder] = useState(
  //   '②&nbsp;録音した音声を聴きてみる'
  // )
  // const [thirdOrder, setThirdOrder] = useState(
  //   '③&nbsp;終わったら次のステップボタンを押す'
  // )
  const [firstOrder, setFirstOrder] = useState('①&nbsp;録音ボタン')
  const [firstOrder2, setFirstOrder2] = useState(
    'を押して、スクリプトと音源を聴きながら音読する<br/>手元に本がある方は指定されたページのスクリプトを見てください。'
  )
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;録音した音声を聴いてみる'
  )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '音源を聴きながら読むことで、自分の間違った読み方やイントネーションなどにさらに気づき、発音を改善しようとする意識を持つことができます。'
  )

  // const [stepWords1, setStepWords1] = useState('意味想像')
  // const [stepWords2, setStepWords2] = useState('発音意識')
  // const [stepWords3, setStepWords3] = useState('声を出す')
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
  //For sweet alert
  const [isAudioPlaying, setIsAudioPlaying] = useState('')
  const [showAudio, setShowAudio] = useState(false)
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
  const [SplitHWbookInfo, setSplitHWbookInfo] = useState([]) //DBからHW bookの詳細なデータを持ってくる
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
    dictationStart,
    setDictationStart,
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
    localStorage.setItem('nowStep', currentStep)
  }, [])
  //無限ループしない方法２
  const hoge = useMemo(() => {
    return {}
  }, [])

  useEffect(() => {
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split/'
    var Url = url + bookTitle + '&' + bookNum + '&' + storyNum

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        // alert(response.data.message)
        // alert(response.data[0].sentenceOrder)
        setSplitHWbookInfo(response.data)

        // SplitHWbookInfo.map((val, key) => {
        //   splitDataRightCheck(val.sentenceOrder)
        // })

        // console.log('setSplitHWbookInfo:', SplitHWbookInfo)
        // alert(response.data.message)
      } catch (error) {
        console.log(error)
      }
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
      var step = 'StepSH3'
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
              var nextStep = 'StepSH4'
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
    // if (Questions[currentStep].answer == option) {
    //   if (audioOnOff == 'on') {
    //     audioRightAnswer.play()
    //   }
    //   setPoint(point + 1)

    //   var correct = 1
    // } else {
    //   if (audioOnOff == 'on') {
    //     audioWrongAnswer.play()
    //   }
    //   correct = 0
    // }
    // setCurrentStep(currentStep + 1)

    // var mbn = localStorage.getItem('MypageMbn')

    //ここでpointを入れる
    // axios
    //   .post(DB_CONN_URL + '/word-quiz5000-result-insert', {
    //     practiceTempId: practiceTempId,
    //     mbn: myMbn,
    //     test_title: Questions[arrayNum].test_title,
    //     test_group: Questions[arrayNum].test_group,
    //     englib_level: Questions[arrayNum].englib_level,
    //     questionCatEng: Questions[arrayNum].questionCatEng,
    //     bigNum: Questions[arrayNum].bigNum,
    //     qNum: Questions[arrayNum].qNum,
    //     answer_member: option,
    //     answer_original: Questions[arrayNum].answer,
    //     correct: correct,
    //   })
    //   .then((response) => {
    //     if (!response.data.status) {
    //       //console.log('no information', response)
    //       alert(response.data.message) //for test
    //     } else {
    //       // setcurrentStep(currentStep + 1)
    //       setNowClickedColor('')
    //     }
    //   })
    //alert(currentStep + 1)
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('StepSH3/myMbn:', myMbn)
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info/'
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
      {/* <div className="col-lg-1 col-md-6">
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

            }}
          >
            やり方ツアー
 
          </span>
        </button>
      </div> */}
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
                      className="tour-step1"
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
                    <StepImportantWordsSHstep3
                      stepWords1={stepWords1}
                      stepWords2={stepWords2}
                      stepWords3={stepWords3}
                    />
                  </div>
                  {/* <div
                    className="col-lg-4 col-md-12 pt-1 pb-1 mt-0 "
                    style={{
                      backgroundColor: '#white',
                      height: '70px',
                      textAlign: 'center',
                    }}
                  >
                    <StepGoal goalText={goalText} />
                  </div> */}
                  {/* <div className="col-lg-12 col-md-12">
                    <KizukiPoint
                      kizukiTitle={kizukiTitle}
                      kizukiDetail={kizukiDetail}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 mb-3">
                    <Subpage
                      firstOrder={firstOrder}
                      firstOrder2={firstOrder2}
                      secondOrder={secondOrder}
                      // thirdOrder={thirdOrder}
                      fourthOrder={fourthOrder}
                      fifthOrder={fifthOrder}
                      startPageNum={storyStartPage}
                      subpageTitle={subpageTitle}
                    />
                  </div> */}
                </div>

                {bookTitle == 'Eiken3 Buntan' && (
                  <div
                    className="col-lg-12 col-md-12 mb-5 p-5 ml-1 mr-2"
                    style={{
                      textAlign: 'left',
                      border: '1px solid #dedede',
                      borderRadius: '10px',
                    }}
                  >
                    {SplitHWbookInfo.map((val, key) => {
                      return (
                        <>
                          {val.sentence}
                          <br />
                        </>
                      )
                    })}
                  </div>
                )}
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
                      {/* <p
                        style={{ textAlign: 'center' }}
                        className="tooltip-big-text tooltip-red"
                        data-balloon-visible
                        aria-label="ストーリーの音源を先にプレイしてからマイクを押してね！"
                        data-balloon-pos="up"
                      ></p> */}
                      <Floater
                        content={
                          <div
                            style={{
                              textAlign: 'left',
                              lineHeight: '1.8em',
                              fontSize: '14px',
                            }}
                          >
                            シャドーイングの音源は同じスクリプトが5回続けてプレイされます。
                            それを最初から最後まで録音することで、一回の録音課題としてカウントされます。
                          </div>
                        }
                        footer=""
                        offset={0}
                        event="hover"
                        placement="left-end"
                        styles={{
                          floater: {
                            filter: 'none',
                          },
                          container: {
                            backgroundColor: '#36454F',
                            borderRadius: 5,
                            color: '#fff',
                            filter: 'none',
                            minHeight: 'none',
                            maxWidth: 400,
                            padding: 10,
                            textAlign: 'center',
                          },
                          arrow: {
                            color: '#000',
                            length: 8,
                            spread: 10,
                          },
                        }}
                        title={
                          <>
                            <h3
                              style={{
                                margin: '0 0 5px',
                                lineHeight: 1,
                                fontSize: '16px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                              }}
                            >
                              音源プレイ時の注意
                              <span
                                aria-label="Smile with Sunglasses"
                                role="img"
                              >
                                😎
                              </span>{' '}
                              <hr
                                style={{ border: '0.000000001em solid white' }}
                              />
                            </h3>
                          </>
                        }
                      >
                        {/* <ReactAudioPlayer
                          className="tour-step2"
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
                          style={
                            {
                              // backgroundColor: '#b0c4de',
                              // padding: '15px',
                              // width: '80%',
                              // borderRadius: '10px',
                            }
                          }
                        /> */}
                        <ReactPlayer
                          url={bookAudioUrl}
                          controls={true}
                          playbackRate={playbackRate}
                          // loop={playLoop}
                          // playbackRate={1.4}

                          //textTracks={subTitleStatus}
                          volume={null}
                          top="0"
                          left="0"
                          width="90%"
                          height="50px"
                          padding="0px"
                          marginTop="0"
                          style={
                            {
                              // border: '1px solid #ececec',
                            }
                          }
                          onReady={() => {
                            console.log('onReady')
                          }}
                          onStart={() => {
                            console.log('onStart')
                          }}
                          onPause={() => {
                            setPlayStatus(false)
                            console.log('onPause')
                          }}
                          onEnded={() => {
                            setPlayStatus(false)
                            console.log('onEnded')
                          }}
                          onError={() => {
                            console.log('onError')
                          }}
                        />
                        &nbsp;
                      </Floater>
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
                      {bookTitle != 'Eiken3 Buntan' ? (
                        <>
                          <span
                            style={{
                              fontWeight: '600',
                              padding: '20px 0px 10px 20px',
                              color: 'black',
                              fontSize: '20px',
                              borderRadius: '10px',
                              backgroundColor: '#F0E5F7',
                              verticalAlign: 'middle',
                              width: '100%',
                              marginLeft: 0,
                              marginRight: 0,
                            }}
                          >
                            <ruby>
                              教材<rt>きょうざい</rt>
                            </ruby>
                            の{storyStartPage}ページ〜&nbsp;&nbsp;
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
                        </>
                      ) : (
                        <>
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
                            上記のスクリプトを読む
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
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <center>
                      {playbackRate == 0.8 ? (
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setPlaybackRate(0.8)
                          }}
                        >
                          x0.8
                        </a>
                      ) : (
                        <a
                          className="btn btn-light border border-1-dark m-2"
                          onClick={() => {
                            setPlaybackRate(0.8)
                          }}
                        >
                          x0.8
                        </a>
                      )}
                      {playbackRate == 0.9 ? (
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setPlaybackRate(0.9)
                          }}
                        >
                          x0.9
                        </a>
                      ) : (
                        <a
                          className="btn btn-light border border-1-dark m-2"
                          onClick={() => {
                            setPlaybackRate(0.9)
                          }}
                        >
                          x0.9
                        </a>
                      )}
                      {playbackRate == 1 ? (
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setPlaybackRate(1)
                          }}
                        >
                          x1
                        </a>
                      ) : (
                        <a
                          className="btn btn-light border border-1-dark m-2"
                          onClick={() => {
                            setPlaybackRate(1)
                          }}
                        >
                          x1
                        </a>
                      )}
                      {playbackRate == 1.1 ? (
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setPlaybackRate(1.1)
                          }}
                        >
                          x1.1
                        </a>
                      ) : (
                        <a
                          className="btn btn-light border border-1-dark m-2"
                          onClick={() => {
                            setPlaybackRate(1.1)
                          }}
                        >
                          x1.1
                        </a>
                      )}

                      {playbackRate == 1.2 ? (
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setPlaybackRate(1.2)
                          }}
                        >
                          x1.2
                        </a>
                      ) : (
                        <a
                          className="btn btn-light border border-1-dark m-2"
                          onClick={() => {
                            setPlaybackRate(1.2)
                          }}
                        >
                          x1.2
                        </a>
                      )}
                      {playbackRate == 1.3 ? (
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setPlaybackRate(1.3)
                          }}
                        >
                          x1.3
                        </a>
                      ) : (
                        <a
                          className="btn btn-light border border-1-dark m-2"
                          onClick={() => {
                            setPlaybackRate(1.3)
                          }}
                        >
                          x1.3
                        </a>
                      )}
                      {playbackRate == 1.4 ? (
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setPlaybackRate(1.4)
                          }}
                        >
                          x1.4
                        </a>
                      ) : (
                        <a
                          className="btn btn-light border border-1-dark m-2"
                          onClick={() => {
                            setPlaybackRate(1.4)
                          }}
                        >
                          x1.4
                        </a>
                      )}
                      {playbackRate == 1.5 ? (
                        <a
                          className="btn btn-danger m-2"
                          onClick={() => {
                            setPlaybackRate(1.5)
                          }}
                        >
                          x1.5
                        </a>
                      ) : (
                        <a
                          className="btn btn-light border border-1-dark m-2"
                          onClick={() => {
                            setPlaybackRate(1.5)
                          }}
                        >
                          x1.5
                        </a>
                      )}
                    </center>
                    <hr />
                  </div>
                </center>
              </>
            )
          })}
          <span className="tour-step3 tour-step4 tour-step5">
            <VoiceRecorderToS3ForSelfLessonPage5Times
              mbn={myMbn}
              homework_id={HWID}
              practiceTempId={practiceTempId}
              audioDurationFromDB={audioDurtaionFromDB}
              pointKeyNum={pointKeyNum}
              pointStep={currentStep}
              leastRecordCount={leastRecordCount_ondoku}
              pageView={pageView}
            />
          </span>
          <hr />
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
                      className="btn btn-secondary tour-step6"
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
                            backgroundColor: 'yellow',
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
                      className="btn btn-primary mt-0 mb-2 tour-step6"
                      onClick={() => {
                        nextStepCheck()
                      }}
                      id="nextStep"
                    >
                      Step4へ
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
                  <WordListShadowingBook mbn={myMbn} homework_id={HWID} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StepSH3
