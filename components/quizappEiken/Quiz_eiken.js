import react, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
// import { QuizContext } from '../../pages/quizhelper/Contexts'
// import { QuizContext } from 'pages/quizhelper/Contexts'
import { QuizContext } from './Contexts'
import next from 'next'
import Router, { useRouter } from 'next/router'
import SweetAlert from 'react-bootstrap-sweetalert'

import useWindowDimensions from '@/components/windowDimensions/useWindowDimensions' //window sizeを調べる
import VoiceRecorder from '@/components/quizappEiken/VoiceRecorder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faStopCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
const Quiz = () => {
  const router = useRouter() //使い方：router.replace('/')

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
    test_group,
    setTest_group,
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
    Router.push('/loginLevelTest')
  }

  const chooseOption = (option) => {
    setOptionChosen(option)
  }

  const nextQuestion = (option, arrayNum, questionCatEng) => {
    if (option == '' && questionCatEng != 'Recording') {
      //答えを選んでなかった時
      alert('答えを選んでください。')
      return false
    }
    if (questionCatEng !== 'Recording') {
      if (Questions[currentQuestion].answer == option) {
        if (audioOnOff == 'on') {
          audioRightAnswer.play()
        }
        setScore(score + 1)

        var correct = 1
      } else {
        if (audioOnOff == 'on') {
          audioWrongAnswer.play()
        }
        correct = 0
      }
    }

    setCurrentQuestion(currentQuestion + 1)

    var mbn = localStorage.getItem('MypageMbn')
    var answerOrigin = Questions[arrayNum].answer
    var answerMember = option
    var questioncateng = Questions[arrayNum].questionCatEng
    var Correct = correct
    setNowQnum(parseInt(Questions[arrayNum].qNum) + parseInt(1))

    if (questioncateng == 'Recording') {
      answerOrigin = 'Recording'
      answerMember = mbn + '_' + quizTempId + '_' + Questions[arrayNum].qNum
      questioncateng = 'Recording'
      Correct = 'Recording'
    }
    console.log('####answerOrigin:', answerOrigin)
    console.log('####answerMember:', answerMember)
    console.log('####questioncateng:', questioncateng)
    axios
      .post(DB_CONN_URL + '/leveltest-quiz-result-insert-for-group', {
        quizTempId: quizTempId,
        mbn: mbn,
        test_title: Questions[arrayNum].test_title,
        test_group: Questions[arrayNum].test_group,
        eikenLevel: Questions[arrayNum].eikenLevel,
        questionCatEng: questioncateng,
        bigNum: Questions[arrayNum].bigNum,
        qNum: Questions[arrayNum].qNum,
        answer_member: answerMember,
        answer_original: answerOrigin,
        correct: Correct,
      })
      .then((response) => {
        if (!response.data.status) {
          //console.log('no information', response)
          alert(response.data.message) //for test
        } else {
          // setCurrentQuestion(currentQuestion + 1)
          setNowClickedColor('')
        }
      })
    //alert(currentQuestion + 1)
  }

  const [isLoading5, setLoading5] = useState(false)
  const [isError5, setError5] = useState(false)
  const handleQuizCancel = () => {
    setIsOpenBackMypage(false)

    var mbn = localStorage.getItem('MypageMbn')
    const fetchData5 = async () => {
      try {
        const response = await axios.put(
          DB_CONN_URL + '/leveltest-quiz-cancel/' + mbn + '&' + quizTempId
        )
      } catch (error) {
        setError5(true)
      }
      setLoading5(false)
    }

    fetchData5()
    logOut()
    //router.replace('/quizappEiken') // ここでリダイレクト
  }

  const [isLoading4, setLoading4] = useState(false)
  const [isError4, setError4] = useState(false)
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
      setError4(false)
      setLoading4(true)

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
      } catch (error) {
        setError4(true)
      }
      setLoading4(false)
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

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  // const [isLoading, setLoading] = useState(false)
  // const [isError, setError] = useState(false)
  // useEffect(() => {
  //   var mbn = localStorage.getItem('MypageMbn')
  //   // alert(test_group)

  //   var Url =
  //     DB_CONN_URL + '/get-leveltest-quiz-for-group/' +
  //     quizTempId +
  //     '&' +
  //     mbn +
  //     '&' +
  //     test_group

  //   //alert(Url)
  //   const fetchData = async () => {
  //     setError(false)
  //     setLoading(true)

  //     try {
  //       const response = await axios.get(Url)
  //       setQuestions(response.data)
  //       setTotalQuestion(response.data.length)
  //       console.log('****', response.data)
  //       alert(response.data.message)
  //     } catch (error) {
  //       setError(true)
  //       alert(response.data.message)
  //       // alert(error)
  //     }
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])

  ///////////////////////////////////////////////////////////
  //DBからデーターを持ってくる + ゲームのスタート情報をDBへ入れる
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  useEffect(() => {
    var mbn = localStorage.getItem('MypageMbn')

    // alert(quizTempId)
    var Url =
      DB_CONN_URL +
      '/get-leveltest-quiz-for-group/' +
      quizTempId +
      '&' +
      mbn +
      '&' +
      test_group
    //console.log('Url:', Url)
    //alert(Url)
    const fetchData = async () => {
      setError(false)
      setLoading(true)

      try {
        const response = await axios.get(Url)
        setQuestions(response.data)
        setTotalQuestion(response.data.length)
        console.log('****', response.data)
        // alert(response.data.message)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (isError) return <h1>Error, try again!</h1>
  if (isLoading) return <h2>Loading Question..........................</h2>

  return (
    <div>
      <div className="QuizBig mt-2">
        {/* {Questions.filter((val) => { */}

        {Questions.filter((val) => val.qNum == currentQuestion + 1).map(
          (val, key) => {
            return (
              <>
                <div className="container mb-3">
                  <div className="row">
                    <div className="col-lg-11 col-md-12">
                      <span
                        style={{
                          fontWeight: 'bold',
                          fontSize: '30px',
                          color: 'black',
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LEVEL
                        TEST
                        {/* {val.test_title} */}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Group&nbsp;
                        {val.test_group}]
                      </span>
                    </div>
                    <div className="col-lg-1 col-md-12">
                      <a
                        className="btn-sm btn-primary font-weight-bold  text-white"
                        onClick={() => {
                          setIsOpenBackMypage(true)
                        }}
                        style={{
                          cursor: 'pointer',
                          padding: '3px',
                          width: '25px',
                          height: '25px',
                          marginBottom: '20px',
                        }}
                      >
                        &nbsp;X&nbsp;
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-12 col-md-12"
                  style={{ textAlign: 'center' }}
                >
                  <h6 style={{ color: 'darkgray' }}>
                    [問題レベル：英検-{val.eikenLevel}級]
                  </h6>

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
                  <hr />
                </div>

                {val.questionContentTitle != '' && (
                  <>
                    <div
                      style={{
                        width: '95%',
                        fontSize: '15px',
                        backgroundColor: 'white',
                        padding: '15px',
                        color: 'black',
                        padding: '10px',
                        textAlign: 'center',
                        overflowWrap: 'break-word',
                      }}
                    >
                      [{val.questionContentTitle}から抜粋]
                    </div>
                  </>
                )}
                {val.questionContent != '' && (
                  <div
                    style={{
                      width: '95%',
                      fontSize: '20px',
                      backgroundColor: '#dedede',
                      padding: '15px',
                      marginBottom: '15px',
                      color: 'black',
                      margin: '10px',
                      textAlign: 'left',
                    }}
                  >
                    {val.questionContent}
                  </div>
                )}
                {val.questionPic != '' && (
                  <img
                    src={thisImage()}
                    style={{
                      marginBottom: '20px',
                      width: '80%',
                      maxWidth: '790px',
                      height: 'auto',
                    }}
                  />
                )}

                {/* <h5 style={{ fontWeight: 'bold' }}>[Q.{val.qNum}]</h5> */}

                {/* <h6 style={{ color: 'darkgray' }}>
                  [問題レベル：Eiken-{val.eikenLevel}級]
                </h6>
                <hr /> */}

                <div className="questionsLineBig">
                  {val.questionLine1 != '' && <div>{val.questionLine1}</div>}
                  {val.questionLine2 != '' && <div>{val.questionLine2}</div>}
                  {val.questionLine3 != '' && <div>{val.questionLine3}</div>}
                  {val.questionLine4 != '' && <div>{val.questionLine4}</div>}
                  {val.questionLine5 != '' && <div>{val.questionLine5}</div>}
                  {val.questionLine6 != '' && <div>{val.questionLine6}</div>}
                  {val.questionLine8 != '' && <div>{val.questionLine7}</div>}
                  {val.questionLine8 != '' && <div>{val.questionLine8}</div>}
                </div>
                {val.bigTitle != '' && val.questionCatEng !== 'Reading' && (
                  <div>
                    <hr />
                    <h5 style={{ fontWeight: 'bold', color: 'green' }}>
                      {val.bigTitle}
                    </h5>
                  </div>
                )}

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
                <div>
                  {val.questionCatEng == 'Recording' && (
                    <>
                      <center>
                        <hr
                          style={{
                            marginTop: '15px',
                            marginBottom: '10px',
                            width: '100%',
                          }}
                        />
                        <p className="mt-3 mb-3" style={{ fontWeight: 'bold' }}>
                          上記の本文を読み上げながら録音してください。
                          <br />
                          読み上げる前に録音ボタン
                          <FontAwesomeIcon
                            icon={faMicrophone}
                            size="1x"
                            color="red"
                          />
                          を押して、
                          <br />
                          終わりましたらストップボタン
                          <FontAwesomeIcon
                            icon={faStopCircle}
                            size="1x"
                            color="red"
                          />
                          を押してください。
                        </p>
                        <p
                          className="mt-3 mb-3"
                          style={{ fontWeight: 'bold', color: 'red' }}
                        >
                          録音は一回のみできますので、
                          <br />
                          間違って途中でストップボタンを押さないようにご注意ください。
                        </p>
                        <hr
                          style={{
                            marginTop: '15px',
                            marginBottom: '10px',
                            width: '100%',
                          }}
                        />

                        <VoiceRecorder
                          mbn={myMbn}
                          quizTempId={quizTempId}
                          // qNum={val.qNum}
                          qNum={nowQNum}
                          currentQuestion={currentQuestion}
                        />
                        {/* {currentQuestion} */}
                      </center>
                    </>
                  )}
                </div>
                {currentQuestion + 1 == Questions.length ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div>
                      <button
                        className="btn btn-danger mt-5 mb-3"
                        onClick={() => {
                          //setNextQInsert('insert')
                          setOptionChosen('') //答えを選ばなかった時に、前の質問の答えが残らないようにする
                          nextQuestion(
                            optionChosen,
                            currentQuestion,
                            val.questionCatEng
                          )
                        }}
                        id="nextQuestionBig"
                      >
                        NEXT QUESTION
                      </button>
                    </div>
                  </>
                )}
                <p style={{ marginBottom: 0, paddingBottom: 0 }}>
                  {/* {currentQuestion + 1}/{Questions.length}問 */}
                  {val.qNum}問目/{Questions.length}問中&nbsp;
                  {audioOnOff == 'on' ? (
                    <a onClick={() => setAudioOnOff('off')}>
                      <img
                        src="https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/sound-on.jpg"
                        style={{
                          marginLeft: '10px',
                          width: '30px',
                          height: '30px',
                          border: 0,
                          cursor: 'pointer',
                        }}
                      />
                    </a>
                  ) : (
                    <a onClick={() => setAudioOnOff('on')}>
                      <img
                        src="https://englib.s3.ap-northeast-1.amazonaws.com/sound-effect/sound-off.jpg"
                        style={{
                          marginLeft: '10px',
                          width: '30px',
                          height: '30px',
                          border: 0,
                          cursor: 'pointer',
                        }}
                      />
                    </a>
                  )}
                </p>
              </>
            )
          }
        )}

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
          style={{ width: '30%' }}
        >
          <p>
            途中でやめるとテストの履歴が全て消えるため、最初からやり直すことになります。
          </p>
        </SweetAlert>
      </div>
    </div>
  )
}

export default Quiz
