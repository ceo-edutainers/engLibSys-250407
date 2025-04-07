import React, { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
// import TextareaAutosize from 'react-textarea-autosize'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
// import QrcodeGenerator from '@/components/shadowingSelfcourse/QrcodeGenerator'

import { QuizContext } from './Contexts'

// import next from 'next'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PointBar from '@/components/shadowingSelfcourseVideo/PointBar'
import MonsterGet from '@/components/shadowingSelfcourse/MonsterGet'
import FireView from '@/components/shadowingSelfcourse/FireView'
import StepBarSH from '@/components/shadowingSelfcourse/StepBarSH'
import Upload from '@/components/shadowingSelfcourseVideo/uploadDictation'
import ViewDictationFile from '@/components/shadowingSelfcourseVideo/viewDictationFile'
// import ReactPlayer from 'react-player'
// import ReactAudioPlayer from 'react-audio-player'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
// import Floater from 'react-floater'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
// import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage'
// import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import StepTitle from '@/components/shadowingSelfcourse/StepTitle'
// import StepImportantWords from '@/components/shadowingSelfcourse/StepImportantWords'
import StepImportantWords2 from '@/components/shadowingSelfcourseVideo/StepImportantWordsSHstep2'
import YoutubeScriptTimeInsertForStudentStep2 from '@/components/Youtube/YoutubeScriptTimeInsertForStudentStep2'
const StepSH2 = () => {
  // useEffect(() => {
  //   if (dictationStart == '') {
  //     setPageView('StepSH3')
  //   }
  // }, [])

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
      content: 'まず音源を聴きます',
      // disableBeacon: true,
    },
    {
      target: '.tour-step2',
      title: '② タイプする',
      content: '聴こえたままを書き出す',
    },
    {
      target: '.tour-step3',
      title: '③ 繰り返し聴く',
      content: '①の聴くと②の書くを正解するまで繰り返す',
    },
    {
      target: '.tour-step4',
      title: '④ Give Upボタンを押す',
      content: '正解できない場合、Give Upボタンを押して一度確認する',
      backgroundColor: 'red',
    },
    {
      target: '.tour-step5',
      title: '⑤ もう一度チャレンジ',
      content: '',
      backgroundColor: 'red',
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
  const [vocaPartView, setVocaPartView] = useState(false)
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
  const [leastRecordCount, setLeaseRecordCount] = useState(0) //最低何回録音すれば次のステップへ行けるのか

  const [currentStep, setCurrentStep] = useState('StepSH2') //
  const [pointKeyNum, setPointKeyNum] = useState('DIC-3') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState(
    '<ruby>各文章<rt>かくぶんしょう</rt></ruby>の<ruby>音源<rt>おんげん</rt></ruby>を<ruby>聴<rt>き</rt></ruby>いて<ruby>書<rt>か</rt></ruby>く'
  )
  const [pageTitleSub, setPageTitleSub] = useState(
    '<ruby>諦<rt>あきら</rt></ruby>めずにやってみましょう！'
  )
  const [subpageTitle, setSubpageTitle] = useState('練習の順番')

  const [firstOrder, setFirstOrder] = useState(
    '①&nbsp;文章ごとに左三角をクリックして音源を聴く。'
  )
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;聞こえたままを右空欄にタイプする。'
  )
  const [thirdOrder, setThirdOrder] = useState(
    '③&nbsp;正解になるまで音源を聴きながら、書く。どうしてもわからないときは右のGIve upボタンを押す。'
  )
  const [fourthOrder, setFourthOrder] = useState(
    '④&nbsp;これを全ての文章でやり終えてから、次のステップへ'
  )
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '聴こえる単語、聴こえない単語がわかる。現時点での自分の文法力を認識できる。発音のつながりを分解して認識することができる。自分の聞こえ方と本来のテキスト文章とのギャップを認識できる。'
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
  const [dictText, setDictText] = useState([])
  const [dictTextRight, setDictTextRight] = useState(false)
  const [viewNum, setViewNum] = useState('')
  const [endButton, setEndButton] = useState('')
  const [viewSentence, setViewSentence] = useState(false)
  // const [rightAnswer, setRightAnswer] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false) //Main Storyの音声がPlayされたらtrueになる。必ず音声を聴きながらやるページで必要
  // const [bookSplitAudioUrl, setBookSplitAudioUrl] = useState([])
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  const [isGiveUp, setIsGiveUp] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  const [HWbookInfo, setHWbookInfo] = useState([]) //DBからHW bookののデータを持ってきて入れる
  // const [thisBookTitle, setThisBookTitle] = useState()
  // const [thisBookNum, setThisBookNum] = useState()
  // const [thisStoryNum, setThisStoryNum] = useState()
  const [SplitHWbookInfo, setSplitHWbookInfo] = useState([]) //DBからHW bookの詳細なデータを持ってくる
  const [runSplitHW, setRunSplitHW] = useState(false)
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)
  const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // const [nextQInsert, setNextQInsert] = useState('')
  const [thisRightAnswerAru, setThisRightAnswerAru] = useState([])
  // const [breakCondition, setBreakCondition] = useState([])

  const [gotPointAri, setGotPointAri] = useState(false)
  const [thisDisable, setThisDisable] = useState('')
  const {
    audioDuration,
    setAudioDuration,
    qrLinkVideoDictation,
    setQrLinkVideoDictation,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    youtubeID,
    setYoutubeID,
    dictationSec,
    setDictationSec,
    shadowingHWAmount,
    setShadowingHWAmount,
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

  const insertPointToDB = (sentenceOrder) => {
    //  var url = DB_CONN_URL + 'sys-point-member-history-insert-for-dictation'
    var url = DB_CONN_URL + '/sys-point-member-history-insert-for-dictation'
    axios
      .post(url, {
        mbn: myMbn,
        homework_id: HWID,
        pointKeyNum: pointKeyNum,
        pointStep: currentStep,
        practiceTempId: practiceTempId,
        forDictationSentenceOrder: sentenceOrder,
      })
      .then((response) => {
        if (!response.data.status) {
          //console.log('no information', response)
          // alert(response.data.message) //for test
          // alert('forDictationSentenceOrder1')
          // alert(response.data.forDictationSentenceOrder)
          //alert('ポイントゲット!!!')
        } else {
          //alert(response.data.message)
          //alert('forDictationSentenceOrder2')
          //alert(response.data.forDictationSentenceOrder)
          // setCurrentQuestion(currentQuestion + 1)
          // setNowClickedColor('')
        }
      })
  }

  const handleButtonResult = (
    dictationStatus,
    sentenceOrder,
    sentence,
    yourSentence
  ) => {
    const fetchData = async () => {
      var mbn = localStorage.getItem('MypageMbn')
      // console.log('*****currentStep', currentStep)
      // console.log('*****pointKeyNum', pointKeyNum)

      try {
        var url = DB_CONN_URL + '/update-sys-dictation-history'
        axios
          .post(url, {
            mbn: mbn,
            homework_id: HWID,
            dictationStatus: dictationStatus,
            sentenceOrder: sentenceOrder,
            sentence: sentence,
            yourSentence: yourSentence,
            seriesName: seriesName,
            bookTitle: bookTitle,
            bookNum: bookNum,
            storyNum: storyNum,
            practiceTempId: practiceTempId,
            pointStep: currentStep,
            pointKeyNum: pointKeyNum,
          })
          .then((response) => {
            if (response.data.status) {
              sameCellDelete()
              samePointCellDelete()
              setGotPointAri(true)
            }
          })
      } catch (error) {}
    }
    fetchData()
  }

  //useEffectの無限ループしないために

  //正解した時に重複に重ねて入るデーターを1個残して削除
  const sameCellDelete = () => {
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/update-sys-dictation-history-same-cell-delete'
        axios.get(url).then((response) => {
          if (!response.data.status) {
          }

          // alert('message')
          // alert(response.data.message)
        })
      } catch (error) {}
    }
    fetchData()
  }

  //正解した時に重複に重ねて入るデーターを1個残して削除
  const samePointCellDelete = () => {
    const fetchData = async () => {
      try {
        var url = DB_CONN_URL + '/update-sys-point-history-same-cell-delete'
        axios.get(url).then((response) => {
          if (!response.data.status) {
          }

          // alert('message')
          // alert(response.data.message)
        })
      } catch (error) {}
    }
    fetchData()
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
          if (gotPointAri) {
            //このstepでポイントをゲットした場合のみ以下を見せる
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
              url("/images/animated-icons/giphy.gif")
              center top
              no-repeat
            `,
            })
            setPageView(nextStep)
          }
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
      var step = 'StepSH2'
      var homework_id = HWID
      var url = DB_CONN_URL + '/record-select-step/'
      var Url = url + step + '&' + homework_id + '&' + practiceTempId

      const fetchData = async () => {
        try {
          // const response =
          await axios.get(Url).then((response) => {
            if (response.data.length >= leastRecordCount) {
              var stepStatus = 'end'
              var nextStep = 'StepSH3'
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

  const findDiff = (
    string1,
    string2,
    sentenceOrder,
    sentence,
    yourSentence
  ) => {
    // we will use this to keep an eye on the two strings
    string1 = string1.replace('’', "'")
    console.log('string1:', string1)
    console.log('string2', string2)

    string1 = string1.trim()
    string2 = string2.trim()

    // string1 = string1.replace('.', '')
    // string1 = string1.replace(',', '')
    // string1 = string1.replace('?', '')
    // string2 = string2.replace('?', '')

    // string2 = string2.replace('.', '')
    // string2 = string2.replace(',', '')

    string1 = string1.replace('!', '.')
    string2 = string2.replace('!', '.')
    string1 = string1.replace('-', ' ')
    string2 = string2.replace('-', ' ')
    // string1 = string1.replace('   ', ' ')
    string2 = string2.replace('  ', ' ')
    string2 = string2.replace('’', "'")

    let index = 0

    while (index < string1.length || index < string2.length) {
      const left_char = string1[index]
      const right_char = string2[index]

      if (left_char != right_char) {
        var myAlert =
          'CHECK....大文字・半角スペース・記号(, . ?)は正しいですか？'
        // console.log('left_char', left_char)
        // console.log('right_char', right_char)
      } else {
        // var sliceString1 = string1.slice(0, -1)
        //記号など使わない。
        if (
          string2.includes('..') ||
          string2.includes(',.') ||
          string2.includes('.,') ||
          string2.match(/[^A-Za-z0-9.?]+/)
        ) {
          var myAlert = 'チェック中2....'

          if (string1 === string2) {
            var myAlert = '正解！'
            handleButtonResult(
              'Right Answer',
              sentenceOrder,
              sentence,
              yourSentence
            )
            // setBreakCondition(true)
          } else {
            var myAlert =
              'Checking...キャピタル文字・記号(, . ?)は正しいですか？'
          }
        } else {
          var myAlert = 'チェック中4....'
        }
      }
      index++
    }

    return myAlert
  }

  const onchangeInput = (val, index, allSentence) => {
    // val = val.replace("'", '’')
    // console.log('test', val)
    let temp = []
    // temp[index] = val
    // temp[index] = val.replace("'", '’')
    temp[index] = val
    //  string2 = string2.replace("'", '’')
    //  string1 = string1.replace("'", '’')

    setDictText(temp)
    console.log('dictTest:', dictText)
  }

  // const splitDataRightCheck = (thisSentenceOrder) => {
  //   var url =
  //     DB_CONN_URL + '/get-hw-and-Shadowing-info-split-right-answer-check/'
  //   var Url =
  //     url +
  //     bookTitle +
  //     '&' +
  //     bookNum +
  //     '&' +
  //     storyNum +
  //     '&' +
  //     HWID +
  //     '&' +
  //     thisSentenceOrder

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(Url)
  //       // alert(response.data.message)
  //       // alert(HWID)

  //       setThisRightAnswerAru((thisRightAnswerAru) => [
  //         ...thisRightAnswerAru,
  //         response.data.message,
  //       ])
  //       console.log('B:' + thisSentenceOrder + '/' + response.data.message)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }

  // const [isLoading, setLoading] = useState(false)
  // const [isError, setError] = useState(false)
  // const [id, setId] = useState(0)
  // useEffect(() => {
  //   var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split/'
  //   var Url = url + bookTitle + '&' + bookNum + '&' + storyNum

  //   const fetchData = async () => {
  //     setError(false)
  //     setLoading(true)

  //     try {
  //       const response = await axios.get(Url)
  //       setSplitHWbookInfo(response.data)
  //     } catch (error) {
  //       console.log(error)
  //       setError(true)
  //     }

  //     setLoading(false)
  //   }

  //   fetchData()
  // }, [id])

  // useEffect(() => {
  //   console.log('SplitHWbookInfo:', SplitHWbookInfo)
  //   SplitHWbookInfo.map((val, key) => {
  //     console.log('A:', val.sentenceOrder)
  //     splitDataRightCheck(val.sentenceOrder)
  //   })
  // }, [SplitHWbookInfo])

  // if (isError) return <h1>Error, try again!!!! </h1>
  // if (isLoading) return <h1>Loading Page..........................</h1>

  return (
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

      <div className="QuizBig" style={{ border: 0, backgroundColor: 'white' }}>
        <div className="row">
          <div className="col-lg-10 col-md-6 pb-0 mb-0">
            <MonsterGet />
          </div>
          <div className="col-lg-2 col-md-6">
            <FireView thisSubject={thisSubject} />
          </div>
        </div>
      </div>

      <PointBar
        cStep={pageView}
        pageTitle="DICTATION"
        pageSubTitle="ディクテーション"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarSH cStep={pageView} />

      <div
        className="QuizBigShadowing pr-0 pl-0"
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
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-6" style={{ textAlign: 'center' }}>
              <StepTitle pageTitle={pageTitle} pageTitleSub={pageTitleSub} />
              <img
                src="/images/homework-listening.png"
                style={{
                  height: '50px',
                  width: 'auto',
                  marginRight: '20px',
                }}
              />
              <img
                src="/images/homework-writing.png"
                style={{ height: '70px', width: 'auto' }}
              />
            </div>
            <div className="col-lg-4 col-md-6" style={{ textAlign: 'center' }}>
              <StepImportantWords2
                stepWords1={stepWords1}
                stepWords2={stepWords2}
                stepWords3={stepWords3}
              />
            </div>
          </div>

          <center>
            <div className="row">
              <div
                className="col-lg-12 col-md-12 mt-3"
                style={{ textAlign: 'center' }}
              >
                {/* <VoiceRecorderToS3ForSelfLessonPage
                  mbn={myMbn}
                  homework_id={HWID}
                  practiceTempId={practiceTempId}
                  audioDurationFromDB={audioDurtaionFromDB}
                  pointKeyNum={pointKeyNum}
                  pointStep={currentStep}
                  leastRecordCount={leastRecordCount_ondoku}
                  pageView={pageView}
                />
                <hr /> */}
                {/* <h1>{dictationStart}</h1> */}
                {dictationStart != 'ok' ? (
                  <>
                    <div
                      className="col-lg-12 col-md-12 p-3  mb-0"
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#F9E79F',
                        border: '1px solid #F9E79F',
                        borderRadius: '20px',
                      }}
                    >
                      <h4 style={{ fontSize: '15px' }}>
                        あなたはまだディクテーション
                        <ruby>
                          課題<rt>かだい</rt>
                        </ruby>
                        が与えられてないため、この
                        <ruby>
                          課題<rt>かだい</rt>
                        </ruby>
                        はスキップして
                        <ruby>
                          大丈夫<rt>だいじょうぶ</rt>
                        </ruby>
                        です。 もし少しやってみたい{' '}
                        <ruby>
                          場合<rt>ばあい</rt>
                        </ruby>
                        、いくつかチャレンジした
                        <ruby>
                          後<rt>ご</rt>
                        </ruby>
                        、
                        <ruby>
                          写<rt>うつ</rt>
                        </ruby>
                        しをアップロードしてください。
                      </h4>
                      <span
                        style={{
                          fontWeight: 'bold',
                          backgroundColor: '#333888',
                          border: 0,
                          cursor: 'pointer',
                        }}
                        className="btn btn-primary mt-0  pt-3"
                        onClick={() => {
                          nextStepCheck()
                        }}
                        id="nextStep"
                      >
                        この
                        <ruby>
                          課題<rt>かだい</rt>
                        </ruby>
                        をスキップして
                        <ruby>
                          次<rt>つぎ</rt>
                        </ruby>
                        のステップへ
                        <ruby>
                          行<rt>い</rt>
                        </ruby>
                        く
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="container">
                      <div className="row">
                        <div
                          className="col-lg-12 col-md-12 p-3 mb-0"
                          style={{
                            textAlign: 'center',
                            backgroundColor: '#F9E79F',
                            border: '1px solid #F9E79F',
                            borderRadius: '10px',
                          }}
                        >
                          <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>
                            {' '}
                            <ruby>
                              今回<rt>こんかい</rt>
                            </ruby>
                            の
                            <ruby>
                              課題<rt>かだい</rt>
                            </ruby>
                            <br />
                            シャドーイング:{' '}
                            <span style={{ color: 'red', fontSize: '20px' }}>
                              {shadowingHWAmount == 'ALL' ? (
                                '全てやる'
                              ) : (
                                <span>
                                  {shadowingHWAmount == 'first half' && '前半'}
                                  {shadowingHWAmount == 'second half' && '後半'}

                                  <span style={{ fontSize: '15px' }}>
                                    &nbsp;
                                    <ruby>
                                      以上<rt>いじょう</rt>
                                    </ruby>
                                  </span>
                                </span>
                              )}
                            </span>
                            &nbsp;&nbsp; ディクテーションの
                            <ruby>
                              長<rt>なが</rt>
                            </ruby>
                            さ：
                            <span style={{ color: 'red', fontSize: '20px' }}>
                              {dictationSec == 'all' ? (
                                '全てやる'
                              ) : (
                                <span>
                                  {dictationSec == '30s' && '30秒'}
                                  {dictationSec == '1m' && '1分'}
                                  {dictationSec == '1m 30s' && '1分30秒'}
                                  {dictationSec == '2m' && '2分'}
                                  {dictationSec == '2m 30s' && '2分30秒'}
                                  {dictationSec == '3m' && '3分'}
                                  {dictationSec == '3m 30s' && '3分30秒'}
                                  {dictationSec == '4m' && '4分'}
                                  {dictationSec == '4m 30s' && '4分30秒'}
                                  {dictationSec == '5m' && '5分'}
                                  <span style={{ fontSize: '15px' }}>
                                    &nbsp;
                                    <ruby>
                                      以上<rt>いじょう</rt>
                                    </ruby>
                                  </span>
                                </span>
                              )}
                            </span>
                            <br />
                            {/* <p>これより長い時間チャレンジすることも可能です！</p> */}
                            {dictationSec != 'all' ? (
                              <span>
                                ディクテーションをしたい
                                <ruby>
                                  部分<rt>ぶぶん</rt>
                                </ruby>
                                を
                                <ruby>
                                  自分<rt>じぶん</rt>
                                </ruby>
                                で
                                <ruby>
                                  選<rt>えら</rt>
                                </ruby>
                                んで、
                                <ruby>
                                  上<rt>うえ</rt>
                                </ruby>
                                のチャレンジ
                                <ruby>
                                  時間<rt>じかん</rt>
                                </ruby>
                                <ruby>
                                  以上<rt>いじょう</rt>
                                </ruby>
                                やりましょう！
                              </span>
                            ) : (
                              <span>
                                ビデオの
                                <ruby>
                                  最初<rt>さいしょ</rt>
                                </ruby>
                                から
                                <ruby>
                                  最後<rt>さいご</rt>
                                </ruby>
                                までディクテーションをやってください。
                              </span>
                            )}
                            <br />
                          </h4>
                          <p style={{ fontSize: '12px' }}>
                            ディクテーションの
                            <ruby>
                              課題<rt>かだい</rt>
                            </ruby>
                            の
                            <ruby>
                              長<rt>なが</rt>
                            </ruby>
                            さを
                            <ruby>
                              変更<rt>へんこう</rt>
                            </ruby>
                            するためには、レッスン
                            <ruby>
                              時<rt>じ</rt>
                            </ruby>
                            に
                            <ruby>
                              先生<rt>せんせい</rt>
                            </ruby>
                            と
                            <ruby>
                              決<rt>き</rt>
                            </ruby>
                            めてください。
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <YoutubeScriptTimeInsertForStudentStep2
                  currentStep={currentStep}
                  practiceTempId={practiceTempId}
                  yID={youtubeID}
                  homework_id={HWID}
                  mbn={myMbn}
                  shadowingSpeed={shadowingSpeed}
                  shadowingTitle={shadowingTitle}
                  dictationStart={dictationStart}
                  dictationSec={dictationSec}
                  dictationHow={dictationHow}
                />
              </div>

              <div className="col-lg-12 col-md-12">
                <Upload
                  currentStep="StepSH2"
                  stepStatus="Dictation Upload"
                  pointKeyNum="DIC-4"
                  homework_id={HWID}
                  qrLinkVideoDictation={qrLinkVideoDictation}
                />
              </div>
              <div className="col-lg-12 col-md-12">
                <ViewDictationFile
                  currentStep="StepSH2"
                  stepStatus="Dictation Upload"
                />
              </div>
            </div>
          </center>
          <div className="row">
            {/* <div className="col-lg-6 col-md-12">
              <div className="banner-content" style={{ paddingTop: '15px' }}>
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
            </div> */}
            <div className="col-lg-12 col-md-12">
              <div className="banner-content" style={{ paddingTop: '20px' }}>
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
                  Step3へ
                </button>
              </div>
            </div>
          </div>
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
          {/* <SweetAlert
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
          </SweetAlert> */}
          <SweetAlert
            title="本当に諦めますか？"
            show={isGiveUp}
            onConfirm={() => setIsGiveUp(false)}
            onCancel={() => {
              setIsGiveUp(false)
            }}
            confirmBtnText="諦める"
            cancelBtnText="もう少し頑張ってみる。"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>
              決まった回数以上の録音が終わってないと次のステップに行けません。
            </p>
          </SweetAlert>
        </div>
      </div>
      {/* {vocaPartView && (
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
      )} */}
    </>
  )
}

export default StepSH2
