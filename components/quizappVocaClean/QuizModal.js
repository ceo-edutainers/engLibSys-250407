import react, { useState, useContext, useEffect, inputRef } from 'react'
import axios from 'axios'
//csv mydodal.css
import { myfun_weekdayToJapanese } from '@/components/FunctionComponent'

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

function QuizModal({ closeModal, lastTotalWords }) {
  const router = useRouter() //使い方：router.replace('/')
  const DB_CONN_URL = process.env.DB_CONN_URL
  //text to speech//
  // const onEnd = () => {
  //   setHighlightedText('')
  // }//

  // const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
  //   onEnd,
  // })

  // const { speak } = useSpeechSynthesis()

  /////text to speech end//////

  const [value, setValue] = useState('')
  // const { speak } = useSpeechSynthesis()

  const [words, setWords] = useState(lastTotalWords)
  const [arrangedQuestion, setArrangedQuestion] = useState([])
  const [randomOptions, setRandomOptions] = useState([])
  const [randomIndices, setRandomIndices] = useState([])
  const [nowRightWord, setNowRightWord] = useState()
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
  console.log('thisWidth:', thisWidth)

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
  const [Questions, setQuestions] = useState([]) //DBから問題のデータを持ってきて入れる
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
    Router.push('/quizappVocaClean')
  }

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  useEffect(() => {
    setTotalQuestion(lastTotalWords.length)

    //このカテゴリとレベルに合う全ての単語を持ってくる
    var Url =
      DB_CONN_URL +
      '/get-hw-quiz-voca-clean-first-page-all/' +
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
        setQuestions(response.data.response)

        //新しいQuiz Arrayを作る
        var questionSet = response.data.response

        words.map((val, key) => {
          var thisWords = words[key].replace(' ', '')
          // var thisNum = key + 1

          console.log('words[key]:', thisWords, '/')

          const anyKeyFilter = (item) => (obj) =>
            Object.values(obj).includes(item)
          const filteredArr = questionSet.filter(anyKeyFilter(thisWords))

          // const newItem = { qNum: thisNum }
          // setItem({ ...filteredArr, newItem })
          arrangedQuestion.push(filteredArr[0]) //最後に正しいもの
          console.log('#arrangedQuestion', arrangedQuestion)
          //ここまでは 選んだ単語のInfo setを入れる
          /////////////////////////////////////////////////////
        })

        console.log('randomIndices-1', randomIndices)
        console.log('questionSet:', questionSet)
        console.log('arrangedQuestion:', arrangedQuestion)
      } catch (error) {
        alert('error')
      }
    }
    fetchData()
  }, [currentQuestion])

  // const handleRandomOption=()=>{
  useEffect(() => {
    const keys = Object.keys(Questions)
    const randomIndices = []
    for (let i = 0; i < 3; i++) {
      randomIndices.push(Math.floor(Math.random() * keys.length))
    }
  }, [])

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
      console.log('Got final result:', finalTranscript)
    }
  }, [interimTranscript, finalTranscript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      'Your browser does not support speech recognition ! Try Chrome desktop!'
    )
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

  //SpeechRecognition END////////////////////////////////

  // useEffect(() => {
  //   console.log('String::::')
  //   console.log('String-:rightSentence:', rightSentence)
  //   console.log('String:transcript:', transcript)
  //   console.log('String:sentenceOrder:', sentenceOrder)
  //   findDiff2(
  //     rightSentence, //db sentence
  //     transcript, //your sentence
  //     sentenceOrder
  //   )
  // }, [transcript])

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
    // var answerOrigin = Questions[arrayNum].answer
    // var answerMember = option
    // var questioncateng = Questions[arrayNum].questionCatEng
    // var Correct = correct
    // setNowQnum(parseInt(Questions[arrayNum].qNum) + parseInt(1))

    // if (questioncateng == 'Recording') {
    //   answerOrigin = 'Recording'
    //   answerMember = mbn + '_' + quizTempId + '_' + Questions[arrayNum].qNum
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
    //     test_title: Questions[arrayNum].test_title,
    //     test_group: Questions[arrayNum].test_group,
    //     eikenLevel: Questions[arrayNum].eikenLevel,
    //     questionCatEng: questioncateng,
    //     bigNum: Questions[arrayNum].bigNum,
    //     qNum: Questions[arrayNum].qNum,
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

    var mbn = localStorage.getItem('quizappGrammarSpeaking')
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
    logOut()
    //router.replace('/quizappEiken') // ここでリダイレクト
  }

  const finishQuiz = (option, arrayNum) => {
    // if (Questions[currentQuestion].answer == optionChosen) {
    //   setScore(score + 1)
    // }
    //alert('koko')

    if (Questions[currentQuestion].answer == option) {
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
            test_title: Questions[arrayNum].test_title,
            test_group: Questions[arrayNum].test_group,
            eikenLevel: Questions[arrayNum].eikenLevel,
            questionCatEng: Questions[arrayNum].questionCatEng,
            bigNum: Questions[arrayNum].bigNum,
            qNum: Questions[arrayNum].qNum,
            // answer_member: option,
            // answer_original: Questions[arrayNum].answer,
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
    //alert(Questions[currentQuestion].questionPic)
    var imgsrc =
      'https://englib.s3.ap-northeast-1.amazonaws.com/leveltest-eiken/' +
      Questions[currentQuestion].questionPic +
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

    const fourOptions = Questions.map((el) => el.meaning) // returns ['frog', 'monkey', 'gorilla', 'lion']

    for (let i of Questions) {
      fourOptions.push(nowWord)
    }
    shuffle(fourOptions)
    console.log('fourOptions', fourOptions)

    //  var fruits = ['りんご', 'みかん', 'ぶどう', 'メロン', 'もも']
    // var num = Questions.length

    // let array = Questions
    // var randomItem =
    //   Questions[Math.floor(Math.random() * Questions.length)].meaning
    // console.log('randomItem', randomItem)
    // let get = []
    // for (let i of Questions) {
    //   // var item = Questions[Math.floor(Math.random() * Questions.length)].meaning
    //   get.push(Questions[Math.floor(Math.random() * Questions.length)].word)
    // }
    // console.log('#######', get)
  }

  const onchangeInput = (val, index, allSentence) => {
    // val = val.replace("'", '’')

    console.log('val1', val)

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

    console.log('dictTest:', dictText)
    // } //add
  }

  const findDiff2 = (
    string1, //db sentence
    transcript,
    sentenceOrder
  ) => {
    // we will use this to keep an eye on the two strings

    // string1 = string1.trim()

    // transcript = transcript.trim()

    // string1 = string1.replace('.', '')
    // string1 = string1.replace(',', '')
    // string1 = string1.replace('?', '')
    // transcript = transcript.replace('?', '')

    // transcript = transcript.replace('.', '')
    // transcript = transcript.replace(',', '')

    // string1 = string1.replace('!', '')
    // transcript = transcript.replace('!', '')

    console.log('###check-string1', string1, 'qNum:', sentenceOrder)
    console.log('###check-transcript', transcript, 'qNum:', sentenceOrder)
    // console.log('string2:', string2)

    let index = 0

    while (index < string1.length || index < transcript.length) {
      const left_char = string1[index]
      const right_char = transcript[index]

      if (left_char != right_char) {
        var myAlert =
          'CHECK....大文字・半角スペース・記号(, . ?)は正しいですか？'
        // console.log('left_char', left_char)
        // console.log('right_char', right_char)
      } else {
        // var sliceString1 = string1.slice(0, -1)
        //記号など使わない。

        var myAlert = 'チェック中2....'

        if (string1 === transcript) {
          var myAlert = 'Right'

          handleButtonResult('Right Answer', sentenceOrder, string1, transcript)
          // setBreakCondition(true)
        } else {
          var myAlert = 'Checking...キャピタル文字・記号(, . ?)は正しいですか？'
        }

        //console.log('same')
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
      console.log('pattern', pattern)
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

  return (
    <>
      <div className="modalBackground" style={{ opacity: '100%' }}>
        <div className="titleCloseBtn" style={{ opacity: '100%' }}></div>
        <div className="modalContainer" style={{ maxWidth: '600px' }}>
          {/* メインQuiz部分 */}
          {/* <div style={{ textAlign: 'right' }}>
            <span
              className="btn btn-danger"
              style={{ width: '50px' }}
              onClick={() => closeModal(false)}
            >
              X
            </span>
          </div> */}
          {/* <div
            className="title-align-center text-center"
            style={{ opacity: '100%' }}
          >
            <h5>
              <p>VOCA QUIZ</p>
            </h5>

            <hr />
            <h5>
              lastTotalWords
              <br />
              <hr />
              {lastTotalWords.map((val, key) => {
                return val
              })}
            </h5>
          </div> */}
          <div className="QuizBigMobile mt-2 pt-0">
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
            {/* {Questions.filter((val) => { */}
            {/* <div>
              {' '}
              <p>
                TEST:
                <br />
                {arrangedQuestion.map((val, key) => {
                  return val.word
                })}
              </p>
            </div> */}
            <div
              className="container mb-3 mb-0 pb-0"
              style={{
                width: '100%',
                // maxWidth: '400px',
                // minWidth: '280px',
              }}
            >
              <div
                className="row mb-0 pb-0"
                // style={{
                //   overflowY: 'scroll',
                //   height: 'auto',
                //   backgroundColor: 'gray',
                // }}
              >
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
                            voca cleaner
                          </span>
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

            <div
              className="container mb-3 mb-0 pb-0"
              style={{
                width: '100%',
                // maxWidth: '400px',
                // minWidth: '280px',
              }}
            >
              {arrangedQuestion
                .filter((val, key) => key + 1 == currentQuestion + 1)
                .map((val, key) => {
                  // setNowRightWord(val.word)

                  // setRightSentence(val.english)
                  // setSentenceOrder(val.qNum)
                  // var englishSentence = val.english
                  // var fileNum = val.qNum

                  //ここからは QuizのOptionに正解の情報を入れる
                  const keys = Object.keys(Questions)
                  Questions.filter((question) => question.word == val.word).map(
                    (val2) => {
                      const key = Object.keys(val2)
                      randomIndices.push(key.length)
                      // setNowRightWord(val.word)
                    }
                  )

                  return (
                    <>
                      <div
                        className="row pl-0 pr-0 ml-0 mr-0 mb-0 pb-0 mt-0 pt-0"
                        // style={{ backgroundColor: 'red' }}
                      >
                        <div
                          className="col-lg-12 col-md-12 mt-0 pt-0"
                          style={{ textAlign: 'center' }}
                        >
                          <h2 style={{ color: 'darkgray' }}>{val.word}</h2>

                          <span
                            style={{
                              fontWeight: '900',
                              fontSize: '70px',
                              color: 'green',
                              margin: '0px',
                              padding: '0px',
                              paddingTop: 0,
                              textAlign: 'center',
                            }}
                          >
                            {/* {score}/{Questions.length} */}
                            {/* {score}/{currentQuestion} */}
                          </span>
                        </div>
                      </div>
                      <div style={{ width: '100%', marginTop: '20px' }}>
                        {randomIndices.map((index, keynum) => {
                          const key = keys[index]

                          if (keynum == 0) {
                            var optionName = 'a'
                          } else if (keynum == 1) {
                            var optionName = 'b'
                          } else if (keynum == 2) {
                            var optionName = 'c'
                          }
                          return (
                            // <div key={key}>
                            <p key={key}>
                              <button
                                className="optionSelectBigClick"
                                onClick={() => {
                                  chooseOption('a')
                                  clickedColor('a')
                                }}
                                style={{ textAlign: 'center' }}
                              >
                                ({optionName}/{index})&nbsp;
                                {Questions[key].Japanese}/ {Questions[key].word}
                              </button>
                            </p>
                            // </div>
                          )
                        })}

                        {/**正解 */}
                        <p>
                          <button
                            className="optionSelectBigClick"
                            onClick={() => {
                              chooseOption('a')
                              clickedColor('a')
                            }}
                            style={{
                              textAlign: 'center',
                              backgroundColor: 'red',
                            }}
                          >
                            ()&nbsp;{val.Japanese}/ {Questions[key].word}
                          </button>
                        </p>
                      </div>
                      <div style={{ width: '100%', marginTop: '20px' }}>
                        {val.a != '' &&
                          (nowClickedColor == 'a' ? (
                            <p>
                              <button
                                className="optionSelectBigClick"
                                onClick={() => {
                                  chooseOption('a')
                                  clickedColor('a')
                                }}
                              >
                                {val.a}
                              </button>
                            </p>
                          ) : (
                            <p>
                              <button
                                className="optionSelectBig"
                                onClick={() => {
                                  chooseOption('a')
                                  clickedColor('a')
                                }}
                              >
                                {val.a}
                              </button>
                            </p>
                          ))}

                        {val.b != '' &&
                          (nowClickedColor == 'b' ? (
                            <p>
                              <button
                                className="optionSelectBigClick"
                                onClick={() => {
                                  chooseOption('b')
                                  clickedColor('b')
                                }}
                              >
                                {val.b}
                              </button>
                            </p>
                          ) : (
                            <p>
                              <button
                                className="optionSelectBig"
                                onClick={() => {
                                  chooseOption('b')
                                  clickedColor('b')
                                }}
                              >
                                {val.b}
                              </button>
                            </p>
                          ))}

                        {val.c != '' &&
                          (nowClickedColor == 'c' ? (
                            <p>
                              <button
                                className="optionSelectBigClick"
                                onClick={() => {
                                  chooseOption('c')
                                  clickedColor('c')
                                }}
                              >
                                {val.c}
                              </button>
                            </p>
                          ) : (
                            <p>
                              <button
                                className="optionSelectBig"
                                onClick={() => {
                                  chooseOption('c')
                                  clickedColor('c')
                                }}
                              >
                                {val.c}
                              </button>
                            </p>
                          ))}

                        {val.d != '' &&
                          (nowClickedColor == 'd' ? (
                            <p>
                              <button
                                className="optionSelectBigClick"
                                onClick={() => {
                                  chooseOption('d')
                                  clickedColor('d')
                                }}
                              >
                                {val.d}
                              </button>
                            </p>
                          ) : (
                            <p>
                              <button
                                className="optionSelectBig"
                                onClick={() => {
                                  chooseOption('d')
                                  clickedColor('d')
                                }}
                              >
                                {val.d}
                              </button>
                            </p>
                          ))}
                        {/* <hr style={{ marginTop: '15px', marginBottom: '10px' }} /> */}
                      </div>

                      <div className="row">
                        {currentQuestion + 1 == Questions.length ? (
                          <>
                            <div className="col-lg-12 col-md-12">
                              <button
                                className="btn btn-warning mt-3"
                                style={{ width: '100%' }}
                                onClick={() => {
                                  finishQuiz(optionChosen, currentQuestion)
                                }}
                                id="nextQuestion"
                              >
                                Finish Test
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-lg-12 col-md-12  mt-5 mb-3">
                              <span
                                className="btn btn-primary"
                                onClick={() => {
                                  //setNextQInsert('insert')
                                  setOptionChosen('') //答えを選ばなかった時に、前の質問の答えが残らないようにする
                                  nextQuestion(currentQuestion)
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
                                次の問題へ
                              </span>
                            </div>
                          </>
                        )}
                        <div className="footer">
                          <button
                            onClick={() => closeModal(false)}
                            id="cancalBtn"
                          >
                            やめる
                          </button>
                        </div>
                      </div>
                    </>
                  )
                })}
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
        </div>
      </div>
    </>
  )
}

export default QuizModal
