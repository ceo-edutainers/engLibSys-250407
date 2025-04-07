import react, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'
import { QuizContext } from './Contexts'
import next from 'next'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PointBar from '@/components/shadowingSelfcourse/PointBar'
import MonsterGet from '@/components/shadowingSelfcourse/MonsterGet'
import FireView from '@/components/shadowingSelfcourse/FireView'
import StepBarSH from '@/components/shadowingSelfcourse/StepBarSH'

import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import Floater from 'react-floater'

import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import StepTitle from '@/components/shadowingSelfcourse/StepTitle'

import StepImportantWordsSHstep2 from '@/components/shadowingSelfcourse/StepImportantWordsSHstep2'

export const config = {
  unstable_runtimeJS: false,
}

const StepSH2 = () => {
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
  const router = useRouter() //使い方：router.replace('/')
  //import useWindowDimensionsを使う
  const { height, width } = useWindowDimensions()
  const thisWidth = width - 10 + 'px'
  //console.log('thisWidth:', thisWidth)

  // let audioRightAnswer = new Audio(
  //   'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/dingdongdang.mp3'
  // )
  // let audioWrongAnswer = new Audio(
  //   'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/wrong-answer.mp3'
  // )
  ////////////////////////////////////////////////////////////////////
  //SETTING START
  ////////////////////////////////////////////////////////////////////
  const [leastRecordCount, setLeaseRecordCount] = useState(0) //最低何回録音すれば次のステップへ行けるのか

  const [currentStep, setCurrentStep] = useState('StepSH2') //
  const [pointKeyNum, setPointKeyNum] = useState('DIC-3') //DBのsys_point_set テーブルの pointKeyNum
  const [pageTitle, setPageTitle] = useState(
    '<ruby>各文章<rt>かくぶんしょ</rt></ruby>の<ruby>音源<rt>おんげん</rt></ruby>を<ruby>聴<rt>き</rt></ruby>いて<ruby>書<rt>か</rt></ruby>く'
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
  // const [stepWords1, setStepWords1] = useState('音の繋がり意識')
  // const [stepWords2, setStepWords2] = useState('リズム意識')
  // const [stepWords3, setStepWords3] = useState('文法意識')
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
  // const [endButton, setEndButton] = useState('')
  const [viewSentence, setViewSentence] = useState(false)
  // const [rightAnswer, setRightAnswer] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false) //Main Storyの音声がPlayされたらtrueになる。必ず音声を聴きながらやるページで必要
  // const [bookSplitAudioUrl, setBookSplitAudioUrl] = useState([])
  // const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
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
  // const [runSplitHW, setRunSplitHW] = useState(false)
  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  // const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  const [isGotPoint, setIsGetPoint] = useState(false) //pointをゲットした場合、trueになる
  // const [audioDurtaionFromDB, setAudioDurtaionFromDB] = useState(0)
  // const [recordingCountForNextStep, setRecordingCountForNextStep] = useState(0)
  // // const [nextQInsert, setNextQInsert] = useState('')
  const [thisRightAnswerAru, setThisRightAnswerAru] = useState([])
  // const [breakCondition, setBreakCondition] = useState([])

  const [gotPointAri, setGotPointAri] = useState(false)
  // const [thisDisable, setThisDisable] = useState('')
  const {
    qrLinkVideoDictation,
    setQrLinkVideoDictation,
    dictationHow,
    setDictationHow,
    myMbn,
    setMyMbn,
    HWID,
    setHWID,
    // lessonOrder,
    // setLessonOrder,
    thisSubject,
    setThisSubject,
    // leastRecordCount_ondoku,
    // setLeastRecordCount_ondoku,
    // leastRecordCount_shadowing,
    // setLeastRecordCount_shadowing,
    // bookCoverImgUrl,
    // setBookCoverImgUrl,
    // bookImgUrl,
    // setBookImgUrl,
    // bookAudioUrl,
    // setBookAudioUrl,
    seriesName,
    setSeriesName,
    // bookStory,
    // setBookStory,
    // shadowingLevel,
    // setShadowingLevel,
    bookTitle,
    setBookTitle,
    // storyStartPage,
    // setStoryStartPage,
    bookNum,
    setBookNum,
    storyNum,
    setStoryNum,
    // storyTitle,
    // setStoryTitle,
    // dictationStart,
    // setDictationStart,
    practiceTempId,
    setPracticeTempId,
    // audioOnOff,
    // setAudioOnOff,
    // course,
    // setCourse,
    // courseName,
    // setCourseName,
    pageView,
    setPageView,
    // courseLevel,
    // setCourseLevel,
    // textbook,
    // setTextbook,
    // eikenLevel,
    // setEikenLevel,
    // userName,
    // setUserName,
    // point,
    // setPoint,
    // totalQuestion,
    // setTotalQuestion,
  } = useContext(QuizContext)

  // useEffect(() => {
  //   localStorage.setItem('nowStep', currentStep)
  // }, [])
  const insertPointToDB = (sentenceOrder) => {
    // alert('sentenceOrder')
    // alert(sentenceOrder)
    // alert('pointStep')
    // alert(currentStep)
    //console.log('run')
    var url = DB_CONN_URL + 'sys-point-member-history-insert-for-dictation'
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
        } else {
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
      // alert('here')
      // console.log('*****currentStep', currentStep)
      // console.log('*****pointKeyNum', pointKeyNum)
      // alert(dictationStatus)
      try {
        var url = DB_CONN_URL + '/update-sys-dictation-history-test'
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
              console.log('2')
              // sameCellDelete()
              // samePointCellDelete()
              setGotPointAri(true)
            }
          })
      } catch (error) {
        console.log('error1:', dictationStatus)
        console.log('error2:', sentenceOrder)
        console.log('error3:', sentence)
        console.log('error4:', yourSentence)
      }
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

      // localStorage.setItem('nowStep', 'StepSH3')
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
    // console.log('string1:', string1)
    // console.log('string2', string2)

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

    // string1 = string1.replace('  ', ' ')
    // string2 = string2.replace('  ', ' ')

    // alert('sentenceOrder')
    // alert(sentenceOrder)

    // alert('oneSentenceOrder')
    // alert(oneSentenceOrder)
    // alert('oneSentence')
    // alert(oneSentence)

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
          // console.log('#########')
          if (string1 === string2) {
            var myAlert = '正解！'

            // console.log('breakCondition:', breakCondition)
            // insertPointToDB(sentenceOrder)

            // console.log('index: ', index)
            // handleButtonResult(
            //   'Right Answer',
            //   sentenceOrder,
            //   sentence,
            //   yourSentence
            // )
            // setBreakCondition(true)
            break
          } else {
            var myAlert =
              'Checking...キャピタル文字・記号(, . ?)は正しいですか？'
          }
        } else {
          var myAlert = 'チェック中4....'
        }
        //console.log('same')
      }
      index++
    }

    if (myAlert == '正解！') {
      console.log('ここ')
      handleButtonResult('Right Answer', sentenceOrder, sentence, yourSentence)
    }
    // if (index == sentence.length) {
    //   // setMyAlert2(myAlert)
    //   insertPointToDB(sentenceOrder)
    //   handleButtonResult('Right Answer', sentenceOrder, sentence, yourSentence)
    // }

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

    // if (allSentence.length == temp.length) {
    //add

    setDictText(temp)
    // console.log('dictTest:', dictText)
    // } //add
  }

  const hoge2 = useMemo(() => {
    return {}
  }, [])

  const splitDataRightCheck = (thisSentenceOrder) => {
    // alert('thisSentenceOrder')
    // alert(thisSentenceOrder)
    var url =
      DB_CONN_URL + '/get-hw-and-Shadowing-info-split-right-answer-check/'
    var Url =
      url +
      bookTitle +
      '&' +
      bookNum +
      '&' +
      storyNum +
      '&' +
      HWID +
      '&' +
      thisSentenceOrder

    const fetchData = async () => {
      try {
        const response = await axios.get(Url)

        setThisRightAnswerAru((thisRightAnswerAru) => [
          ...thisRightAnswerAru,
          response.data.message,
        ])
        // console.log('B:' + thisSentenceOrder + '/' + response.data.message)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    // console.log('run')
  }

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [id, setId] = useState(0)
  useEffect(() => {
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split/'
    var Url = url + bookTitle + '&' + bookNum + '&' + storyNum

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        setSplitHWbookInfo(response.data)
        // funcSplitInfo()
      } catch (error) {
        console.log(error)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [id])

  useEffect(() => {
    // function funcSplitInfo() {
    // console.log('SplitHWbookInfo:', SplitHWbookInfo)
    SplitHWbookInfo.map((val, key) => {
      // console.log('A:', val.sentenceOrder)
      splitDataRightCheck(val.sentenceOrder)
    })
    // }
  }, [SplitHWbookInfo])

  if (isError) return <h1>Error, try again!!!! </h1>
  if (isLoading) return <h1>Loading Page..........................</h1>

  return (
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
            }}
          >
            やり方ツアー
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
                src="/images/homework-typing.png"
                style={{ height: '50px', width: 'auto' }}
              />
            </div>
            <div className="col-lg-4 col-md-6" style={{ textAlign: 'center' }}>
              <StepImportantWordsSHstep2
                stepWords1={stepWords1}
                stepWords2={stepWords2}
                stepWords3={stepWords3}
              />
            </div>
          </div>
          test: {dictationHow}
          {dictationHow == 'Handwriting' && (
            <>
              {' '}
              <div
                className="col-lg-12 col-md-12 pb-3 pt-0 mt-0"
                style={{ textAlign: 'center' }}
              >
                <h5>HandWriting</h5>
                <p
                  style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}
                >
                  [注意]&nbsp;コピーペーストはしないでください。ページエラーになります。現在、このシステムのディクテーションの精度は９５％程度です。もし正しい文章を入力しても正解にならない場合、そのままにして次の文章へ移動してください。
                </p>
              </div>
              <div
                className="col-lg-12 col-md-12 mt-0 pt-0"
                style={{ textAlign: 'center' }}
              >
                {SplitHWbookInfo.map((val, key) => {
                  var fileNum = parseInt(key + 1)
                  var ra = val.sentenceOrder + 'Right'

                  const splitaudio =
                    'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Shadowing/' +
                    seriesName +
                    '/' +
                    bookTitle +
                    '/audio_split/' +
                    val.audio_per_sentence_head_wav +
                    storyNum.toLowerCase() +
                    '_' +
                    fileNum +
                    '.wav'

                  return (
                    <>
                      <div className="row">
                        <div className="col-lg-5 col-md-12 mb-1 p-0">
                          {fileNum < 10 && <span>&nbsp;&nbsp;</span>}
                          {fileNum}.
                          <ReactAudioPlayer
                            className="tour-step1 tour-step3"
                            src={splitaudio}
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
                              width: '90%',
                              height: '30px',
                              verticalAlign: 'middle',
                            }}
                          />
                        </div>

                        {thisRightAnswerAru.indexOf(ra) > -1 ? (
                          <div
                            className="col-lg-5 col-md-12 mb-1"
                            style={{
                              paddingTop: '10px',
                              backgroundColor: '#ececec',
                            }}
                          >
                            <p>正解:{val.sentence}</p>
                          </div>
                        ) : (
                          <>
                            <div className="col-lg-5 col-md-12 p-0 mb-1">
                              {/* test: {thisRightAnswerAru} */}
                              {/* <br />
                          ra:{ra} */}
                              <TextareaAutosize
                                className="tour-step2 tour-step5"
                                aria-label="minimum height"
                                minRows={2}
                                spellCheck="false"
                                key={key}
                                onChange={(e) => {
                                  onchangeInput(
                                    e.target.value,
                                    fileNum,
                                    val.sentence
                                  )
                                }}
                                onClick={() => {
                                  // alert('onclick')
                                  setViewSentence(false)
                                  setViewNum(fileNum)
                                  sameCellDelete()
                                  samePointCellDelete()
                                }}
                                type="text"
                                style={{
                                  width: '100%',
                                  verticalAlign: 'middle',
                                }}
                                disabled={
                                  (dictText[fileNum] && viewSentence) ||
                                  (dictText[fileNum] &&
                                    findDiff(
                                      val.sentence,
                                      dictText[fileNum],
                                      val.sentenceOrder,
                                      val.sentence,
                                      dictText[fileNum]
                                    ) == '正解！' &&
                                    'disabled')
                                }
                              />
                            </div>
                          </>
                        )}
                        <div className="col-lg-2 col-md-12 mb-1">
                          {() => {
                            var rightA = findDiff(
                              val.sentence,
                              dictText[fileNum],
                              val.sentenceOrder,
                              val.sentence,
                              dictText[fileNum]
                            )
                          }}
                          {!dictText[fileNum] ||
                          findDiff(
                            val.sentence,
                            dictText[fileNum],
                            val.sentenceOrder,
                            val.sentence,
                            dictText[fileNum]
                          ) == '正解！' ? (
                            <>
                              <button
                                className="btn btn-secondary mt-2 tour-step4"
                                style={{
                                  width: '70px',
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  color: 'darkgray',
                                  backgroundColor: '#ececec',
                                }}
                                disabled="disabled"
                              >
                                Give Up
                              </button>
                            </>
                          ) : dictText[fileNum] && viewSentence ? (
                            <>
                              <button
                                className="btn btn-primary"
                                // className="btn btn-danger"
                                style={{
                                  width: '70px',
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  color: 'black',
                                  backgroundColor: '#ececec',
                                  fontSize: '10px',
                                }}
                                onClick={() => {
                                  setViewSentence(!viewSentence)
                                  setViewNum(fileNum)
                                  handleButtonResult(
                                    '再開',
                                    val.sentenceOrder,
                                    val.sentence,
                                    dictText[fileNum]
                                  )
                                  // setIsGiveUp(true)
                                }}
                              >
                                再開
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-primary"
                                style={{
                                  width: '70px',
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  color: 'black',
                                  backgroundColor: '#ececec',
                                }}
                                onClick={() => {
                                  setViewSentence(!viewSentence)
                                  setViewNum(fileNum)
                                  handleButtonResult(
                                    'give-up',
                                    val.sentenceOrder,
                                    val.sentence,
                                    dictText[fileNum]
                                  )
                                  // setIsGiveUp(true)
                                }}
                              >
                                Give Up
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      {dictText[fileNum] && !viewSentence && (
                        <h6 style={{ color: 'red', fontWeight: 'bold' }}>
                          {findDiff(
                            val.sentence,
                            dictText[fileNum],
                            val.sentenceOrder,
                            val.sentence,
                            dictText[fileNum]
                          )}
                        </h6>
                      )}

                      {/* {(viewSentence && viewNum == fileNum) ||
                    (viewSentence && rightAnswer && ( */}
                      {viewSentence && viewNum == fileNum && (
                        <div className="col-lg-12 col-md-12 mb-1 p-0">
                          {val.sentence}
                        </div>
                      )}
                    </>
                  )
                })}
              </div>
            </>
          )}
          {dictationHow == 'Typing' && (
            <>
              {' '}
              <div
                className="col-lg-12 col-md-12 pb-3 pt-0 mt-0"
                style={{ textAlign: 'center' }}
              >
                <p
                  style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}
                >
                  [注意]&nbsp;コピーペーストはしないでください。ページエラーになります。現在、このシステムのディクテーションの精度は９５％程度です。もし正しい文章を入力しても正解にならない場合、そのままにして次の文章へ移動してください。
                </p>
              </div>
              <div
                className="col-lg-12 col-md-12 mt-0 pt-0"
                style={{ textAlign: 'center' }}
              >
                {SplitHWbookInfo.map((val, key) => {
                  var fileNum = parseInt(key + 1)
                  var ra = val.sentenceOrder + 'Right'

                  const splitaudio =
                    'https://englib-materials.s3.ap-northeast-1.amazonaws.com/Shadowing/' +
                    seriesName +
                    '/' +
                    bookTitle +
                    '/audio_split/' +
                    val.audio_per_sentence_head_wav +
                    storyNum.toLowerCase() +
                    '_' +
                    fileNum +
                    '.wav'

                  return (
                    <>
                      <div className="row">
                        <div className="col-lg-5 col-md-12 mb-1 p-0">
                          {fileNum < 10 && <span>&nbsp;&nbsp;</span>}
                          {fileNum}.
                          <ReactAudioPlayer
                            className="tour-step1 tour-step3"
                            src={splitaudio}
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
                              width: '90%',
                              height: '30px',
                              verticalAlign: 'middle',
                            }}
                          />
                        </div>

                        {thisRightAnswerAru.indexOf(ra) > -1 ? (
                          <div
                            className="col-lg-5 col-md-12 mb-1"
                            style={{
                              paddingTop: '10px',
                              backgroundColor: '#ececec',
                            }}
                          >
                            <p>正解:{val.sentence}</p>
                          </div>
                        ) : (
                          <>
                            <div className="col-lg-5 col-md-12 p-0 mb-1">
                              {/* test: {thisRightAnswerAru} */}
                              {/* <br />
                          ra:{ra} */}
                              <TextareaAutosize
                                className="tour-step2 tour-step5"
                                aria-label="minimum height"
                                minRows={2}
                                spellCheck="false"
                                key={key}
                                onChange={(e) => {
                                  onchangeInput(
                                    e.target.value,
                                    fileNum,
                                    val.sentence
                                  )
                                }}
                                onClick={() => {
                                  // alert('onclick')
                                  setViewSentence(false)
                                  setViewNum(fileNum)
                                  sameCellDelete()
                                  samePointCellDelete()
                                }}
                                type="text"
                                style={{
                                  width: '100%',
                                  verticalAlign: 'middle',
                                }}
                                disabled={
                                  (dictText[fileNum] && viewSentence) ||
                                  (dictText[fileNum] &&
                                    findDiff(
                                      val.sentence,
                                      dictText[fileNum],
                                      val.sentenceOrder,
                                      val.sentence,
                                      dictText[fileNum]
                                    ) == '正解！' &&
                                    'disabled')
                                }
                              />
                            </div>
                          </>
                        )}
                        <div className="col-lg-2 col-md-12 mb-1">
                          {() => {
                            var rightA = findDiff(
                              val.sentence,
                              dictText[fileNum],
                              val.sentenceOrder,
                              val.sentence,
                              dictText[fileNum]
                            )
                          }}
                          {!dictText[fileNum] ||
                          findDiff(
                            val.sentence,
                            dictText[fileNum],
                            val.sentenceOrder,
                            val.sentence,
                            dictText[fileNum]
                          ) == '正解！' ? (
                            <>
                              <button
                                className="btn btn-secondary mt-2 tour-step4"
                                style={{
                                  width: '70px',
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  color: 'darkgray',
                                  backgroundColor: '#ececec',
                                }}
                                disabled="disabled"
                              >
                                Give Up
                              </button>
                            </>
                          ) : dictText[fileNum] && viewSentence ? (
                            <>
                              <button
                                className="btn btn-primary"
                                // className="btn btn-danger"
                                style={{
                                  width: '70px',
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  color: 'black',
                                  backgroundColor: '#ececec',
                                  fontSize: '10px',
                                }}
                                onClick={() => {
                                  setViewSentence(!viewSentence)
                                  setViewNum(fileNum)
                                  handleButtonResult(
                                    '再開',
                                    val.sentenceOrder,
                                    val.sentence,
                                    dictText[fileNum]
                                  )
                                  // setIsGiveUp(true)
                                }}
                              >
                                再開
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-primary"
                                style={{
                                  width: '70px',
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                  color: 'black',
                                  backgroundColor: '#ececec',
                                }}
                                onClick={() => {
                                  setViewSentence(!viewSentence)
                                  setViewNum(fileNum)
                                  handleButtonResult(
                                    'give-up',
                                    val.sentenceOrder,
                                    val.sentence,
                                    dictText[fileNum]
                                  )
                                  // setIsGiveUp(true)
                                }}
                              >
                                Give Up
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      {dictText[fileNum] && !viewSentence && (
                        <h6 style={{ color: 'red', fontWeight: 'bold' }}>
                          {findDiff(
                            val.sentence,
                            dictText[fileNum],
                            val.sentenceOrder,
                            val.sentence,
                            dictText[fileNum]
                          )}
                        </h6>
                      )}

                      {/* {(viewSentence && viewNum == fileNum) ||
                    (viewSentence && rightAnswer && ( */}
                      {viewSentence && viewNum == fileNum && (
                        <div className="col-lg-12 col-md-12 mb-1 p-0">
                          {val.sentence}
                        </div>
                      )}
                    </>
                  )
                })}
              </div>
            </>
          )}
          <div
            className="col-lg-12 col-md-12"
            style={{ backgroundColor: 'yellow' }}
          ></div>
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
                        sameCellDelete()
                        samePointCellDelete()
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
    </>
  )
}

export default StepSH2
