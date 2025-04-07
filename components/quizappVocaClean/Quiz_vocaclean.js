import react, { useState, useContext, useEffect, inputRef } from 'react'
import axios from 'axios'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
import { QuizContext } from './Contexts'
import next from 'next'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowCircleLeft,
  faArrowAltCircleDown,
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faTrash,
  faPause,
  faPlay,
  faPlayCircle,
  faAiOutlineReload,
  faArrowAltCircleLeft,
  faLight,
  faReplyAll,
  faReply,
  faBookmark,
  faVolumeUp,
  faStop,
} from '@fortawesome/free-solid-svg-icons'
import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
// import VoiceRecorder from '@/components/quizappGrammerSpeaking/VoiceRecorder'
import VoiceRecorder from '@/components/quizappGrammarSpeaking/VoiceRecorder'
import TextareaAutosize from 'react-textarea-autosize'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
// import { useSpeechSynthesis } from 'react-speech-kit'
// import Stopwatch from '@/components/Stopwatch/Stopwatch'
import FontAwesome from 'react-fontawesome'
import { lang } from 'moment'
import Modal from '@/components/quizappVocaClean/QuizModal'
//for tooltip
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { makeStyles } from '@material-ui/core/styles'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import PositionedTooltips from '@/components/quizappVocaClean/PositionedTooltips'

//Tooltip Style
const useStyles = makeStyles({
  tooltip: {
    background: 'transparent',
    height: 'auto',
  },
})

