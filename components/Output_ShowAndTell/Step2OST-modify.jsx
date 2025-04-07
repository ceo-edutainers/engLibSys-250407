//quizapp_big_design.css
import react, { useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import { QuizContext } from './Contexts'
import Upload from '@/components/Output_ShowAndTell/upload'
import next from 'next'
import Router, { useRouter } from 'next/router'
import ReactAudioPlayer from 'react-audio-player'
import PointBar from '@/components/Output_ShowAndTell/PointBar'
import MonsterGet from '@/components/Output_ShowAndTell/MonsterGet'
import FireView from '@/components/Output_ShowAndTell/FireView'
import StepBarOST from '@/components/Output_ShowAndTell/StepBarOST'
import WordCounter from '@/components/Output_ShowAndTell/WordCounter'
import SweetAlert from 'react-bootstrap-sweetalert'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorderToS3ForSelfLessonPage from '@/components/VoiceRecorder/VoiceRecorderToS3ForSelfLessonPage'
import SpeechToText from '@/components/voice-to-text/SpeechToText'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import fireRed from './img/fire.png'
import fireGray from './img/fire-gray.png'
import { Repeat } from '@material-ui/icons'

import StepTitle from '@/components/Output_ShowAndTell/StepTitle'
import StepImportantWords from '@/components/Output_ShowAndTell/StepImportantWords'
import StepImportantWords2 from '@/components/Output_ShowAndTell/StepImportantWords2'
import StepGoal from '@/components/Output_ShowAndTell/StepGoal'
import OutlineSample from '@/components/Output_ShowAndTell/SampleOutline'
import Subpage from '@/components/Output_ShowAndTell/SubpageStep2'

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
const Step2OST = () => {
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
  const [currentStep, setCurrentStep] = useState('Step2OST') //
  const [pointKeyNum, setPointKeyNum] = useState('ST-2') //DBのsys_point_set テーブルの pointKeyNum
  const [osusumeLetterSum, setOsusumeLetterSum] = useState(200)
  const [pageTitle, setPageTitle] = useState('アウトラインを書く')
  const [pageTitleSub, setPageTitleSub] = useState(
    'マインドマップを元にアウトラインを書こう！'
  )

  const [subpageTitle, setSubpageTitle] = useState('アウトラインの書き方')
  const [firstOrder, setFirstOrder] = useState(
    '①&nbsp;自分で発表したいトピックをセンテンス毎に箇条書きにしてみる。'
  ) //Step1で作成したマインドマップに書いた単語や、表現を使用して、短い文章をたくさん書いてみます。
  const [secondOrder, setSecondOrder] = useState(
    '②&nbsp;文章を書く中で、知らない単語や表現は辞書で調べて書いてみる。'
  )
  const [thirdOrder, setThirdOrder] = useState(
    '③&nbsp;200単語以上書いてください。(レッスン前までに200単語以上書かないとポイントはゲットできません)'
  )
  const [fourthOrder, setFourthOrder] = useState('')
  const [fifthOrder, setFifthOrder] = useState('')
  const [kizukiTitle, setKizukiTitle] = useState('このステップの気づきポイント')
  const [kizukiDetail, setKizukiDetail] = useState(
    '最初に聴く音声でシャドーイングをしてみることで、自分ができない部分を気づくことができます。そして、この音声を練習最後の日の録音音声と比較することで、成長を感じることができます。'
  )
  const [whyThisStepTitle, setWhythisStepTitle] = useState(
    'なぜスクリプトの前にアウトラインを書くのか?'
  )
  const [whyThisStep, setWhythisStep] = useState(
    'アウトラインを書く際には、Introduction、 Body、 Conclusionのパーツ毎に文章の流れを考えながら自分の要点を簡単なセンテンスでリスト化します。アウトラインを作成すると、文章のポイントを忘れずに、それぞれのセンテンスを指針に詳しい説明を付け加えていくことでスクリプトを書くことができます。'
  )

  const [stepWords1, setStepWords1] = useState('文法意識')
  const [stepWords2, setStepWords2] = useState('')
  const [stepWords3, setStepWords3] = useState('')

  const [outlineTopic, setOutlineTopic] = useState('')
  const [outlineIntroduction, setOutlineIntroduction] = useState('')
  const [outlineBody, setOutlineBody] = useState('')
  const [outlineConclusion, setOutlineConclusion] = useState('')

  const [outlineTopicWordLength, setOutlineTopicWordLength] = useState(0)
  const [outlineIntroductionWordLength, setOutlineIntroductionWordLength] =
    useState(0)
  const [outlineBodyWordLength, setOutlineBodyWordLength] = useState(0)
  const [outlineConclusionWordLength, setOutlineConclusionWordLength] =
    useState(0)

  const [wordsum, setWordsum] = useState()

  ////////////////////////////////////////////////////////////////////
  //SETTING END
  ////////////////////////////////////////////////////////////////////
  const [isAudioPlaying, setIsAudioPlaying] = useState(false) //Main Storyの音声がPlayされたらtrueになる。必ず音声を聴きながらやるページで必要

  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [isGoNextPage, setIsGoNextPage] = useState(false)
  const [isCantGoNextPage, setIsCantGoNextPage] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [Questions, setQuestions] = useState([]) //DBから本ののデータを持ってきて入れる
  const [HWWritingInfo, setHWWritingInfo] = useState([]) //DBからHWのデータを持ってきて入れる
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
    yoyakuDate,
    setYoyakuDate,
    yoyakuTime,
    setYoyakuTime,
    thisSubject,
    setThisSubject,
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
    userName,
    setUserName,
    point,
    setPoint,
  } = useContext(QuizContext)

  const handlePracticeRest = () => {
    //練習をやめる時
    setIsOpenBackMypage(false)

    const fetchData5 = async () => {
      try {
        var stepStatus = 'holding'
        var nextStep = ''
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
    router.reload('/outputShowAndTellCourse') // ここでリロード
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
          addWriting()
          router.reload('/outputShowAndTellCourse') // ここでリロード
        } else if (stepStatus == 'end') {
          addWriting()
          insertPointToDB()
          setPageView(nextStep)
        }
      })
  }
  const addWriting = () => {
    var mbn = localStorage.getItem('MypageMbn')
    if (outlineTopic == '') {
      setOutlineTopic('&nbps;')
    }
    if (outlineIntroduction == '') {
      setOutlineIntroduction('&nbps;')
    }
    if (outlineBody == '') {
      setOutlineBody('&nbps;')
    }
    if (outlineConclusion == '') {
      setOutlineConclusion('&nbps;')
    }
    var url = DB_CONN_URL + '/reg-sys-hw-show-and-tell-writing'
    axios
      .post(url, {
        mbn: mbn,
        subject: thisSubject,
        homework_id: HWID,
        practiceTempId: practiceTempId,
        step: currentStep,
        outline_topic: outlineTopic,
        outline_introduction: outlineIntroduction,
        outline_body: outlineBody,
        outline_conclusion: outlineConclusion,
      })
      .then((response) => {
        //console.log(response.data.message)
        if (!response.data.status) {
          //alert(response.data.message)
        } else {
        }
      })
  }

  const nextStepCheck = (option, arrayNum) => {
    //check word total <200

    // alert(wordsum)
    if (wordsum < osusumeLetterSum) {
      setIsCantGoNextPage(true)
    } else {
      setIsGoNextPage(true)
    }
  }
  const nextStep = (option, arrayNum) => {
    const fetchData = async () => {
      try {
        // const response =
        // await axios.get(Url).then((response) => {
        var stepStatus = 'end'
        var nextStep = 'Step3OST'
        hwHistoryUpdate(currentStep, stepStatus, HWID, practiceTempId, nextStep)

        practiceStart(nextStep)

        // })
      } catch (error) {
        alert('select error!')
      }
    }

    fetchData()
    // }
  }

  const practiceStart = (nextStep) => {
    //次のStep2OSTのsys_hw_historyテーブルのstepStatusがendになっている場合は、Step3OSTにいく。
    //왜냐하면, Step2OST은 처음 한번만 하는 step이므로.

    const fetchData = async () => {
      try {
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

  const wordTotalSum = () => {
    var ws = parseInt(
      outlineTopicWordLength +
        outlineIntroductionWordLength +
        outlineBodyWordLength +
        outlineConclusionWordLength
    )

    console.log('ws', ws)
    setWordsum(ws)
  }

  const insertPointToDB = () => {
    var mbn = localStorage.getItem('MypageMbn')
    var pointStep = currentStep
    //alert(pointKeyNum)

    if (wordsum > 199) {
      var url = DB_CONN_URL + '/sys-point-member-history-insert-show-and-tell'
      axios
        .post(url, {
          mbn: mbn,
          homework_id: HWID,
          pointKeyNum: pointKeyNum,
          pointStep: pointStep,
          practiceTempId: practiceTempId,
        })
        .then((response) => {
          // alert(response.data.status)
          if (!response.data.status) {
            // alert(response.data.message) //for test
            //alert('ポイントゲット!!!')
            // console.log('##pointKeyNum', pointKeyNum)
            // console.log('##HWID', HWID)
            // console.log('##currentStep', currentStep)
            // console.log('##practiceTempId', practiceTempId)
          } else {
            // alert(response.data.message)
          }
        })
    }
  }
  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    var url = DB_CONN_URL + '/get-hw-show-and-tell-writing-info/'
    var Url = url + mbn + '&' + HWID + '&' + currentStep

    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)

        if (response.data.length > 0) {
          //setHWWritingInfo(response.data)
          setOutlineTopic(response.data[0].outline_topic.trim())

          // setOutlineTopic(response.data[0].outline_topic.trim())
          setOutlineIntroduction(response.data[0].outline_introduction.trim())
          setOutlineBody(response.data[0].outline_body.trim())
          setOutlineConclusion(response.data[0].outline_conclusion.trim())
          var allScript =
            response.data[0].outline_topic +
            response.data[0].outline_introduction +
            response.data[0].outline_body +
            response.data[0].outline_conclusion
          firstHandle(allScript)

          // // alert('here2')
          // setOutlineTopicWordLength(
          //   response.data[0].outline_topic
          //     .split(' ')
          //     .filter((word) => word.trim()).length
          // )
          // setOutlineIntroductionWordLength(
          //   response.data[0].outline_introduction
          //     .split(' ')
          //     .filter((word) => word.trim()).length
          // )
          // setOutlineBodyWordLength(
          //   response.data[0].outline_body
          //     .split(' ')
          //     .filter((word) => word.trim()).length
          // )
          // setOutlineConclusionWordLength(
          //   response.data[0].outline_conclusion
          //     .split(' ')
          //     .filter((word) => word.trim()).length
          // )

          var sum = parseInt(
            response.data[0].outline_topic
              .split(' ')
              .filter((word) => word.trim()).length +
              response.data[0].outline_introduction
                .split(' ')
                .filter((word) => word.trim()).length +
              response.data[0].outline_body
                .split(' ')
                .filter((word) => word.trim()).length +
              response.data[0].outline_conclusion
                .split(' ')
                .filter((word) => word.trim()).length
          )

          if (
            response.data[0].outline_topic.trim() === '' &&
            response.data[0].outline_introduction.trim() === '' &&
            response.data[0].outline_body.trim() === '' &&
            response.data[0].outline_conclusion.trim() === ''
          ) {
            // alert('here1')
            setWordsum(0)
          } else {
            // alert('here2')
            setWordsum(sum)
          }
        } else {
          setOutlineTopic('')

          // setOutlineTopic(response.data[0].outline_topic.trim())
          setOutlineIntroduction('')
          setOutlineBody('')
          setOutlineConclusion('')
          // alert('here2')
          setOutlineTopicWordLength(0)
          setOutlineIntroductionWordLength(0)
          setOutlineBodyWordLength(0)
          setOutlineConclusionWordLength(0)
          setWordsum(0)
        }
        // alert(sum)
      } catch (error) {
        // alert('3')
        console.log(error)
        setError(true)
      }

      setLoading(false)
    }

    fetchData()
  }, [])
  // alert(isError)
  // if (isError) return <h1>Error, try again! step..2 </h1>
  // if (isLoading) return <h1>Loading Page..........................</h1>

  //////word counter
  ///Topic
  const [firstValue, setFirstValue] = useState('')
  const [numberOfCharacters, setNumberOfCharacters] = useState('')
  const [withoutWhiteSpace, setWithoutWhiteSpace] = useState('')
  const [numberOfWords, setNumberOfWords] = useState('')
  const [linesCount, setLinesCount] = useState('')
  const [wordSelectionCount, setWordSelectionCount] = useState('')

  //Intoro
  const [firstValue2, setFirstValue2] = useState('')
  const [numberOfCharacters2, setNumberOfCharacters2] = useState('')
  const [withoutWhiteSpace2, setWithoutWhiteSpace2] = useState('')
  const [numberOfWords2, setNumberOfWords2] = useState('')
  const [linesCount2, setLinesCount2] = useState('')
  const [wordSelectionCount2, setWordSelectionCount2] = useState('')

  //Body
  const [firstValue3, setFirstValue3] = useState('')
  const [numberOfCharacters3, setNumberOfCharacters3] = useState('')
  const [withoutWhiteSpace3, setWithoutWhiteSpace3] = useState('')
  const [numberOfWords3, setNumberOfWords3] = useState('')
  const [linesCount3, setLinesCount3] = useState('')
  const [wordSelectionCount3, setWordSelectionCount3] = useState('')

  //Conclusion
  const [firstValue4, setFirstValue4] = useState('')
  const [numberOfCharacters4, setNumberOfCharacters4] = useState('')
  const [withoutWhiteSpace4, setWithoutWhiteSpace4] = useState('')
  const [numberOfWords4, setNumberOfWords4] = useState('')
  const [linesCount4, setLinesCount4] = useState('')
  const [wordSelectionCount4, setWordSelectionCount4] = useState('')

  const firstHandleTopic = (event) => {
    if (!event) {
      var input = outlineTopic
      console.log(input)
    } else {
      var input = event.target.value
      console.log(input)
    }
    const text = document.getElementById('textarea').value
    const linesCount = text.split('/\r|\r\n|\n/').length

    const numberOfCharacters = input === '' ? 0 : input.split('').length
    const withoutWhiteSpace =
      input === '' ? 0 : input.split('').filter((char) => char !== ' ').length
    const words =
      input === '' ? 0 : input.split(' ').filter((word) => word.trim()).length
    const lines = input === '' ? 1 : input.split(/\n/g).length

    setFirstValue(input)
    setNumberOfCharacters(numberOfCharacters)
    setWithoutWhiteSpace(withoutWhiteSpace)
    setNumberOfWords(words)
    setLinesCount(lines)
    setWordSelectionCount('')
  }
  const firstHandle = (script) => {
    var input = script
    console.log('script', input)

    const words =
      input === '' ? 0 : input.split(' ').filter((word) => word.trim()).length
    setWordsum(words)
    // alert(wordsum)
  }

  const firstHandleIntro = (event) => {
    if (!event) {
      var input = outlineIntroduction
    } else {
      var input = event.target.value
    }

    const text = document.getElementById('textarea').value
    const linesCount2 = text.split('/\r|\r\n|\n/').length

    const numberOfCharacters2 = input === '' ? 0 : input.split('').length
    const withoutWhiteSpace2 =
      input === '' ? 0 : input.split('').filter((char) => char !== ' ').length
    const words2 =
      input === '' ? 0 : input.split(' ').filter((word) => word.trim()).length
    const lines2 = input === '' ? 1 : input.split(/\n/g).length

    setFirstValue2(input)
    setNumberOfCharacters2(numberOfCharacters2)
    setWithoutWhiteSpace2(withoutWhiteSpace2)
    setNumberOfWords2(words2)
    setLinesCount2(lines2)
    setWordSelectionCount2('')
  }

  const firstHandleBody = (event) => {
    if (!event) {
      var input = outlineBody
    } else {
      var input = event.target.value
    }

    const text = document.getElementById('textarea').value
    const linesCount3 = text.split('/\r|\r\n|\n/').length

    const numberOfCharacters3 = input === '' ? 0 : input.split('').length
    const withoutWhiteSpace3 =
      input === '' ? 0 : input.split('').filter((char) => char !== ' ').length
    const words3 =
      input === '' ? 0 : input.split(' ').filter((word) => word.trim()).length
    const lines3 = input === '' ? 1 : input.split(/\n/g).length

    setFirstValue3(input)
    setNumberOfCharacters3(numberOfCharacters3)
    setWithoutWhiteSpace3(withoutWhiteSpace3)
    setNumberOfWords3(words3)
    setLinesCount3(lines3)
    setWordSelectionCount3('')
  }

  const firstHandleConclusion = (event) => {
    if (!event) {
      var input = outlineConclusion
    } else {
      var input = event.target.value
    }

    const text = document.getElementById('textarea').value
    const linesCount4 = text.split('/\r|\r\n|\n/').length

    const numberOfCharacters4 = input === '' ? 0 : input.split('').length
    const withoutWhiteSpace4 =
      input === '' ? 0 : input.split('').filter((char) => char !== ' ').length
    const words4 =
      input === '' ? 0 : input.split(' ').filter((word) => word.trim()).length
    const lines4 = input === '' ? 1 : input.split(/\n/g).length

    setFirstValue4(input)
    setNumberOfCharacters4(numberOfCharacters4)
    setWithoutWhiteSpace4(withoutWhiteSpace4)
    setNumberOfWords4(words4)
    setLinesCount4(lines4)
    setWordSelectionCount4('')
  }

  function totalWords() {
    var tw = parseInt(
      numberOfWords + numberOfWords2 + numberOfWords3 + numberOfWords4
    )
    return tw
  }

  // This function is responsible for the word counting

  // const wordCounter = (e) => {
  //   e.preventDefault()
  //   var keys = []
  //   var counts = {}
  //   // const input = this.state.firstValue
  //   const input = firstValue
  //     .replace(/\W/g, ' ')
  //     .replace(/[0-9]/g, ' ')
  //     .split(' ')
  //     .filter((word) => word.trim())
  //   for (let i = 0; i < input.length; i++) {
  //     var word = input[i]
  //     if (counts[word] === undefined) {
  //       counts[word] = 1
  //       keys.push(word)
  //     } else {
  //       counts[word] += 1
  //       keys.push(word)
  //       // console.log(keys);
  //     }
  //     keys.sort()

  //     for (let i = 0; i < keys.length; i++) {
  //       var key = keys[i]
  //       var result = key + ' - ' + counts[key]
  //       console.log(result)
  //     }
  //     // this.setState({
  //     //   wordSelectionCount: result,
  //     // })
  //     setWordSelectionCount(result)
  //   }
  // }

  return (
    // <div>
    <>
      <div className="QuizBigShowandtell mb-0 pb-0" style={{ border: 0 }}>
        <div className="row">
          <div className="col-lg-12 col-md-6">
            <MonsterGet />
          </div>
          {/* <div className="col-lg-3 col-md-6">
            <FireView thisSubject={thisSubject} />
         
          </div> */}
          <WordCounter />
        </div>
      </div>

      <PointBar
        cStep={pageView}
        pageTitle="SHOW AND TELL"
        bcolor="orange"
        pointKeyNum={pointKeyNum}
      />
      <StepBarOST cStep={pageView} />
      <div className="QuizBigShowandtell" style={{ backgroundColor: 'white' }}>
        <div className="container">
          {/* {HWWritingInfo.map((val, key) => { */}
          {/* return ( */}
          <>
            <div className="row align-items-center">
              <div
                className="col-lg-8 col-md-6"
                style={{ textAlign: 'center' }}
              >
                <StepTitle pageTitle={pageTitle} pageTitleSub={pageTitleSub} />
                <img
                  src="/images/homework-typing.png"
                  style={{
                    height: '50px',
                    width: 'auto',
                    marginRight: '20px',
                  }}
                />
                <img
                  src="/images/homework-upload.png"
                  style={{ height: '50px', width: 'auto' }}
                />
              </div>
              <div
                className="col-lg-4 col-md-0"
                style={{ textAlign: 'center' }}
              >
                <StepImportantWords2 stepWords1={stepWords1} />
              </div>

              <div className="col-lg-12 col-md-12 mb-0 mt-3 ">
                <Subpage
                  firstOrder={firstOrder}
                  secondOrder={secondOrder}
                  thirdOrder={thirdOrder}
                  fourthOrder={fourthOrder}
                  fifthOrder={fifthOrder}
                  subpageTitle={subpageTitle}
                  whyThisStepTitle={whyThisStepTitle}
                  whyThisStep={whyThisStep}
                  currentStep={currentStep}
                />
              </div>
              <div className="col-lg-12 col-md-12 mt-0 mb-3 pt-0 ">
                <OutlineSample />
              </div>

              <div className="col-lg-12 col-md-12 mt-0 mb-3 pt-0 ">
                <h5>
                  <font>現在</font>
                  <font style={{ color: 'red', fontSize: '40px' }}>
                    <b>{wordsum}</b>
                    {/* {viewWhichTotalSum}
                    {viewWhichTotalSum == 'wordsum' ? (
                      <b>{wordsum}</b>
                    ) : (
                      <b>{totalWords()}</b>
                    )} */}
                  </font>
                  <font>単語</font>&nbsp;/&nbsp;
                  <font size="8px" color="darkgreen">
                    <b>{osusumeLetterSum}</b>単語以上
                  </font>
                </h5>
                <label
                  for="story"
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                    textAlign: 'left',
                  }}
                >
                  {/* <p>
                    文字数 <span>{numberOfCharacters}</span> Without White
                    Space <span>{withoutWhiteSpace}</span> Words{' '}
                    <span>{numberOfWords}</span> Lines <span>{linesCount}</span>
                  </p> */}
                  <h5>
                    <b>TOPIC</b>&nbsp;
                    <font color="darkgreen">
                      {/* <b>{outlineTopicWordLength}</b>/Total:{wordsum} */}
                      Words{' '}
                      <span>
                        <b> {numberOfWords}</b>
                      </span>
                      {/* &nbsp;|&nbsp;
                      <font color="red">
                        <b>
                          Total:
                          {totalWords()}
                        </b>
                      </font> */}
                    </font>
                  </h5>
                </label>
                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_topic"
                  rows="2"
                  cols="33"
                  style={{
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '20px',
                  }}
                  value={outlineTopic}
                  onChange={(e) => {
                    firstHandleTopic(e)
                    setOutlineTopic(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineTopicWordLength(e.target.value.split(' ').length)

                    wordTotalSum()
                  }}
                ></textarea>
                {/* {outlineTopicWordLength} */}
                <label
                  for="story"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                >
                  {/* <p>
                    Characters <span>{numberOfCharacters2}</span> Without White
                    Space <span>{withoutWhiteSpace2}</span> Words{' '}
                    <span>{numberOfWords2}</span> Lines{' '}
                    <span>{linesCount2}</span>
                  </p> */}
                  <h5>
                    <b>INTRODUCTION</b>&nbsp;
                    <font color="darkgreen">
                      {/* <b>{outlineIntroductionWordLength}</b>/Total:{wordsum} */}
                      Words{' '}
                      <span>
                        <b> {numberOfWords2}</b>
                      </span>
                      {/* &nbsp;|&nbsp;Line{' '}
                      <span>
                        <b>{linesCount2}</b>
                      </span> */}
                      {/* &nbsp;|&nbsp;
                      <font color="red">
                        <b>
                          Total:
                          {totalWords()}
                        </b>
                      </font> */}
                    </font>
                  </h5>
                </label>
                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_introduction"
                  rows="10"
                  cols="33"
                  style={{
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '20px',
                    paddingTop: 0,
                    backgroundColor: 'white',
                    overflowY: 'auto',
                    overflowX: 'auto',
                  }}
                  value={outlineIntroduction}
                  onChange={(e) => {
                    firstHandleIntro(e)
                    setOutlineIntroduction(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineIntroductionWordLength(
                      e.target.value.split(' ').length
                    )
                    wordTotalSum()
                  }}
                ></textarea>
                <label
                  for="story"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                >
                  {/* <p>
                    Characters <span>{numberOfCharacters3}</span> Without White
                    Space <span>{withoutWhiteSpace3}</span> Words{' '}
                    <span>{numberOfWords3}</span> Lines{' '}
                    <span>{linesCount3}</span>
                  </p> */}
                  <h5>
                    <b>BODY</b>&nbsp;
                    <font color="darkgreen">
                      {/* <b>{outlineBodyWordLength}</b>/Total:{wordsum} */}
                      {/* <b>{outlineIntroductionWordLength}</b>/Total:{wordsum} */}
                      Words{' '}
                      <span>
                        <b> {numberOfWords3}</b>
                      </span>
                      {/* &nbsp;|&nbsp;Line{' '}
                      <span>
                        <b>{linesCount3}</b>
                      </span> */}
                      {/* &nbsp;|&nbsp;
                      <font color="red">
                        <b>
                          Total:
                          {totalWords()}
                        </b>
                      </font> */}
                    </font>
                  </h5>
                </label>
                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_introduction"
                  rows="20"
                  cols="33"
                  style={{
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '20px',
                  }}
                  value={outlineBody}
                  onChange={(e) => {
                    firstHandleBody(e)
                    setOutlineBody(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineBodyWordLength(e.target.value.split(' ').length)
                    wordTotalSum()
                  }}
                ></textarea>{' '}
                <label
                  for="story"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                >
                  {/* <p>
                    Characters <span>{numberOfCharacters4}</span> Without White
                    Space <span>{withoutWhiteSpace4}</span> Words{' '}
                    <span>{numberOfWords4}</span> Lines{' '}
                    <span>{linesCount4}</span>
                  </p> */}
                  <h5>
                    <b>CONCLUSION</b>&nbsp;
                    <font color="darkgreen">
                      {/* <b>{outlineConclusionWordLength}</b>/Total:{wordsum} */}
                      Words{' '}
                      <span>
                        <b> {numberOfWords3}</b>
                      </span>
                      {/* &nbsp;|&nbsp;Line{' '}
                      <span>
                        <b>{linesCount3}</b>
                      </span> */}
                      {/* &nbsp;|&nbsp;
                      <font color="red">
                        <b>
                          Total:
                          {totalWords()}
                        </b>
                      </font> */}
                    </font>
                  </h5>
                </label>
                <textarea
                  spellcheck="false"
                  id="story"
                  name="outline_introduction"
                  rows="5"
                  cols="33"
                  style={{
                    fontSize: '.8rem',
                    letterSpacing: '1px',
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    lineHeight: '1.5',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '1px 1px 1px #999',
                    fontSize: '20px',
                  }}
                  value={outlineConclusion}
                  onChange={(e) => {
                    firstHandleConclusion(e)
                    setOutlineConclusion(
                      e.target.value.replace('  ', ' ').replace('　', ' ')
                    )
                    setOutlineConclusionWordLength(
                      e.target.value.split(' ').length
                    )
                    wordTotalSum()
                  }}
                ></textarea>
              </div>
            </div>
          </>
          {/* // ) // })} */}
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
                          今日の練習をやめる
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
              次のステップに行く前に途中でやめると、このステップでゲットしたポイントは消えてしまいます。
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
            title="単語数が足りません。"
            show={isCantGoNextPage}
            onConfirm={() => nextStep()}
            onCancel={() => {
              setIsCantGoNextPage(false)
            }}
            confirmBtnText="今は書かずにそのまま次に進む"
            cancelBtnText="戻って書く"
            showCancel={true}
            reverseButtons={true}
            style={{ width: '600px', backgroundColor: '#afeeee' }}
          >
            <p>
              {osusumeLetterSum}
              単語以上書いてください。 {osusumeLetterSum}
              単語以上で30ポイント獲得できます。
            </p>
          </SweetAlert>
        </div>
      </div>
    </>
  )
}

export default Step2OST
