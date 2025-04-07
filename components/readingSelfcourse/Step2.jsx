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
import StepImportantWordstep2 from '@/components/readingSelfcourse/StepImportantWordstep2'
import StepGoal from '@/components/readingSelfcourse/StepGoal'
import KizukiPoint from '@/components/readingSelfcourse/kizukiPoint'
import Subpage from '@/components/readingSelfcourse/Subpage'

const Step2 = () => {
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
      content: '',
    },
    {
      target: '.tour-step3',
      title: '③ 音源をプレイする',
      content: '音源をプレイして音読をします。',
    },
    {
      target: '.tour-step4',
      title: '④ ストップボタンを押す',
      content: '音読が終わったらストップボタンを押します。',
      backgroundColor: 'red',
    },
    {
      target: '.tour-step5',
      title: '⑤ 自分の録音した音声をチェック',
      content: '自分の音声を一度聴いて、できない部分を確認します。',
    },
    {
      target: '.tour-step6',
      title: '⑥ 単語登録ボタンを押す',
      content: '知らない単語があったらクリックして登録します。',
    },
    {
      target: '.tour-step7',
      title: '⑦ 次のステップへ',
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
  const [leastRecordCount, setLeaseRecordCount] = useState(
    leastRecordCount_step2
  ) //最低何回録音すれば次のステップへ行けるのか
  const [currentStep, setCurrentStep] = useState('Step2') //
  const [pointKeyNum, setPointKeyNum] = useState('RR-2') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState('音源を聴きながら音読する')
  const [pageTitleSub, setPageTitleSub] = useState('正しい発音をマネしよう！')
  const [subpageTitle, setSubpageTitle] = useState('練習の順番')
  const [firstOrder, setFirstOrder] = useState('①&nbsp;録音ボタン')
  const [firstOrder2, setFirstOrder2] = useState(
    'を押して、『テキストを見ながら』音読する（音源なし）'
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
    '正しい発音をマネしていくことで自分の間違った読み方やイントネーションなどに気づき、発音を改善しようとする意識を持つことができます。'
  )

  // const [stepWords1, setStepWords1] = useState('正しい発音の真似')
  // const [stepWords2, setStepWords2] = useState('大きく声を出す')
  // const [stepWords3, setStepWords3] = useState('意味も考えながら音読')
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
    var url = DB_CONN_URL + '/update-sys-hw-history/'

    // alert('holding-check1' + practiceTempId)

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
          if (courseName == 'CourseA') {
            router.reload('/readingcourseA') // ここでリロード
          } else if (courseName == 'CourseA_SC') {
            router.reload('/readingSelfcourseA') // ここでリロード
          }
        } else if (stepStatus == 'end') {
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
      //step1のFirst録音ポイント:5
      //答えを選んでなかった時
      var step = 'Step2'
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
            if (response.data.length >= leastRecordCount_step2) {
              var stepStatus = 'end'
              var nextStep = 'Step3'
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
    localStorage.setItem('holdTempId', practiceTempId)
    hwHistoryUpdate(currentStep, 'holding', HWID, practiceTempId, nextStep)
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    // var mbn = localStorage.getItem('MypageMbn')
    //console.log('step2/myMbn:', myMbn)

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
                    className="col-lg-4 col-md-6 pt-5"
                    style={{ textAlign: 'center' }}
                  >
                    <StepImportantWordstep2
                      stepWords1={stepWords1}
                      stepWords2={stepWords2}
                      stepWords3={stepWords3}
                    />
                  </div>

                  {/* <div className="col-lg-12 col-md-12  ">
                    <KizukiPoint
                      kizukiTitle={kizukiTitle}
                      kizukiDetail={kizukiDetail}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 mb-3 mt-0 ">
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
                      className="col-lg-7 col-md-12 pt-0"
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
                        className="tour-step3"
                        src={bookAudioUrl}
                        // autoPlay
                        controls
                        onPlay={() => {
                          // alert('playing')
                          // setIsAudioPlaying(true)
                        }}
                        onPause={() => {
                          // alert('paused')
                          // setIsAudioPlaying(false)
                        }}
                        style={{
                          backgroundColor: '#b0c4de',
                          padding: '10px',
                          marginTop: 0,
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
                          marginTop: '20px',
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
                    {/* <div className="col-lg-1 col-md-12 mb-3">&nbsp;</div> */}
                  </div>
                </center>
              </>
            )
          })}
          <span className="tour-step2 tour-step4 tour-step5">
            <VoiceRecorderToS3ForSelfLessonPage
              mbn={myMbn}
              homework_id={HWID}
              practiceTempId={practiceTempId}
              audioDurationFromDB={audioDurtaionFromDB}
              pointKeyNum={pointKeyNum}
              pointStep={currentStep}
              leastRecordCount={leastRecordCount_step2}
              // isAudioPlaying={isAudioPlaying}
            />
          </span>
          {/* <h1>leastRecordCount:{leastRecordCount}</h1> */}
          <hr />
          {currentStep == 'Step5' ? (
            <>
              <button
                className="btn btn-danger mt-0"
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
                      知らない単語を登録する
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
                      className="btn btn-primary mt-0 mb-2 tour-step7"
                      onClick={() => {
                        nextStepCheck()
                      }}
                      id="nextStep"
                    >
                      Step3へ
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          )
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

export default Step2