const Quiz = () => {
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.DB_CONN_URL
  //tooltip Style
  const classes = useStyles()
  //text to speech//
  // const onEnd = () => {
  //   setHighlightedText('')
  // }

  // const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
  //   onEnd,
  // })
  const [openModal, setOpenModal] = useState(false)
  // const { speak } = useSpeechSynthesis()

  const { kana, setKana } = useState()
  /////text to speech end//////

  const [value, setValue] = useState('')
  // const { speak } = useSpeechSynthesis()

  // refrshe bottonを押した回数
  const [howManyRefresh, setHowManyRefresh] = useState(0)

  //Typingの場合のtranscript
  // const [textTranscript, setTextTranscript] = useState()

  const [dictText, setDictText] = useState([])
  const [viewNum, setViewNum] = useState('')
  const [viewSentence, setViewSentence] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [pageFirstLoad, setPageFirstLoad] = useState(true)
  const [rightTranscription, setRightTranscription] = useState('')

  //もう一度もたんが押された時
  const [oneMoreClicked, setOneMoreClicked] = useState(false)

  //bookmark color
  const [colorBookMark, setColorBookMark] = useState(false)

  const [clickedStartButton, setClickedStartButton] = useState(false)

  const [searchWord, setSearchWord] = useState('')
  const [newScript, setNewScript] = useState('')
  const [rightSentence, setRightSentence] = useState('')
  const [sentenceOrder, setSentenceOrder] = useState('')

  const [giveup, setGiveup] = useState(false)
  const [watchStatus, setWatchStatus] = useState('stop')

  //import useWindowDimensionsを使う
  const { height, width } = useWindowDimensions()
  const thisWidth = width - 10 + 'px'
  var mbn = localStorage.getItem('MypageMbn')
  // console.log('thisWidth:', thisWidth)

  let audioRightAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/dingdongdang.mp3'
  )
  let audioWrongAnswer = new Audio(
    'https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/wrong-answer.mp3'
  )
  //For sweet alert
  const [myMbn, setMyMbn] = useState(mbn)
  const [isOpenBackMypage, setIsOpenBackMypage] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0) //何番目の問題からスタートするのか：0が１番からスタートの意味
  const [words, setWords] = useState([]) //DBから問題のデータを持ってきて入れる
  const [oneClickWords, setOneClickWords] = useState([])
  const [twoClickWords, setTwoClickWords] = useState([])
  const [lastTotalWords, setLastTotalWords] = useState([])

  const [optionChosen, setOptionChosen] = useState('') //今解いて問題の答えを入れる
  const [nowClickedColor, setNowClickedColor] = useState('') //クリックした答えのボタンの色が変わる
  // const [nextQInsert, setNextQInsert] = useState('')
  //to voiceRecorder

  const [nowWord, setNowWord] = useState('')

  const [nowEnglishSentence, setNowEnglishSentence] = useState('')
  const [nowQNum, setNowQnum] = useState('')

  const {
    quizTempId,
    setQuizTempId,
    audioOnOff,
    setAudioOnOff,
    score,
    setScore,
    userName,
    setUserName,
    gameTitle,
    setGameTitle,
    gameState,
    setGameState,
    // englib_level,
    // setEnglib_level,
    test_level,
    setTest_level,
    bigCat,
    setBigCat,
    cat,
    setCat,
    grammarForm,
    setGrammarForm,
    unit,
    setUnit,
    eikenLevel,
    setEikenLevel,
    totalQuestion,
    setTotalQuestion,
  } = useContext(QuizContext)

  const [loginStatus, setLoginStatus] = useState(false) //login時
  let logOut = () => {
    setLoginStatus(false)
    localStorage.removeItem('token', '')
    localStorage.removeItem('loginStatus', '')
    localStorage.removeItem('email', '')
    localStorage.removeItem('mbn', '')
    localStorage.removeItem('name_eng', '')
    //console.log('bar reload', loginStatus)
    Router.push('/loginVocaClean')
  }

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')
    var name_eng = localStorage.getItem('name_eng')
    // var homework_id = HWID

    //get-voca-quiz
    var Url =
      DB_CONN_URL +
      '/get-hw-quiz-voca-clean-first-page/' +
      quizTempId +
      '&' +
      mbn +
      '&' +
      test_level +
      '&' +
      bigCat +
      '&' +
      cat +
      '&' +
      grammarForm

    // alert(Url)
    const fetchData = async () => {
      try {
        const response = await axios.get(Url)
        // alert(response.data.message)
        setWords(response.data.response)
        // console.log('words', response.data.response)
      } catch (error) {
        alert('error')
      }
    }
    fetchData()
  }, [currentQuestion])

  //SpeechRecognition START////////////////////////////
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'reset',
      callback: () => resetTranscript(),
    },
    {
      command: 'shut up',
      callback: () => setMessage("I wasn't talking."),
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi there!'),
    },
  ]
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands })

  useEffect(() => {
    if (finalTranscript !== '') {
      // console.log('Got final result:', finalTranscript)
    }
  }, [interimTranscript, finalTranscript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    // console.log(
    //   'Your browser does not support speech recognition ! Try Chrome desktop!'
    // )
  }

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    })
  }

  //test
  // useEffect(() => {
  //   console.log('###########transcript:', transcript)
  // }, [transcript])

  //ページに入ってからすぐ声を感知する
  useEffect(() => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
      transcript: transcript,
    })

    setWatchStatus('start')
    findDiff2(nowEnglishSentence, transcript, nowQNum)
  }, [nowEnglishSentence, nowQNum, transcript])

  const chooseOption = (option) => {
    setOptionChosen(option)
  }

  const nextQuestion = (arrayNum) => {
    if (currentAnswer == '') {
      //答えを選んでなかった時
      alert('答えを書くもしくは話してください。')
      return false
    }
    if (currentAnswer == 'Right') {
      resetTranscript()
      setCurrentAnswer('')

      if (audioOnOff == 'on') {
        // audioRightAnswer.play()
      }
      setScore(score + 1)

      var correct = 1
    } else {
      if (audioOnOff == 'on') {
        audioWrongAnswer.play()
      }
      correct = 0
    }

    setCurrentQuestion(currentQuestion + 1)
    resetTranscript()
    setWatchStatus('restart')
    listenContinuously()
    setDictText([])
    setCurrentAnswer('')
    setViewNum('')
    setViewSentence(false)
    setPageFirstLoad(false)
    // var mbn = localStorage.getItem('MypageMbn')
    // var answerOrigin = words[arrayNum].answer
    // var answerMember = option
    // var questioncateng = words[arrayNum].questionCatEng
    // var Correct = correct
    // setNowQnum(parseInt(words[arrayNum].qNum) + parseInt(1))

    // if (questioncateng == 'Recording') {
    //   answerOrigin = 'Recording'
    //   answerMember = mbn + '_' + quizTempId + '_' + words[arrayNum].qNum
    //   questioncateng = 'Recording'
    //   Correct = 'Recording'
    // }
    // console.log('####answerOrigin:', answerOrigin)
    // console.log('####answerMember:', answerMember)
    // console.log('####questioncateng:', questioncateng)
    // axios
    //   .post(DB_CONN_URL + '/leveltest-quiz-result-insert-for-group', {
    //     quizTempId: quizTempId,
    //     mbn: mbn,
    //     test_title: words[arrayNum].test_title,
    //     test_group: words[arrayNum].test_group,
    //     eikenLevel: words[arrayNum].eikenLevel,
    //     questionCatEng: questioncateng,
    //     bigNum: words[arrayNum].bigNum,
    //     qNum: words[arrayNum].qNum,
    //     answer_member: answerMember,
    //     answer_original: answerOrigin,
    //     correct: Correct,
    //   })
    //   .then((response) => {
    //     if (!response.data.status) {
    //       //console.log('no information', response)
    //       alert(response.data.message) //for test
    //     } else {
    //       // setCurrentQuestion(currentQuestion + 1)
    //       setNowClickedColor('')
    //     }
    //   })
    //alert(currentQuestion + 1)
  }

  const handleQuizCancel = () => {
    setIsOpenBackMypage(false)

    var mbn = localStorage.getItem('MypageMbn')
    const fetchData5 = async () => {
      try {
        const response = await axios.put(
          DB_CONN_URL +
            '/leveltest-grammar-speaking-test-cancel/' +
            mbn +
            '&' +
            quizTempId
        )
      } catch (error) {}
    }

    fetchData5()
    // logOut()
    router.replace('/quizappVocaClean') // ここでリダイレクト
  }

  const finishQuiz = (option, arrayNum) => {
    // if (words[currentQuestion].answer == optionChosen) {
    //   setScore(score + 1)
    // }
    //alert('koko')

    if (words[currentQuestion].answer == option) {
      if (audioOnOff == 'on') {
        audioRightAnswer.play()
      }
      setScore(score + 1)

      var correct = 1
    } else {
      correct = 0
    }

    var mbn = localStorage.getItem('MypageMbn')
    const fetchData4 = async () => {
      try {
        const response = await axios.post(
          DB_CONN_URL + '/leveltest-quiz-result-finish-insert-for-group',
          {
            quizTempId: quizTempId,
            mbn: mbn,
            test_title: words[arrayNum].test_title,
            test_group: words[arrayNum].test_group,
            eikenLevel: words[arrayNum].eikenLevel,
            questionCatEng: words[arrayNum].questionCatEng,
            bigNum: words[arrayNum].bigNum,
            qNum: words[arrayNum].qNum,
            // answer_member: option,
            // answer_original: words[arrayNum].answer,
            // correct: correct,
          }
        )
        setCurrentQuestion(currentQuestion + 1)
        setNowClickedColor('')
      } catch (error) {}
    }
    setGameState('finished')
    fetchData4()
  }

  const thisImage = () => {
    //alert(words[currentQuestion].questionPic)
    var imgsrc =
      'https://englib.s3.ap-northeast-1.amazonaws.com/leveltest-eiken/' +
      words[currentQuestion].questionPic +
      '.jpg'
    return imgsrc
  }

  const clickedColor = (option) => {
    setNowClickedColor(option)
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  function optionList(questionArray) {
    const foods = questionArray

    const fourOptions = words.map((el) => el.meaning) // returns ['frog', 'monkey', 'gorilla', 'lion']

    for (let i of words) {
      fourOptions.push(nowWord)
    }
    shuffle(fourOptions)
    // console.log('fourOptions', fourOptions)

    //  var fruits = ['りんご', 'みかん', 'ぶどう', 'メロン', 'もも']
    // var num = words.length

    // let array = words
    // var randomItem =
    //   words[Math.floor(Math.random() * words.length)].meaning
    // console.log('randomItem', randomItem)
    // let get = []
    // for (let i of words) {
    //   // var item = words[Math.floor(Math.random() * words.length)].meaning
    //   get.push(words[Math.floor(Math.random() * words.length)].word)
    // }
    // console.log('#######', get)
  }

  const onchangeInput = (val, index, allSentence) => {
    // val = val.replace("'", '’')

    // console.log('val1', val)

    // console.log('val2', val)
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

  const findDiff2 = (
    string1, //db sentence
    transcript,
    sentenceOrder
  ) => {
    // console.log('###check-string1', string1, 'qNum:', sentenceOrder)
    // console.log('###check-transcript', transcript, 'qNum:', sentenceOrder)

    let index = 0

    while (index < string1.length || index < transcript.length) {
      const left_char = string1[index]
      const right_char = transcript[index]

      if (left_char != right_char) {
        var myAlert =
          'CHECK....大文字・半角スペース・記号(, . ?)は正しいですか？'
      } else {
        // var sliceString1 = string1.slice(0, -1)
        //記号など使わない。

        var myAlert = 'チェック中2....'

        if (string1 === transcript) {
          var myAlert = 'Right'

          handleButtonResult('Right Answer', sentenceOrder, string1, transcript)
        } else {
          var myAlert = 'Checking...キャピタル文字・記号(, . ?)は正しいですか？'
        }
      }
      index++
    }

    if (
      string1.toLowerCase() === transcript.toLowerCase() &&
      transcript !== ''
    ) {
      var originalString1 = string1
      console.log('string1 & transcript = same:', string1)
      SpeechRecognition.stopListening()
      setWatchStatus('stop')
      setCurrentAnswer('Right')
      setPageFirstLoad(false)

      setRightTranscription(originalString1)
      setOneMoreClicked(0)
      setHowManyRefresh(0)
      audioRightAnswer.play()
    }

    return myAlert
  }

  const handleButtonResult = (
    dictationStatus,
    sentenceOrder,
    sentence,
    yourSentence
  ) => {
    const fetchData = async () => {
      var mbn = localStorage.getItem('MypageMbn')

      // try {
      //   var url = DB_CONN_URL + '/update-sys-dictation-history-test'
      //   axios
      //     .post(url, {
      //       mbn: mbn,
      //       homework_id: HWID,
      //       dictationStatus: dictationStatus,
      //       sentenceOrder: sentenceOrder,
      //       sentence: sentence,
      //       yourSentence: yourSentence,
      //       seriesName: seriesName,
      //       bookTitle: bookTitle,
      //       bookNum: bookNum,
      //       storyNum: storyNum,
      //       practiceTempId: practiceTempId,
      //       pointStep: currentStep,
      //       pointKeyNum: pointKeyNum,
      //     })
      //     .then((response) => {
      //       if (response.data.status) {
      //         sameCellDelete()
      //         samePointCellDelete()
      //         setGotPointAri(true)
      //       }
      //     })
      // } catch (error) {}
    }
    fetchData()
  }

  function handleSearchWord(searchWord) {
    //word highlight
    var sWord = searchWord
    if (sWord) {
      var script = nowEnglishSentence.toString()

      var pattern = new RegExp('(' + sWord + ')', 'gi')
      // console.log('pattern', pattern)
      var nScript = script.replace(pattern, '<mark>' + sWord + '</mark>')
      setNewScript(nScript)
    }
  }

  function createProcessElement(nowNumber, totalNumber) {
    var elements = []
    var i
    for (i = 0; i < totalNumber; i++) {
      if (i < nowNumber) {
        elements.push(<span>&#9724;</span>)
      } else {
        elements.push(<span>&#9725;</span>)
      }
    }
    return elements
  }

  //単語クリックする時
  function handleClick(word) {
    var newWords = word + ' '

    setOneClickWords((oneClickWords) => [...oneClickWords, newWords])
    console.log('oneClickWords:', oneClickWords)
    // setLastTotalWords([...new Set(oneClickWords)]) //without duplicate
  }

  ////////////////////////////////////
  //onMouseOverした時にこれを実行する START
  const [timer, setTimer] = useState()
  function mouseOver(word) {
    setTimer(
      setTimeout(() => {
        speak({ text: word })
        // console.log('2 seconds have elapsed')
      }, 300)
    )
  }

  function mouseLeave() {
    if (timer) {
      clearTimeout(timer)
      setTimeout(undefined)
    }
  }
  //onMouseOverした時にこれを実行する END
  ////////////////////////////////////

  return (
    <>
      <div className="QuizBigMobile mt-2 pt-0">
        {/* <PositionedTooltips /> */}

        {/* <VoiceRecorder /> */}
        {/* {currentAnswer == 'Right' && (
          <div
            style={{
              width: '200px',
              height: '200px',
              border: '13px solid #ffb6c1',
              opacity: '0.5',
              borderRadius: '50%',
              position: 'fixed',
            }}
          ></div>
        )} */}
        {/* {words.filter((val) => { */}
        <div
          className="container mb-3 mb-0 pb-0"
          style={{
            width: '100%',
          }}
        >
          <div className="row mb-0 pb-0">
            {openModal && (
              <div
                className="col-lg-12 col-md-12 "
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  zIndex: 99,
                }}
              >
                <Modal
                  closeModal={setOpenModal}
                  // oneClickWords={oneClickWords}
                  lastTotalWords={lastTotalWords}
                />
              </div>
            )}
            <div className="col-lg-12 col-md-12 pl-0 pr-0 ml-0 mr-0 mb-0 pb-0">
              <table className="table table-borderless pl-0 pr-0 ml-0 mr-0 mb-0">
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: '10%',
                        textAlign: 'left',
                        paddingLeft: '0',
                      }}
                    >
                      <a
                        className="btn-sm btn-primary font-weight-bold  text-white"
                        onClick={() => {
                          setIsOpenBackMypage(true)
                        }}
                        style={{
                          cursor: 'pointer',
                          padding: '0px',
                          marginBottom: '20px',
                        }}
                      >
                        &nbsp;X&nbsp;
                      </a>
                    </td>
                    <td style={{ width: 'auto' }}>
                      <span
                        style={{
                          // fontWeight: 'bold',
                          fontSize: '15px',
                          color: '#darkgray',
                        }}
                      >
                        {gameTitle}
                      </span>
                      <span
                        className="btn btn-primary ml-2"
                        style={{}}
                        onClick={() => {
                          setOneClickWords([])
                        }}
                      >
                        やり直す
                      </span>
                      <br />
                      <span style={{ color: 'black' }}>
                        &#9724;[１回クリック]
                      </span>
                      &nbsp;覚えたことあるけど思い出せない単語
                      <br />
                      <span style={{ color: 'red' }}>
                        &#9724;[２回クリック]
                      </span>
                      &nbsp;初めて見た単語
                    </td>
                    <td
                      style={{
                        width: '20%',
                        textAlign: 'right',
                        paddingRight: 0,
                      }}
                    >
                      <FontAwesomeIcon
                        // icon={faReplyAll}
                        onClick={() => {
                          setColorBookMark(!colorBookMark)
                        }}
                        icon={faBookmark}
                        size="1x"
                        color={colorBookMark ? 'red' : ''}
                        // color="blue"
                      />
                      &nbsp;&nbsp;
                      {audioOnOff == 'on' ? (
                        <a onClick={() => setAudioOnOff('off')}>
                          <img
                            src="https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/sound-on.jpg"
                            style={{
                              width: '20px',
                              height: '20px',
                              border: 0,
                              cursor: 'pointer',
                              marginBottom: '5px',
                            }}
                          />
                        </a>
                      ) : (
                        <a onClick={() => setAudioOnOff('on')}>
                          <img
                            src="https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/sound-off.jpg"
                            style={{
                              width: '20px',
                              height: '20px',
                              border: 0,
                              cursor: 'pointer',
                              marginBottom: '5px',
                            }}
                          />
                        </a>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row ">
            <div
              className="col-lg-12 col-md-12"
              style={{ textAlign: 'center' }}
            >
              <h6>
                {bigCat}-{cat}-{test_level}-{grammarForm}
              </h6>
            </div>
            <div>
              <p>
                {oneClickWords.map((val, key) => {
                  return val
                })}
              </p>
              <p style={{ color: 'red' }}>
                {lastTotalWords.map((val, key) => {
                  return val
                })}
              </p>
            </div>
            <div
              className="col-lg-12 col-md-12"
              style={{
                wordWrap: 'break-word',
                // textAlign: 'justify',
                textJustify: 'inter-word',
                alignItems: 'stretch',
                alignContent: 'stretch',
                display: 'flex',
                flexWrap: 'wrap',
                // height: '100vh',
              }}
            >
              {words.map((val, key) => {
                // console.log('string: currentQuestion', currentQuestion)

                //この単語のカウント
                var thisWordCount = oneClickWords.filter(
                  (name) => name == val.word + ' '
                ).length

                //全てArray Itemのカウント
                var totalWord = oneClickWords.length

                // console.log('###totalWord:', val.word, ':', totalWord)
                // console.log('###thiswordcount:', val.word, ':', thisWordCount)

                if (thisWordCount == 0 || thisWordCount % 3 == 0) {
                  var fontColor = '#CAC8C7' //gray
                } else if (thisWordCount % 2 == 1) {
                  var fontColor = '#000000' //black
                } else if (thisWordCount % 2 == 0) {
                  var fontColor = '#F30B0B' //red
                }

                // setRightSentence(val.english)
                // setSentenceOrder(val.qNum)
                var englishSentence = val.english
                var fileNum = val.qNum
                var tooltipTitle = '日曜日'

                return (
                  <>
                    <Tooltip
                      // color="inherit"
                      classes={classes}
                      placement="top"
                      // title={val.Japanese}

                      title={
                        <>
                          <div style={{ textAlign: 'center' }}>
                            <h3
                              style={{
                                color: 'lightblue',
                                padding: '5px',
                                marginBottom: 0,
                                fontSize: '20px',
                                textAlign: 'left',
                                marginBottom: 10,
                                paddingBottom: 0,
                              }}
                            >
                              {/* {val.ruby} */}
                              {val.word}
                            </h3>
                            <hr style={{ padding: 0, margin: 0 }} />
                            <h3
                              style={{
                                color: 'lightblue',
                                padding: '5px',
                                marginBottom: 0,
                                fontSize: '20px',
                                textAlign: 'center',
                                marginTop: 10,
                                paddingTop: 0,
                              }}
                            >
                              <ruby>
                                {val.Japanese}
                                <rt>せいどくかだい</rt>
                              </ruby>
                            </h3>

                            <img
                              src="https://englib.s3.ap-northeast-1.amazonaws.com/img_vocaClear/anger-verb-1.jpeg"
                              alt="logo"
                              width="250px"
                              height="170px"
                              className="mb-2"
                            />

                            {/* <video
                            src="/video/test-test.mp4"
                            width="250"
                            height="170"
                            controls="controls"
                            autoplay="true"
                          />
                          
                          <br /> */}
                            {/* <video
                            src="https://www.myenglib.com/onlesson/video/ocean.mp4"
                            width="250"
                            height="170"
                            controls="controls"
                            autoplay="true"
                          /> */}
                            <h6
                              style={{
                                color: 'lightblue',
                                padding: '5px',
                                marginBottom: 0,
                                fontSize: '15px',
                              }}
                            >
                              <span
                                onMouseOver={() => {
                                  mouseOver('The man is expressing his anger.')
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                The man is expressing his anger.The man is
                                expressing his anger.
                              </span>
                            </h6>
                          </div>
                        </>
                      }
                    >
                      <Button
                        style={{
                          width: 'auto',
                          marginRight: '20px',
                          marginBottom: '20px',
                          // textTransform: 'lowercase',
                          textTransform: 'none',
                          fontWeight: '900',
                          fontSize: '20px',
                          color: fontColor,
                          textAlign: 'center',
                          backgroundColor: '#ececec',
                          padding: '5px',
                          border: '1px solid #ececec',
                          borderRadius: '10px',
                          display: 'flex',
                          flex: '1 0 auto',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          handleClick(val.word)
                        }}
                        onMouseOver={() => {
                          mouseOver(val.word)
                        }}
                        onMouseLeave={() => {
                          mouseLeave()
                        }}
                      >
                        {val.word}
                        {/* {val.word}/{timer} */}
                      </Button>
                    </Tooltip>
                  </>
                )
              })}
            </div>
          </div>
          <div className="col-lg-12 col-md-12  mt-5 mb-3">
            <span
              className="btn btn-primary"
              // onClick={() => {
              //   //setNextQInsert('insert')
              //   setOptionChosen('') //答えを選ばなかった時に、前の質問の答えが残らないようにする
              //   nextQuestion(currentQuestion)
              // }}
              onClick={() => {
                setOpenModal(true)
                setLastTotalWords([...new Set(oneClickWords)])
              }}
              id="nextQuestionBig"
              style={{
                fontSize: '15px',
                fontWeight: 'lighter',
                width: '200px',
                minWidth: '180px',
              }}
            >
              {/* NEXT QUESTION */}
              Quizをスタート
            </span>
          </div>
        </div>

        <SweetAlert
          title="テストをやめますか？"
          show={isOpenBackMypage}
          onConfirm={() => handleQuizCancel()}
          onCancel={() => {
            setIsOpenBackMypage(false)
          }}
          confirmBtnText="YES"
          cancelBtnText="NO"
          showCancel={true}
          reverseButtons={true}
          style={{ width: '90%' }}
        >
          <p>
            途中でやめるとテストの履歴が全て消えるため、最初からやり直すことになります。
          </p>
        </SweetAlert>
      </div>
    </>
  )
}

export default Quiz
