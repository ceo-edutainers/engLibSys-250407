import react, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
// import QrcodeGenerator from '@/components/shadowingSelfcourse/QrcodeGenerator'
import { QuizContext } from './Contexts'
import next from 'next'

import PointBar from '@/components/shadowingSelfcourse/PointBar'
import MonsterGet from '@/components/shadowingSelfcourse/MonsterGet'
import FireView from '@/components/shadowingSelfcourse/FireView'
import StepBarSH from '@/components/shadowingSelfcourse/StepBarSH'

import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import StepTitle from '@/components/shadowingSelfcourse/StepTitle'
import StepImportantWords from '@/components/shadowingSelfcourse/StepImportantWords'
import StepImportantWords2 from '@/components/shadowingSelfcourse/StepImportantWordsSHstep1'
// import StepGoal from '@/components/shadowingSelfcourse/StepGoal'
import KizukiPoint from '@/components/shadowingSelfcourse/kizukiPoint'
import Subpage from '@/components/shadowingSelfcourse/Subpage'
import { NavigateBeforeSharp } from '@material-ui/icons'
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
  faEye,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import { red } from '@material-ui/core/colors'
import { FaHandHoldingUsd } from 'react-icons/fa'
const StepSH2 = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
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
  const [pageTitle, setPageTitle] = useState('各文章の音源を聴いて書く')
  const [pageTitleSub, setPageTitleSub] = useState('諦めずにやってみましょう！')
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
  const [stepWords1, setStepWords1] = useState('音の繋がり意識')
  const [stepWords2, setStepWords2] = useState('リズム意識')
  const [stepWords3, setStepWords3] = useState('文法意識')

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
      console.log('*****currentStep', currentStep)
      console.log('*****pointKeyNum', pointKeyNum)
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

  // const handlePracticeGiveup = () => {
  //   //練習をやめる時
  //   setIsOpenBackMypage(false)

  //   const fetchData5 = async () => {
  //     try {
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
  //   // router.replace('/shadowingSelfcourse') // ここでリダイレクト
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
  const handlePracticeRest = () => {
    //練習をやめる時
    setIsOpenBackMypage(false)

    const fetchData5 = async () => {
      try {
        // const response = await axios.put(
        //   DB_CONN_URL + '/leveltest-quiz-cancel/' + mbn + '&' + quizTempId
        // )

        var stepStatus = 'holding'
        var nextStep = ''
        // alert('in handlePracticeRest')
        // alert(stepStatus)
        // alert('currentStep')
        // alert(currentStep)
        // alert('nextStep')
        // alert(nextStep)
        hwHistoryUpdate(currentStep, stepStatus, HWID, practiceTempId, nextStep)
        // todaysThisStepsPointUpdateGiveup(
        //   currentStep,
        //   HWID,
        //   practiceTempId,
        //   stepStatus
        // )
      } catch (error) {}
    }
    fetchData5()
    // router.replace('/outputShowAndTellCourse') // ここでリダイレクト
    router.reload('/shadowingSelfcourse') // ここでリロード
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

          if (string1 === string2) {
            var myAlert = '正解！'

            // console.log('breakCondition:', breakCondition)
            // insertPointToDB(sentenceOrder)
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
        //console.log('same')
      }
      index++
    }
    // if (index == sentence.length) {
    //   // setMyAlert2(myAlert)
    //   insertPointToDB(sentenceOrder)
    //   handleButtonResult('Right Answer', sentenceOrder, sentence, yourSentence)
    // }

    return myAlert
  }

  const onchangeInput = (val, index, allSentence) => {
    let temp = []
    temp[index] = val

    // if (allSentence.length == temp.length) {
    //add
    setDictText(temp)
    // } //add
  }

  //このコードは無理かも。
  // const insertHistory= (sentenceOrder, sentence, yourSentence) =>{
  //    insertPointToDB(sentenceOrder)
  //    handleButtonResult('Right Answer', sentenceOrder, sentence, yourSentence)
  // }
  //無限ループしない方法２

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
        // alert(response.data.message)

        setThisRightAnswerAru((thisRightAnswerAru) => [
          ...thisRightAnswerAru,
          response.data.message,
        ])
      } catch (error) {
        console.log(error)
        // alert('this error')
      }
    }

    fetchData()
    // console.log('run')
  }

  //無限ループしない方法１
  //const barsh2 = {}

  //無限ループしない方法２
  const hoge = useMemo(() => {
    return {}
  }, [])

  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var url = DB_CONN_URL + '/get-hw-and-Shadowing-info-split/'
    var Url = url + bookTitle + '&' + bookNum + '&' + storyNum

    const fetchData = async () => {
      setError(false)
      setLoading(true)

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
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [hoge])

  const hoge2 = useMemo(() => {
    return {}
  }, [])

  useEffect(() => {
    SplitHWbookInfo.map((val, key) => {
      splitDataRightCheck(val.sentenceOrder)
    })
  }, [SplitHWbookInfo])

  if (isError) return <h1>Error, try again!!!! </h1>
  if (isLoading) return <h1>Loading Page..........................</h1>

  return (
    // <div>
    <>
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

      <PointBar cStep={pageView} pageTitle="DICTATION" />
      <StepBarSH cStep={pageView} />
      <div className="QuizBigShadowing" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-6" style={{ textAlign: 'center' }}>
              <StepTitle pageTitle={pageTitle} pageTitleSub={pageTitleSub} />
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
                src="/images/homework-typing.png"
                style={{ height: '50px', width: 'auto' }}
              />
            </div>
            <div className="col-lg-4 col-md-6" style={{ textAlign: 'center' }}>
              <StepImportantWords2
                stepWords1={stepWords1}
                stepWords2={stepWords2}
                stepWords3={stepWords3}
              />
            </div>
            <div className="col-lg-12 col-md-12  ">
              <KizukiPoint
                kizukiTitle={kizukiTitle}
                kizukiDetail={kizukiDetail}
              />
            </div>
            <div className="col-lg-12 col-md-12 mb-3 mt-0 ">
              <Subpage
                firstOrder={firstOrder}
                secondOrder={secondOrder}
                thirdOrder={thirdOrder}
                fourthOrder={fourthOrder}
                fifthOrder={fifthOrder}
                startPageNum={storyStartPage}
                subpageTitle={subpageTitle}
              />
            </div>
          </div>
          <div
            className="col-lg-12 col-md-12 mt-5"
            style={{ textAlign: 'center' }}
          >
            <p
              style={{ textAlign: 'center' }}
              className="tooltip-big-text tooltip-red"
              data-balloon-visible
              aria-label="左の音源を聴いて、右空欄に聞こえたままを書きましょう。大文字、
            ピリオド、クエスチョンマーク、カンマなど文法的な部分に気をつけながら書きましょう。
            どうしてもできない場合は、右側のGive
            upボタンを押して、正しいセンテンスを確認します。"
              data-balloon-pos="up"
              data-balloon-length="fit"
            ></p>

            {SplitHWbookInfo.map((val, key) => {
              var fileNum = parseInt(key + 1)

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
                      {fileNum}
                      <ReactAudioPlayer
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
                          backgroundColor: '#ccc777',
                          padding: '15px',
                          width: '90%',
                          borderRadius: '10px',
                          verticalAlign: 'middle',
                        }}
                      />
                    </div>

                    {thisRightAnswerAru[key] != 'Right' ? (
                      <>
                        <div className="col-lg-5 col-md-12 p-0 mb-1">
                          <textarea
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
                            }}
                            type="text"
                            style={{ width: '100%', verticalAlign: 'middle' }}
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
                          {/* this:{thisRightAnswerAru[key]} */}
                        </div>
                      </>
                    ) : (
                      <div
                        className="col-lg-5 col-md-12 mb-1"
                        style={{
                          paddingTop: '10px',
                          backgroundColor: '#ececec',
                        }}
                      >
                        <p>正解:{val.sentence}</p>
                      </div>
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
                      {
                        !dictText[fileNum] ||
                        findDiff(
                          val.sentence,
                          dictText[fileNum],
                          val.sentenceOrder,
                          val.sentence,
                          dictText[fileNum]
                        ) == '正解！' ? (
                          <>
                            <button
                              className="btn btn-secondary mt-2"
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
                            {/* <button
                              className="btn btn-danger"
                              // className="btn btn-danger"
                              style={{
                                width: '30px',
                                paddingRight: 0,
                                paddingLeft: 0,
                                color: 'white',
                                backgroundColor: '#ececec',
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                size="1x"
                                color="red"
                              />
                            </button> */}

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
                        )

                        // <button
                        //   className={
                        //     dictText[fileNum] && viewSentence
                        //       ? 'btn btn-primary'
                        //       : 'btn btn-danger'
                        //   }
                        //   // className="btn btn-danger"
                        //   style={{
                        //     width: '70px',
                        //     paddingRight: 0,
                        //     paddingLeft: 0,
                        //     color: 'white',
                        //   }}
                        //   onClick={() => {
                        //     setViewSentence(!viewSentence)
                        //     setViewNum(fileNum)
                        //     handleButtonResult(
                        //       'give-up',
                        //       val.sentenceOrder,
                        //       val.sentence,
                        //       dictText[fileNum]
                        //     )
                        //     // setIsGiveUp(true)
                        //   }}
                        // >
                        //   {dictText[fileNum] && viewSentence
                        //     ? '再開'
                        //     : 'give-up'}
                        // </button>
                      }
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
          <div
            className="col-lg-12 col-md-12"
            style={{ backgroundColor: 'yellow' }}
          ></div>
          {/* <VoiceRecorderToS3ForSelfLessonPage
            mbn={myMbn}
            homework_id={HWID}
            practiceTempId={practiceTempId}
            audioDurationFromDB={audioDurtaionFromDB}
            pointKeyNum={pointKeyNum}
            pointStep={currentStep}
            leastRecordCount={leastRecordCount}
             pageView={pageView}
            // isAudioPlaying={isAudioPlaying}
          /> */}
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
